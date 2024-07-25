import Tiptap from "../../components/tiptap";

export default function DiaryEditPage() {
  return (
    <div className="p-8 flex flex-col space-y-4 w-full">
      <h1 className="text-4xl font-bold">Edit diary</h1>

      <div className="prose w-full max-w-full shadow-md bg-white rounded-md">
        <Tiptap />
      </div>

      <div className="block">
        <button className="px-3 py-1 border text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white cursor-pointer transition rounded-md">
          Submit
        </button>
      </div>
    </div>
  );
}
