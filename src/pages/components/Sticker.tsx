import Image from "next/image";
import { useEffect, useState } from "react";

type StickerProps = {
  x: number;
  y: number;
  image: string;
};

const Sticker = ({ x, y, image }: StickerProps) => {
  const [opacity, setOpacity] = useState(1);
  const dx = x;
  const dy = y;

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(0);
    }, 0); // 시작 시 바로 애니메이션 시작

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="absolute w-20 h-20"
      style={{
        left: dx,
        top: dy,
        opacity: opacity,
        transition: "opacity 5s ease-out",
        userSelect: "none",
      }}
    >
      <Image
        src={image}
        alt="퐈이어"
        fill
        style={{ objectFit: "contain" }}
        draggable={false}
      />
    </div>
  );
};

export default Sticker;
