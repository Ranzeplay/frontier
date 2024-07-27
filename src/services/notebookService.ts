import cuid2 from "@paralleldrive/cuid2";
import { VaultService } from "./vaultService";
import { message } from "@tauri-apps/api/dialog";
import { UnrestrictedFilesystem } from "../utils/unrestricted_fs";
import { Notebook, NotebookContent, NotebookText } from "../models/notebook";

export class NotebookService {
  public static notebookDirectory = UnrestrictedFilesystem.joinPath(
    VaultService.vaultPath,
    "notebooks"
  );

  public static async createNotebook(
    title: string,
    description: string
  ): Promise<string> {
    const id = cuid2.createId();
    const directory = await UnrestrictedFilesystem.joinPath(
      await this.notebookDirectory,
      id
    );

    const metadataPath = await UnrestrictedFilesystem.joinPath(
      directory,
      "metadata.json"
    );
    const metadata: Notebook = {
      id,
      title,
      description,
      createdAt: new Date(),
      content: [],
    };

    await UnrestrictedFilesystem.createDirectory(directory);
    await UnrestrictedFilesystem.writeFile(
      metadataPath,
      JSON.stringify(metadata)
    );

    await message("Notebook created", { title: "Frontier" });

    return id;
  }

  public static async getIdList() {
    const notebooks = await UnrestrictedFilesystem.listSubdirectories(
      await this.notebookDirectory
    );
    return notebooks;
  }

  public static async getMetadata(id: string) {
    const metadataPath = UnrestrictedFilesystem.joinPath(
      await this.notebookDirectory,
      id,
      "metadata.json"
    );
    const metadata = await UnrestrictedFilesystem.readFile(await metadataPath);
    return JSON.parse(metadata) as Notebook;
  }

  public static async getText(notebookId: string, textId: string) {
    const textPath = await UnrestrictedFilesystem.joinPath(
      await this.notebookDirectory,
      notebookId,
      `${textId}.json`
    );
    const text = await UnrestrictedFilesystem.readFile(textPath);
    return JSON.parse(text) as NotebookText;
  }

  public static async getDrawing(notebookId: string, drawingId: string) {
    const drawingPath = await UnrestrictedFilesystem.joinPath(
      await this.notebookDirectory,
      notebookId,
      "drawings",
      drawingId
    );
    const drawing = await UnrestrictedFilesystem.readFile(drawingPath);
    return drawing;
  }

  public static async updateText(notebookId: string, text: NotebookText) {
    const notebookMetadataPath = await UnrestrictedFilesystem.joinPath(
      await this.notebookDirectory,
      notebookId,
      "metadata.json"
    );
    const notebookMetadataFileStr = await UnrestrictedFilesystem.readFile(notebookMetadataPath);
    const notebookMetadata = JSON.parse(notebookMetadataFileStr) as Notebook;

    let entry: NotebookContent;
    if (text.id === "new") {
      text.id = cuid2.createId();

      entry = {
        id: text.id,
        type: "text",
        createdAt: new Date(),
        lastModifiedAt: new Date(),
      } as NotebookContent;
    } else {
      entry = notebookMetadata.content.find(
        (content) => content.id === text.id
      ) as NotebookContent;
      entry.lastModifiedAt = new Date();
    }

    const index = notebookMetadata.content.findIndex(
      (content) => content.id === text.id
    );
    if (index !== -1) {
      notebookMetadata.content[index] = entry;
    } else {
      notebookMetadata.content.push(entry);
    }

    UnrestrictedFilesystem.writeFile(
      notebookMetadataPath,
      JSON.stringify(notebookMetadata)
    );

    const filePath = await UnrestrictedFilesystem.joinPath(
      await this.notebookDirectory,
      notebookId,
      `${text.id}.json`
    );
    await UnrestrictedFilesystem.writeFile(filePath, JSON.stringify(text));
    return text.id;
  }

  public static async updateDrawing(
    notebookId: string,
    drawingId: string,
    drawing: string
  ) {
    const id = drawingId === "new" ? cuid2.createId() : drawingId;
    const drawingPath = await UnrestrictedFilesystem.joinPath(
      await this.notebookDirectory,
      notebookId,
      "drawings",
      id
    );
    await UnrestrictedFilesystem.writeFile(drawingPath, drawing);
    return id;
  }

  public static async deleteNotebook(id: string) {
    const directory = await UnrestrictedFilesystem.joinPath(
      await this.notebookDirectory,
      id
    );
    await UnrestrictedFilesystem.removeDirectory(directory);
  }

  public static async deleteText(notebookId: string, textId: string) {
    const textPath = await UnrestrictedFilesystem.joinPath(
      await this.notebookDirectory,
      notebookId,
      "texts",
      textId
    );
    await UnrestrictedFilesystem.removeFile(textPath);
  }

  public static async deleteDrawing(notebookId: string, drawingId: string) {
    const drawingPath = await UnrestrictedFilesystem.joinPath(
      await this.notebookDirectory,
      notebookId,
      "drawings",
      drawingId
    );
    await UnrestrictedFilesystem.removeFile(drawingPath);
  }
}
