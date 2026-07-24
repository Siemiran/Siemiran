import Logo from "../Logo";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

        <a href="/" className="transition hover:opacity-90">
  <Logo />
</a>

        <nav className="hidden items-center gap-8 lg:flex">
  <a className="text-sm font-medium transition hover:text-cyan-600" href="#">
    محصولات
  </a>

  <a className="text-sm font-medium transition hover:text-cyan-600" href="#">
    برندها
  </a>

  <a className="text-sm font-medium transition hover:text-cyan-600" href="#">
    استعلام قیمت
  </a>

  <a className="text-sm font-medium transition hover:text-cyan-600" href="#">
    درباره ما
  </a>

  <a className="text-sm font-medium transition hover:text-cyan-600" href="#">
    تماس
  </a>
</nav>

        <div className="flex items-center gap-3">

  <button
    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 transition hover:border-cyan-500 hover:text-cyan-600"
    aria-label="Search"
  >
    <svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-5 w-5"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  strokeWidth={2}
>
  <circle cx="11" cy="11" r="7" />
  <path d="m20 20-3.5-3.5" />
</svg>
  </button>

  <button
    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 transition hover:border-cyan-500 hover:text-cyan-600"
    aria-label="Cart"
  >
    <svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-5 w-5"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  strokeWidth={2}
>
  <path d="M3 4h2l2.2 10h9.8l2-7H8" />
  <circle cx="10" cy="20" r="1" />
  <circle cx="18" cy="20" r="1" />
</svg>
  </button>

</div>

      </div>
    </header>
  );
}