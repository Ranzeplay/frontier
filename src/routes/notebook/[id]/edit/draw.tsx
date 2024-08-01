import { Input } from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
import { NotebookService } from "../../../../services/notebookService";
import { Excalidraw } from "@excalidraw/excalidraw";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useKeyPress } from "@react-typed-hooks/use-key-press";
import { useEffect, useState } from "react";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import { NotebookDrawing } from "../../../../models/notebook";

export default function NotebookEditDrawingPage() {
  const { drawingId, notebookId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI>();

  useEffect(() => {
    async function fetchDrawingIfExists() {
      if (!notebookId || !drawingId) return;
      if (drawingId === "new") return;

      const drawing = await NotebookService.getDrawing(notebookId, drawingId);
      excalidrawAPI?.updateScene({ elements: JSON.parse(drawing.content) });
      console.log(JSON.parse(drawing.content));
      setTitle(drawing.title);
    }

    fetchDrawingIfExists();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawingId, notebookId]);

  const drawingPanelFullscreenandle = useFullScreenHandle();
  const escapeKeyPressed = useKeyPress({ targetKey: "Escape" });
  useEffect(() => {
    if (escapeKeyPressed) {
      drawingPanelFullscreenandle.exit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [escapeKeyPressed]);

  function handleSubmit() {
    const obj = {
      id: drawingId,
      title,
      content: JSON.stringify(excalidrawAPI?.getSceneElements()),
    } as NotebookDrawing;

    NotebookService.updateDrawing(notebookId!, obj);
    navigate('/notebook/' + notebookId);
  }

  function handleDiscard() {
    navigate(-1);
  }

  async function handleDelete() {
    if (!notebookId || !drawingId) return;
    if (drawingId === "new") return;

    await NotebookService.deleteDrawing(notebookId, drawingId);

    navigate(-1);
  }

  return (
    <div className="p-8 flex flex-col space-y-4 w-full">
      <h1 className="text-4xl font-bold">Edit drawing</h1>
      <h4 className="text-gray-600 ml-0.5">{drawingId}</h4>

      <Input value={title} onChange={(e) => setTitle(e.target.value)}
        className="px-4 py-2 border rounded-md flex-grow"
        placeholder="Title"
      />

      <FullScreen handle={drawingPanelFullscreenandle}>
        <Excalidraw excalidrawAPI={api => setExcalidrawAPI(api)} />
      </FullScreen>

      <div className="block -mt-4 mb-16">
        <button
          onClick={drawingPanelFullscreenandle.enter}
          className="px-3 py-1 text-blue-500 hover:underline cursor-pointer"
        >
          Open Excalidraw to edit
        </button>
      </div>

      <div className="block space-x-2">
        <button
          onClick={handleSubmit}
          className="px-3 py-1 border text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white cursor-pointer transition rounded-md"
        >
          Submit
        </button>
        <button
          onClick={handleDiscard}
          className="px-3 py-1 border text-gray-500 border-gray-500 hover:bg-gray-500 hover:text-white cursor-pointer transition rounded-md"
        >
          Discard
        </button>
        <button
          onClick={handleDelete}
          className="px-3 py-1 border text-red-500 border-red-500 hover:bg-red-500 hover:text-white cursor-pointer transition rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
