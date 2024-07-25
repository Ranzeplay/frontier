import {
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function NotebookOverviewPage() {
  const params = useParams();
  const notebookId = params.notebookId;

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
                to={`/notebook/${notebookId}/edit/text`}
                className="hover:bg-blue-100 px-2 py-1 transition rounded text-left"
              >
                Text
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                to={`/notebook/${notebookId}/edit/draw`}
                className="hover:bg-blue-100 px-2 py-1 transition rounded text-left"
              >
                Draw
              </Link>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
}
