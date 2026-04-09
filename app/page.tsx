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

  return (
    <main className="min-h-screen bg-[#F5F2ED] text-[#8B6B4A]"
      style={{ "--accent": accent } as React.CSSProperties}>

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-start px-6 md:px-8 py-4 md:py-5">
        <div className="flex gap-4 md:gap-10 text-sm md:text-lg font-bold drop-shadow-md" style={{ color: "#8B6B4A" }}>
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

      {/* ── HERO ── */}
      <section className="relative h-screen overflow-hidden">
        <Image
          src="/press-photo.jpg"
          alt="Michael Cantor"
          fill
          priority
          className="object-cover object-center"
          style={{ filter: "brightness(0.9)" }}
        />
        <a href="#" className="absolute md:fixed bottom-2 left-6 md:bottom-4 md:left-8 z-50 group">
          <h1 className="fade-up fade-up-2 text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight leading-none mb-2 md:mb-4 group-hover:opacity-70 transition-opacity drop-shadow-md" style={{ color: "#8B6B4A" }}>
            Michael<br />Cantor
          </h1>
        </a>
        <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-10 flex flex-col md:flex-row gap-2 md:gap-3">
          {[
            { label: "Instagram", href: "https://www.instagram.com/michaelrcantor" },
            { label: "TikTok", href: "https://www.tiktok.com/@michaelrcantor" },
            { label: "YouTube", href: "https://youtube.com/@michaelcantor3" },
          ].map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
              style={{ borderColor: "#8B6B4A", color: "#8B6B4A", backgroundColor: "rgba(255,255,255,0.85)" }}
              className="px-3 py-1.5 md:px-4 md:py-2 rounded-full border text-xs font-semibold hover:opacity-80 transition text-center">
              {link.label}
            </a>
          ))}
        </div>
      </section>

      {/* ── BIO ── */}
      <section id="bio" className="py-16 md:py-24 px-6 md:px-20 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden">
            <Image src="/bio-photo.jpg" alt="Michael Cantor" fill className="object-cover object-top" />
          </div>
          <div className="space-y-5 text-[#8B6B4A] leading-relaxed text-[15px]">
            <p>Michael Cantor is a New York City based singer/songwriter from Westport, CT. He fell in love with music in his dad's car on their drives back and forth from Yonkers, NY, where Michael was born. They would listen to ELO, Radiohead, and the Allman Brothers on repeat. Those were his earliest influences. He later fell in love with Stevie Ray Vaughan and became obsessed with the guitar.</p>
            <p>Years later, Michael found himself writing songs and starting to sing. He found that writing songs made him happy and decided to go to Berklee School of Music. There, his musical influences became songwriters like Bob Dylan, Leif Vollebekk, and John Mayer. Michael says he likes how a song feels in his hands. He knows if his hands are on the same page, he's onto a new song.</p>
            <p>His debut single was released in 2023, and now he is very excited to be rolling out his debut album. It's a folk/pop record with some fusion sprinkled in. With each song, Michael says he's coming closer to hearing his true voice as an artist.</p>
          </div>
        </div>
      </section>

      {/* ── MUSIC ── */}
      <section id="music" className="py-16 md:py-24 bg-[#EDE9E3]">
        <div className="px-6 md:px-20 max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12">Latest Releases</h2>
          <iframe
            src="https://open.spotify.com/embed/artist/2nyS5xoo0whI3q74gsRmHL?utm_source=generator&theme=0"
            width="100%"
            height="352"
            style={{ borderRadius: 12 }}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
          <div className="mt-6 md:mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <a href="https://open.spotify.com/artist/2nyS5xoo0whI3q74gsRmHL" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-3 md:px-5 py-2.5 rounded-full bg-[#1DB954] text-black text-sm font-semibold hover:opacity-90 transition">
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              Spotify
            </a>
            <a href="https://music.apple.com/us/artist/michael-cantor/1631765548" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-3 md:px-5 py-2.5 rounded-full bg-[#fc3c44] text-white text-sm font-semibold hover:opacity-90 transition">
              Apple Music
            </a>
            <a href="https://youtube.com/channel/UCHLDDkR-qNPVgtFQFGk4aDw" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-3 md:px-5 py-2.5 rounded-full bg-[#FF0000] text-white text-sm font-semibold hover:opacity-90 transition">
              YouTube
            </a>
            <a href="https://tidal.com/artist/32899611/u" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-3 md:px-5 py-2.5 rounded-full bg-[#000000] text-white text-sm font-semibold hover:opacity-90 transition">
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.012 3.992L8.008 7.996 4.004 3.992 0 7.996l4.004 4.004 4.004-4.004 4.004 4.004 4.004-4.004L12.012 3.992zM8.008 16.004l-4.004-4.004L0 16.004l4.004 4.004 4.004-4.004zm8.008 0l-4.004-4.004-4.004 4.004 4.004 4.004 4.004-4.004zm3.98-8.008l-4.004 4.004 4.004 4.004L24 11.996l-4.004-4.004z"/>
              </svg>
              Tidal
            </a>
          </div>
        </div>
      </section>

      {/* ── LIVE PERFORMANCES ── */}
      <section id="live" className="py-16 md:py-24 px-6 md:px-20 max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12">Live Performances</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {videos.map((video) => (
            <a key={video.id} href={video.url} target="_blank" rel="noopener noreferrer" className="group">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#EDE9E3]">
                <img
                  src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors duration-300">
                  <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-4 h-4 text-black ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-sm font-medium mt-2 leading-snug">{video.title}</p>
            </a>
          ))}
        </div>
      </section>

      {/* ── PRESS PHOTOS ── */}
      <section id="photos" className="py-16 md:py-24 bg-[#EDE9E3]">
        <div className="px-6 md:px-20 max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12">Press Photos</h2>
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {["/press-photo.jpg", "/bio-photo.jpg"].map((src, i) => (
              <a key={i} href={src} download target="_blank" rel="noopener noreferrer"
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden block">
                <Image src={src} alt={`Michael Cantor press photo ${i + 1}`} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <p className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">Download</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-16 md:py-24 px-6 md:px-20 max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12">Get in Touch</h2>
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          <a href="mailto:Michael.r.cantor@gmail.com"
            className="group flex items-center gap-4 border border-[#D8D4CE] rounded-2xl p-6 md:p-8 hover:border-[var(--accent)] transition-colors">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#E8E4DE] flex items-center justify-center text-[var(--accent)] shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-xs text-[#a08060] uppercase tracking-widest mb-1">Email</p>
              <p className="font-semibold group-hover:text-[var(--accent)] transition-colors text-sm truncate">Michael.r.cantor@gmail.com</p>
            </div>
          </a>
          <a href="tel:2032167905"
            className="group flex items-center gap-4 border border-[#D8D4CE] rounded-2xl p-6 md:p-8 hover:border-[var(--accent)] transition-colors">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#E8E4DE] flex items-center justify-center text-[var(--accent)] shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-[#a08060] uppercase tracking-widest mb-1">Phone</p>
              <p className="font-semibold group-hover:text-[var(--accent)] transition-colors">(203) 216-7905</p>
            </div>
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 px-6 md:px-20 border-t border-[#D8D4CE]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#8B6B4A]">© 2026 Michael Cantor. All rights reserved.</p>
          <div className="flex gap-6">
            {[
              { label: "Instagram", href: "https://www.instagram.com/michaelrcantor" },
              { label: "TikTok", href: "https://www.tiktok.com/@michaelrcantor" },
              { label: "YouTube", href: "https://youtube.com/@michaelcantor3" },
            ].map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                className="text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: "#a08060" }}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>

    </main>
  );
}
