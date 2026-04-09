"use client";

import { useState } from "react";
import Image from "next/image";

interface Video {
  id: string;
  title: string;
  url: string;
}

interface Props {
  videos: Video[];
  accent: string;
}

function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-[#D8D4CE]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 px-0 text-left hover:opacity-70 transition-opacity"
      >
        <span className="text-base md:text-lg font-bold" style={{ color: "#8B6B4A" }}>
          {title}
        </span>
        <span
          className="text-2xl font-light transition-transform duration-300"
          style={{ color: "#8B6B4A", transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: open ? "2000px" : "0px", opacity: open ? 1 : 0 }}
      >
        <div className="pb-6">{children}</div>
      </div>
    </div>
  );
}

function PhotoLightbox({ photos }: { photos: string[] }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        {photos.map((src, i) => (
          <button
            key={i}
            onClick={() => setSelected(src)}
            className="group relative aspect-[3/4] rounded-xl overflow-hidden block w-full"
          >
            <Image
              src={src}
              alt={`Press photo ${i + 1}`}
              fill
              className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <span className="text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Expand
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div className="relative max-w-lg w-full max-h-[90vh] aspect-[3/4]">
            <Image
              src={selected}
              alt="Press photo"
              fill
              className="object-contain rounded-xl"
            />
          </div>
          <button
            className="absolute top-5 right-6 text-white text-3xl font-light hover:opacity-70 transition-opacity"
            onClick={() => setSelected(null)}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}

function VideoGrid({ videos }: { videos: Video[] }) {
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {videos.map((video) => (
          <button
            key={video.id}
            onClick={() => setPlaying(video.id)}
            className="group text-left"
          >
            <div className="relative aspect-video rounded-xl overflow-hidden bg-[#EDE9E3]">
              <img
                src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors duration-300">
                <div className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-3.5 h-3.5 text-black ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <p className="text-xs font-medium mt-1.5 leading-snug" style={{ color: "#8B6B4A" }}>
              {video.title}
            </p>
          </button>
        ))}
      </div>

      {/* Video modal */}
      {playing && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setPlaying(null)}
        >
          <div
            className="relative w-full max-w-2xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${playing}?autoplay=1`}
              className="w-full h-full rounded-xl"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
          <button
            className="absolute top-5 right-6 text-white text-3xl font-light hover:opacity-70 transition-opacity"
            onClick={() => setPlaying(null)}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}

export default function EPKSections({ videos, accent }: Props) {
  return (
    <div
      className="max-w-2xl mx-auto px-6 py-8"
      style={{ "--accent": accent } as React.CSSProperties}
    >
      {/* Streaming buttons */}
      <div id="music" className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Spotify", href: "https://open.spotify.com/artist/2nyS5xoo0whI3q74gsRmHL", bg: "#1DB954", text: "text-black" },
          { label: "Apple Music", href: "https://music.apple.com/us/artist/michael-cantor/1631765548", bg: "#fc3c44", text: "text-white" },
          { label: "YouTube Music", href: "https://youtube.com/channel/UCHLDDkR-qNPVgtFQFGk4aDw", bg: "#FF0000", text: "text-white" },
          { label: "Tidal", href: "https://tidal.com/artist/32899611/u", bg: "#000000", text: "text-white" },
        ].map((p) => (
          <a
            key={p.label}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center px-3 py-2 rounded-full text-xs font-semibold hover:opacity-90 transition ${p.text}`}
            style={{ backgroundColor: p.bg }}
          >
            {p.label}
          </a>
        ))}
      </div>

      <div id="bio" /><CollapsibleSection title="Bio" defaultOpen={false}>
        <div className="space-y-4 text-[14px] leading-relaxed" style={{ color: "#8B6B4A" }}>
          <p>Michael Cantor is a New York City based singer/songwriter from Westport, CT. He fell in love with music in his dad's car on their drives back and forth from Yonkers, NY, where Michael was born. They would listen to ELO, Radiohead, and the Allman Brothers on repeat. Those were his earliest influences. He later fell in love with Stevie Ray Vaughan and became obsessed with the guitar.</p>
          <p>Years later, Michael found himself writing songs and starting to sing. He found that writing songs made him happy and decided to go to Berklee School of Music. There, his musical influences became songwriters like Bob Dylan, Leif Vollebekk, and John Mayer. Michael says he likes how a song feels in his hands. He knows if his hands are on the same page, he's onto a new song.</p>
          <p>His debut single was released in 2023, and now he is very excited to be rolling out his debut album. It's a folk/pop record with some fusion sprinkled in. With each song, Michael says he's coming closer to hearing his true voice as an artist.</p>
        </div>
      </CollapsibleSection>

      <div id="live" /><CollapsibleSection title="Live Performances" defaultOpen={false}>
        <VideoGrid videos={videos} />
      </CollapsibleSection>

      <div id="photos" /><CollapsibleSection title="Press Photos" defaultOpen={false}>
        <PhotoLightbox photos={["/press-photo.jpg", "/bio-photo.jpg"]} />
      </CollapsibleSection>

      <div id="contact" /><CollapsibleSection title="Get in Touch" defaultOpen={false}>
        <div className="flex flex-col gap-3">
          <a
            href="mailto:Michael.r.cantor@gmail.com"
            className="group flex items-center gap-3 border border-[#D8D4CE] rounded-xl p-4 hover:border-[var(--accent)] transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-[#E8E4DE] flex items-center justify-center text-[var(--accent)] shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: "#a08060" }}>Email</p>
              <p className="text-sm font-semibold truncate group-hover:text-[var(--accent)] transition-colors">Michael.r.cantor@gmail.com</p>
            </div>
          </a>
          <a
            href="tel:2032167905"
            className="group flex items-center gap-3 border border-[#D8D4CE] rounded-xl p-4 hover:border-[var(--accent)] transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-[#E8E4DE] flex items-center justify-center text-[var(--accent)] shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: "#a08060" }}>Phone</p>
              <p className="text-sm font-semibold group-hover:text-[var(--accent)] transition-colors">(203) 216-7905</p>
            </div>
          </a>
        </div>
      </CollapsibleSection>

      {/* Footer */}
      <div className="border-t border-[#D8D4CE] mt-2 pt-5 flex items-center justify-between">
        <p className="text-xs" style={{ color: "#a08060" }}>© 2026 Michael Cantor</p>
        <div className="flex gap-4">
          {[
            { label: "Instagram", href: "https://www.instagram.com/michaelrcantor" },
            { label: "TikTok", href: "https://www.tiktok.com/@michaelrcantor" },
            { label: "YouTube", href: "https://youtube.com/@michaelcantor3" },
          ].map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
              className="text-xs font-medium hover:opacity-60 transition-opacity" style={{ color: "#a08060" }}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
