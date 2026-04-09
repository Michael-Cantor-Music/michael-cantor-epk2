import Image from "next/image";
import { getLatestReleases } from "@/lib/spotify";
import { extractPalette } from "@/lib/colors";

export default async function EPK() {
  const [releases] = await Promise.all([
    getLatestReleases(1),
  ]);

  const albumImageUrl = releases[0]?.image ?? "";
  const palette = albumImageUrl ? await extractPalette(albumImageUrl) : { vibrant: "#c9b99a", darkVibrant: "#1a1a1a", muted: "#6a6460" };
  const accent = palette.vibrant;

  const videos: { id: string; title: string; url: string }[] = [
    { id: "fO5vxJum4wA", title: "Levit Pavilion", url: "https://www.youtube.com/shorts/fO5vxJum4wA" },
    { id: "xa861fVGf7w", title: "Lucinda's", url: "https://www.youtube.com/shorts/xa861fVGf7w" },
    { id: "hG1z4toi0Vg", title: "SoHo Playhouse", url: "https://www.youtube.com/shorts/hG1z4toi0Vg" },
    { id: "rj-BXD73hd0", title: "At Home", url: "https://www.youtube.com/shorts/rj-BXD73hd0" },
  ];

  const platforms = [
    { label: "Spotify", href: "https://open.spotify.com/artist/2nyS5xoo0whI3q74gsRmHL", dot: "#1DB954" },
    { label: "Apple Music", href: "https://music.apple.com/us/artist/michael-cantor/1631765548", dot: "#fc3c44" },
    { label: "YouTube Music", href: "https://youtube.com/channel/UCHLDDkR-qNPVgtFQFGk4aDw", dot: "#FF0000" },
    { label: "Tidal", href: "https://tidal.com/artist/32899611/u", dot: "#000000" },
  ];

  return (
    <main className="min-h-screen bg-[#F5F2ED] text-[#8B6B4A]"
      style={{ "--accent": accent } as React.CSSProperties}>

      {/* ── HEADER ── */}
      <header className="flex items-center justify-between px-6 md:px-12 py-4 border-b border-[#D8D4CE]">
        <a href="#" className="text-sm font-semibold tracking-wide hover:opacity-60 transition-opacity">
          Michael Cantor
        </a>
        <nav className="hidden md:flex gap-7 text-[10px] font-medium tracking-widest uppercase" style={{ color: "#a08060" }}>
          {[
            { label: "About", href: "#bio" },
            { label: "Music", href: "#music" },
            { label: "Photos", href: "#photos" },
            { label: "Contact", href: "#contact" },
          ].map((link) => (
            <a key={link.label} href={link.href} className="hover:opacity-60 transition-opacity">{link.label}</a>
          ))}
        </nav>
        <div className="hidden md:flex gap-5 text-[10px] font-medium" style={{ color: "#a08060" }}>
          {[
            { label: "Instagram", href: "https://www.instagram.com/michaelrcantor" },
            { label: "TikTok", href: "https://www.tiktok.com/@michaelrcantor" },
            { label: "YouTube", href: "https://youtube.com/@michaelcantor3" },
          ].map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
              className="hover:opacity-60 transition-opacity">{link.label}</a>
          ))}
        </div>
      </header>

      {/* ── NAME HERO ── */}
      <section className="px-6 md:px-12 pt-8 pb-8 border-b border-[#D8D4CE]">
        <h1 className="fade-up fade-up-2 text-[11vw] font-bold tracking-tight leading-[0.88]" style={{ color: "#8B6B4A" }}>
          Michael Cantor
        </h1>
        <p className="fade-up fade-up-3 mt-3 text-[10px] tracking-widest uppercase font-medium" style={{ color: "#a08060" }}>
          Singer-Songwriter · New York, NY
        </p>
      </section>

      {/* ── ABOUT ── */}
      <section id="bio" className="px-6 md:px-12 py-10 border-b border-[#D8D4CE]">
        <p className="text-[10px] uppercase tracking-widest font-semibold mb-6" style={{ color: "#a08060" }}>About</p>
        <div className="grid md:grid-cols-[1fr_2fr] gap-6 md:gap-10 items-stretch">
          <div className="relative w-full min-h-[200px] rounded-lg overflow-hidden">
            <Image src="/bio-photo.jpg" alt="Michael Cantor" fill className="object-cover object-top" />
          </div>
          <div className="space-y-3 text-[13px] leading-relaxed" style={{ color: "#8B6B4A" }}>
            <p>Michael Cantor is a New York City based singer/songwriter from Westport, CT. He fell in love with music in his dad's car on their drives back and forth from Yonkers, NY, where Michael was born. They would listen to ELO, Radiohead, and the Allman Brothers on repeat. Those were his earliest influences. He later fell in love with Stevie Ray Vaughan and became obsessed with the guitar.</p>
            <p>Years later, Michael found himself writing songs and starting to sing. He found that writing songs made him happy and decided to go to Berklee School of Music. There, his musical influences became songwriters like Bob Dylan, Leif Vollebekk, and John Mayer. Michael says he likes how a song feels in his hands. He knows if his hands are on the same page, he's onto a new song.</p>
            <p>His debut single was released in 2023, and now he is very excited to be rolling out his debut album. It's a folk/pop record with some fusion sprinkled in. With each song, Michael says he's coming closer to hearing his true voice as an artist.</p>
          </div>
        </div>
      </section>

      {/* ── MUSIC & LIVE VIDEO ── */}
      <section id="music" className="px-6 md:px-12 py-10 border-b border-[#D8D4CE]">
        <p className="text-[10px] uppercase tracking-widest font-semibold mb-6" style={{ color: "#a08060" }}>Music &amp; Live Video</p>
        <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-start">

          {/* Spotify + platform links */}
          <div>
            <iframe
              src="https://open.spotify.com/embed/artist/2nyS5xoo0whI3q74gsRmHL?utm_source=generator&theme=0"
              width="100%"
              height="352"
              style={{ borderRadius: 8 }}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
            <div className="mt-3 divide-y divide-[#D8D4CE]">
              {platforms.map((p) => (
                <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between py-2.5 group hover:opacity-60 transition-opacity">
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: p.dot }} />
                    <span className="text-[13px] font-medium">{p.label}</span>
                  </div>
                  <svg className="w-3 h-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Video thumbnails */}
          <div className="grid grid-cols-2 gap-2.5">
            {videos.map((video) => (
              <a key={video.id} href={video.url} target="_blank" rel="noopener noreferrer" className="group">
                <div className="relative aspect-[4/3] rounded-md overflow-hidden bg-[#D8D4CE]">
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/25 transition-colors duration-300">
                    <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-3 h-3 text-black ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="text-[11px] font-medium mt-1 leading-snug" style={{ color: "#a08060" }}>{video.title}</p>
              </a>
            ))}
          </div>

        </div>
      </section>

      {/* ── PRESS PHOTOS ── */}
      <section id="photos" className="px-6 md:px-12 py-10 border-b border-[#D8D4CE]">
        <p className="text-[10px] uppercase tracking-widest font-semibold mb-6" style={{ color: "#a08060" }}>Press Photos</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {["/press-photo.jpg", "/bio-photo.jpg"].map((src, i) => (
            <a key={i} href={src} download target="_blank" rel="noopener noreferrer"
              className="group relative aspect-[3/4] rounded-lg overflow-hidden block">
              <Image src={src} alt={`Michael Cantor press photo ${i + 1}`} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-end p-2.5">
                <p className="text-white text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">↓ Download</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="px-6 md:px-12 py-10 border-b border-[#D8D4CE]">
        <p className="text-[10px] uppercase tracking-widest font-semibold mb-6" style={{ color: "#a08060" }}>Booking &amp; Contact</p>
        <div className="divide-y divide-[#D8D4CE]">
          <a href="mailto:Michael.r.cantor@gmail.com"
            className="flex items-center justify-between py-3 hover:opacity-60 transition-opacity">
            <div>
              <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: "#a08060" }}>Email</p>
              <p className="text-[13px] font-medium">Michael.r.cantor@gmail.com</p>
            </div>
            <svg className="w-3 h-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
          <a href="tel:2032167905"
            className="flex items-center justify-between py-3 hover:opacity-60 transition-opacity">
            <div>
              <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: "#a08060" }}>Phone</p>
              <p className="text-[13px] font-medium">(203) 216-7905</p>
            </div>
            <svg className="w-3 h-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-6 md:px-12 py-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-[11px]" style={{ color: "#a08060" }}>© 2026 Michael Cantor. All rights reserved.</p>
          <div className="flex gap-5">
            {[
              { label: "Instagram", href: "https://www.instagram.com/michaelrcantor" },
              { label: "TikTok", href: "https://www.tiktok.com/@michaelrcantor" },
              { label: "YouTube", href: "https://youtube.com/@michaelcantor3" },
            ].map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                className="text-[11px] font-medium hover:opacity-60 transition-opacity" style={{ color: "#a08060" }}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>

    </main>
  );
}
