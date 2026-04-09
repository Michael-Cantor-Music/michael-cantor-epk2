"use client";

import { useState } from "react";
import Image from "next/image";

interface Video { id: string; title: string; url: string; }
interface Props { videos: Video[]; accent: string; heroBg: string; }

function Modal({ onClose, children, bg }: { onClose: () => void; children: React.ReactNode; bg: string }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 md:p-8"
      style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl p-6 md:p-8 max-h-[80vh] overflow-y-auto"
        style={{ backgroundColor: bg }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="float-right text-2xl font-light leading-none hover:opacity-60 transition-opacity mb-2"
          style={{ color: "#8B6B4A" }}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

function FloatingLabel({
  label,
  onClick,
  style,
  large = false,
}: {
  label: string;
  onClick: () => void;
  style: React.CSSProperties;
  large?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="absolute flex items-center gap-2 group"
      style={style}
    >
      <span
        className={`${large ? "text-lg md:text-xl" : "text-sm md:text-base"} font-bold drop-shadow-sm group-hover:opacity-70 transition-opacity`}
        style={{ color: "#8B6B4A" }}
      >
        {label}
      </span>
      <span
        className={`${large ? "w-7 h-7 text-sm" : "w-5 h-5 text-xs"} rounded-full border flex items-center justify-center font-light shrink-0 group-hover:opacity-70 transition-opacity`}
        style={{ borderColor: "#8B6B4A", color: "#8B6B4A", backgroundColor: "rgba(255,255,255,0.5)" }}
      >
        +
      </span>
    </button>
  );
}

export default function EPKOverlay({ videos, accent, heroBg }: Props) {
  const [open, setOpen] = useState<string | null>(null);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [lightboxPhoto, setLightboxPhoto] = useState<string | null>(null);

  return (
    <>
      {/* ── FLOATING LABELS ── */}


      {/* Bio — mobile only */}
      <div className="md:hidden">
        <FloatingLabel
          label="Bio"
          onClick={() => setOpen("bio")}
          style={{ top: "32%", left: "22%" }}
          large
        />
      </div>

      {/* Press Photos — mirrors bio position on right side */}
      <FloatingLabel
        label="Press Photos"
        onClick={() => setOpen("photos")}
        style={{ top: "32%", right: "22%" }}
        large
      />

      {/* Live Performances — desktop only at original position */}
      <div className="hidden md:block">
        <FloatingLabel
          label="Live Performances"
          onClick={() => setOpen("live")}
          style={{ top: "42%", right: "22%" }}
          large
        />
      </div>

      {/* Live Performances — mobile only, below foot, above streaming links */}
      <div className="md:hidden">
        <FloatingLabel
          label="Live Performances"
          onClick={() => setOpen("live")}
          style={{ bottom: "18%", left: "50%", transform: "translateX(-50%)" }}
          large
        />
      </div>


      {/* Streaming links — bottom center */}
      <div
        className="absolute flex flex-wrap gap-2 justify-center"
        style={{ bottom: "6%", left: "50%", transform: "translateX(-50%)" }}
      >
        {[
          { label: "Spotify", href: "https://open.spotify.com/artist/2nyS5xoo0whI3q74gsRmHL" },
          { label: "Apple Music", href: "https://music.apple.com/us/artist/michael-cantor/1631765548" },
          { label: "YouTube Music", href: "https://youtube.com/channel/UCHLDDkR-qNPVgtFQFGk4aDw" },
          { label: "Tidal", href: "https://tidal.com/artist/32899611/u" },
        ].map((p) => (
          <a
            key={p.label}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full border text-sm font-semibold hover:opacity-80 transition whitespace-nowrap"
            style={{ borderColor: "#8B6B4A", color: "#8B6B4A", backgroundColor: "rgba(255,255,255,0.55)" }}
          >
            {p.label}
          </a>
        ))}
      </div>

      {/* ── MODALS ── */}

      {open === "bio" && (
        <Modal onClose={() => setOpen(null)} bg={heroBg}>
          <h2 className="text-xl font-bold mb-4" style={{ color: "#8B6B4A" }}>Bio</h2>
          <div className="space-y-3 text-[14px] leading-relaxed font-semibold" style={{ color: "#8B6B4A" }}>
            <p>Michael Cantor is a New York City based singer/songwriter from Westport, CT. He fell in love with music in his dad's car on their drives back and forth from Yonkers, NY, where Michael was born. They would listen to ELO, Radiohead, and The Allman Brothers on repeat. Those were his earliest influences.</p>
            <p>After years of obsessing over the guitar, Michael found himself writing songs and starting to sing. His musical influences became songwriters like Bob Dylan, Leif Vollebekk, and John Mayer.</p>
            <p>His debut single was released in 2023, and now he is very excited to be rolling out his debut album. It's a folk/pop record with some fusion sprinkled in. With each song, Michael says he's coming closer to hearing his true voice as an artist.</p>
          </div>
        </Modal>
      )}

      {open === "live" && (
        <Modal onClose={() => setOpen(null)} bg={heroBg}>
          <h2 className="text-xl font-bold mb-4" style={{ color: "#8B6B4A" }}>Live Performances</h2>
          <div className="grid grid-cols-2 gap-3">
            {videos.map((video) => (
              <button
                key={video.id}
                onClick={() => setPlayingVideo(video.id)}
                className="group text-left"
              >
                <div className="relative aspect-video rounded-xl overflow-hidden bg-[#EDE9E3]">
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors">
                    <div className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                      <svg className="w-3.5 h-3.5 text-black ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="text-xs font-medium mt-1.5" style={{ color: "#8B6B4A" }}>{video.title}</p>
              </button>
            ))}
          </div>
        </Modal>
      )}

      {open === "photos" && (
        <Modal onClose={() => setOpen(null)} bg={heroBg}>
          <h2 className="text-xl font-bold mb-4" style={{ color: "#8B6B4A" }}>Press Photos</h2>
          <div className="grid grid-cols-2 gap-3">
            {["/thisone1.jpg", "/thisone2.jpg", "/thisone3.jpg", "/thisone4.jpg"].map((src, i) => (
              <button
                key={i}
                onClick={() => setLightboxPhoto(src)}
                className="group relative aspect-[3/4] rounded-xl overflow-hidden"
              >
                <Image src={src} alt={`Press photo ${i + 1}`} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-end p-2">
                  <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">↓ Download</span>
                </div>
              </button>
            ))}
          </div>
        </Modal>
      )}


      {/* Video player modal */}
      {playingVideo && (
        <div
          className="fixed inset-0 z-[60] bg-black/85 flex items-center justify-center p-4"
          onClick={() => setPlayingVideo(null)}
        >
          <div className="relative w-full max-w-2xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={`https://www.youtube.com/embed/${playingVideo}?autoplay=1`}
              className="w-full h-full rounded-xl"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
          <button className="absolute top-5 right-6 text-white text-3xl font-light hover:opacity-70" onClick={() => setPlayingVideo(null)}>×</button>
        </div>
      )}

      {/* Photo lightbox */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-[60] bg-black/85 flex items-center justify-center p-4"
          onClick={() => setLightboxPhoto(null)}
        >
          <div className="relative max-w-sm w-full aspect-[3/4]">
            <Image src={lightboxPhoto} alt="Press photo" fill className="object-contain rounded-xl" />
          </div>
          <a
            href={lightboxPhoto}
            download
            className="absolute bottom-8 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full text-sm font-semibold text-white border border-white/60 hover:opacity-70 transition"
            onClick={(e) => e.stopPropagation()}
          >
            ↓ Download
          </a>
          <button className="absolute top-5 right-6 text-white text-3xl font-light hover:opacity-70" onClick={() => setLightboxPhoto(null)}>×</button>
        </div>
      )}
    </>
  );
}
