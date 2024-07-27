import {
  Field,
  Input,
  Label,
  Radio,
  RadioGroup,
  Textarea,
} from "@headlessui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AccountingAddPage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState<"income" | "expense">("income");
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [time, setTime] = useState<Date>(new Date());
  const [remark, setRemark] = useState("");

  const navigate = useNavigate();
  function handleSubmit() {
    console.log("submit");
  }

  function handleDiscard() {
    navigate(-1);
  }

  function handleDelete() {
    console.log("delete");
  }

  return (
    <div className="p-8 flex flex-col space-y-4">
      <h1 className="text-4xl font-bold">Edit accounting entry</h1>
      <div className="flex flex-col space-y-2">
        <Input value={name} onChange={e => setName(e.target.value)}
          className="px-4 py-2 border rounded-md shadow"
          placeholder="Name"
        />

        <Input value={category} onChange={e => setCategory(e.target.value)}
          className="px-4 py-2 border rounded-md shadow"
          placeholder="Category"
        />

        <div className="px-4 py-2 border rounded-md shadow bg-white flex flex-row space-x-6 items-center">
          <p className="text-gray-400">Type</p>
          <RadioGroup className="flex flex-row space-x-3" value={type} onChange={e => setType(e)}>
            <Field className="flex flex-row items-center gap-2">
              <Radio
                value="income"
                className="group flex size-5 items-center justify-center rounded-full border bg-white data-[checked]:bg-blue-400 data-[disabled]:bg-gray-100 transition cursor-pointer"
              >
                <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
              </Radio>
              <Label className="data-[disabled]:opacity-50">Income</Label>
            </Field>
            <Field className="flex items-center gap-2">
              <Radio
                value="expense"
                className="group flex size-5 items-center justify-center rounded-full border bg-white data-[checked]:bg-blue-400 data-[disabled]:bg-gray-100 transition cursor-pointer"
              >
                <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
              </Radio>
              <Label className="data-[disabled]:opacity-50">Expense</Label>
            </Field>
          </RadioGroup>
        </div>

        <Input value={amount} onChange={e => setAmount(Number(e.target.value))}
          className="px-4 py-2 border rounded-md shadow"
          placeholder="Amount"
          type="number"
        />

        <Input value={time.toISOString()} onChange={e => setTime(new Date(e.target.value))}
          className="px-4 py-2 border rounded-md shadow"
          placeholder="Time"
          type="datetime-local"
        />

        <Textarea value={remark} onChange={e => setRemark(e.target.value)}
          className="px-4 py-2 border rounded-md shadow"
          placeholder="Remark"
          rows={6}
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
    </div>
  );
}
