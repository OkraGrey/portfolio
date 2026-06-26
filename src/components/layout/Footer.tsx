import { Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { site } from "@/lib/site";

const LINKS = [
  { icon: Mail, label: "Email", href: `mailto:${site.links.email}`, external: false },
  { icon: LinkedinIcon, label: "LinkedIn", href: site.links.linkedin, external: true },
  { icon: GithubIcon, label: "GitHub", href: site.links.github, external: true },
] as const;

/** Global footer: contact channels, location, and copyright. */
export function Footer() {
  return (
    <footer className="relative z-[2] border-t border-line px-[clamp(20px,6vw,90px)] py-10">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {LINKS.map(({ icon: Icon, label, href, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex items-center gap-2 font-mono text-[12px] text-subtle transition-colors hover:text-foreground"
            >
              <Icon aria-hidden="true" className="h-4 w-4" />
              {label}
            </a>
          ))}
          <span className="inline-flex items-center gap-2 font-mono text-[12px] text-subtle">
            <MapPin aria-hidden="true" className="h-4 w-4" />
            {site.links.location}
          </span>
        </div>
        <div className="font-mono text-[12px] text-fainter">
          © {site.year} {site.name} · Built with Next.js
        </div>
      </div>
    </footer>
  );
}
