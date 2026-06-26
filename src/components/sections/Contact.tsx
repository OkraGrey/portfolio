import { Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/contact/ContactForm";
import { site } from "@/lib/site";

/** Contact channels rendered below the form. Internal = mailto, others external. */
const CONTACT_LINKS = [
  {
    icon: Mail,
    label: site.links.email,
    href: `mailto:${site.links.email}`,
    external: false,
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    href: site.links.linkedin,
    external: true,
  },
  {
    icon: GithubIcon,
    label: site.links.githubLabel,
    href: site.links.github,
    external: true,
  },
  {
    icon: MapPin,
    label: site.links.location,
    href: null,
    external: false,
  },
] as const;

/**
 * Contact — closing call to action: headline + subtext, the contact form, and
 * a row of direct channels (email, LinkedIn, GitHub, location).
 */
export function Contact() {
  return (
    <Section id="contact">
      <div className="mx-auto max-w-[680px]">
        <Reveal
          as="h2"
          className="font-sans text-[clamp(28px,5vw,52px)] font-semibold leading-[1.05] text-foreground"
        >
          {site.contact.headline}
        </Reveal>
        <Reveal
          as="p"
          delay={0.08}
          className="mt-4 text-[clamp(15px,1.6vw,18px)] leading-[1.6] text-muted"
        >
          {site.contact.subtext}
        </Reveal>

        <Reveal delay={0.16} className="mt-[clamp(28px,5vw,48px)]">
          <ContactForm />
        </Reveal>

        <Reveal
          delay={0.24}
          className="mt-[clamp(28px,5vw,48px)] flex flex-wrap gap-x-8 gap-y-4 border-t border-line pt-6"
        >
          {CONTACT_LINKS.map(({ icon: Icon, label, href, external }) => {
            const content = (
              <>
                <Icon aria-hidden className="h-4 w-4 text-primary-bright" />
                <span>{label}</span>
              </>
            );
            const className =
              "inline-flex items-center gap-2 text-[14px] text-muted transition-colors hover:text-foreground";
            if (!href) {
              return (
                <span key={label} className={className}>
                  {content}
                </span>
              );
            }
            return (
              <a
                key={label}
                href={href}
                className={className}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {content}
              </a>
            );
          })}
        </Reveal>
      </div>
    </Section>
  );
}
