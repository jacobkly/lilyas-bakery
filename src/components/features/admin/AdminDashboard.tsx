"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
import { Button } from "@/components/ui/admin/button";

export function AdminDashboard() {
  const router = useRouter();
  const [items, setItems] = useState<AdminBakeryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
    await signOutAdmin();
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#f7efe7]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-8">
        <header className="flex flex-col gap-4 rounded-xl border border-secondary/10 bg-background p-6 shadow-soft md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">
              Admin Dashboard
            </p>
            <h1 className="text-3xl text-secondary">Manage bakery items</h1>
            <p className="text-sm text-muted">
              Create, edit, and remove menu items with a simple content workflow.
            </p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => setIsCreateOpen(true)}>Create new item</Button>
            <Button variant="outline" onClick={handleSignOut}>
              Sign out
            </Button>
          </div>
        </header>

        {feedback ? (
          <div className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {feedback}
          </div>
        ) : null}
        {errorMessage ? (
          <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        ) : null}

        <section className="rounded-xl border border-secondary/10 bg-background shadow-soft">
          <div className="border-b border-secondary/10 px-6 py-4">
            <h2 className="text-xl text-secondary">Bakery items</h2>
          </div>

          <div className="divide-y divide-secondary/10">
            {isLoading ? (
              <div className="px-6 py-8 text-sm text-muted">Loading items...</div>
            ) : items.length === 0 ? (
              <div className="px-6 py-8 text-sm text-muted">
                No bakery items yet. Create the first one to populate the menu.
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="grid gap-4 px-6 py-5 md:grid-cols-[88px_minmax(0,1fr)_auto] md:items-center"
                >
                  <div className="relative h-[88px] overflow-hidden rounded-lg bg-section">
                    <Image
                      src={item.mainImageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="88px"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-foreground">
                      {item.name}
                    </h3>
                    <p className="max-w-2xl text-sm leading-6 text-muted">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
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
