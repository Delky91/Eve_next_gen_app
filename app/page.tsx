import { SystemForm } from "@/components/forms/SystemForm";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-8 font-sans dark:bg-zinc-950">
      <main className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            EVE Online PI Helper
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Find the best planetary interaction opportunities in any system
          </p>
        </div>
        <SystemForm />
      </main>
    </div>
  );
}
