import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { site, type Lang } from "@/content/site";
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
          <a
            href={site.blog.url}
            target="_blank"
            rel="noopener noreferrer"
            className="border-t border-line pt-6 text-sm text-ink-soft underline decoration-line underline-offset-4 transition-colors hover:text-accent"
          >
            {lang === "ja" ? "note で記事を読む" : "Read on note"} ↗
          </a>
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
                  className="group flex items-baseline gap-5 border-t border-line py-4 md:gap-8"
                >
                  <span className="w-20 shrink-0 text-xs tracking-wide text-ink-faint tabular-nums md:w-24">
                    {p.date}
                  </span>
                  <h3 className="jp-wrap min-w-0 flex-1 font-serif text-base text-ink transition-colors group-hover:text-accent md:text-lg">
                    {p.title}
                  </h3>
                  <span className="text-accent">↗</span>
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
                className="eyebrow transition-colors hover:text-accent"
              >
                {lang === "ja" ? "note で全記事を見る ↗" : "All posts on note ↗"}
              </a>
            </p>
          </Reveal>
        </>
      )}
    </Section>
  );
}
