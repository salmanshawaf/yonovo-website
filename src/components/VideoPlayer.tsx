"use client";

import { useRef, useState, useEffect, useCallback } from "react";

export default function VideoPlayer({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const CIRCUMFERENCE = 2 * Math.PI * 14.8; // ~92.99

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress(video.currentTime / video.duration);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  const dashOffset = CIRCUMFERENCE * (1 - progress);

  return (
    <div className={`group relative ${className ?? ""}`}>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={src} type="video/quicktime" />
        <source src={src} type="video/mp4" />
      </video>

      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause video" : "Play video"}
        className="absolute bottom-4 left-4 cursor-pointer rounded-full bg-black/25 p-2 opacity-90 transition-opacity md:p-3 group-hover:opacity-100"
      >
        {/* Progress ring */}
        <svg
          aria-label="video progress"
          role="img"
          className="-rotate-90 absolute top-0 left-0 h-full w-full"
          viewBox="0 0 32 32"
        >
          <circle
            cx="16"
            cy="16"
            r="14.8"
            fill="none"
            stroke="white"
            strokeWidth="2.3"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            className="opacity-90 transition-[stroke-dashoffset] duration-300"
          />
        </svg>

        {/* Play / Pause icon */}
        {isPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
            stroke="currentColor"
            strokeWidth="0"
            className="relative h-4 w-4 md:h-6 md:w-6"
            aria-hidden="true"
          >
            <rect x="14" y="4" width="4" height="16" rx="1" />
            <rect x="6" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
            stroke="currentColor"
            strokeWidth="0"
            className="relative h-4 w-4 md:h-6 md:w-6"
            aria-hidden="true"
          >
            <polygon points="6 3 20 12 6 21 6 3" />
          </svg>
        )}
      </button>
    </div>
  );
}
