// The FastAPI service and its SQLite database are the default development setup.
// Set DEMO_MODE=true only when working on the UI without the backend running.
export const isLocalDemoMode = process.env.DEMO_MODE === "true";
