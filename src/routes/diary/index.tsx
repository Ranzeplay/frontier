import { Input } from "@headlessui/react";
import { Clock, Text } from "lucide-react";

export default function DiaryIndexPage() {
  return (
    <div className="p-8 flex flex-col space-y-2">
      <h1 className="text-4xl font-bold">Diaries</h1>
      <h4 className="text-gray-600 ml-0.5">Showing 30 entries</h4>
      <div className="flex flex-row space-x-2 items-center">
        <Input
          className="px-4 py-2 border rounded-md flex-grow"
          placeholder="Search"
        />
        <a
          href="/diary/create"
          role="button"
          className="px-4 py-1.5 hover:bg-blue-500 text-blue-500 hover:text-white rounded-md border-blue-500 border transition"
        >
          Create
        </a>
      </div>

      <div className="flex flex-col space-y-1">
        <div className="bg-white shadow rounded-md">
          <div className="p-4 flex flex-row justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">
                <a
                  className="text-blue-500 hover:underline cursor-pointer"
                  href="/diary/202407/diary-1"
                >
                  Diary 1
                </a>
              </h3>
              <div className="flex flex-row space-x-4">
                <p className="text-gray-500 flex flex-row space-x-1 items-center">
                  <Clock size={16} />
                  <span className="ml-1">2024-7-25 9:41</span>
                </p>
                <p className="text-gray-500 flex flex-row space-x-1 items-center">
                  <Text size={16} />
                  <span className="ml-1">499 characters</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
