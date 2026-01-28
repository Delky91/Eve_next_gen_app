import { SystemForm } from "@/components/forms/SystemForm";

export default function Home() {
  return (
    <main>
      <div className="mb-8 space-y-2 text-center">
        <h1>EVE Online PI Helper</h1>
        <p className="text-muted-foreground">
          Find the best planetary interaction opportunities in any system
        </p>
      </div>
      <SystemForm />
    </main>
  );
}
