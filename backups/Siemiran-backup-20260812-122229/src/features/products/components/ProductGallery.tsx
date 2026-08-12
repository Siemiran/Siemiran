"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  alt: string;
}

export default function ProductGallery({ images, alt }: Props) {
  const [selected, setSelected] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  return (
    <>
      <section className="space-y-4">
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <Image
            src={images[selected]}
            alt={alt}
            fill
            priority
            onClick={() => setZoomOpen(true)}
            className="cursor-zoom-in object-contain p-8 transition-transform duration-200 hover:scale-[1.02]"
            sizes="(max-width:768px)100vw,50vw"
          />
        </div>

        {images.length > 1 && (
          <div className="flex flex-wrap gap-3">
            {images.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setSelected(index)}
                className={`relative h-20 w-20 overflow-hidden rounded-xl border transition ${
                  selected === index
                    ? "border-cyan-600 ring-2 ring-cyan-200"
                    : "border-slate-200 hover:border-slate-400"
                }`}
              >
                <Image
                  src={image}
                  alt={`${alt}-${index + 1}`}
                  fill
                  className="object-contain p-2"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </section>

      {zoomOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-8"
          onClick={() => setZoomOpen(false)}
        >
          <button
            type="button"
            onClick={() => setZoomOpen(false)}
            className="absolute top-6 right-6 rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow hover:bg-slate-100"
          >
            ✕ Close
          </button>

          <div
            className="relative h-[90vh] w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selected]}
              alt={alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </>
  );
}
