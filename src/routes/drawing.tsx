import { Excalidraw } from "@excalidraw/excalidraw";

export default function DrawingPage() {
  return (
    <div style={{ width: window.innerWidth, height: window.innerHeight }}>
      <Excalidraw />
    </div>
  );
}
