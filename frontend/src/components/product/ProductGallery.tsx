"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  images: string[];
}

export default function ProductGallery({ images }: Props) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="pd-gallery-wrap">
      {/* Thumbnails */}
      <div className="pd-thumbs">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`pd-thumb ${idx === selectedIdx ? "active" : ""}`}
            onClick={() => setSelectedIdx(idx)}
          >
            <Image
              src={img || "/placeholder.jpg"}
              alt={`Thumbnail ${idx + 1}`}
              width={88}
              height={88}
            />
          </div>
        ))}
      </div>

      {/* Main Image */}
      <div className="pd-main-img">
        <Image
          src={images[selectedIdx] || "/placeholder.jpg"}
          alt={`Product Image ${selectedIdx + 1}`}
          width={560}
          height={560}
        />
      </div>
    </div>
  );
}
