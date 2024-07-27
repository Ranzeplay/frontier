import { DiaryEntry } from "../models/diary";
import { UnrestrictedFilesystem } from "../utils/unrestricted_fs";
import { VaultService } from "./vaultService";

export class DiaryService {
  public static diaryDirectory = UnrestrictedFilesystem.joinPath(
    VaultService.vaultPath,
    "diaries"
  );

  public static async createDiary(
    year: number,
    month: number,
    day: number,
    index: number,
    content: string
  ): Promise<string> {
    const id = this.getId(year, month, day, index);

    const metadataPath = await UnrestrictedFilesystem.joinPath(
      await this.diaryDirectory,
      `${id}.json`
    );
    const metadata = {
      id,
      year,
      month,
      day,
      index,
      content,
    } as DiaryEntry;

    await UnrestrictedFilesystem.writeFile(
      metadataPath,
      JSON.stringify(metadata)
    );

    return id;
  }

  public static async createNextDiary(
    year: number,
    month: number,
    day: number,
    content: string
  ): Promise<string> {
    const index = await this.getNextIndex(year, month, day);
    return await this.createDiary(year, month, day, index, content);
  }

  public static async getIdList() {
    const filenames = await UnrestrictedFilesystem.listFiles(
      await this.diaryDirectory
    );

    const diaries: string[] = [];
    for (let filename of filenames) {
      if (filename.endsWith(".json")) {
        filename = filename.replace(".json", "");
        filename = filename.replace(await this.diaryDirectory, "")
        filename = filename.substring(1);
        diaries.push(filename);
      }
    }

    return diaries;
  }

  public static async getMetadata(id: string) {
    const metadataPath = UnrestrictedFilesystem.joinPath(
      await this.diaryDirectory,
      `${id}.json`
    );
    const metadata = await UnrestrictedFilesystem.readFile(await metadataPath);
    return JSON.parse(metadata) as DiaryEntry;
  }

  public static async updateDiary(
    year: number,
    month: number,
    day: number,
    index: number,
    content: string
  ) {
    const id = this.getId(year, month, day, index);
    const metadataPath = await UnrestrictedFilesystem.joinPath(
      await this.diaryDirectory,
      `${id}.json`
    );
    const metadata = {
      id,
      year,
      month,
      day,
      index,
      content,
    } as DiaryEntry;

    await UnrestrictedFilesystem.writeFile(
      metadataPath,
      JSON.stringify(metadata)
    );
  }

  public static async deleteDiary(id: string) {
    const metadataPath = await UnrestrictedFilesystem.joinPath(
      await this.diaryDirectory,
      `${id}.json`
    );
    await UnrestrictedFilesystem.removeFile(metadataPath);
  }

  public static async getNextIndex(year: number, month: number, day: number) {
    const diaries = await this.getIdList();
    console.log(diaries);
    const filteredDiaries = diaries.filter((diary) => {
      const [y, m, d] = diary.split("-").map((x) => parseInt(x));
      return y === year && m === month && d === day;
    });
    return filteredDiaries.length;
  }

  public static getId(year: number, month: number, day: number, index: number) {
    return `${year}-${month}-${day}-${index}`;
  }
}
