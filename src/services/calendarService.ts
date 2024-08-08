import { UnrestrictedFilesystem } from "../utils/unrestricted_fs";
import { VaultService } from "./vaultService";

export class CalendarService {
  public static diaryDirectory = UnrestrictedFilesystem.joinPath(
    VaultService.vaultPath,
    "calendar"
  );
}
