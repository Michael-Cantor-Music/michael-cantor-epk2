import Image from "next/image";
import { getLatestReleases } from "@/lib/spotify";
import { extractPalette } from "@/lib/colors";
import EPKOverlay from "./components/EPKOverlay";

export default async function EPK() {
  const [releases] = await Promise.all([getLatestReleases(1)]);

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
    <main className="h-screen overflow-hidden relative" style={{ color: "#8B6B4A" }}>

      {/* Hero image */}
      <Image
        src="/press-photo.jpg"
        alt="Michael Cantor"
        fill
        priority
        className="object-cover object-center"
        style={{ filter: "brightness(0.88)" }}
      />

      {/* Subtle vignette for readability at edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(245,242,237,0.35) 100%)",
        }}
      />

      {/* Bio — top left, always visible */}
      <div className="absolute top-10 left-6 md:left-10 max-w-xs z-10">
        <p className="text-[11px] md:text-xs leading-relaxed drop-shadow-sm" style={{ color: "#8B6B4A" }}>
          Michael Cantor is a New York City based singer/songwriter from Westport, CT. He fell in love with music in his dad's car listening to ELO, Radiohead, and the Allman Brothers. He later became obsessed with Stevie Ray Vaughan and the guitar.
        </p>
        <p className="text-[11px] md:text-xs leading-relaxed mt-2 drop-shadow-sm" style={{ color: "#8B6B4A" }}>
          After studying at Berklee School of Music, his songwriting influences grew to include Bob Dylan, Leif Vollebekk, and John Mayer. His debut album — a folk/pop record with fusion sprinkled in — is rolling out now.
        </p>
      </div>

      {/* Name + info — top area, higher up */}
      <div className="absolute top-10 left-0 right-0 flex flex-col items-center text-center px-4">
        <h1
          className="fade-up fade-up-2 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none drop-shadow-sm mb-2"
          style={{ color: "#8B6B4A" }}
        >
          Michael Cantor
        </h1>
        <p className="fade-up fade-up-3 text-sm font-medium mb-1" style={{ color: "#8B6B4A" }}>
          Singer-Songwriter · New York, NY
        </p>
        <div className="fade-up fade-up-3 flex flex-col items-center gap-0.5 mb-3" style={{ color: "#a08060" }}>
          <a href="mailto:Michael.r.cantor@gmail.com" className="text-xs hover:opacity-70 transition-opacity">
            Michael.r.cantor@gmail.com
          </a>
          <a href="tel:2032167905" className="text-xs hover:opacity-70 transition-opacity">
            (203) 216-7905
          </a>
        </div>
        <div className="flex gap-3">
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
              style={{ borderColor: "#8B6B4A", color: "#8B6B4A", backgroundColor: "rgba(255,255,255,0.55)" }}
              className="px-5 py-2 rounded-full border text-xs font-semibold hover:opacity-80 transition whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Floating labels + modals */}
      <EPKOverlay videos={videos} accent={accent} />

    </main>
  );
}
