import { SystemForm } from "@/components/forms/SystemForm";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center bg-white px-16 py-32 dark:bg-black">
        <SystemForm />
      </main>
    </div>
  );
}
