"use client";

import { useState } from "react";
import Image from "next/image";

interface Video { id: string; title: string; url: string; }
interface Props { videos: Video[]; accent: string; }

function Modal({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 md:p-8"
      style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl p-6 md:p-8 max-h-[80vh] overflow-y-auto"
        style={{ backgroundColor: "rgba(245,242,237,0.97)" }}
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
}: {
  label: string;
  onClick: () => void;
  style: React.CSSProperties;
}) {
  return (
    <button
      onClick={onClick}
      className="absolute flex items-center gap-2 group"
      style={style}
    >
      <span
        className="text-sm md:text-base font-bold drop-shadow-sm group-hover:opacity-70 transition-opacity"
        style={{ color: "#8B6B4A" }}
      >
        {label}
      </span>
      <span
        className="w-5 h-5 rounded-full border flex items-center justify-center text-xs font-light shrink-0 group-hover:opacity-70 transition-opacity"
        style={{ borderColor: "#8B6B4A", color: "#8B6B4A", backgroundColor: "rgba(255,255,255,0.5)" }}
      >
        +
      </span>
    </button>
  );
}

export default function EPKOverlay({ videos, accent }: Props) {
  const [open, setOpen] = useState<string | null>(null);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [lightboxPhoto, setLightboxPhoto] = useState<string | null>(null);

  return (
    <>
      {/* ── FLOATING LABELS ── */}

      {/* Bio — left side */}
      <FloatingLabel
        label="Bio"
        onClick={() => setOpen("bio")}
        style={{ bottom: "32%", left: "6%" }}
      />

      {/* Live Performances — bottom center-left */}
      <FloatingLabel
        label="Live Performances"
        onClick={() => setOpen("live")}
        style={{ bottom: "20%", left: "6%" }}
      />

      {/* Press Photos — bottom right */}
      <FloatingLabel
        label="Press Photos"
        onClick={() => setOpen("photos")}
        style={{ bottom: "32%", right: "6%" }}
      />

      {/* Get in Touch — bottom right lower */}
      <FloatingLabel
        label="Get in Touch"
        onClick={() => setOpen("contact")}
        style={{ bottom: "20%", right: "6%" }}
      />

      {/* Streaming links — bottom center */}
      <div
        className="absolute flex flex-wrap gap-2 justify-center"
        style={{ bottom: "6%", left: "50%", transform: "translateX(-50%)" }}
      >
        {[
          { label: "Spotify", href: "https://open.spotify.com/artist/2nyS5xoo0whI3q74gsRmHL", bg: "#1DB954", text: "#000" },
          { label: "Apple Music", href: "https://music.apple.com/us/artist/michael-cantor/1631765548", bg: "#fc3c44", text: "#fff" },
          { label: "YouTube Music", href: "https://youtube.com/channel/UCHLDDkR-qNPVgtFQFGk4aDw", bg: "#FF0000", text: "#fff" },
          { label: "Tidal", href: "https://tidal.com/artist/32899611/u", bg: "#000", text: "#fff" },
        ].map((p) => (
          <a
            key={p.label}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-full text-xs font-semibold hover:opacity-85 transition"
            style={{ backgroundColor: p.bg, color: p.text }}
          >
            {p.label}
          </a>
        ))}
      </div>

      {/* ── MODALS ── */}

      {open === "bio" && (
        <Modal onClose={() => setOpen(null)}>
          <h2 className="text-xl font-bold mb-4" style={{ color: "#8B6B4A" }}>Bio</h2>
          <div className="space-y-4 text-[14px] leading-relaxed" style={{ color: "#8B6B4A" }}>
            <p>Michael Cantor is a New York City based singer/songwriter from Westport, CT. He fell in love with music in his dad's car on their drives back and forth from Yonkers, NY, where Michael was born. They would listen to ELO, Radiohead, and the Allman Brothers on repeat. Those were his earliest influences. He later fell in love with Stevie Ray Vaughan and became obsessed with the guitar.</p>
            <p>Years later, Michael found himself writing songs and starting to sing. He found that writing songs made him happy and decided to go to Berklee School of Music. There, his musical influences became songwriters like Bob Dylan, Leif Vollebekk, and John Mayer. Michael says he likes how a song feels in his hands. He knows if his hands are on the same page, he's onto a new song.</p>
            <p>His debut single was released in 2023, and now he is very excited to be rolling out his debut album. It's a folk/pop record with some fusion sprinkled in. With each song, Michael says he's coming closer to hearing his true voice as an artist.</p>
          </div>
        </Modal>
      )}

      {open === "live" && (
        <Modal onClose={() => setOpen(null)}>
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
        <Modal onClose={() => setOpen(null)}>
          <h2 className="text-xl font-bold mb-4" style={{ color: "#8B6B4A" }}>Press Photos</h2>
          <div className="grid grid-cols-2 gap-3">
            {["/press-photo.jpg", "/bio-photo.jpg"].map((src, i) => (
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

      {open === "contact" && (
        <Modal onClose={() => setOpen(null)}>
          <h2 className="text-xl font-bold mb-4" style={{ color: "#8B6B4A" }}>Get in Touch</h2>
          <div className="flex flex-col gap-3">
            <a href="mailto:Michael.r.cantor@gmail.com"
              className="flex items-center gap-3 border border-[#D8D4CE] rounded-xl p-4 hover:opacity-70 transition-opacity">
              <div className="w-9 h-9 rounded-full bg-[#E8E4DE] flex items-center justify-center shrink-0" style={{ color: accent }}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: "#a08060" }}>Email</p>
                <p className="text-sm font-semibold truncate" style={{ color: "#8B6B4A" }}>Michael.r.cantor@gmail.com</p>
              </div>
            </a>
            <a href="tel:2032167905"
              className="flex items-center gap-3 border border-[#D8D4CE] rounded-xl p-4 hover:opacity-70 transition-opacity">
              <div className="w-9 h-9 rounded-full bg-[#E8E4DE] flex items-center justify-center shrink-0" style={{ color: accent }}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: "#a08060" }}>Phone</p>
                <p className="text-sm font-semibold" style={{ color: "#8B6B4A" }}>(203) 216-7905</p>
              </div>
            </a>
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
