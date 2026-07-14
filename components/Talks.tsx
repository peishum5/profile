import Section from "@/components/Section";
import Entry from "@/components/Entry";
import { site, type Lang } from "@/content/site";

export default function Talks({ lang }: { lang: Lang }) {
  return (
    <Section
      id="talks"
      index="06"
      eyebrow="Talks & Features"
      heading={site.talks.heading[lang]}
      lead={site.talks.lead[lang]}
    >
      <div>
        {site.talks.items.map((item, i) => (
          <Entry
            key={i}
            delay={i * 0.05}
            label={item.year}
            title={item.title[lang]}
            href={item.link}
            meta={`${item.venue[lang]} ・ ${item.role[lang]}`}
          />
        ))}
      </div>
    </Section>
  );
}
