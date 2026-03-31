"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Session } from "@supabase/supabase-js";
import { getAdminSession } from "@/lib/admin/auth";
import { supabase } from "@/lib/supabase/client";
import { AdminPageLoading } from "@/components/features/admin/AdminPageLoading";

export function AdminAuthGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginRoute = pathname === "/admin/login";
  const [isChecking, setIsChecking] = useState(() => !isLoginRoute);
  const [isAuthorized, setIsAuthorized] = useState(() => isLoginRoute);

  useEffect(() => {
    let mounted = true;

    function handleRouteAccess(session: Session | null) {
      const hasAccess = Boolean(session);

      if (mounted) {
        setIsAuthorized(isLoginRoute ? true : hasAccess);
      }

      if (!hasAccess && !isLoginRoute) {
        router.replace("/admin/login");
        return;
      }

      if (hasAccess && isLoginRoute) {
        router.replace("/admin");
      }
    }

    async function checkSession() {
      const session = await getAdminSession();

      if (!mounted) {
        return;
      }

      handleRouteAccess(session);
      setIsChecking(false);
    }

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setIsChecking(false);
      }

      handleRouteAccess(session);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [isLoginRoute, router]);

  if (!isLoginRoute && isChecking) {
    return <AdminPageLoading />;
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}
