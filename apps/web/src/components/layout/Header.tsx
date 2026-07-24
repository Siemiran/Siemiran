import Logo from "../Logo";

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="container flex h-20 items-center justify-between">

        <Logo />

        <nav className="hidden gap-8 lg:flex">
          <a href="#">خانه</a>
          <a href="#">محصولات</a>
          <a href="#">وبلاگ</a>
          <a href="#">درباره ما</a>
          <a href="#">تماس با ما</a>
        </nav>

        <button className="rounded-lg bg-blue-700 px-5 py-2 text-white transition hover:bg-blue-800">
          تماس با ما
        </button>

      </div>
    </header>
  );
}