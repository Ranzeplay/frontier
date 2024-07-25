import { BubbleMenu, EditorProvider, FloatingMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";

import "./editor.css";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  Bold,
  ChevronDown,
  Code,
  Heading,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Highlighter,
  Image,
  Italic,
  Link,
  List,
  Strikethrough,
  Subscript,
  Superscript,
  Underline,
} from "lucide-react";

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];

const content = "<em>Type your text here...</em>";

const EditorMenuBar = () => {
  return (
    <div className="rounded -mb-4 px-2 pt-2 space-x-1">
      <Menu>
        <MenuButton className="inline-flex items-center bg-white hover:bg-gray-100 p-1 transition">
          <Heading size={21} strokeWidth={2} />
          <ChevronDown size={16} />
        </MenuButton>
        <MenuItems
          transition
          anchor="bottom start"
          className="flex flex-col bg-white min-w-24 border rounded-md py-1 px-1 shadow"
        >
          <MenuItem>
            <button className="hover:bg-blue-100 px-2 py-1 transition rounded">
              <Heading1 strokeWidth={1.1} />
            </button>
          </MenuItem>
          <MenuItem>
            <button className="hover:bg-blue-100 px-2 py-1 transition rounded">
              <Heading2 strokeWidth={1.1} />
            </button>
          </MenuItem>
          <MenuItem>
            <button className="hover:bg-blue-100 px-2 py-1 transition rounded">
              <Heading3 strokeWidth={1.1} />
            </button>
          </MenuItem>
          <MenuItem>
            <button className="hover:bg-blue-100 px-2 py-1 transition rounded">
              <Heading4 strokeWidth={1.1} />
            </button>
          </MenuItem>
          <MenuItem>
            <button className="hover:bg-blue-100 px-2 py-1 transition rounded">
              <Heading5 strokeWidth={1.1} />
            </button>
          </MenuItem>
          <MenuItem>
            <button className="hover:bg-blue-100 px-2 py-1 transition rounded">
              <Heading6 strokeWidth={1.1} />
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
      <button className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 p-1 transition">
        <Bold size={21} strokeWidth={2} />
      </button>
      <button className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 p-1 transition">
        <Italic size={21} strokeWidth={2} />
      </button>
      <button className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 p-1 transition">
        <Highlighter size={21} strokeWidth={2} />
      </button>
      <button className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 p-1 transition">
        <Link size={21} strokeWidth={2} />
      </button>
      <button className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 p-1 transition">
        <Strikethrough size={21} strokeWidth={2} />
      </button>
      <button className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 p-1 transition">
        <Subscript size={21} strokeWidth={2} />
      </button>
      <button className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 p-1 transition">
        <Superscript size={21} strokeWidth={2} />
      </button>
      <button className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 p-1 transition">
        <Underline size={21} strokeWidth={2} />
      </button>
      <button className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 p-1 transition">
        <List size={21} strokeWidth={2} />
      </button>
      <button className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 p-1 transition">
        <Code size={21} strokeWidth={2} />
      </button>
      <button className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 p-1 transition">
        <Image size={21} strokeWidth={2} />
      </button>
    </div>
  );
};

const Tiptap = () => {
  return (
    <EditorProvider
      slotBefore={<EditorMenuBar />}
      extensions={extensions}
      content={content}
    >
      <FloatingMenu editor={null}>Floating menu</FloatingMenu>
      <BubbleMenu editor={null}>This is the bubble menu</BubbleMenu>
    </EditorProvider>
  );
};

export default Tiptap;
