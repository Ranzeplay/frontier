import {
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { ChevronDown, Clock, Filter } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { NotebookService } from "../../../services/notebookService";
import { NotebookEntryView } from "../../../models/notebook";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function NotebookOverviewPage() {
  const { notebookId } = useParams();

  const [content, setContent] = useState<NotebookEntryView[]>([]);
  useEffect(() => {
    async function fetchMetadata() {
      const metadata = await NotebookService.getMetadata(notebookId!);

      const tempContent: NotebookEntryView[] = [];
      for (const entry of metadata.content) {
        const entryContent = await NotebookService.getText(
          notebookId!,
          entry.id
        );
        const view: NotebookEntryView = {
          id: entry.id,
          title: entryContent.title,
          type: entry.type,
          lastModifiedAt: new Date(),
        };

        tempContent.push(view);
      }

      setContent(tempContent);
    }

    fetchMetadata();
  }, [notebookId]);

  return (
    <div className="p-8 flex-col space-y-2">
      <h1 className="text-4xl font-bold">Notebook Overview</h1>
      <p className="text-gray-500">{notebookId}</p>

      <div className="flex flex-row space-x-2 items-center">
        <Input
          className="px-4 py-2 border rounded-md flex-grow"
          placeholder="Search"
        />
        <Menu>
          <MenuButton className="inline-flex items-center px-4 py-1.5 hover:bg-blue-500 text-blue-500 hover:text-white rounded-md border-blue-500 border transition">
            Create
            <ChevronDown size={16} />
          </MenuButton>
          <MenuItems
            transition
            anchor="bottom end"
            className="flex flex-col bg-white min-w-32 border rounded-md p-2 shadow"
          >
            <MenuItem>
              <Link
                to={`/notebook/${notebookId}/edit/text/new`}
                className="hover:bg-blue-100 px-2 py-1 transition rounded text-left"
              >
                Text
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                to={`/notebook/${notebookId}/draw`}
                className="hover:bg-blue-100 px-2 py-1 transition rounded text-left"
              >
                Draw
              </Link>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>

      <div className="flex flex-col space-y-2">
        {content.map((c) => (
          <div key={c.id} className="bg-white shadow rounded-md">
            <div className="p-4 flex flex-row justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">
                  <Link
                    className="text-blue-500 hover:underline cursor-pointer"
                    to={
                      c.type === "text"
                        ? `/notebook/${notebookId}/edit/text/${c.id}`
                        : `/notebook/${notebookId}/edit/draw/${c.id}`
                    }
                  >
                    {c.title}
                  </Link>
                </h3>
                <div className="flex flex-row space-x-4">
                  <p className="text-gray-500 flex flex-row space-x-1 items-center">
                    <Clock size={16} />
                    <span className="ml-1">
                      {dayjs(c.lastModifiedAt).format("YYYY-M-D H:mm")}
                    </span>
                  </p>
                  <p className="text-gray-500 flex flex-row space-x-1 items-center">
                    <Filter size={16} />
                    <span className="ml-1">
                      {c.type === "text" ? "Text" : "Drawing"}
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
