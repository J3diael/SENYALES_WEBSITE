import { links } from "../lib/links"

const socials = [
  { label: "Instagram", href: links.instagram },
  { label: "Facebook", href: links.facebook },
  { label: "TikTok", href: links.tiktok },
].filter((s) => s.href)

export default function Footer() {
  return (
    <footer className="py-10 text-center text-gray-500 text-sm">
      {(links.shop || socials.length > 0) && (
        <nav className="flex flex-wrap justify-center gap-6 mb-6 tracking-widest text-xs">
          {links.shop && (
            <a href={links.shop} className="hover:text-white transition">
              SHOP
            </a>
          )}
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              {s.label.toUpperCase()}
            </a>
          ))}
        </nav>
      )}
      <p>© {new Date().getFullYear()} SENYALES</p>
      <p className="mt-2">You are the paradox.</p>
    </footer>
  )
}
