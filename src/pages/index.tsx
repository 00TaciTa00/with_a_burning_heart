import { useState } from "react";
import Image from "next/image";
import ImageInput from "@/components/ImageInput";
import Sticker from "@/components/Sticker";
import ImageCloseButton from "@/components/ImageCloseButton";
import { RECTTYPE } from "@/types/index";

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [stickers, setStickers] = useState<{ x: number; y: number }[]>([]);
  const [clickableRange, setClickableRange] = useState<RECTTYPE>({
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  });
  const stickerImage = "/assets/stickers/fire.png";

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const file = files[0];

    if (file) {
      // 파일 읽기
      const reader = new FileReader();

      reader.onload = (e) => {
        // 파일 내용 읽기 완료 후 실행
        if (e.target && typeof e.target.result === "string") {
          setImageUrl(e.target.result);

          // 파일 정보 저장
          setUploadedFile(file);
        }
      };

      reader.readAsDataURL(file);
    }

    const clickableDiv = document.getElementById("clickable");
    if (clickableDiv) {
      const rect = clickableDiv.getBoundingClientRect();
      setClickableRange({
        top: rect.top,
        left: rect.left,
        bottom: rect.bottom,
        right: rect.right,
      });
    }
  };

  const handleImageDelete = () => {
    alert("이미지를 삭제합니다.");
    setUploadedFile(null);
    setImageUrl(null);
    setStickers([]);
  };

  const handleStickers = (event: React.MouseEvent<HTMLDivElement>) => {
    const clickableDiv = document.getElementById("clickable");
    if (!clickableDiv) return;

    const rect = clickableDiv.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log(x, y);
    console.log(
      clickableRange.left,
      clickableRange.bottom,
      clickableRange.right,
      clickableRange.top
    );
    if (
      !clickableRange ||
      x < clickableRange.left ||
      x > clickableRange.right ||
      y < clickableRange.top ||
      y > clickableRange.bottom
    ) {
      console.log("이미지 영역을 벗어났습니다.");
      return;
    }

    setStickers([...stickers, { x: x - 48, y: y - 48 }]);
  };

  return (
    <div className="flex flex-col h-svh">
      <header className="p-2">
        <div className="flex flex-row items-center justify-center w-full h-full p-2 rounded-lg bg-slate-200">
          <div className="flex-none">
            <button onClick={() => alert("업데이트 예정입니다!")}>
              스티커 선택
            </button>
          </div>
        </div>
      </header>
      <main className="flex items-center justify-center flex-1 p-12">
        <div
          className="relative flex items-center justify-center w-screen h-full bg-transparent"
          id="clickable"
        >
          {uploadedFile && imageUrl ? (
            <div className="w-full h-full">
              <ImageCloseButton
                dataModalTarget="static-modal"
                dataModalToggle=""
                onClick={handleImageDelete}
              />
              <Image
                src={imageUrl}
                alt="업로드된 이미지"
                fill
                style={{ objectFit: "contain" }}
                className="rounded-lg"
                draggable={false}
                onClick={handleStickers}
              />
              {stickers.map((sticker, index) => (
                <Sticker
                  key={index}
                  x={sticker.x}
                  y={sticker.y}
                  image={stickerImage}
                />
              ))}
            </div>
          ) : (
            <ImageInput onChange={handleImageUpload} />
          )}
        </div>
      </main>
      <footer className="flex flex-row items-center justify-end gap-2 p-2 m-2 text-gray-400 border-2 rounded-lg">
        <div className="flex-1" />
        <p>1.1.1v</p>
        <p>2024.12.07</p>
      </footer>
    </div>
  );
}
