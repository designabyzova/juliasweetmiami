"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type SelectOption = {
  value: string;
  label: string;
};

export type SelectGroup = {
  label: string;
  options: SelectOption[];
};

type CustomSelectProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options?: SelectOption[];
  groups?: SelectGroup[];
  testId?: string;
};

export default function CustomSelect({
  value,
  onChange,
  placeholder,
  options,
  groups,
  testId,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // All options flattened for lookup
  const allOptions = groups
    ? groups.flatMap((g) => g.options)
    : options || [];
  const selectedLabel = allOptions.find((o) => o.value === value)?.label;

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handle = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [isOpen]);

  const handleSelect = useCallback(
    (val: string) => {
      onChange(val);
      setIsOpen(false);
    },
    [onChange]
  );

  return (
    <div ref={containerRef} className="relative" data-testid={testId}>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className={`w-full flex items-center justify-between rounded-xl px-4 py-3 text-left font-[family-name:var(--font-body)] text-sm sm:text-base transition-all duration-200 bg-white min-h-[48px] ${
          isOpen
            ? "border-2 border-coral shadow-lg shadow-coral/8 ring-4 ring-coral/10"
            : "border border-border hover:border-coral/40 hover:shadow-sm"
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span
          className={
            selectedLabel
              ? "text-charcoal font-medium"
              : "text-gray-light/70"
          }
        >
          {selectedLabel || placeholder}
        </span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`flex-shrink-0 ml-2 transition-colors duration-200 ${
            isOpen ? "text-coral" : "text-gray-light"
          }`}
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={listRef}
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-50 mt-2 w-full bg-white border border-border/80 rounded-2xl shadow-2xl shadow-charcoal/10 overflow-hidden"
          >
            <div className="max-h-[260px] overflow-y-auto py-1.5 no-scrollbar">
              {groups
                ? groups.map((group) => (
                    <div key={group.label}>
                      {/* Group header */}
                      <div className="px-4 pt-3 pb-1">
                        <span className="text-coral font-semibold text-[10px] sm:text-xs uppercase tracking-wider font-[family-name:var(--font-body)]">
                          {group.label}
                        </span>
                      </div>
                      {group.options.map((opt) => (
                        <OptionItem
                          key={opt.value}
                          option={opt}
                          isSelected={value === opt.value}
                          onSelect={handleSelect}
                        />
                      ))}
                    </div>
                  ))
                : options?.map((opt) => (
                    <OptionItem
                      key={opt.value}
                      option={opt}
                      isSelected={value === opt.value}
                      onSelect={handleSelect}
                    />
                  ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function OptionItem({
  option,
  isSelected,
  onSelect,
}: {
  option: SelectOption;
  isSelected: boolean;
  onSelect: (value: string) => void;
}) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={isSelected}
      onClick={() => onSelect(option.value)}
      className={`w-full flex items-center gap-2.5 px-4 py-2.5 sm:py-3 text-left text-sm sm:text-base font-[family-name:var(--font-body)] transition-all duration-150 cursor-pointer ${
        isSelected
          ? "bg-coral/8 text-coral font-medium"
          : "text-charcoal hover:bg-pink-lighter/60 active:bg-pink-lighter"
      }`}
    >
      {/* Checkmark or spacer */}
      <span className="w-4 flex-shrink-0 flex items-center justify-center">
        {isSelected && (
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>
      <span>{option.label}</span>
    </button>
  );
}
