type Faq = {
  question: string;
  answer: string;
};

export default function FaqSection({ faqs }: { faqs: Faq[] }) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="mt-12 border-t border-border pt-10">
      <h2 id="frequently-asked-questions" className="scroll-mt-20 text-2xl font-semibold text-foreground mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div key={i}>
            <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
            <p className="text-secondary leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
