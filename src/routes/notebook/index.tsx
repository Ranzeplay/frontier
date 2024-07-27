import { Input } from "@headlessui/react";
import { NotebookService } from "../../services/notebookService";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Notebook } from "../../models/notebook";

export default function NotebookIndexPage() {
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  useEffect(() => {
    async function fetchNotebooks() {
      const ids = await NotebookService.getIdList();
      const metadataList = await Promise.all(ids.map((id) => NotebookService.getMetadata(id)));

      setNotebooks(metadataList);
    }

    fetchNotebooks();
  }, []);

  return (
    <div className="p-8 flex flex-col space-y-2">
      <h1 className="text-4xl font-bold">Notebooks</h1>
      <h4 className="text-gray-600 ml-0.5">Showing {notebooks.length} item(s)</h4>
      <div className="flex flex-row space-x-2 items-center">
        <Input
          className="px-4 py-2 border rounded-md flex-grow"
          placeholder="Search"
        />
        <a
          href="/notebook/create"
          role="button"
          className="px-4 py-1.5 hover:bg-blue-500 text-blue-500 hover:text-white rounded-md border-blue-500 border transition"
        >
          Create
        </a>
      </div>

      <div className="grid grid-cols-2 gap-8 mt-8">
        {notebooks.map((notebook) => (
          <div key={notebook.id} className="flex flex-col bg-white border shadow-sm rounded-xl">
          <div className="p-4 md:p-5">
            <h3 className="text-lg font-bold text-gray-800">
              {notebook.title}
            </h3>
            <p className="mt-1 text-gray-500">
              {notebook.description}
            </p>
            <Link
              className="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              to={`/notebook/${notebook.id}`}
            >
              View
            </Link>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
}
