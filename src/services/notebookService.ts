import cuid2 from "@paralleldrive/cuid2";
import { joinPath } from "../utils";
import { VaultService } from "./vaultService";
import { message } from "@tauri-apps/api/dialog";
import { UnrestrictedFilesystem } from "../unrestricted_fs";
import { Notebook } from "../models/notebook";

export class NotebookService {
    public static notebookDirectory = joinPath(VaultService.vaultPath, "notebooks");

    public static async createNotebook(title: string, description: string): Promise<string> {
        const id = cuid2.createId();
        const directory = await joinPath(await this.notebookDirectory, id);

        const metadataPath = await joinPath(directory, "metadata.json");
        const metadata: Notebook = {
            id,
            title,
            description,
            createdAt: new Date(),
            content: [],
        };

        await UnrestrictedFilesystem.createDirectory(directory);
        await UnrestrictedFilesystem.writeFile(metadataPath, JSON.stringify(metadata))

        await message("Notebook created", { title: "Frontier" });

        return id;
    }

    public static async getIdList() {
        const notebooks = await UnrestrictedFilesystem.listSubdirectories(await this.notebookDirectory);
        return notebooks;
    }

    public static async getMetadata(id: string) {
        const metadataPath = joinPath(await this.notebookDirectory, id, "metadata.json");
        const metadata = await UnrestrictedFilesystem.readFile(await metadataPath);
        return JSON.parse(metadata) as Notebook;
    }

    public static async getText(notebookId: string, textId: string) {
        const textPath = await joinPath(await this.notebookDirectory, notebookId, "texts", textId);
        const text = await UnrestrictedFilesystem.readFile(textPath);
        return text;
    }

    public static async getDrawing(notebookId: string, drawingId: string) {
        const drawingPath = await joinPath(await this.notebookDirectory, notebookId, "drawings", drawingId);
        const drawing = await UnrestrictedFilesystem.readFile(drawingPath);
        return drawing;
    }

    public static async createText(notebookId: string, text: string) {
        const id = cuid2.createId();
        const textPath = await joinPath(await this.notebookDirectory, notebookId, "texts", id);
        await UnrestrictedFilesystem.writeFile(textPath, text);
        return id;
    }

    public static async createDrawing(notebookId: string, drawing: string) {
        const id = cuid2.createId();
        const drawingPath = await joinPath(await this.notebookDirectory, notebookId, "drawings", id);
        await UnrestrictedFilesystem.writeFile(drawingPath, drawing);
        return id;
    }

    public static async deleteNotebook(id: string) {
        const directory = await joinPath(await this.notebookDirectory, id);
        await UnrestrictedFilesystem.removeDirectory(directory);
    }

    public static async deleteText(notebookId: string, textId: string) {
        const textPath = await joinPath(await this.notebookDirectory, notebookId, "texts", textId);
        await UnrestrictedFilesystem.removeFile(textPath);
    }

    public static async deleteDrawing(notebookId: string, drawingId: string) {
        const drawingPath = await joinPath(await this.notebookDirectory, notebookId, "drawings", drawingId);
        await UnrestrictedFilesystem.removeFile(drawingPath);
    }
}
