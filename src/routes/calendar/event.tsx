import { Field, Input, Label, Radio, RadioGroup, Textarea } from "@headlessui/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CalendarEventPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [time, setTime] = useState(new Date());
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"default" | "low" | "medium" | "high">(
    "default"
  );

  function handleSubmit(): void {
    throw new Error("Function not implemented.");
  }

  function handleDiscard(): void {
    navigate(-1);
  }

  function handleDelete(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="p-8 flex flex-col space-y-4 w-full">
      <h1 className="text-4xl font-bold">Edit calendar event</h1>
      <h4 className="text-gray-600 ml-0.5">{eventId}</h4>

      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="px-4 py-2 border rounded-md flex-grow"
        placeholder="Title"
      />

      <Input
        value={time.toISOString().slice(0, 16)}
        onChange={(e) => setTime(new Date(e.target.value))}
        className="px-4 py-2 border rounded-md shadow"
        placeholder="Time"
        type="datetime-local"
      />

      <div className="px-4 py-2 border rounded-md shadow bg-white flex flex-row space-x-6 items-center">
        <p className="text-gray-400">Priority</p>
        <RadioGroup
          className="flex flex-row space-x-3"
          value={priority}
          onChange={(e) => setPriority(e)}
        >
          <Field className="flex flex-row items-center gap-2">
            <Radio
              value="default"
              className="group flex size-5 items-center justify-center rounded-full border bg-white data-[checked]:bg-blue-400 data-[disabled]:bg-gray-100 transition cursor-pointer"
            >
              <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
            </Radio>
            <Label className="data-[disabled]:opacity-50">Default</Label>
          </Field>
          <Field className="flex flex-row items-center gap-2">
            <Radio
              value="low"
              className="group flex size-5 items-center justify-center rounded-full border bg-white data-[checked]:bg-blue-400 data-[disabled]:bg-gray-100 transition cursor-pointer"
            >
              <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
            </Radio>
            <Label className="data-[disabled]:opacity-50">Low</Label>
          </Field>
          <Field className="flex flex-row items-center gap-2">
            <Radio
              value="medium"
              className="group flex size-5 items-center justify-center rounded-full border bg-white data-[checked]:bg-blue-400 data-[disabled]:bg-gray-100 transition cursor-pointer"
            >
              <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
            </Radio>
            <Label className="data-[disabled]:opacity-50">Medium</Label>
          </Field>
          <Field className="flex flex-row items-center gap-2">
            <Radio
              value="high"
              className="group flex size-5 items-center justify-center rounded-full border bg-white data-[checked]:bg-blue-400 data-[disabled]:bg-gray-100 transition cursor-pointer"
            >
              <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
            </Radio>
            <Label className="data-[disabled]:opacity-50">High</Label>
          </Field>
        </RadioGroup>
      </div>

      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="px-4 py-2 border rounded-md flex-grow"
        rows={7}
        placeholder="Description"
      />

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
