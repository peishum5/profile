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
          <div>
            {posts.map((p, i) => (
              <Reveal key={p.url} delay={i * 0.03}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid gap-1 border-t border-line py-6 md:grid-cols-[8rem_1fr] md:gap-8"
                >
                  <div className="text-sm text-ink-faint md:pt-1">{p.date}</div>
                  <div>
                    <h3 className="font-serif text-lg text-ink transition-colors group-hover:text-accent md:text-xl">
                      {p.title}
                      <span className="ml-2 text-accent">↗</span>
                    </h3>
                    {p.excerpt && (
                      <p className="jp-wrap mt-1 text-sm leading-relaxed text-ink-soft">
                        {p.excerpt}…
                      </p>
                    )}
                  </div>
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
