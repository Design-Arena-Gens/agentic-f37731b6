"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { TemplateCard } from "./template-card";
import { templateCategories } from "@/lib/templates";
import type { TemplateDefinition } from "@/lib/templates";

type TemplateGalleryProps = {
  templates: TemplateDefinition[];
};

export function TemplateGallery({ templates }: TemplateGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();

    return templates.filter((template) => {
      const matchesCategory =
        selectedCategory === "Todos" || template.category === selectedCategory;
      const matchesQuery =
        !normalizedQuery ||
        template.name.toLowerCase().includes(normalizedQuery) ||
        template.tagline.toLowerCase().includes(normalizedQuery) ||
        template.keywords.some((keyword) =>
          keyword.toLowerCase().includes(normalizedQuery)
        );

      return matchesCategory && matchesQuery;
    });
  }, [templates, selectedCategory, query]);

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            Explora 40 plantillas diseñadas para el 2025
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Filtra por disciplina, explora estilos visuales y descubre el formato que mejor traduce tu impacto.
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por rol, estilo o keyword..."
            className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/20"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <FilterChip
          label="Todos"
          active={selectedCategory === "Todos"}
          onClick={() => setSelectedCategory("Todos")}
        />
        {templateCategories.map((category) => (
          <FilterChip
            key={category}
            label={category}
            active={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          />
        ))}
      </div>

      <LayoutGroup>
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3"
          >
            {filtered.map((template) => (
              <motion.div
                key={template.slug}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <TemplateCard template={template} />
              </motion.div>
            ))}
            {filtered.length === 0 && (
              <motion.div
                layout
                className="col-span-full rounded-3xl border border-white/5 bg-white/5 p-10 text-center text-sm text-slate-400"
              >
                No encontramos plantillas con ese criterio. Ajusta tu búsqueda o categoría.
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
}

type FilterChipProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

function FilterChip({ label, active, onClick }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-full border border-white/10 px-4 py-2 text-xs font-medium uppercase tracking-wide text-slate-300 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
    >
      <span
        className="absolute inset-0 bg-white/10 opacity-0 transition group-hover:opacity-100"
        aria-hidden="true"
      />
      <span
        className={active ? "text-white" : "text-slate-300 group-hover:text-white"}
      >
        {label}
      </span>
      {active && (
        <span
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(236,72,153,0.28))"
          }}
          aria-hidden="true"
        />
      )}
    </button>
  );
}
