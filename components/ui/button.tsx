import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wide",
  {
    variants: {
      variant: {
        locked: "bg-[#202f36] text-[#52656d] hover:bg-[#202f36]/80 border-[#18262d] border-b-4 active:border-b-0",
        default: "bg-[#18262d] text-white border-[#202f36] border-2 border-b-4 active:border-b-2 hover:bg-[#202f36]",
        primary: "bg-[#1cb0f6] text-white hover:bg-[#1cb0f6]/90 border-[#1899d6] border-b-4 active:border-b-0",
        primaryOutline: "bg-[#18262d] text-[#1cb0f6] border-[#202f36] border-2 hover:bg-[#202f36]",
        secondary: "bg-[#58cc02] text-white hover:bg-[#58cc02]/90 border-[#46a302] border-b-4 active:border-b-0",
        secondaryOutline: "bg-[#18262d] text-[#58cc02] border-[#202f36] border-2 hover:bg-[#202f36]",
        danger: "bg-[#ff4b4b] text-white hover:bg-[#ff4b4b]/90 border-[#ea2b2b] border-b-4 active:border-b-0",
        dangerOutline: "bg-[#18262d] text-[#ff4b4b] border-[#202f36] border-2 hover:bg-[#202f36]",
        super: "bg-[#ce82ff] text-white hover:bg-[#ce82ff]/90 border-[#be52f2] border-b-4 active:border-b-0",
        superOutline: "bg-[#18262d] text-[#ce82ff] border-[#202f36] border-2 hover:bg-[#202f36]",
        ghost: "bg-transparent text-[#8496a0] border-transparent border-0 hover:bg-[#202f36] hover:text-white",
        sidebar: "bg-transparent text-[#8496a0] border-2 border-transparent hover:bg-[#202f36]/60 hover:text-white transition-none",
        sidebarOutline: "bg-[#18313d] text-[#1cb0f6] border-[#1899d6] border-2 hover:bg-[#18313d]/90 transition-none"
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-8",
        icon: "h-10 w-10",
        rounded: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
