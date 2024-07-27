import { invoke } from "@tauri-apps/api";

export class UnrestrictedFilesystem {
  public static async writeFile(path: string, content: string): Promise<void> {
    await invoke("write_file", { path, content });
  }

  public static async readFile(path: string): Promise<string> {
    return await invoke("read_file", { path });
  }

  public static async removeFile(path: string): Promise<void> {
    await invoke("remove_file", { path });
  }

  public static async createDirectory(path: string): Promise<void> {
    await invoke("create_directory", { path });
  }

  public static async removeDirectory(path: string): Promise<void> {
    await invoke("remove_directory", { path });
  }

  public static async listFiles(path: string): Promise<string[]> {
    return await invoke("list_files", { path });
  }

  public static async listSubdirectories(path: string): Promise<string[]> {
    return await invoke("list_subdirectories", { path });
  }

  public static async joinPath(...paths: string[]): Promise<string> {
   return await invoke("join_path", { paths });
  }

  public static async fileExists(path: string): Promise<boolean> {
    return await invoke("file_exists", { path });
  }
}
