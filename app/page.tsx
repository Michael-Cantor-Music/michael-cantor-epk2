import Image from "next/image";
import { getLatestReleases } from "@/lib/spotify";
import { extractPalette } from "@/lib/colors";
import EPKSections from "./components/EPKSections";

export default async function EPK() {
  const [releases] = await Promise.all([
    getLatestReleases(1),
  ]);

  const albumImageUrl = releases[0]?.image ?? "";
  const palette = albumImageUrl
    ? await extractPalette(albumImageUrl)
    : { vibrant: "#c9b99a", darkVibrant: "#1a1a1a", muted: "#6a6460" };
  const accent = palette.vibrant;

  const videos = [
    { id: "fO5vxJum4wA", title: "Levit Pavilion", url: "https://www.youtube.com/shorts/fO5vxJum4wA" },
    { id: "xa861fVGf7w", title: "Lucinda's", url: "https://www.youtube.com/shorts/xa861fVGf7w" },
    { id: "hG1z4toi0Vg", title: "SoHo Playhouse", url: "https://www.youtube.com/shorts/hG1z4toi0Vg" },
    { id: "rj-BXD73hd0", title: "At Home", url: "https://www.youtube.com/shorts/rj-BXD73hd0" },
  ];

  return (
    <main className="relative min-h-screen text-[#8B6B4A]">

      {/* ── FIXED HERO BACKGROUND ── */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/press-photo.jpg"
          alt="Michael Cantor"
          fill
          priority
          className="object-cover object-center"
          style={{ filter: "brightness(0.88)" }}
        />
      </div>

      {/* ── SCROLLABLE CONTENT ── */}
      <div className="min-h-screen flex flex-col">

        {/* Nav */}
        <nav className="flex items-center justify-center px-6 py-5 shrink-0">
          <div className="flex gap-6 md:gap-10 text-sm md:text-base font-bold drop-shadow-md" style={{ color: "#8B6B4A" }}>
            {[
              { label: "Bio", href: "#bio" },
              { label: "Music", href: "#music" },
              { label: "Live", href: "#live" },
              { label: "Photos", href: "#photos" },
              { label: "Contact", href: "#contact" },
            ].map((link) => (
              <a key={link.label} href={link.href} className="hover:opacity-70 transition-opacity">
                {link.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Name centered in remaining hero space */}
        <div className="flex-1 flex flex-col items-center justify-center pb-8">
          <h1
            className="fade-up fade-up-2 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none text-center mb-3 drop-shadow-md"
            style={{ color: "#8B6B4A" }}
          >
            Michael Cantor
          </h1>
          <p className="fade-up fade-up-3 text-sm md:text-base font-medium drop-shadow-md" style={{ color: "#8B6B4A" }}>
            Singer-Songwriter · New York, NY
          </p>
          <div className="flex gap-3 mt-5">
            {[
              { label: "Instagram", href: "https://www.instagram.com/michaelrcantor" },
              { label: "TikTok", href: "https://www.tiktok.com/@michaelrcantor" },
              { label: "YouTube", href: "https://youtube.com/@michaelcantor3" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ borderColor: "#8B6B4A", color: "#8B6B4A", backgroundColor: "rgba(255,255,255,0.75)" }}
                className="px-4 py-1.5 rounded-full border text-xs font-semibold hover:opacity-80 transition backdrop-blur-sm"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Collapsible sections — frosted panel anchored to bottom, over hero */}
        <div
          className="w-full"
          style={{
            background: "rgba(245, 242, 237, 0.88)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderTop: "1px solid rgba(216,212,206,0.6)",
          }}
        >
          <EPKSections videos={videos} accent={accent} />
        </div>

      </div>
    </main>
  );
}
