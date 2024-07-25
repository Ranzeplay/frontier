import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";

import './editor.css';

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
    <div className="rounded -mb-4">
        <button className="px-2 py-1  border border-gray-500">Hello</button>
    </div>
  );
};

const Tiptap = () => {
  return (
    <EditorProvider slotBefore={<EditorMenuBar />} extensions={extensions} content={content}></EditorProvider>
  );
};

export default Tiptap;
