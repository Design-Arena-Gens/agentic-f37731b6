import Link from "next/link";
import { clsx } from "clsx";
import type { TemplateDefinition } from "@/lib/templates";
import { Badge } from "./ui/badge";
import type { CSSProperties } from "react";

type TemplateCardProps = {
  template: TemplateDefinition;
};

export function TemplateCard({ template }: TemplateCardProps) {
  const { theme } = template;
  const previewStyle: CSSProperties = {
    background: theme.dark ? undefined : theme.surface,
    backgroundImage: theme.pattern === "glow" ? theme.accentGradient : undefined,
    borderColor: theme.border,
    boxShadow: theme.dark
      ? `0 32px 60px -40px ${theme.accent}40`
      : `0 24px 48px -28px ${theme.accent}30`
  };

  return (
    <Link
      href={`/templates/${template.slug}`}
      className="group flex flex-col gap-5 rounded-3xl border border-white/5 bg-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/10"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-50 group-hover:text-white">
            {template.name}
          </h3>
          <p className="mt-2 text-sm text-slate-400">{template.tagline}</p>
        </div>
        <Badge className="bg-white/10 text-xs">{template.heroAccent}</Badge>
      </div>

      <div
        className={clsx(
          "relative overflow-hidden rounded-2xl border bg-gradient-to-br from-white/5 to-transparent p-4 transition-all duration-500 group-hover:scale-[1.01]",
          "after:pointer-events-none after:absolute after:inset-0 after:bg-gradient-to-br after:from-white/10 after:via-transparent after:to-transparent after:opacity-0 after:transition",
          "group-hover:after:opacity-100"
        )}
        style={previewStyle}
      >
        <div className="grid gap-3">
          <div
            className="h-3 w-2/3 rounded-full"
            style={{ background: theme.accentGradient }}
          />
          <div className="space-y-2">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="h-2 rounded-full"
                style={{
                  background: index % 2 === 0 ? theme.accent : theme.textMuted,
                  opacity: index % 2 === 0 ? 0.6 : 0.2
                }}
              />
            ))}
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {[0, 1, 2, 3, 4, 5].map((badge) => (
              <span
                key={badge}
                className="h-5 rounded-md"
                style={{
                  background: badge % 2 === 0 ? theme.pill : theme.textMuted,
                  opacity: badge % 2 === 0 ? 0.8 : 0.1
                }}
              />
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 transition group-hover:opacity-60" />
      </div>

      <div className="flex flex-wrap gap-2">
        {template.recommendedFor.slice(0, 2).map((role) => (
          <Badge key={role} className="bg-white/10 text-[11px] font-medium tracking-tight">
            {role}
          </Badge>
        ))}
      </div>
    </Link>
  );
}
