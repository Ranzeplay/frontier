import { Input } from "@headlessui/react";
import { Text } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DiaryEntry } from "../../models/diary";
import { DiaryService } from "../../services/diaryService";
import cuid2 from "@paralleldrive/cuid2";

export default function DiaryIndexPage() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  useEffect(() => {
    async function fetchDiaries() {
      const ids = await DiaryService.getIdList();

      const diaries: DiaryEntry[] = [];
      for (const id of ids) {
        diaries.push(await DiaryService.getMetadata(id));
      }
      diaries.sort((a, b) => {
        if (a.year !== b.year) {
          return b.year - a.year;
        }
        if (a.month !== b.month) {
          return b.month - a.month;
        }
        if (a.day !== b.day) {
          return b.day - a.day;
        }
        return b.index - a.index;
      });
      setDiaries(diaries);
    }

    fetchDiaries();
  }, []);

  return (
    <div className="p-8 flex flex-col space-y-2">
      <h1 className="text-4xl font-bold">Diaries</h1>
      <h4 className="text-gray-600 ml-0.5">Showing 30 entries</h4>
      <div className="flex flex-row space-x-2 items-center">
        <Input
          className="px-4 py-2 border rounded-md flex-grow"
          placeholder="Search"
        />
        <Link
          to="/diary/0/0/0/-1/edit"
          role="button"
          className="px-4 py-1.5 hover:bg-blue-500 text-blue-500 hover:text-white rounded-md border-blue-500 border transition"
        >
          Create
        </Link>
      </div>

      <div className="flex flex-col space-y-1 mt-8">
        {diaries.map((diary) => (
          <div key={cuid2.createId()} className="bg-white shadow rounded-md">
            <div className="p-4 flex flex-row justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">
                  <Link
                    className="text-blue-500 hover:underline cursor-pointer"
                    to={`/diary/${diary.year}/${diary.month}/${diary.day}/${diary.index}/edit`}
                  >
                    {diary.year}-{diary.month}-{diary.day} #{diary.index}
                  </Link>
                </h3>
                <div className="flex flex-row space-x-4">
                  <p className="text-gray-500 flex flex-row space-x-1 items-center">
                    <Text size={16} />
                    <span className="ml-1">
                      {diary.content.length} characters
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
