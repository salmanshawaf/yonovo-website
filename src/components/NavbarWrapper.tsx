import Navbar from "./Navbar";
import { getAllEntries } from "@/lib/changelog";

export default function NavbarWrapper({
  defaultMode = "dark",
}: {
  defaultMode?: "dark" | "light";
}) {
  const entries = getAllEntries();
  const latest = entries[0];

  const latestChangelog = latest
    ? {
        title: latest.frontmatter.title,
        description: latest.frontmatter.description,
        heroImage: latest.frontmatter.heroImage,
        slug: latest.frontmatter.slug,
      }
    : undefined;

  return <Navbar defaultMode={defaultMode} latestChangelog={latestChangelog} />;
}
