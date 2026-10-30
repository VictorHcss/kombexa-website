import Link from "next/link";

/** Monograma provisório do Kombexa (o mesmo "K" no quadrado laranja do sistema original). */
export function BrandMark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" className="brand-mark">
      <rect width="32" height="32" rx="7" fill="#FF4B1F" />
      <path d="M10 8h4v6.2L19.6 8h4.8l-6.6 7.4L24.6 24h-4.9l-4.8-6.3-0.9 1V24h-4z" fill="#111315" />
    </svg>
  );
}

export function Brand({ href = "/", tone = "dark" }: { href?: string; tone?: "dark" | "light" }) {
  return (
    <Link href={href} className={`brand brand--${tone}`} aria-label="Kombexa, página inicial">
      <BrandMark />
      <span className="brand-name">Kombexa</span>
    </Link>
  );
}
