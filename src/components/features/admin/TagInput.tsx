"use client";

import { useState } from "react";
import { Button } from "@/components/ui/admin/button";
import { Input } from "@/components/ui/admin/input";
import { Label } from "@/components/ui/admin/label";

type TagInputProps = {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder: string;
};

export function TagInput({
  label,
  value,
  onChange,
  placeholder,
}: TagInputProps) {
  const [draft, setDraft] = useState("");

  function addTag() {
    const nextValue = draft.trim();

    if (!nextValue || value.includes(nextValue)) {
      setDraft("");
      return;
    }

    onChange([...value, nextValue]);
    setDraft("");
  }

  function removeTag(tag: string) {
    onChange(value.filter((item) => item !== tag));
  }

  return (
    <div className="space-y-4">
      <Label>{label}</Label>
      <div className="flex gap-3">
        <Input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addTag();
            }
          }}
          placeholder={placeholder}
        />
        <Button type="button" variant="outline" onClick={addTag}>
          Add
        </Button>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-2 rounded-full bg-section px-3 py-1 text-sm text-secondary"
          >
            {tag}
            <button
              type="button"
              className="text-muted transition-colors hover:text-foreground"
              onClick={() => removeTag(tag)}
            >
              x
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
