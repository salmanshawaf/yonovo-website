import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        <div className="mx-auto max-w-[1280px] px-6 py-20">
          <h1 className="text-4xl font-bold text-primary">Welcome to Yonovo</h1>
          <p className="mt-4 text-secondary text-lg">Sections coming soon.</p>
        </div>
      </main>
    </>
  );
}
