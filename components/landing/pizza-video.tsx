'use client';

import { useEffect, useRef, useState } from 'react';

export function PizzaVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let manuallyPaused = false;
    const pause = () => { if (!video.paused) video.pause(); };
    const observe = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !preference.matches && !manuallyPaused) video.play().catch(() => {});
      else pause();
    }, { threshold: 0.25 });
    const change = () => { if (preference.matches) pause(); };
    const manual = () => { manuallyPaused = true; };
    video.addEventListener('manual-playback', manual);
    preference.addEventListener('change', change);
    observe.observe(video);
    return () => { observe.disconnect(); preference.removeEventListener('change', change); video.removeEventListener('manual-playback', manual); };
  }, []);
  return <div className="relative overflow-hidden rounded-3xl">
    {failed ? <img src="/images/landing/pizza-cutout.webp" alt="Pizza de pepperoni com uma fatia levantada" width={1024} height={1024} /> : <video
      ref={ref} src="/videos/pizza-hero.mp4" poster="/images/landing/pizza-cutout.webp"
      muted loop playsInline preload="metadata" aria-label="Pizza artesanal com uma fatia sendo levantada e queijo derretido"
      className="block aspect-square w-full object-contain" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setFailed(true)}
    />}
    {!failed && <button type="button" className="absolute bottom-4 right-4 rounded-full border border-background/30 bg-foreground/90 px-4 py-2 text-sm text-background focus-visible:outline-2 focus-visible:outline-accent" onClick={() => {
      const video = ref.current;
      if (!video) return;
      video.dispatchEvent(new Event('manual-playback'));
      if (video.paused) video.play().catch(() => {}); else video.pause();
    }}>{playing ? 'Pausar vídeo' : 'Reproduzir vídeo'}</button>}
  </div>;
}
