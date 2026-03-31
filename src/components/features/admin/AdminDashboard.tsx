"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  deleteBakeryItem,
  listBakeryItems,
  mapRowToAdminItem,
} from "@/lib/admin/bakery-items";
import { signOutAdmin } from "@/lib/admin/auth";
import {
  BakeryItemFormDialog,
  type AdminBakeryItem,
} from "@/components/features/admin/BakeryItemFormDialog";
import { AdminPageLoading } from "@/components/features/admin/AdminPageLoading";
import { Button } from "@/components/ui/admin/button";

function ProfileIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="size-4"
    >
      <circle cx="10" cy="6.25" r="3.1" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M4.75 16.25c.6-2.45 2.65-3.85 5.25-3.85s4.65 1.4 5.25 3.85"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SignOutIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="size-4"
    >
      <path
        d="M8 4.75H6.75A1.75 1.75 0 0 0 5 6.5v7a1.75 1.75 0 0 0 1.75 1.75H8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M11 13.5 14.5 10 11 6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.25 10H8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AdminDashboard() {
  const [items, setItems] = useState<AdminBakeryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminBakeryItem | null>(null);

  async function loadItems() {
    setIsLoading(true);
    setErrorMessage(null);

    const { data, error } = await listBakeryItems();

    if (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
      return;
    }

    setItems(data.map(mapRowToAdminItem));
    setIsLoading(false);
  }

  useEffect(() => {
    let ignore = false;

    async function initialLoad() {
      const { data, error } = await listBakeryItems();

      if (ignore) {
        return;
      }

      if (error) {
        setErrorMessage(error.message);
        setIsLoading(false);
        return;
      }

      setItems(data.map(mapRowToAdminItem));
      setIsLoading(false);
    }

    initialLoad();

    return () => {
      ignore = true;
    };
  }, []);

  async function handleDelete(id: string) {
    setFeedback(null);
    setErrorMessage(null);

    const { error } = await deleteBakeryItem(id);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setFeedback("Item deleted.");
    await loadItems();
  }

  async function handleSignOut() {
    setIsSigningOut(true);
    await signOutAdmin();
    window.location.assign("/admin/login");
  }

  if (isLoading && items.length === 0 && !errorMessage) {
    return <AdminPageLoading />;
  }

  return (
    <div className="min-h-screen bg-[#f7efe7]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-7 py-8 sm:px-8 md:px-10 md:py-10">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="pl-0.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#9e8167]">
              Dashboard
            </p>
            <div className="flex items-center justify-end gap-2.5 text-[#7f6958]">
              <button
                type="button"
                aria-label="Admin profile"
                className="inline-flex size-9 items-center justify-center rounded-full border border-secondary/10 bg-background/80 transition-colors hover:bg-background hover:text-secondary"
              >
                <ProfileIcon />
              </button>
              <Button
                variant="ghost"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="h-9 rounded-full px-3.5 text-sm text-[#7f6958] hover:text-secondary"
              >
                <SignOutIcon />
                <span>{isSigningOut ? "Signing out..." : "Sign out"}</span>
              </Button>
            </div>
          </div>

          <header className="flex flex-col gap-7 rounded-[28px] border border-secondary/10 bg-[#f3e8dc] px-7 py-8 shadow-soft sm:px-8 md:flex-row md:items-start md:justify-between md:gap-8 md:px-10 md:py-9">
            <div className="max-w-2xl space-y-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#a1846a]">
                Admin Dashboard
              </p>
              <h1 className="font-serif text-[2rem] font-medium leading-[1.08] text-[#3a2e26] md:text-[2.35rem]">
                Manage Bakery Items
              </h1>
              <p className="max-w-xl pt-1 text-sm leading-6 text-[#6f6359] md:text-[15px]">
                Create, edit, and remove menu items with a simple content workflow.
              </p>
            </div>
            <div className="flex shrink-0 items-start md:pt-7">
              <Button
                onClick={() => setIsCreateOpen(true)}
                className="h-11 rounded-full bg-primary px-5 text-sm font-medium text-background hover:bg-primary/90"
              >
                Create new item
              </Button>
            </div>
          </header>
        </div>

        {feedback ? (
          <div className="rounded-xl bg-emerald-50 px-4 py-3.5 text-sm text-emerald-700">
            {feedback}
          </div>
        ) : null}
        {errorMessage ? (
          <div className="rounded-xl bg-red-50 px-4 py-3.5 text-sm text-red-700">
            {errorMessage}
          </div>
        ) : null}

        <section className="rounded-xl border border-secondary/10 bg-background shadow-soft">
          <div className="border-b border-secondary/10 px-6 py-5 md:px-8">
            <h2 className="text-xl text-secondary">Bakery items</h2>
          </div>

          <div className="divide-y divide-secondary/10">
            {items.length === 0 ? (
              <div className="px-6 py-10 text-sm text-muted md:px-8">
                No bakery items yet. Create the first one to populate the menu.
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="grid gap-5 px-6 py-6 md:grid-cols-[96px_minmax(0,1fr)_auto] md:items-center md:px-8"
                >
                  <div className="relative h-[96px] overflow-hidden rounded-lg bg-section">
                    <Image
                      src={item.mainImageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <div className="space-y-2.5">
                    <h3 className="text-lg font-medium text-foreground">
                      {item.name}
                    </h3>
                    <p className="max-w-2xl text-sm leading-6 text-muted">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" onClick={() => setEditingItem(item)}>
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      <BakeryItemFormDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSuccess={async () => {
          setFeedback("Item created.");
          await loadItems();
        }}
      />

      <BakeryItemFormDialog
        open={Boolean(editingItem)}
        onOpenChange={(open) => {
          if (!open) {
            setEditingItem(null);
          }
        }}
        item={editingItem}
        onSuccess={async () => {
          setFeedback("Item updated.");
          await loadItems();
        }}
      />
    </div>
  );
}
