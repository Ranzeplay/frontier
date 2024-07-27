import { Input, Textarea } from "@headlessui/react";
import { useState } from "react";
import { NotebookService } from "../../services/notebookService";
import { message } from "@tauri-apps/api/dialog";
import { useNavigate } from "react-router-dom";

export default function NotebookCreatePage() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const navigate = useNavigate();

  async function createNotebook() {
    if(title.trim() == "") {
      await message("There must be a title", { title: "Frontier", type: 'error' });
      return;
    }

    const id = await NotebookService.createNotebook(title, description);

    navigate(`/notebook/${id}`);
  }

  function handleDiscard() {
    navigate(-1);
  }

  return (
    <div className="p-8 flex flex-col space-y-2 max-w-screen-lg">
      <h1 className="text-4xl font-bold">Create Notebook</h1>
      <Input value={title} onChange={e => setTitle(e.target.value)}
        className="px-4 py-2 border rounded-md flex-grow"
        placeholder="Name"
      />
      <Textarea value={description} onChange={e => setDescription(e.target.value)}
        className="px-4 py-2 border rounded-md flex-grow"
        rows={7}
        placeholder="Description"
      />
      <div>{/* Tags */}</div>
      <div className="block space-x-2">
          <button
            onClick={createNotebook}
            className="px-3 py-1 border text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white cursor-pointer transition rounded-md"
          >
            Create
          </button>
          <button
            onClick={handleDiscard}
            className="px-3 py-1 border text-gray-500 border-gray-500 hover:bg-gray-500 hover:text-white cursor-pointer transition rounded-md"
          >
            Discard
          </button>
        </div>
    </div>
  );
}
