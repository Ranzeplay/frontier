import { Button, Input, Textarea } from "@headlessui/react";

export default function NotebookCreatePage() {
  return (
    <div className="p-8 flex flex-col space-y-2 max-w-screen-lg">
      <h1 className="text-4xl font-bold">Create Notebook</h1>
      <Input
        className="px-4 py-2 border rounded-md flex-grow"
        placeholder="Name"
      />
      <Textarea
        className="px-4 py-2 border rounded-md flex-grow"
        rows={7}
        placeholder="Description"
      />
      <div>{/* Tags */}</div>
      <div className="block">
        <Button className="px-4 py-1.5 hover:bg-blue-500 text-blue-500 hover:text-white rounded-md border-blue-500 border transition">
          Create
        </Button>
      </div>
    </div>
  );
}
