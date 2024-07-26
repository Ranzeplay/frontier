import { Button, Input } from "@headlessui/react";
import { open } from "@tauri-apps/api/dialog";
import { appLocalDataDir } from "@tauri-apps/api/path";
import { useState } from "react";
import { VaultService } from "../services/vaultService";

export default function LandingPage() {
  const [directory, setDirectory] = useState<string>(VaultService.vaultPath);

  async function browseDirectory() {
    const selected = await open({
      directory: true,
      multiple: false,
      defaultPath: await appLocalDataDir()
    });

    if (selected) {
      setDirectory(selected as string);
    }
  }

  async function loadVault() {
    await VaultService.openVault(directory);
  }

  return (
    <div className="container flex flex-row items-center min-h-screen">
      <div className="flex flex-col w-full items-center -translate-y-8 space-y-4">
        <h1 className="text-4xl font-bold font-serif">Frontier</h1>
        <p className="text-gray-600">Welcome back, User</p>

        <div className="w-screen-lg flex flex-row space-x-2">
          <Input value={directory} onChange={e => setDirectory(e.target.value)} onClick={browseDirectory}
            className="px-4 py-2 border rounded-md flex-grow w-96 cursor-pointer"
            placeholder="Click to browse vault directory"
          />

          <Button onClick={loadVault} className="px-4 py-1.5 hover:bg-blue-500 text-blue-500 hover:text-white rounded-md border-blue-500 border transition">
            Load
          </Button>
        </div>
      </div>
    </div>
  );
}
