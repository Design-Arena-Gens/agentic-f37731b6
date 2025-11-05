import type { TemplateDefinition } from "@/lib/templates";
import { sampleProfile, type SampleProfile } from "@/lib/sample-profile";
import { clsx } from "clsx";
import type { ReactNode } from "react";

type TemplatePreviewProps = {
  template: TemplateDefinition;
  density?: "full" | "compact";
};

export function TemplatePreview({ template, density = "full" }: TemplatePreviewProps) {
  const profile = sampleProfile;

  switch (template.layout) {
    case "aurora":
      return <AuroraLayout template={template} profile={profile} density={density} />;
    case "zenith":
      return <ZenithLayout template={template} profile={profile} density={density} />;
    case "atlas":
      return <AtlasLayout template={template} profile={profile} density={density} />;
    case "pulse":
      return <PulseLayout template={template} profile={profile} density={density} />;
    case "prism":
      return <PrismLayout template={template} profile={profile} density={density} />;
    case "halo":
      return <HaloLayout template={template} profile={profile} density={density} />;
    case "orbit":
      return <OrbitLayout template={template} profile={profile} density={density} />;
    case "mosaic":
      return <MosaicLayout template={template} profile={profile} density={density} />;
    default:
      return null;
  }
}

type LayoutProps = {
  template: TemplateDefinition;
  profile: SampleProfile;
  density: "full" | "compact";
};

function SectionHeading({
  children,
  accent,
  dark
}: {
  children: ReactNode;
  accent: string;
  dark?: boolean;
}) {
  return (
    <h3
      className={clsx("text-xs font-semibold uppercase tracking-[0.24em]", dark ? "text-white/70" : "text-slate-500")}
      style={{ letterSpacing: "0.28em" }}
    >
      <span
        className="mr-2 inline-block h-[6px] w-[6px] rounded-full align-middle"
        style={{ background: accent }}
      />
      {children}
    </h3>
  );
}

