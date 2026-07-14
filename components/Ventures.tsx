import Section from "@/components/Section";
import Entry from "@/components/Entry";
import { site, type Lang } from "@/content/site";

export default function Ventures({ lang }: { lang: Lang }) {
  return (
    <Section
      id="ventures"
      index="03"
      eyebrow="Ventures"
      heading={site.ventures.heading[lang]}
      lead={site.ventures.lead[lang]}
    >
      <div>
        {site.ventures.items.map((item, i) => (
          <Entry
            key={i}
            delay={i * 0.05}
            label={item.tag[lang]}
            title={item.title[lang]}
            href={item.link}
            body={item.summary[lang]}
          />
        ))}
      </div>
    </Section>
  );
}
