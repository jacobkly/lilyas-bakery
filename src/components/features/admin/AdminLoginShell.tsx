import Link from "next/link";
import { LoginForm } from "@/components/features/admin/LoginForm";

export function AdminLoginShell() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12 md:px-8 md:py-16">
      <div className="w-full max-w-md">
        <div className="mb-5 flex justify-start">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-secondary/12 bg-background/90 px-4 py-2 text-sm font-medium text-secondary shadow-soft transition-colors hover:bg-section"
          >
            <span aria-hidden="true">{"<-"}</span>
            <span>Back to home</span>
          </Link>
        </div>
        <div className="rounded-xl border border-secondary/10 bg-background p-8 shadow-soft md:p-9">
          <div className="space-y-4">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary">
              Admin
            </p>
            <h1 className="text-3xl text-secondary">
              Sign in to manage the menu
            </h1>
            <p className="text-sm text-muted">
              Use the single admin account for item management and image uploads.
            </p>
          </div>
          <div className="mt-9">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
