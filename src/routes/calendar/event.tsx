import {
  Button,
  Field,
  Input,
  Label,
  Radio,
  RadioGroup,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Textarea,
} from "@headlessui/react";
import dayjs from "dayjs";
import { Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CalendarService } from "../../services/calendarService";
import { CalendarDeadlineEvent, CalendarSpanEvent } from "../../models/calendar";

export default function CalendarEventPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<
    "default" | "low" | "medium" | "high"
  >("default");

  const [eventType, setEventType] = useState<"span" | "deadline" | "reminder">(
    "span"
  );

  const [spanBeginTime, setSpanBeginTime] = useState(dayjs());
  const [spanEndTime, setSpanEndTime] = useState(dayjs());

  const [deadlineTime, setDeadlineTime] = useState(dayjs());
  const [remindTime, setRemindTime] = useState(dayjs());

  function handleSubmit(): void {
    switch (eventType) {
      case "span":
        CalendarService.createEvent(eventType, {
          id: "",
          title,
          beginTime: spanBeginTime.toDate(),
          endTime: spanEndTime.toDate(),
          content: description,
        } as CalendarSpanEvent);
        break;
      case "deadline":
        CalendarService.createEvent(eventType, {
          id: "",
          title,
          time: deadlineTime.toDate(),
          content: description
        } as CalendarDeadlineEvent);
        break;
      case "reminder":
    }
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

      <TabGroup className="w-full flex flex-col space-y-4">
        <TabList className="flex flex-row space-x-2 items-baseline px-4 py-2 border rounded-md shadow bg-white">
          <p className="text-gray-400 mr-4">Preset</p>
          <Tab as={Fragment}>
            {({ selected }) => {
              if (selected) setEventType("span");
              return (
                <Button className="rounded-md px-3 py-1 shadow-md bg-white data-[hover]:bg-gray-100 data-[hover]:underline data-[selected]:bg-black data-[selected]:text-white transition">
                  Span
                </Button>
              );
            }}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => {
              if (selected) setEventType("deadline");
              return (
                <Button className="rounded-md px-3 py-1 shadow-md bg-white data-[hover]:bg-gray-100 data-[hover]:underline data-[selected]:bg-black data-[selected]:text-white transition">
                  Deadline
                </Button>
              );
            }}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => {
              if (selected) setEventType("reminder");
              return (
                <Button className="rounded-md px-3 py-1 shadow-md bg-white data-[hover]:bg-gray-100 data-[hover]:underline data-[selected]:bg-black data-[selected]:text-white transition">
                  Reminder
                </Button>
              );
            }}
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel className="flex flex-col space-y-4">
            <div className="flex flex-row space-x-1 px-4 py-2 border rounded-md shadow bg-white items-center">
              <p className="text-gray-400 mr-1">Begin time</p>
              <Input
                value={spanBeginTime.format("YYYY-MM-DDTHH:mm")}
                onChange={(e) => setSpanBeginTime(dayjs(e.target.value))}
                placeholder="Begin time"
                type="datetime-local"
                className="flex-grow"
              />
            </div>
            <div className="flex flex-row space-x-1 px-4 py-2 border rounded-md shadow bg-white items-center">
              <p className="text-gray-400 mr-4">End time</p>
              <Input
                value={spanEndTime.format("YYYY-MM-DDTHH:mm")}
                onChange={(e) => setSpanEndTime(dayjs(e.target.value))}
                placeholder="End time"
                type="datetime-local"
                className="flex-grow"
              />
            </div>
          </TabPanel>
          <TabPanel className="flex flex-col space-y-4">
            <div className="flex flex-row space-x-1 px-4 py-2 border rounded-md shadow bg-white items-center">
              <p className="text-gray-400">Deadline</p>
              <Input
                value={deadlineTime.format("YYYY-MM-DDTHH:mm")}
                onChange={(e) => setDeadlineTime(dayjs(e.target.value))}
                placeholder="Deadline"
                type="datetime-local"
                className="flex-grow"
              />
            </div>
          </TabPanel>
          <TabPanel className="flex flex-col space-y-4">
            <div className="flex flex-row space-x-1 px-4 py-2 border rounded-md shadow bg-white items-center">
              <p className="text-gray-400">Time</p>
              <Input
                value={remindTime.format("YYYY-MM-DDTHH:mm")}
                onChange={(e) => setRemindTime(dayjs(e.target.value))}
                placeholder="Time"
                type="datetime-local"
                className="flex-grow"
              />
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>

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
