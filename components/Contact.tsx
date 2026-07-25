import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { site, type Lang } from "@/content/site";
import { eyebrow } from "@/lib/ui";

/** The page's closing CTA: the email address itself, set large. */
export default function Contact({ lang }: { lang: Lang }) {
  return (
    <Section
      id="contact"
      index="06"
      eyebrow="Contact"
      heading={site.contact.heading[lang]}
      lead={site.contact.lead[lang]}
      lang={lang}
    >
      <Reveal>
        <a
          href={`mailto:${site.contact.email}`}
          className="cta-link display break-words text-[clamp(1.3rem,3.5vw,2.4rem)] text-ink transition-colors hover:text-accent focus-visible:text-accent"
        >
          {site.contact.email}
          <span className="ml-2 text-accent">↗</span>
        </a>
      </Reveal>

      <Reveal>
        <div className="mt-12 border-t border-line pt-5 text-right">
          <a
            href="#top"
            className={eyebrow(lang, "transition-colors hover:text-accent")}
          >
            {site.ui.backToTop[lang]}
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
