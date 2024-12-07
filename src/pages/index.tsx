import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

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
        }
      };

      reader.readAsDataURL(file);

      // 파일 정보 저장
      setUploadedFile(file);
    }
  };

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
            <button className="btn btn-outline">스티커 선택</button>
          </div>
        </div>
      </header>
      <main className="flex items-center justify-center flex-1 p-2">
        <div className="relative w-screen h-full p-2">
          {uploadedFile && imageUrl ? (
            <Image
              src={imageUrl}
              alt="업로드된 이미지"
              fill
              style={{ objectFit: "contain" }}
            />
          ) : (
            <p>이미지를 업로드 해주세요.</p>
          )}
        </div>
      </main>
      <footer className="flex flex-row items-center justify-end gap-2 p-2 m-2 text-gray-400 rounded-lg bg-base-300">
        <p>1.1.1v</p>
        <p>2024.12.07</p>
      </footer>
    </div>
  );
}
