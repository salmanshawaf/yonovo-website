export default function Footer() {
  return (
    <footer className="border-t border-surface py-8">
      <div className="mx-auto max-w-(--container-max-width) px-6">
        <p className="text-muted text-sm">&copy; {new Date().getFullYear()} Yonovo</p>
      </div>
    </footer>
  );
}
