import { Input } from "@headlessui/react";

export default function NotebookIndexPage() {
  return (
    <div className="p-8 flex flex-col space-y-2">
      <h1 className="text-4xl font-bold">Notebooks</h1>
      <h4 className="text-gray-600 ml-0.5">Showing 6 entries</h4>
      <div className="flex flex-row space-x-2 items-center">
        <Input
          className="px-4 py-2 border rounded-md flex-grow"
          placeholder="Search"
        />
        <a
          href="/notebook/create"
          role="button"
          className="px-4 py-1.5 hover:bg-blue-500 text-blue-500 hover:text-white rounded-md border-blue-500 border transition"
        >
          Create
        </a>
      </div>

      <div className="grid grid-cols-2 gap-8 mt-8">
        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
          <img
            className="w-full h-auto rounded-t-xl"
            src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80"
            alt="Card Image"
          />
          <div className="p-4 md:p-5">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              Card title
            </h3>
            <p className="mt-1 text-gray-500 dark:text-neutral-400">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a
              className="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              href="#"
            >
              Go somewhere
            </a>
          </div>
        </div>
        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
          <img
            className="w-full h-auto rounded-t-xl"
            src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80"
            alt="Card Image"
          />
          <div className="p-4 md:p-5">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              Card title
            </h3>
            <p className="mt-1 text-gray-500 dark:text-neutral-400">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a
              className="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              href="#"
            >
              Go somewhere
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
