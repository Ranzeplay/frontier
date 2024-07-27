import { useNavigate, useParams } from "react-router-dom";
import Tiptap from "../../components/tiptap";
import { Editor } from "@tiptap/react";
import { tiptapExtensions } from "../../utils/tiptap";
import { DiaryService } from "../../services/diaryService";
import dayjs from "dayjs";
import { useEffect } from "react";

export default function NotebookEditTextPage() {
  const { year, month, day, index } = useParams();

  const editor = new Editor({
    extensions: tiptapExtensions,
    content: "",
  });

  useEffect(() => {
    async function fetchDiary() {
      if (index !== "-1") {
        const diary = await DiaryService.getMetadata(
          DiaryService.getId(
            parseInt(year!),
            parseInt(month!),
            parseInt(day!),
            parseInt(index!)
          )
        );
        editor.commands.setContent(diary.content);
      }
    }

    fetchDiary();
  }, [day, index, month, year]);

  const navigate = useNavigate();
  async function handleSubmit() {
    if (index === "-1") {
      const now = dayjs();
      await DiaryService.createNextDiary(
        now.year(),
        now.month() + 1,
        now.date(),
        editor.getHTML()
      );
    } else {
      await DiaryService.updateDiary(
        parseInt(year!),
        parseInt(month!),
        parseInt(day!),
        parseInt(index!),
        editor.getHTML()
      );
    }

    navigate('/diary');
  }

  function handleDiscard() {
    navigate(-1);
  }

  function handleDelete() {
    DiaryService.deleteDiary(
      DiaryService.getId(
        parseInt(year!),
        parseInt(month!),
        parseInt(day!),
        parseInt(index!)
      )
    );
    navigate(-1);
  }

  return (
    <div className="p-8 flex flex-col space-y-4 w-full">
      <h1 className="text-4xl font-bold">Edit diary</h1>
      <h4 className="text-gray-600 ml-0.5">
        {index == "-1" ? "New" : `${year}-${month}-${day} #${index}`}
      </h4>

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
