import { fs } from "@tauri-apps/api";
import { message } from "@tauri-apps/api/dialog";
import { UnrestrictedFilesystem } from "../utils/unrestricted_fs";

export class VaultService {
    public static vaultPath: string = localStorage.getItem('vaultPath') || '';

    public static async openVault(path: string): Promise<void> {
        this.vaultPath = path;
        localStorage.setItem('vaultPath', path);

        if (await fs.exists(await UnrestrictedFilesystem.joinPath(path, '.frontier-vault'))) {
            await message("Vault opened successfully", { title: "Frontier" });
        } else {
            await fs.createDir(await UnrestrictedFilesystem.joinPath(path, '.frontier-vault'));
            await fs.createDir(await UnrestrictedFilesystem.joinPath(path, 'diaries'));
            await fs.createDir(await UnrestrictedFilesystem.joinPath(path, 'notebooks'));
            await fs.createDir(await UnrestrictedFilesystem.joinPath(path, 'accounting'));
            await fs.createDir(await UnrestrictedFilesystem.joinPath(path, 'assets'));

            await message("Vault created successfully", { title: "Frontier" });
        }
    }
}
