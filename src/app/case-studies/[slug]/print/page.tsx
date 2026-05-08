import { notFound } from "next/navigation";
import Image from "next/image";
import { caseStudies, type CaseStudyData, type CaseStudyBlock } from "@/data/caseStudies";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-static";

export async function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const data = caseStudies[slug];
  if (!data) return {};
  return { title: data.meta.title, robots: { index: false, follow: false } };
}

const PRINT_CSS = `
  @page { size: Letter; margin: 0.6in 0.5in; }
  html, body { background: #ffffff !important; }
  .print-quote { -webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact; }
  /* hide anything outside the print container if mistakenly rendered */
  body > *:not(#print-root) { display: none !important; }
`;

function PrintQuote({ text, author, role }: { text: string; author: string; role: string }) {
  return (
    <blockquote
      className="rounded-2xl p-8 my-2 print-quote"
      style={{
        background: "linear-gradient(135deg, #0c2756 0%, #203a7f 50%, #e13f3f 100%)",
      }}
    >
      <p className="font-semibold text-white text-base leading-relaxed">
        &ldquo;{text}&rdquo;
      </p>
      <footer className="mt-4 text-sm font-medium text-white/80">
        {author}, {role}
      </footer>
    </blockquote>
  );
}

function renderBlock(block: CaseStudyBlock, i: number) {
  if (block.type === "quote") {
    return <PrintQuote key={i} text={block.text} author={block.author} role={block.role} />;
  }
  return (
    <p key={i} className="text-base text-secondary leading-relaxed">
      {block.text}
    </p>
  );
}

export default async function CaseStudyPrintPage({ params }: Props) {
  const { slug } = await params;
  const data: CaseStudyData | undefined = caseStudies[slug];
  if (!data) notFound();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PRINT_CSS }} />
      <div id="print-root" className="bg-white text-foreground">
        <main className="mx-auto max-w-3xl px-8 py-10">
          {/* Header: brand + URL */}
          <div className="flex items-center justify-between border-b border-border pb-4 mb-8">
            <Image src="/yonovo-logo.png" alt="Yonovo" width={120} height={28} className="h-7 w-auto" />
            <span className="text-xs text-secondary">yonovo.com/case-studies/{data.slug}</span>
          </div>

          {/* Title block */}
          <div className="flex flex-col gap-4 mb-8">
            <p className="text-xs font-semibold tracking-widest text-secondary uppercase">
              Case Study &bull; {data.card.industry}
            </p>
            <h1 className="font-medium text-[32px] text-foreground leading-[1.15] tracking-tight">
              {data.card.title}
            </h1>
            <p className="text-base text-secondary leading-relaxed">
              {data.card.summary}
            </p>
            <p className="text-xs text-secondary">
              {data.hero.date} &bull; {data.hero.readTime}
            </p>
          </div>

          {/* Logo + profile (compact, side-by-side) */}
          <div className="flex items-stretch gap-6 mb-8">
            <div className="flex items-center justify-center rounded-xl border border-border bg-white w-[180px] h-[120px] shrink-0">
              <Image
                src={data.card.logo.src}
                alt={data.card.companyName}
                width={data.card.logo.width}
                height={data.card.logo.height}
                className="max-w-[140px] max-h-[80px] w-auto h-auto object-contain"
              />
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 flex-1 text-sm">
              <div>
                <p className="text-xs font-semibold text-secondary">Industry</p>
                <p className="text-foreground">{data.profile.industry}</p>
              </div>
              {data.profile.employees && (
                <div>
                  <p className="text-xs font-semibold text-secondary">Company size</p>
                  <p className="text-foreground">{data.profile.employees}</p>
                </div>
              )}
              <div>
                <p className="text-xs font-semibold text-secondary">Offices</p>
                <p className="text-foreground">{data.profile.offices}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-secondary">Integration</p>
                <p className="text-foreground">{data.profile.integration}</p>
              </div>
              {data.profile.about && (
                <div className="col-span-2">
                  <p className="text-xs font-semibold text-secondary">About</p>
                  <p className="text-secondary leading-snug">{data.profile.about}</p>
                </div>
              )}
            </div>
          </div>

          {/* Results stats */}
          <div className="rounded-2xl bg-surface p-6 mb-10 grid grid-cols-3 divide-x divide-border">
            {data.hero.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1 px-4 first:pl-0 last:pr-0">
                <span className="font-medium text-3xl text-foreground tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs text-secondary leading-snug">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Sections */}
          <article className="flex flex-col gap-8">
            {data.sections.map((section) => (
              <section key={section.id}>
                <h2 className="font-medium text-[22px] text-foreground leading-tight tracking-tight mb-4">
                  {section.heading}
                </h2>
                <div className="flex flex-col gap-4">
                  {section.content.map(renderBlock)}
                </div>
              </section>
            ))}
          </article>

          {/* Footer */}
          <div className="mt-12 pt-6 border-t border-border flex items-center justify-between text-xs text-secondary">
            <span>&copy; Yonovo</span>
            <span>Read the full case study at yonovo.com/case-studies/{data.slug}</span>
          </div>
        </main>
      </div>
    </>
  );
}
