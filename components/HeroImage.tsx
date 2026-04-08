"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { MONTH_IMAGES, MONTH_GRADIENTS } from "@/lib/month-images";
import { formatMonthOnly, formatYearOnly } from "@/lib/calendar-utils";

interface HeroImageProps {
  month: number;
  year: number;
  className?: string;
}

export function HeroImage({ month, year, className }: HeroImageProps) {
  const image = MONTH_IMAGES[month];
  const gradient = MONTH_GRADIENTS[month];

  // Track failures per image URL (so changing months doesn't stay "stuck" in error)
  const [failedUrl, setFailedUrl] = useState<string | null>(null);

  const showImage = !!image?.url && failedUrl !== image.url;

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className={cn("absolute inset-0 bg-gradient-to-br", gradient)} />

      {showImage && image && (
        <Image
          key={image.url}
          src={image.url}
          alt={image.alt}
          fill
          unoptimized
          className="object-cover transition-opacity duration-700"
          onError={() => setFailedUrl(image.url)}
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      <div className="absolute bottom-0 right-0 p-4 md:p-6 text-right">
        <div
          className="inline-block px-4 py-2 md:px-5 md:py-3"
          style={{
            background: "rgba(37,99,235,0.92)",
            backdropFilter: "blur(8px)",
            clipPath: "polygon(12px 0%, 100% 0%, 100% 100%, 0% 100%)",
          }}
        >
          <p
            className="text-blue-200 font-body tracking-[0.2em] text-xs md:text-sm font-medium"
            style={{ lineHeight: 1.2 }}
          >
            {formatYearOnly(year, month)}
          </p>
          <p
            className="text-white font-display font-bold tracking-wider text-xl md:text-2xl"
            style={{ lineHeight: 1.1 }}
          >
            {formatMonthOnly(year, month).toUpperCase()}
          </p>
        </div>
      </div>

      {image?.credit && (
        <p className="absolute bottom-2 left-3 text-white/40 text-[9px] tracking-widest uppercase font-body">
          {image.credit}
        </p>
      )}
    </div>
  );
}