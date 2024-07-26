import cuid2 from "@paralleldrive/cuid2";
import { joinPath } from "../utils";
import { VaultService } from "./vaultService";
import { message } from "@tauri-apps/api/dialog";
import { UnrestrictedFilesystem } from "../unrestricted_fs";

export class NotebookService {
    public static notebookDirectory = joinPath(VaultService.vaultPath, "notebooks");

    public static async createNotebook(title: string, description: string): Promise<string> {
        const id = cuid2.createId();
        const directory = joinPath(this.notebookDirectory, id);

        const metadataPath = joinPath(directory, "metadata.json");
        const metadata = {
            id,
            title,
            description,
            createdAt: new Date().toISOString(),
        };

        await UnrestrictedFilesystem.createDirectory(directory);
        await UnrestrictedFilesystem.writeFile(metadataPath, JSON.stringify(metadata))

        await message("Notebook created", { title: "Frontier" });

        return id;
    }
}
