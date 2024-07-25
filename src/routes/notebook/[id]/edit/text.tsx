import Tiptap from "../../../../components/tiptap";

export default function NotebookEditTextPage() {
    return (
        <div className="p-8 flex flex-col space-y-4 w-full">
        <h1 className="text-4xl font-bold">Edit text</h1>
  
        <div className="prose w-full max-w-full shadow-md bg-white rounded-md">
          <Tiptap />
        </div>
  
        <div className="block space-x-2">
          <button className="px-3 py-1 border text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white cursor-pointer transition rounded-md">
            Submit
          </button>
          <button className="px-3 py-1 border text-gray-500 border-gray-500 hover:bg-gray-500 hover:text-white cursor-pointer transition rounded-md">
            Discard
          </button>
          <button className="px-3 py-1 border text-red-500 border-red-500 hover:bg-red-500 hover:text-white cursor-pointer transition rounded-md">
            Delete
          </button>
        </div>
      </div>
    );
  }