"use client";

import { useState } from "react";
import Image from "next/image";
import type { CaseStudyStat } from "@/data/caseStudies";

export default function CaseStudyCard({
  companyName,
  logo,
  title,
  stats,
}: {
  companyName: string;
  logo: { src: string; width: number; height: number };
  title: string;
  stats: CaseStudyStat[];
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative pt-6 pl-4"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Logo sticker — overlapping top-left */}
      <div className="absolute top-0 left-0 z-10 flex items-center justify-center rounded-xl bg-white shadow-lg border border-border w-[120px] h-[56px] md:w-[140px] md:h-[64px]">
        <Image
          src={logo.src}
          alt={companyName}
          width={logo.width}
          height={logo.height}
          className="w-[80px] md:w-[96px] h-auto object-contain"
        />
      </div>

      {/* Card */}
      <div
        className={`group flex flex-col justify-between overflow-hidden rounded-2xl p-6 pt-10 md:p-8 md:pt-12 min-h-[320px] md:min-h-[400px] transition-all duration-500 ease-out ${
          hovered
            ? "scale-[1.02] shadow-2xl shadow-brand-blue/20 border border-white/15"
            : "scale-100 border border-transparent"
        }`}
        style={{
          background: hovered
            ? "linear-gradient(135deg, #0c2756 0%, #0c2756 35%, #203a7f 60%, #e13f3f 100%)"
            : "linear-gradient(135deg, #0c2756 0%, #0c2756 60%, #203a7f 85%, #8b2525 100%)",
          transition: "all 500ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Spacer for logo overlap area */}
        <div />

        {/* Badge + Title + Stats — bottom */}
        <div className="flex flex-col gap-3">
          <span className="inline-flex w-fit items-center rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-foreground">
            Case Study
          </span>
          <h3 className="font-medium text-xl text-white leading-snug tracking-tight md:text-2xl lg:text-[1.75rem]">
            {title}
          </h3>

          {/* Stats — slide in on hover */}
          <div
            className="grid transition-[grid-template-rows] duration-400 ease-in-out"
            style={{ gridTemplateRows: hovered ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden">
              <div className="grid grid-cols-3 gap-2 pt-3 md:gap-3 md:pt-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col gap-1 rounded-xl bg-white p-3 md:p-4"
                  >
                    <span className="font-medium text-base text-foreground tracking-tight md:text-lg">
                      {stat.value}
                    </span>
                    <span className="text-[11px] text-muted leading-tight md:text-xs">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
