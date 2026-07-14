import Section from "@/components/Section";
import Entry from "@/components/Entry";
import { site, type Lang } from "@/content/site";

export default function Works({ lang }: { lang: Lang }) {
  return (
    <Section
      id="works"
      index="05"
      eyebrow="Works"
      heading={site.works.heading[lang]}
      lead={site.works.lead[lang]}
    >
      <div>
        {site.works.items.map((item, i) => (
          <Entry
            key={i}
            delay={i * 0.05}
            label={item.year}
            title={item.title[lang]}
            href={item.link}
            meta={item.category[lang]}
            body={item.summary[lang]}
          />
        ))}
      </div>
    </Section>
  );
}
