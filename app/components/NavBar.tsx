"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./CartProvider";

export default function NavBar() {
  const pathname = usePathname();
  const { count } = useCart();

  const linkClass = (href: string) =>
    pathname === href ? "navLink navLinkActive" : "navLink";

  return (
    <header className="nav">
      <div className="navInner">
        <Link className="brand" href="/">
          Sugar <span className="brandAmp">&amp;</span> Bites
        </Link>

        <nav className="navLinks" aria-label="Primary">
          <Link className={linkClass("/")} href="/">Home</Link>
          <Link className={linkClass("/menu")} href="/menu">Menu</Link>
          <Link className={linkClass("/sugar")} href="/sugar">Sugar</Link>
          <Link className={linkClass("/bites")} href="/bites">Bites</Link>
          <Link className={linkClass("/about")} href="/about">About</Link>
          <Link className={linkClass("/contact")} href="/contact">Contact</Link>
          <Link className={linkClass("/cart")} href="/cart">
            Cart <span className="cartBadge">{count}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}