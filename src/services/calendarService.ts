import cuid2 from "@paralleldrive/cuid2";
import {
  CalendarDeadlineEvent,
  CalendarReminderEvent,
  CalendarSpanEvent,
} from "../models/calendar";
import { UnrestrictedFilesystem } from "../utils/unrestricted_fs";
import { VaultService } from "./vaultService";

export class CalendarService {
  public static diaryDirectory = UnrestrictedFilesystem.joinPath(
    VaultService.vaultPath,
    "calendar"
  );

  public static createEvent(
    type: "span" | "deadline" | "reminder",
    event: CalendarSpanEvent | CalendarDeadlineEvent | CalendarReminderEvent
  ): string {
    switch (type) {
      case "span":
        return this.createSpanEvent(event as CalendarSpanEvent);
      case "deadline":
        return this.createDeadlineEvent(event as CalendarDeadlineEvent);
      case "reminder":
        return this.createReminderEvent(event as CalendarReminderEvent);
    }
  }

  public static createSpanEvent(event: CalendarSpanEvent): string {
    const id = cuid2.createId();
    event.id = id;

    return id;
  }

  public static createDeadlineEvent(event: CalendarDeadlineEvent): string {
    const id = cuid2.createId();
    event.id = id;

    return id;
  }

  public static createReminderEvent(event: CalendarReminderEvent): string {
    const id = cuid2.createId();
    event.id = id;

    return id;
  }
}
