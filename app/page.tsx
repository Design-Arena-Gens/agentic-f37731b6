import Link from "next/link";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { TemplateGallery } from "@/components/template-gallery";
import { templates } from "@/lib/templates";

export default function Home() {
  return (
    <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-24 pt-16 md:px-12 lg:px-16">
      <div className="absolute inset-0 -z-10 mx-auto hidden h-[72rem] max-w-5xl blur-3xl md:block">
        <div className="grid-background absolute inset-0 rounded-full opacity-40" />
      </div>
      <header className="space-y-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.3em] text-slate-300/90">
          CV Launchpad 2025
        </div>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-4xl font-semibold text-white md:text-5xl lg:text-6xl">
              40 plantillas de CV 2025 listas para <span className="text-transparent bg-gradient-to-br from-indigo-300 via-sky-300 to-emerald-200 bg-clip-text">impacto inmediato</span>
            </h1>
            <p className="text-base text-slate-300">
              Diseñadas para roles senior, liderazgo y disciplinas emergentes. Cada plantilla equilibra diseño editorial,
              lectura ATS y narrativa de impacto. Descarga, personaliza y lleva tu historia profesional al siguiente nivel.
            </p>
          </div>
          <Link
            href="https://vercel.com/templates?framework=nextjs"
            className="group flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/10"
          >
            Inspiración extra
            <ArrowTopRightOnSquareIcon className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="glass-panel relative overflow-hidden px-6 py-6 sm:px-10 sm:py-8">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-cyan-500/10 to-transparent" />
          <div className="relative grid gap-6 text-sm text-slate-300 sm:grid-cols-2 lg:grid-cols-4">
            <Insight
              title="Currículums listos"
              value="40"
              description="Curados para tecnología, diseño, producto, data, marketing y talento."
            />
            <Insight
              title="Compatible ATS"
              value="100%"
              description="Capas limpias y jerarquía semántica optimizadas para robots y humanos."
            />
            <Insight
              title="Secciones modulables"
              value="120+"
              description="Componentes para métricas, logros, frameworks, case studies y playbooks."
            />
            <Insight
              title="Actualizado 2025"
              value="Feb"
              description="Tendencias visuales, tonos y estructuras alineadas a procesos modernos."
            />
          </div>
        </div>
      </header>

      <TemplateGallery templates={templates} />
    </main>
  );
}

type InsightProps = {
  title: string;
  value: string;
  description: string;
};

function Insight({ title, value, description }: InsightProps) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/5 p-5">
      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{title}</p>
      <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
      <p className="mt-3 text-xs text-slate-400">{description}</p>
    </div>
  );
}
