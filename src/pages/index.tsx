import Image from "next/image";
import { useEffect, useState } from "react";
import Sticker from "./components/Sticker";

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [stickers, setStickers] = useState<{ x: number; y: number }[]>([]);
  const [clickableRange, setClickableRange] = useState<{
    top: number;
    left: number;
    bottom: number;
    right: number;
  }>({
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  });
  const stickerImage = "/assets/fire.png";

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
  };

  const handleStickers = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
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

  useEffect(() => {
    alert("완료");
    // clickableDiv 관련 코드 실행
    const clickableDiv = document.getElementById("clickable");
    if (clickableDiv) {
      const rect = clickableDiv.getBoundingClientRect();
      console.log("Top:", rect.top);
      console.log("Left:", rect.left);
      console.log("Bottom:", rect.bottom);
      console.log("Right:", rect.right);
      setClickableRange({
        top: rect.top,
        left: rect.left,
        bottom: rect.bottom,
        right: rect.right,
      });
    }
  }, [uploadedFile, imageUrl]);

  return (
    <div className="flex flex-col h-svh">
      <header className="p-2 navbar">
        <div className="w-full h-full p-2 rounded-lg bg-base-300">
          <div className="flex-1">
            <input
              type="file"
              className="w-full max-w-xs file-input"
              onChange={handleImageUpload}
            />
          </div>
          <div className="flex-none">
            <button
              onClick={() => alert("업데이트 예정입니다!")}
              className="btn btn-outline"
            >
              스티커 선택
            </button>
          </div>
        </div>
      </header>
      <main className="flex items-center justify-center flex-1 p-12">
        <div className="relative flex items-center justify-center w-screen h-full">
          {uploadedFile && imageUrl ? (
            <div
              id="clickable"
              onClick={handleStickers}
              className="w-full h-full bg-red-500"
            >
              <Image
                src={imageUrl}
                alt="업로드된 이미지"
                fill
                style={{ objectFit: "contain" }}
                className="rounded-lg"
                draggable={false}
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
            <p className="absolute flex items-center justify-center w-full h-full">
              이미지를 업로드 해주세요.
            </p>
          )}
        </div>
      </main>
      <footer className="flex flex-row items-center justify-end gap-2 p-2 m-2 text-gray-400 rounded-lg bg-base-300">
        <button className="btn btn-outline btn-sm">주의 사항</button>
        <div className="flex-1" />
        <p>1.1.1v</p>
        <p>2024.12.07</p>
      </footer>
    </div>
  );
}
