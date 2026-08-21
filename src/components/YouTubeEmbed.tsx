"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Product video player.
 *
 * Autoplays a muted, looping preview (a silent background clip) with a play
 * button on top. Clicking swaps in the full privacy-enhanced
 * (youtube-nocookie.com) player, which restarts the video from the beginning
 * with sound.
 *
 * The preview is deferred until the player nears the viewport. It sits below
 * the fold, and loading it eagerly pulled ~1.6 MB (player + video stream) into
 * the initial desktop load before the user had scrolled to it.
 */
export default function YouTubeEmbed({
  videoId,
  title,
  className,
}: {
  videoId: string;
  title: string;
  className?: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoverCapable, setHoverCapable] = useState(false);
  const [nearViewport, setNearViewport] = useState(false);
  const previewRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Only load the preview once the player is close to being seen.
  const autoPreview = hoverCapable && nearViewport;

  // Mobile/touch browsers commonly block muted YouTube-iframe autoplay and fall
  // back to the player's interactive chrome (title, big play button) which can't
  // be cropped away. So only run the muted preview on hover-capable desktops;
  // smaller/touch devices get a clean poster + play button instead.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (hover: hover)");
    const update = () => setHoverCapable(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Start the preview shortly before the section is reached. 200px is deliberate:
  // on a 1280x720 desktop the player sits ~470px below the fold, so a larger
  // margin fires on load and defeats the point. Falls back to loading
  // immediately where IntersectionObserver is absent.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setNearViewport(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNearViewport(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Muted, looping preview that autoplays on load (loop needs playlist=<id>).
  // enablejsapi lets us force captions off below for videos that default them on.
  const previewSrc = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&playsinline=1&modestbranding=1&rel=0&disablekb=1&cc_load_policy=0&enablejsapi=1`;
  // Full player: starts from the beginning, with sound, on click.
  const playerSrc = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1&cc_load_policy=0`;
  const posterSrc = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

  // Some videos default captions on; cc_load_policy=0 doesn't always honor that,
  // so explicitly unload the captions module via the iframe API once it's ready.
  useEffect(() => {
    if (isPlaying || !autoPreview) return;
    const iframe = previewRef.current;
    if (!iframe) return;
    const disableCaptions = () => {
      for (const mod of ["captions", "cc"]) {
        iframe.contentWindow?.postMessage(
          JSON.stringify({ event: "command", func: "unloadModule", args: [mod] }),
          "*",
        );
      }
    };
    // Poll briefly because the command is ignored until the player is ready.
    const interval = setInterval(disableCaptions, 600);
    const stop = setTimeout(() => clearInterval(interval), 8000);
    return () => {
      clearInterval(interval);
      clearTimeout(stop);
    };
  }, [isPlaying, autoPreview]);

  return (
    <div
      ref={containerRef}
      className={`relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-2xl ${className ?? ""}`}
    >
      {isPlaying ? (
        <iframe
          src={playerSrc}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <>
          {/* Poster shown until the preview iframe paints */}
          <Image
            src={posterSrc}
            alt=""
            aria-hidden="true"
            fill
            sizes="(min-width: 1024px) 960px, 100vw"
            className="object-cover"
          />
          {/* Muted, looping autoplay preview (desktop only).
              Scaled taller than 16:9 so the container crops YouTube's title bar
              (top) and chrome (bottom); the video itself still fills the box. */}
          {autoPreview && (
            <iframe
              ref={previewRef}
              src={previewSrc}
              title={`${title} preview`}
              tabIndex={-1}
              aria-hidden="true"
              allow="autoplay; encrypted-media"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[132%] w-full -translate-x-1/2 -translate-y-1/2"
            />
          )}
          {/* Click to play with sound from the beginning */}
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            aria-label={`Play video with sound: ${title}`}
            className="group absolute inset-0 flex h-full w-full cursor-pointer items-center justify-center"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-black/55 shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="ml-1 h-7 w-7 md:h-9 md:w-9"
                aria-hidden="true"
              >
                <polygon points="6 3 20 12 6 21 6 3" />
              </svg>
            </span>
          </button>
        </>
      )}
    </div>
  );
}
