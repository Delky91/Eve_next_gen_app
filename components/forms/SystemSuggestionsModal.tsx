"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { SuggestionItem } from "@/lib/types/types";

interface SuggestionsModalProps {
  suggestions: SuggestionItem[];
  isOpen: boolean;
  onClose: () => void;
  onSelect: (suggestion: SuggestionItem) => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export function SystemSuggestionsModal({
  suggestions,
  isOpen,
  onClose,
  onSelect,
  inputRef,
}: SuggestionsModalProps) {
  const [position, setPosition] = React.useState({ top: 0, left: 0, width: 0 });

  React.useEffect(() => {
    if (isOpen && inputRef?.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [isOpen, inputRef]);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || suggestions.length === 0) {
    return null;
  }

  const modalContent = (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Modal */}
      <div
        className={cn(
          "bg-popover text-popover-foreground fixed z-50 max-h-[300px] overflow-y-auto rounded-md border shadow-lg",
          "animate-in fade-in-0 zoom-in-95"
        )}
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          width: `${position.width}px`,
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Sugerencias de sistemas"
      >
        <div className="p-2">
          <div className="mb-2 flex items-center justify-between border-b pb-2">
            <h3 className="text-sm font-semibold">Sugerencias</h3>
            <button
              onClick={onClose}
              className="ring-offset-background focus:ring-ring rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none"
              aria-label="Cerrar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <ul className="space-y-1">
            {suggestions.map((suggestion) => (
              <li key={suggestion.id}>
                <button
                  type="button"
                  onClick={() => {
                    onSelect(suggestion);
                    onClose();
                  }}
                  className={cn(
                    "w-full rounded-sm px-3 py-2 text-left text-sm transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    "focus:bg-accent focus:text-accent-foreground focus:outline-none"
                  )}
                >
                  <div className="font-medium">{suggestion.name}</div>
                  <div className="text-muted-foreground text-xs">ID: {suggestion.id}</div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );

  return createPortal(modalContent, document.body);
}
