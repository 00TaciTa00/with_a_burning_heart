import Canvas from "@/components/Canvas";

export default function testpage() {
  const handleCanvasClick = () => {
    console.log("Canvas Clicked!");
  };
  return (
    <div className="flex flex-col w-full h-svh">
      <header className="flex">Test Page</header>
      <main className="flex-1">
        <div className="w-full h-full" onClick={handleCanvasClick}>
          <Canvas />
        </div>
      </main>
      <footer className="flex">24.12.11</footer>
    </div>
  );
}
