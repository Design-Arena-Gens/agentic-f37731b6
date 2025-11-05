import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { TemplatePreview } from "@/components/template-preview";
import { getTemplateBySlug, templates } from "@/lib/templates";

type TemplateDetailPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return templates.map((template) => ({ slug: template.slug }));
}

export function generateMetadata({ params }: TemplateDetailPageProps): Metadata {
  const template = getTemplateBySlug(params.slug);
  if (!template) {
    return {
      title: "Plantilla no encontrada | CV Forge 2025"
    };
  }
  return {
    title: `${template.name} | CV Forge 2025`,
    description: template.summary
  };
}

export default function TemplateDetailPage({ params }: TemplateDetailPageProps) {
  const template = getTemplateBySlug(params.slug);

  if (!template) {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-24 pt-16 md:px-12 lg:px-16">
      <header className="flex flex-col gap-4">
        <Link
          href="/"
          className="group inline-flex w-fit items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.32em] text-slate-300 transition hover:border-white/20 hover:bg-white/10"
        >
          <ArrowLeftIcon className="h-4 w-4 transition group-hover:-translate-x-1" />
          Volver
        </Link>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              {template.category} · {template.heroAccent}
            </p>
            <h1 className="text-3xl font-semibold text-white md:text-4xl">{template.name}</h1>
            <p className="max-w-3xl text-base text-slate-300">{template.summary}</p>
          </div>
          <div className="grid gap-3 text-sm text-slate-300">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Foco</p>
              <p>{template.tagline}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Roles recomendados</p>
              <p>{template.recommendedFor.join(" · ")}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="space-y-10">
        <div className="glass-panel overflow-hidden border-white/5 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-10">
          <TemplatePreview template={template} />
        </div>

        <section className="glass-panel border-white/5 p-10">
          <h2 className="text-lg font-semibold text-white">Fortalezas destacadas</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {template.strengths.map((strength) => (
              <div key={strength} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-slate-300">
                {strength}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
