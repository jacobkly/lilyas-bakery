import { LoginForm } from "@/components/features/admin/LoginForm";

export function AdminLoginShell() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-xl border border-secondary/10 bg-background p-8 shadow-soft">
        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary">
            Admin
          </p>
          <h1 className="text-3xl text-secondary">Sign in to manage the menu</h1>
          <p className="text-sm text-muted">
            Use the single admin account for item management and image uploads.
          </p>
        </div>
        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
