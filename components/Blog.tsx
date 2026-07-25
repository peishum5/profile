import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { site, type Lang } from "@/content/site";
import { eyebrow } from "@/lib/ui";
import { getNotePosts } from "@/lib/note";

export default async function Blog({ lang }: { lang: Lang }) {
  const posts = await getNotePosts(8);

  return (
    <Section
      id="blog"
      index="05"
      eyebrow="Writing"
      heading={site.blog.heading[lang]}
      lang={lang}
    >
      {posts.length === 0 ? (
        <Reveal>
          {/* the rule needs a block to sit on — an inline <a> would only draw
              it across the text */}
          <div className="border-t border-line pt-6">
            <a
              href={site.blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-ink-soft underline decoration-line underline-offset-4 transition-colors hover:text-accent"
            >
              {site.ui.readOnNote[lang]} ↗
            </a>
          </div>
        </Reveal>
      ) : (
        <>
          {/* index-of-writing: one baseline per post, no excerpts */}
          <div>
            {posts.map((p, i) => (
              <Reveal key={p.url} delay={i * 0.03}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline gap-5 border-t border-line py-3 md:gap-8"
                >
                  <span className="w-20 shrink-0 text-xs tracking-wide text-ink-faint tabular-nums md:w-24">
                    {p.date}
                  </span>
                  <h3 className="jp-wrap min-w-0 flex-1 font-serif text-base text-ink transition-colors group-hover:text-accent md:text-lg">
                    {p.title}
                    <span className="text-accent">{"\u00A0↗"}</span>
                  </h3>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-8 text-right">
              <a
                href={site.blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className={eyebrow(lang, "transition-colors hover:text-accent")}
              >
                {site.ui.allPostsOnNote[lang]} ↗
              </a>
            </p>
          </Reveal>
        </>
      )}
    </Section>
  );
}
