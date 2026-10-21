/**
 * Open roles shown on /careers and /careers/[slug].
 *
 * Copy rules: no hyphens or dashes, casual founder voice, American English.
 * To close a role, remove it from `jobs` (the page and sitemap entry go with it).
 */

export type JobItem = { lead?: string; text: string };

export type JobBlock =
  | { type: "paragraph"; text: string }
  | { type: "bullets"; items: JobItem[] }
  | { type: "numbered"; items: JobItem[] }
  | { type: "table"; head: [string, string]; rows: [string, string][] };

export type JobSection = { heading: string; blocks: JobBlock[] };

export type Job = {
  slug: string;
  title: string;
  shortTitle: string;
  team: string;
  location: string;
  employmentType: string;
  /** ISO date the role went live, used for Google Jobs structured data. */
  datePosted: string;
  /** ISO date after which Google should stop showing the listing. */
  validThrough: string;
  summary: string;
  hook: string;
  salary: { currency: string; min: number; max: number; base: string; ote: string };
  applyEmail: string;
  applySubject: string;
  sections: JobSection[];
  closer: string;
};

export const jobs: Job[] = [
  {
    slug: "founding-sdr",
    title: "Founding Sales Development Representative (SDR)",
    shortTitle: "Founding SDR",
    team: "Sales",
    location: "Remote, Toronto",
    employmentType: "Full time",
    datePosted: "2026-10-20",
    validThrough: "2027-01-31",
    summary:
      "Our first sales hire. A cold calling role booking qualified meetings with finance leaders for the founders.",
    hook: "We need someone who loves the phone, not someone who tolerates it. If 150 dials a day sounds like a good time, keep reading.",
    salary: { currency: "CAD", min: 60000, max: 75000, base: "$60K to $75K CAD", ote: "$95K to $115K CAD" },
    applyEmail: "salman@yonovo.com",
    applySubject: "Founding SDR application",
    sections: [
      {
        heading: "About Yonovo",
        blocks: [
          {
            type: "paragraph",
            text: "Yonovo is AI native accounts receivable for midmarket B2B companies. We follow up on every unpaid invoice so finance teams stop chasing and start reviewing.",
          },
          {
            type: "paragraph",
            text: "Most B2B companies are owed a lot of money and chase it with spreadsheets, aging reports and reminder emails written by hand. Our cofounder grew up watching this firsthand. From the age of five, he heard his dad on the phone, chasing invoices by hand for his wholesale business. Twenty years later, the calls sound exactly the same. Yonovo exists to remove that manual work so finance teams can focus on higher value work.",
          },
          {
            type: "paragraph",
            text: "Yonovo is cofounded by Alex Popa, who cofounded Boast.ai, one of North America's leading R&D tax credit platforms. Alex bootstrapped Boast to eight figures in revenue and over 1,000 customers before raising outside capital. We're building Yonovo the same way: bootstrapped and funded by our clients.",
          },
        ],
      },
      {
        heading: "The role",
        blocks: [
          {
            type: "paragraph",
            text: "This is our first sales hire. You'll own the top of the funnel and work directly with Yonovo's cofounders, who run every demo and close every deal. Your job ends at a qualified meeting on their calendar, and that's where all your energy goes.",
          },
          {
            type: "paragraph",
            text: "You'll talk to CFOs, Controllers and Heads of Finance at midmarket B2B companies who are quietly losing time and cash to a broken AR process. Your job is to make that pain feel real and get them to take 20 minutes to see a better way.",
          },
          {
            type: "paragraph",
            text: "There's an outbound motion already running, but it's early. What you learn about who picks up, what lands and what gets ignored becomes how Yonovo sells.",
          },
        ],
      },
      {
        heading: "What you'll do",
        blocks: [
          {
            type: "bullets",
            items: [
              { text: "Book qualified meetings for the founders, mostly by cold calling. Meetings held is the number that matters." },
              { text: "Build your own lists and work through them on the phone. Keep Attio clean, with every conversation logged and every lead given a next step." },
              { text: "Use AI at every step: building lists, finding numbers and testing new talk tracks faster than a traditional SDR can." },
              { text: "Bring the field back inside. Share the objections and buying signals you hear so we can sharpen messaging together." },
            ],
          },
        ],
      },
      {
        heading: "What the job looks like",
        blocks: [
          { type: "paragraph", text: "This is primarily a cold calling role." },
          {
            type: "table",
            head: ["Expectation", "Target"],
            rows: [
              ["Cold calls", "150+ dials a day"],
              ["Email and LinkedIn", "Light follow up to support your calls"],
            ],
          },
        ],
      },
      {
        heading: "What counts as a qualified meeting",
        blocks: [
          { type: "paragraph", text: "A meeting counts when all four are true:" },
          {
            type: "numbered",
            items: [
              { lead: "The right person.", text: "A CFO, Controller, Head of Finance or AR lead." },
              { lead: "The right company.", text: "50 to 250 employees, based in the US or Canada." },
              { lead: "A real AR motion.", text: "They invoice other businesses on payment terms, not card at checkout." },
              { lead: "It actually happens.", text: "The meeting is held, not just booked. No shows don't count." },
            ],
          },
        ],
      },
      {
        heading: "Who you are",
        blocks: [
          {
            type: "paragraph",
            text: "We care more about drive and raw ability than a perfect resume. SDR experience is a plus, not a requirement.",
          },
          {
            type: "bullets",
            items: [
              { lead: "You pick up the phone.", text: "A no doesn't ruin your day. It's just the dial before the yes." },
              { lead: "You're an owner.", text: "You don't wait to be told which accounts to work. You build your own lists and run your own plays." },
              { lead: "You're tenacious.", text: "You follow up, stay in the game and don't take a quiet inbox personally." },
              { lead: "You're AI native.", text: "If your first instinct is “can software do this for me,” you'll fit right in." },
              { lead: "You're curious about finance.", text: "You want to understand how a CFO thinks, not just read a script." },
              { lead: "You can run yourself remotely.", text: "You work Eastern Time business hours and stay disciplined without anyone watching." },
            ],
          },
          { type: "paragraph", text: "Bonus points for exposure to B2B SaaS, fintech or finance buyers." },
        ],
      },
      {
        heading: "Compensation and what we offer",
        blocks: [
          {
            type: "bullets",
            items: [
              { lead: "Pay:", text: "$60K to $75K CAD base plus uncapped commission, for on target earnings of roughly $95K to $115K CAD. Final offer depends on experience." },
              { lead: "Equity:", text: "You're our first sales hire and you'll own a real piece of the upside." },
              { lead: "Remote:", text: "Fully remote, with a strong preference for candidates based in Toronto." },
              { lead: "Direct access:", text: "You'll work side by side with the founders every day and learn how a company gets built from the inside." },
              { lead: "A real voice:", text: "What you hear on the phones shapes our messaging, our ICP and even the product." },
            ],
          },
        ],
      },
    ],
    closer: "If you'd rather be booking meetings than reading job posts, hit apply.",
  },
];

export function getJob(slug: string): Job | undefined {
  return jobs.find((job) => job.slug === slug);
}

export function applyHref(job: Job): string {
  return `mailto:${job.applyEmail}?subject=${encodeURIComponent(job.applySubject)}`;
}
