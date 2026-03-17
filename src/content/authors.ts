export type Author = {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  linkedin?: string;
  twitter?: string;
  company: string;
};

export const authors: Record<string, Author> = {
  salman: {
    id: "salman",
    name: "Salman Shawaf",
    role: "Co-founder",
    bio: "Co-founder of Yonovo, where he helps SMBs get paid faster through AI-powered accounts receivable automation. Salman has spent his career working closely with finance teams at small and mid-size businesses, seeing firsthand how manual collections processes drain hours, damage cash flow, and strain the customer relationships that drive repeat revenue. He co-founded Yonovo with Alex Popa to solve that problem. On the blog, Salman writes about AR strategy, DSO reduction, and practical approaches to collections automation that deliver results without adding complexity.",
    avatar: "/images/authors/salman.jpg",
    linkedin: "https://www.linkedin.com/in/salmanshawaf",
    company: "Yonovo",
  },
  alex: {
    id: "alex",
    name: "Alex Popa",
    role: "Co-founder & CEO",
    bio: "Co-founder and CEO of Yonovo. Alex previously co-founded Boast.ai, where he helped companies recover R&D tax credits at scale, bootstrapping the company from a spare bedroom to over $123M USD in funding with a Series A led by Radian Capital. He also co-founded Traction Conference, bringing actionable growth advice to founders across North America. With a background in software engineering (Lakehead University) and accounting (UBC), Alex brings a rare blend of technical depth and financial discipline to building products that solve real problems for finance teams. On the blog, he writes about scaling operations, building for efficiency, and the intersection of finance and technology.",
    avatar: "/images/authors/alex.jpg",
    linkedin: "https://ca.linkedin.com/in/alexpopacanada",
    company: "Yonovo",
  },
};
