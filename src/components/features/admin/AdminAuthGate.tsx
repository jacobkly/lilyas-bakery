"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Session } from "@supabase/supabase-js";
import { getAdminSession } from "@/lib/admin/auth";
import { supabase } from "@/lib/supabase/client";

export function AdminAuthGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      const session = await getAdminSession();

      if (!mounted) {
        return;
      }

      handleRouteAccess(session);
      setIsChecking(false);
    }

    function handleRouteAccess(session: Session | null) {
      const isLoginRoute = pathname === "/admin/login";

      if (!session && !isLoginRoute) {
        router.replace("/admin/login");
        return;
      }

      if (session && isLoginRoute) {
        router.replace("/admin");
      }
    }

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      handleRouteAccess(session);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [pathname, router]);

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="rounded-xl border border-secondary/10 bg-background px-6 py-4 text-sm text-muted shadow-soft">
          Checking admin session...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
