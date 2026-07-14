import Section from "@/components/Section";
import Entry from "@/components/Entry";
import { site, type Lang } from "@/content/site";

export default function Capabilities({ lang }: { lang: Lang }) {
  return (
    <Section
      id="capabilities"
      index="02"
      eyebrow="Capabilities"
      heading={site.capabilities.heading[lang]}
      lead={site.capabilities.lead[lang]}
    >
      <div>
        {site.capabilities.items.map((item, i) => (
          <Entry
            key={i}
            delay={i * 0.05}
            label={String(i + 1).padStart(2, "0")}
            title={item.title[lang]}
            body={item.summary[lang]}
          />
        ))}
      </div>
    </Section>
  );
}