function RenderExperience({
  profile,
  accent,
  textClass
}: {
  profile: SampleProfile;
  accent: string;
  textClass?: string;
}) {
  return (
    <div className="space-y-6">
      {profile.experience.map((item) => (
        <div key={item.company} className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-medium uppercase tracking-[0.08em] text-slate-400">
            <span>{item.company}</span>
            <span>{item.period}</span>
          </div>
          <h4 className={clsx("text-base font-semibold", textClass)}>{item.role}</h4>
          <ul className="space-y-1.5 text-sm text-slate-500">
            {item.achievements.map((achievement) => (
              <li key={achievement} className="flex gap-2">
                <span className="mt-2 h-[6px] w-[6px] flex-shrink-0 rounded-full" style={{ background: accent }} />
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function RenderEducation({
  profile,
  variant = "light"
}: {
  profile: SampleProfile;
  variant?: "light" | "dark";
}) {
  return (
    <div
      className={clsx(
        "space-y-4 text-sm",
        variant === "dark" ? "text-white/70" : "text-slate-500"
      )}
    >
      {profile.education.map((item) => (
        <div key={item.institution} className="space-y-1.5">
          <p
            className={clsx(
              "text-sm font-semibold",
              variant === "dark" ? "text-white" : "text-slate-900"
            )}
          >
            {item.institution}
          </p>
          <p>{item.degree}</p>
          <p
            className={clsx(
              "text-xs uppercase tracking-[0.08em]",
              variant === "dark" ? "text-white/50" : "text-slate-400"
            )}
          >
            {item.period}
          </p>
        </div>
      ))}
    </div>
  );
}

function ContactList({
  items,
  accent,
  dark
}: {
  items: SampleProfile["contacts"] | SampleProfile["links"];
  accent: string;
  dark?: boolean;
}) {
  return (
    <div className="space-y-3 text-sm">
      {items.map((item) => (
        <div key={item.label} className="space-y-1">
          <p className={clsx("text-xs uppercase tracking-[0.12em]", dark ? "text-white/60" : "text-slate-400")}>
            {item.label}
          </p>
          <a
            href={item.href ?? "#"}
            className={clsx(
              "inline-flex items-center gap-2 text-sm",
              dark ? "text-white/80" : "text-slate-700"
            )}
            style={{ color: dark ? undefined : accent }}
          >
            <span>{item.value}</span>
          </a>
        </div>
      ))}
    </div>
  );
}

function AuroraLayout({ template, profile }: LayoutProps) {
  const { theme } = template;
  return (
    <div
      className="relative grid gap-0 overflow-hidden rounded-[34px] border text-slate-100 shadow-2xl ring-1 ring-white/5"
      style={{ borderColor: theme.border, background: theme.surface }}
    >
      <div
        className="relative rounded-t-[34px] px-10 pb-10 pt-12"
        style={{ background: template.theme.accentGradient }}
      >
        <div className="absolute inset-y-0 right-0 w-1/2 bg-white/5 blur-3xl" />
        <div className="relative flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/80">{template.heroAccent}</p>
            <h1 className="mt-3 text-3xl font-semibold text-white md:text-4xl">{profile.name}</h1>
            <p className="text-lg text-white/80">{profile.title}</p>
          </div>
          <div className="text-sm text-white/80">
            <p>{profile.location}</p>
            <p>{profile.contacts[0]?.value}</p>
          </div>
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-6 text-white/85">{profile.summary}</p>
      </div>

      <div className="grid gap-10 bg-slate-950/80 px-10 py-12 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8">
          <SectionHeading accent={theme.accent} dark>
            Experiencia
          </SectionHeading>
          <RenderExperience profile={profile} accent={theme.accent} textClass="text-white" />

          <SectionHeading accent={theme.accent} dark>
            Educación
          </SectionHeading>
          <RenderEducation profile={profile} variant="dark" />
        </div>

        <div className="space-y-8">
          <SectionHeading accent={theme.accent} dark>
            Contacto
          </SectionHeading>
          <ContactList items={profile.contacts} accent={theme.accent} dark />

          <SectionHeading accent={theme.accent} dark>
            Links
          </SectionHeading>
          <ContactList items={profile.links} accent={theme.accent} dark />

          <SectionHeading accent={theme.accent} dark>
            Skills
          </SectionHeading>
          <PillStack items={profile.skills} accent={theme.accent} dark />

          <SectionHeading accent={theme.accent} dark>
            Herramientas
          </SectionHeading>
          <PillStack items={profile.tools} accent={theme.accent} dark />

          <SectionHeading accent={theme.accent} dark>
            Certificaciones
          </SectionHeading>
          <ul className="space-y-2 text-sm text-white/70">
            {profile.certifications.map((cert) => (
              <li key={cert}>{cert}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ZenithLayout({ template, profile }: LayoutProps) {
  const { theme } = template;
  return (
    <div
      className="rounded-[34px] border bg-white text-slate-900 shadow-2xl"
      style={{ borderColor: "#E2E8F0" }}
    >
      <div
        className="rounded-t-[34px] border-b px-10 pb-8 pt-12"
        style={{
          background: theme.accentGradient,
          borderColor: `${theme.accent}33`
        }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/70">{template.heroAccent}</p>
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white md:text-4xl">{profile.name}</h1>
            <p className="text-lg text-white/80">{profile.title}</p>
          </div>
          <div className="space-y-2 text-sm text-white/80">
            <p>{profile.location}</p>
            <p>{profile.contacts[0]?.value}</p>
          </div>
        </div>
        <p className="mt-6 max-w-4xl text-sm leading-6 text-white/80">{profile.summary}</p>
      </div>
      <div className="grid gap-10 px-10 py-12 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-10">
          <div className="flex flex-wrap gap-4">
            {template.recommendedFor.map((role) => (
              <span
                key={role}
                className="rounded-full bg-slate-900/5 px-4 py-1 text-xs font-medium uppercase tracking-wide text-slate-500"
              >
                {role}
              </span>
            ))}
          </div>

          <div className="space-y-8">
            <SectionHeading accent={theme.accent}>
              Experiencia
            </SectionHeading>
            <RenderExperience profile={profile} accent={theme.accent} textClass="text-slate-900" />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <SectionHeading accent={theme.accent}>Educación</SectionHeading>
              <RenderEducation profile={profile} />
            </div>
            <div>
              <SectionHeading accent={theme.accent}>Certificaciones</SectionHeading>
              <ul className="space-y-2 text-sm text-slate-500">
                {profile.certifications.map((cert) => (
                  <li key={cert}>{cert}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <aside className="space-y-8 rounded-3xl border border-slate-200/60 bg-slate-50/60 p-8">
          <SectionHeading accent={theme.accent}>Contacto</SectionHeading>
          <ContactList items={profile.contacts} accent={theme.accent} />

          <SectionHeading accent={theme.accent}>Links</SectionHeading>
          <ContactList items={profile.links} accent={theme.accent} />

          <SectionHeading accent={theme.accent}>Skills</SectionHeading>
          <PillStack items={profile.skills} accent={theme.accent} />

          <SectionHeading accent={theme.accent}>Herramientas</SectionHeading>
          <PillStack items={profile.tools} accent={theme.accent} />

          <SectionHeading accent={theme.accent}>Idiomas</SectionHeading>
          <PillStack items={profile.languages} accent={theme.accent} />
        </aside>
      </div>
    </div>
  );
}

function AtlasLayout({ template, profile }: LayoutProps) {
  const { theme } = template;
  return (
    <div
      className="relative overflow-hidden rounded-[34px] border bg-slate-950 text-white shadow-2xl"
      style={{ borderColor: `${theme.border}`, background: theme.surface }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
      <div className="relative grid gap-10 px-10 py-12 md:grid-cols-[0.9fr_1.1fr]">
        <aside className="space-y-8">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">{template.heroAccent}</p>
            <h1 className="mt-4 text-3xl font-semibold text-white">{profile.name}</h1>
            <p className="text-lg text-white/70">{profile.title}</p>
            <p className="mt-6 text-sm text-white/70">{profile.summary}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <SectionHeading accent={theme.accent} dark>
              Contacto
            </SectionHeading>
            <div className="mt-4 space-y-6 text-sm text-white/70">
              <ContactList items={profile.contacts} accent={theme.accent} dark />
              <ContactList items={profile.links} accent={theme.accent} dark />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4">
            <SectionHeading accent={theme.accent} dark>
              Skills
            </SectionHeading>
            <PillStack items={profile.skills} accent={theme.accent} dark />
          </div>
        </aside>

        <main className="space-y-10">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <SectionHeading accent={theme.accent} dark>
              Experiencia
            </SectionHeading>
            <div className="mt-6">
              <RenderExperience profile={profile} accent={theme.accent} textClass="text-white" />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <SectionHeading accent={theme.accent} dark>
                Educación
              </SectionHeading>
              <div className="mt-4 space-y-4 text-sm text-white/70">
                {profile.education.map((edu) => (
                  <div key={edu.institution}>
                    <p className="text-sm font-semibold text-white">{edu.institution}</p>
                    <p className="text-sm text-white/70">{edu.degree}</p>
                    <p className="text-xs uppercase tracking-[0.1em] text-white/50">{edu.period}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <SectionHeading accent={theme.accent} dark>
                Programas y logros
              </SectionHeading>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {profile.certifications.map((cert) => (
                  <li key={cert}>{cert}</li>
                ))}
                {profile.interests.map((interest) => (
                  <li key={interest}>{interest}</li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function PulseLayout({ template, profile }: LayoutProps) {
  const { theme } = template;
  return (
    <div
      className="relative overflow-hidden rounded-[34px] border text-white shadow-2xl"
      style={{ borderColor: `${theme.border}`, background: theme.surface }}
    >
      <div className="absolute inset-0 opacity-80 mix-blend-screen" style={{ background: theme.accentGradient }} />
      <div className="relative grid gap-10 px-10 py-12 md:grid-cols-[1.1fr_0.9fr]">
        <main className="space-y-8">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl font-semibold text-white">{profile.name}</h1>
                <p className="text-lg text-white/75">{profile.title}</p>
              </div>
              <div className="text-right text-sm text-white/60">
                <p>{profile.location}</p>
                <p>{profile.contacts[0]?.value}</p>
              </div>
            </div>
            <p className="mt-6 text-sm leading-6 text-white/80">{profile.summary}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5/50 p-8 backdrop-blur">
            <SectionHeading accent={theme.accent} dark>
              Loop de impacto
            </SectionHeading>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {template.strengths.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/70"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <SectionHeading accent={theme.accent} dark>
              Experiencia
            </SectionHeading>
            <div className="mt-6">
              <RenderExperience profile={profile} accent={theme.accent} textClass="text-white" />
            </div>
          </div>
        </main>
        <aside className="space-y-8">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
            <SectionHeading accent={theme.accent} dark>
              Skills clave
            </SectionHeading>
            <PillStack items={profile.skills} accent={theme.accent} dark />
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
            <SectionHeading accent={theme.accent} dark>
              Herramientas
            </SectionHeading>
            <PillStack items={profile.tools} accent={theme.accent} dark />
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
            <SectionHeading accent={theme.accent} dark>
              Contacto
            </SectionHeading>
            <ContactList items={profile.contacts} accent={theme.accent} dark />
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
            <SectionHeading accent={theme.accent} dark>
              Links
            </SectionHeading>
            <ContactList items={profile.links} accent={theme.accent} dark />
          </div>
        </aside>
      </div>
    </div>
  );
}

function PrismLayout({ template, profile }: LayoutProps) {
  const { theme } = template;
  return (
    <div
      className="overflow-hidden rounded-[34px] border bg-white shadow-2xl"
      style={{ borderColor: theme.dark ? `${theme.accent}22` : "#E2E8F0", background: theme.surface }}
    >
      <div className="grid gap-10 px-10 py-12 md:grid-cols-[0.85fr_1.15fr]">
        <aside className="space-y-8">
          <div
            className="rounded-3xl p-8 text-white shadow-lg"
            style={{ background: theme.accentGradient }}
          >
            <p className="text-xs uppercase tracking-[0.28em] text-white/70">{template.heroAccent}</p>
            <h1 className="mt-4 text-3xl font-semibold text-white">{profile.name}</h1>
            <p className="text-lg text-white/80">{profile.title}</p>
            <p className="mt-6 text-sm leading-6 text-white/85">{profile.summary}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/70 p-6 backdrop-blur">
            <SectionHeading accent={theme.accent}>
              Skills
            </SectionHeading>
            <div className="mt-4">
              <PillStack items={profile.skills} accent={theme.accent} />
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/70 p-6 backdrop-blur">
            <SectionHeading accent={theme.accent}>
              Herramientas
            </SectionHeading>
            <PillStack items={profile.tools} accent={theme.accent} />
          </div>
        </aside>
        <main className="space-y-10">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/60 p-6">
              <SectionHeading accent={theme.accent}>Contacto</SectionHeading>
              <div className="mt-4">
                <ContactList items={profile.contacts} accent={theme.accent} />
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/60 p-6">
              <SectionHeading accent={theme.accent}>Links</SectionHeading>
              <ContactList items={profile.links} accent={theme.accent} />
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/70 p-8">
            <SectionHeading accent={theme.accent}>Experiencia</SectionHeading>
            <div className="mt-6">
              <RenderExperience profile={profile} accent={theme.accent} textClass="text-slate-900" />
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/70 p-6">
              <SectionHeading accent={theme.accent}>Educación</SectionHeading>
              <RenderEducation profile={profile} />
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/70 p-6">
              <SectionHeading accent={theme.accent}>Intereses & DEI</SectionHeading>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {profile.interests.map((interest) => (
                  <li key={interest}>{interest}</li>
                ))}
                {profile.certifications.slice(0, 1).map((cert) => (
                  <li key={cert}>{cert}</li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function HaloLayout({ template, profile }: LayoutProps) {
  const { theme } = template;
  const baseBackground = theme.background;

  return (
    <div
      className="rounded-[34px] border shadow-2xl"
      style={{ background: baseBackground, borderColor: `${theme.accent}18` }}
    >
      <div
        className="rounded-t-[34px] border-b px-10 pb-10 pt-12"
        style={{ background: theme.accentGradient, borderColor: `${theme.accent}28` }}
      >
        <h1 className="text-3xl font-semibold text-white md:text-4xl">{profile.name}</h1>
        <p className="mt-1 text-lg text-white/80">{profile.title}</p>
        <p className="mt-6 max-w-3xl text-sm leading-6 text-white/85">{profile.summary}</p>
      </div>
      <div className="grid gap-10 px-10 py-12 md:grid-cols-[0.8fr_1.2fr]">
        <aside className="space-y-8">
          <div className="rounded-3xl border border-white/60 bg-white/70 p-6 backdrop-blur">
            <SectionHeading accent={theme.accent}>Contacto</SectionHeading>
            <ContactList items={profile.contacts} accent={theme.accent} />
          </div>
          <div className="rounded-3xl border border-white/60 bg-white/70 p-6">
            <SectionHeading accent={theme.accent}>Links</SectionHeading>
            <ContactList items={profile.links} accent={theme.accent} />
          </div>
          <div className="rounded-3xl border border-white/60 bg-white/70 p-6">
            <SectionHeading accent={theme.accent}>Idiomas</SectionHeading>
            <PillStack items={profile.languages} accent={theme.accent} />
          </div>
          <div className="rounded-3xl border border-white/60 bg-white/70 p-6">
            <SectionHeading accent={theme.accent}>Intereses</SectionHeading>
            <PillStack items={profile.interests} accent={theme.accent} />
          </div>
        </aside>
        <main className="space-y-8">
          <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-sm">
            <SectionHeading accent={theme.accent}>Programas clave</SectionHeading>
            <ul className="mt-4 grid gap-3 text-sm text-slate-600">
              {template.strengths.map((item) => (
                <li key={item} className="rounded-2xl border border-slate-200/80 bg-white px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-white/60 bg-white/80 p-8">
            <SectionHeading accent={theme.accent}>Experiencia</SectionHeading>
            <RenderExperience profile={profile} accent={theme.accent} textClass="text-slate-900" />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/60 bg-white/80 p-6">
              <SectionHeading accent={theme.accent}>Educación</SectionHeading>
              <RenderEducation profile={profile} />
            </div>
            <div className="rounded-3xl border border-white/60 bg-white/80 p-6">
              <SectionHeading accent={theme.accent}>Certificaciones</SectionHeading>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {profile.certifications.map((cert) => (
                  <li key={cert}>{cert}</li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function OrbitLayout({ template, profile }: LayoutProps) {
  const { theme } = template;
  return (
    <div
      className="rounded-[34px] border bg-slate-950 text-white shadow-2xl"
      style={{ borderColor: `${theme.border}`, background: theme.surface }}
    >
      <div className="grid gap-10 px-10 py-12 md:grid-cols-[1fr_1fr]">
        <aside className="space-y-8">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h1 className="text-3xl font-semibold text-white">{profile.name}</h1>
            <p className="text-lg text-white/70">{profile.title}</p>
            <p className="mt-6 text-sm leading-6 text-white/70">{profile.summary}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <SectionHeading accent={theme.accent} dark>
              Stack y skills
            </SectionHeading>
            <div className="mt-4">
              <PillStack items={profile.skills} accent={theme.accent} dark />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <SectionHeading accent={theme.accent} dark>
              Herramientas
            </SectionHeading>
            <PillStack items={profile.tools} accent={theme.accent} dark />
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <SectionHeading accent={theme.accent} dark>
              Contacto
            </SectionHeading>
            <ContactList items={profile.contacts} accent={theme.accent} dark />
          </div>
        </aside>

        <main className="space-y-10">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <SectionHeading accent={theme.accent} dark>
              Experimentos y logros
            </SectionHeading>
            <RenderExperience profile={profile} accent={theme.accent} textClass="text-white" />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <SectionHeading accent={theme.accent} dark>
                Educación
              </SectionHeading>
              <RenderEducation profile={profile} variant="dark" />
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <SectionHeading accent={theme.accent} dark>
                Publicaciones & Certificaciones
              </SectionHeading>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {profile.certifications.map((cert) => (
                  <li key={cert}>{cert}</li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function MosaicLayout({ template, profile }: LayoutProps) {
  const { theme } = template;
  return (
    <div
      className="rounded-[34px] border text-white shadow-2xl"
      style={{ borderColor: `${theme.border}`, background: theme.surface }}
    >
      <div className="grid gap-8 px-10 py-12 md:grid-cols-[1fr_1fr]">
        <aside className="space-y-8">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur">
            <h1 className="text-3xl font-semibold text-white">{profile.name}</h1>
            <p className="text-lg text-white/75">{profile.title}</p>
            <p className="mt-6 text-sm leading-6 text-white/80">{profile.summary}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
            <SectionHeading accent={theme.accent} dark>
              Contacto
            </SectionHeading>
            <ContactList items={profile.contacts} accent={theme.accent} dark />
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
            <SectionHeading accent={theme.accent} dark>
              Links
            </SectionHeading>
            <ContactList items={profile.links} accent={theme.accent} dark />
          </div>
        </aside>
        <main className="space-y-8">
          <div className="grid gap-4 md:grid-cols-3">
            {template.strengths.map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-white/10 bg-white/10 p-4 text-xs text-white/70"
              >
                {item}
              </div>
            ))}
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/10 p-8">
            <SectionHeading accent={theme.accent} dark>
              Experiencia
            </SectionHeading>
            <RenderExperience profile={profile} accent={theme.accent} textClass="text-white" />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
              <SectionHeading accent={theme.accent} dark>
                Skills
              </SectionHeading>
              <PillStack items={profile.skills} accent={theme.accent} dark />
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
              <SectionHeading accent={theme.accent} dark>
                Herramientas
              </SectionHeading>
              <PillStack items={profile.tools} accent={theme.accent} dark />
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
            <SectionHeading accent={theme.accent} dark>
              Educación
            </SectionHeading>
            <RenderEducation profile={profile} variant="dark" />
          </div>
        </main>
      </div>
    </div>
  );
}

function PillStack({
  items,
  accent,
  dark
}: {
  items: string[];
  accent: string;
  dark?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className={clsx(
            "rounded-full border px-3 py-1 text-xs font-medium",
            dark ? "border-white/20 text-white/80" : "border-slate-200 text-slate-700"
          )}
          style={{
            background: dark ? "rgba(255,255,255,0.04)" : "rgba(148, 163, 184, 0.08)",
            borderColor: dark ? "rgba(255,255,255,0.12)" : `${accent}33`
          }}
        >
          {item}
        </span>
      ))}
    </div>
  );
}
