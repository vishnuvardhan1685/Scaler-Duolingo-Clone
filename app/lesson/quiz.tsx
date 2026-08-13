"use client";

import { toast } from "sonner";
import Image from "next/image";
import Confetti from "react-confetti";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useAudio, useWindowSize, useMount } from "react-use";

import { reduceHearts } from "@/actions/user-progress";
import { useHeartsModal } from "@/store/use-hearts-modal";
import { challengeOptions, challenges } from "@/db/schema";
import { usePracticeModal } from "@/store/use-practice-modal";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { Button } from "@/components/ui/button";

import { Header } from "./header";
import { Footer } from "./footer";
import { Challenge } from "./challenge";
import { ResultCard } from "./result-card";
import { QuestionBubble } from "./question-bubble";

type Props ={
  initialPercentage: number;
  initialHearts: number;
  initialLessonId: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: typeof challengeOptions.$inferSelect[];
  })[];
  userSubscription: { isActive: boolean } | null;
};

export const Quiz = ({
  initialPercentage,
  initialHearts,
  initialLessonId,
  initialLessonChallenges,
  userSubscription,
}: Props) => {
  const { open: openHeartsModal } = useHeartsModal();
  const { open: openPracticeModal } = usePracticeModal();

  useMount(() => {
    if (initialPercentage === 100) {
      openPracticeModal();
    }
    if (initialHearts === 0 && !userSubscription?.isActive) {
      openHeartsModal();
    }
  });

  const { width, height } = useWindowSize();

  const router = useRouter();

  const [finishAudio] = useAudio({ src: "/finish.mp3", autoPlay: true });
  const [
    correctAudio,
    _c,
    correctControls,
  ] = useAudio({ src: "/correct.wav" });
  const [
    incorrectAudio,
    _i,
    incorrectControls,
  ] = useAudio({ src: "/incorrect.wav" });
  const [pending, startTransition] = useTransition();

  const [lessonId] = useState(initialLessonId);
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(() => {
    return initialPercentage === 100 ? 0 : initialPercentage;
  });
  const [challenges] = useState(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed);
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });

  const [selectedOption, setSelectedOption] = useState<string>();
  const [typedAnswer, setTypedAnswer] = useState("");
  const [blankAnswer, setBlankAnswer] = useState<string[]>([]);
  const [matchLeft, setMatchLeft] = useState<string | null>(null);
  const [matchRight, setMatchRight] = useState<string | null>(null);
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

  const challenge = challenges[activeIndex];
  const options = challenge?.challengeOptions ?? [];
  const normalizedType = challenge?.type;
  const correctAnswer = (challenge as { answer?: string } | undefined)?.answer ?? "";

  const normalize = (value: string) => 
    value
      .replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();

  const correctOption = options.find((option) => option.correct);
  const possibleAnswers = [
    correctAnswer,
    correctOption?.text,
    correctOption?.id ? String(correctOption.id) : null,
  ].filter(Boolean) as string[];

  const selectedCandidate = (() => {
    if (!challenge) {
      return "";
    }

    if (normalizedType === "TYPE") {
      return typedAnswer;
    }

    if (normalizedType === "BLANK") {
      return blankAnswer.join(" ");
    }

    if (normalizedType === "MATCH") {
      if (matchLeft && matchRight) {
        return `${matchLeft} = ${matchRight}`;
      }

      return "";
    }

    return selectedOption ?? "";
  })();

  const onNext = () => {
    setActiveIndex((current) => current + 1);
  };

  const onSelect = (id: number) => {
    if (status !== "none") return;

    setSelectedOption(String(id));
  };

  const onSelectAnswer = (answer: string) => {
    if (status !== "none") return;

    setSelectedOption(answer);
  };

  const onChooseBlankWord = (word: string) => {
    if (status !== "none") return;

    setBlankAnswer((current) => [...current, word]);
  };

  const onMatchLeft = (word: string) => {
    if (status !== "none") return;

    setMatchLeft(word);
  };

  const onMatchRight = (word: string) => {
    if (status !== "none") return;

    setMatchRight(word);
  };

  const onContinue = () => {
    if (!selectedCandidate) return;

    if (status === "wrong") {
      setStatus("none");
      setSelectedOption(undefined);
      setTypedAnswer("");
      setBlankAnswer([]);
      setMatchLeft(null);
      setMatchRight(null);
      return;
    }

    if (status === "correct") {
      onNext();
      setStatus("none");
      setSelectedOption(undefined);
      setTypedAnswer("");
      setBlankAnswer([]);
      setMatchLeft(null);
      setMatchRight(null);
      return;
    }

    const isCorrect = possibleAnswers.length === 0 
      ? true 
      : possibleAnswers.some((ans) => normalize(selectedCandidate) === normalize(ans));

    if (isCorrect) {
      startTransition(() => {
        upsertChallengeProgress(challenge.id)
          .then((response) => {
            if (response?.progress?.hearts === 0 && !userSubscription?.isActive) {
              openHeartsModal();
              return;
            }

            correctControls.play();
            setStatus("correct");
            setPercentage((prev) => prev + 100 / challenges.length);

            // This is a practice
            if (initialPercentage === 100) {
              setHearts((prev) => Math.min(prev + 1, 5));
            }
          })
          .catch(() => toast.error("Something went wrong. Please try again."))
      });
    } else {
      startTransition(() => {
        reduceHearts()
          .then((response) => {
            if (response?.progress?.hearts === 0 && !userSubscription?.isActive) {
              openHeartsModal();
              return;
            }

            incorrectControls.play();
            setStatus("wrong");

            setHearts(response.progress.hearts);
          })
          .catch(() => toast.error("Something went wrong. Please try again."))
      });
    }
  };

  if (!challenge) {
    return (
      <>
        {finishAudio}
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          tweenDuration={10000}
        />
        <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
          <Image
            src="/finish.svg"
            alt="Finish"
            className="hidden lg:block"
            height={100}
            width={100}
          />
          <Image
            src="/finish.svg"
            alt="Finish"
            className="block lg:hidden"
            height={50}
            width={50}
          />
          <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
            Great job! <br /> You&apos;ve completed the lesson.
          </h1>
          <div className="flex items-center gap-x-4 w-full">
            <ResultCard
              variant="points"
              value={challenges.length * 10}
            />
            <ResultCard
              variant="hearts"
              value={hearts}
            />
          </div>
        </div>
        <Footer
          lessonId={lessonId}
          status="completed"
          onCheck={() => router.push("/learn")}
        />
      </>
    );
  }

  const title = challenge.type === "ASSIST" 
    ? "Select the correct meaning"
    : challenge.question;

  const leftRight = correctAnswer.split("=").map((part) => part.trim()).filter(Boolean);
  const matchWords = challenge.type === "MATCH" ? leftRight : [];
  const blankWords = challenge.type === "BLANK" ? correctAnswer.split(" ") : [];

  return (
    <>
      {incorrectAudio}
      {correctAudio}
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
      />
      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
            <h1 className="text-lg lg:text-3xl text-center lg:text-start font-black text-white">
              {title}
            </h1>
            <div>
              {challenge.type === "ASSIST" && (
                <QuestionBubble question={challenge.question} />
              )}
              {challenge.type === "TYPE" && (
                <div className="space-y-4">
                  <input
                    value={typedAnswer}
                    onChange={(event) => setTypedAnswer(event.target.value)}
                    placeholder="Type your answer"
                    className="w-full rounded-2xl border-2 border-[#202f36] bg-[#18262d] text-white px-4 py-3 text-lg outline-none focus:border-[#58cc02]"
                    disabled={pending || status !== "none"}
                  />
                </div>
              )}
              {challenge.type === "BLANK" && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 rounded-xl border-2 border-dashed border-neutral-300 p-4 min-h-[72px]">
                    {blankAnswer.length === 0 ? (
                      <span className="text-neutral-400">Tap words to build the sentence</span>
                    ) : (
                      blankAnswer.map((word) => (
                        <span key={word + blankAnswer.indexOf(word)} className="rounded-lg bg-green-100 px-3 py-2 font-semibold text-green-700">
                          {word}
                        </span>
                      ))
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {blankWords.map((word) => (
                      <Button key={word} variant="secondary" onClick={() => onChooseBlankWord(word)} disabled={pending || status !== "none"}>
                        {word}
                      </Button>
                    ))}
                    <Button variant="ghost" onClick={() => setBlankAnswer([])} disabled={pending || status !== "none"}>
                      Clear
                    </Button>
                  </div>
                </div>
              )}
              {challenge.type === "MATCH" && (
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="space-y-2">
                    <p className="text-sm font-bold uppercase tracking-wide text-neutral-500">Left</p>
                    <div className="flex flex-wrap gap-2">
                      {matchWords.map((word) => (
                        <Button key={word} variant={matchLeft === word ? "primary" : "secondary"} onClick={() => onMatchLeft(word)} disabled={pending || status !== "none"}>
                          {word}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-bold uppercase tracking-wide text-neutral-500">Right</p>
                    <div className="flex flex-wrap gap-2">
                      {matchWords.slice().reverse().map((word) => (
                        <Button key={word} variant={matchRight === word ? "primary" : "secondary"} onClick={() => onMatchRight(word)} disabled={pending || status !== "none"}>
                          {word}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {(challenge.type === "SELECT" || challenge.type === "ASSIST") && (
                <Challenge
                  options={options}
                  onSelect={onSelectAnswer}
                  status={status}
                  selectedOption={selectedOption}
                  disabled={pending}
                  type={challenge.type}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer
        disabled={pending || !selectedCandidate}
        status={status}
        onCheck={onContinue}
      />
    </>
  );
};
