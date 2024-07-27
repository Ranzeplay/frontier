import { UnrestrictedFilesystem } from "./unrestricted_fs";

export function joinPath(...parts: string[]) {
    return UnrestrictedFilesystem.joinPath(...parts);
}