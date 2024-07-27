import cuid2 from "@paralleldrive/cuid2";
import { AccountingEntry } from "../models/accounting";
import { UnrestrictedFilesystem } from "../utils/unrestricted_fs";
import { VaultService } from "./vaultService";

export class AccountingService {
  public static diaryDirectory = UnrestrictedFilesystem.joinPath(
    VaultService.vaultPath,
    "accounting"
  );

  public static async updateAccountingEntry(entry: AccountingEntry) {
    await this.createAccountingFileIfNotExists(entry.time);
    const existingEntries = await this.getAccountingEntriesByMonth(entry.time);

    if (entry.id === "new") {
        entry.id = cuid2.createId();
      existingEntries.push(entry);
    } else {
      const index = existingEntries.findIndex((e) => e.id === entry.id);
      existingEntries[index] = entry;
    }

    await this.saveAccountingEntriesByMonth(entry.time, existingEntries);
    return entry.id;
  }

  public static async getAccountingEntriesByMonth(
    date: Date
  ): Promise<AccountingEntry[]> {
    const metadataPath = await UnrestrictedFilesystem.joinPath(
      await this.diaryDirectory,
      `${date.getFullYear()}-${date.getMonth() + 1}.json`
    );

    await this.createAccountingFileIfNotExists(date);

    const fileContent = await UnrestrictedFilesystem.readFile(metadataPath);
    const entries = JSON.parse(fileContent) as AccountingEntry[];

    return entries;
  }

  public static async saveAccountingEntriesByMonth(
    date: Date,
    entries: AccountingEntry[]
  ) {
    const metadataPath = await UnrestrictedFilesystem.joinPath(
      await this.diaryDirectory,
      `${date.getFullYear()}-${date.getMonth() + 1}.json`
    );
    await UnrestrictedFilesystem.writeFile(
      metadataPath,
      JSON.stringify(entries)
    );
  }

  public static async getAllAccountingEntries(): Promise<AccountingEntry[]> {
    const filenames = await UnrestrictedFilesystem.listFiles(
      await this.diaryDirectory
    );

    const entries: AccountingEntry[] = [];
    for (const filename of filenames) {
      if (filename.endsWith(".json")) {
        const fileContent = await UnrestrictedFilesystem.readFile(filename);
        const fileEntries = JSON.parse(fileContent) as AccountingEntry[];
        entries.push(...fileEntries);
      }
    }

    entries.sort((a, b) => a.time.getTime() - b.time.getTime());

    return entries;
  }

  public static async deleteAccountingEntry(entry: AccountingEntry) {
    const existingEntries = await this.getAccountingEntriesByMonth(entry.time);
    const index = existingEntries.findIndex((e) => e.id === entry.id);
    existingEntries.splice(index, 1);

    await this.saveAccountingEntriesByMonth(entry.time, existingEntries);
  }

  public static async getAccountingEntryById(id: string): Promise<AccountingEntry | undefined> {
    const entries = await this.getAllAccountingEntries();
    return entries.find((e) => e.id === id);
  }

  public static async createAccountingFileIfNotExists(date: Date) {
    const metadataPath = await UnrestrictedFilesystem.joinPath(
      await this.diaryDirectory,
      `${date.getFullYear()}-${date.getMonth() + 1}.json`
    );

    if (!(await UnrestrictedFilesystem.fileExists(metadataPath))) {
      await UnrestrictedFilesystem.writeFile(metadataPath, JSON.stringify([]));
    }
  }
}
