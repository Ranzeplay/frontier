import { useNavigate, useParams } from "react-router-dom";
import Tiptap from "../../../../components/tiptap";
import { Input } from "@headlessui/react";
import { NotebookService } from "../../../../services/notebookService";
import { Editor } from "@tiptap/react";
import { tiptapExtensions } from "../../../../utils/tiptap";
import { NotebookText } from "../../../../models/notebook";
import { useEffect } from "react";

export default function NotebookEditTextPage() {
  const { textId, notebookId } = useParams();

  const editor = new Editor({
    extensions: tiptapExtensions,
    content: "",
  });

  useEffect(() => {
    async function fetchTextIfExists() {
      if (!notebookId || !textId) return;
      if (textId === "new") return;

      const text = await NotebookService.getText(notebookId, textId);
      editor.commands.setContent(text.content);
      (document.getElementById("titleInput") as HTMLInputElement).value = text.title;
    }

    fetchTextIfExists();
  });

  const navigate = useNavigate();
  function handleSubmit() {
    const title = (document.getElementById("titleInput") as HTMLInputElement)
      .value;
    const obj = {
      id: textId,
      title,
      content: editor.getHTML(),
    } as NotebookText;

    NotebookService.updateText(notebookId!, obj);
  }

  function handleDiscard() {
    navigate(-1);
  }

  function handleDelete() {
    if (!notebookId || !textId) return;
    if (textId === "new") return;

    NotebookService.deleteText(notebookId, textId);

    navigate(-1);
  }

  return (
    <div className="p-8 flex flex-col space-y-4 w-full">
      <h1 className="text-4xl font-bold">Edit text</h1>
      <h4 className="text-gray-600 ml-0.5">{textId}</h4>

      <Input
        id="titleInput"
        className="px-4 py-2 border rounded-md flex-grow"
        placeholder="Title"
      />

      <div className="prose w-full max-w-full shadow bg-white rounded-md">
        <Tiptap editor={editor} />
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
