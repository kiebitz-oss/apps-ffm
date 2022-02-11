import type { Vaccine } from "@impfen/common";
import type { Dayjs } from "dayjs";
import type { Appointment } from "vanellus";

export class CalendarItem {
  public id: string;
  public item: Appointment<Vaccine>;
  public items: Appointment<Vaccine>[] = [];
  public startAt: Dayjs;
  public endAt: Dayjs;
  public overlapsWith: CalendarItem[] = [];
  public maxOverlap = 0;
  public overlapIndex = 0;
  public isSeries = false;
  public duration: number;
  public vaccine: Vaccine;
  public slots = 0;
  public bookedSlots = 0;

  constructor(item: Appointment<Vaccine>) {
    this.id = item.properties?.seriesId
      ? String(item.properties.seriesId)
      : item.id;
    this.isSeries = Boolean(item.properties?.seriesId);
    this.item = item;
    this.startAt = item.startAt.local();
    this.endAt = item.endAt.local();
    this.duration = item.duration;
    this.vaccine = item.vaccine;
    this.bookedSlots = item.bookings.length;
    this.slots = item.slotData.length;

    if (this.isSeries) {
      this.items.push(item);
    }
  }

  public add(item: Appointment<Vaccine>) {
    this.items.push(item);

    if (this.startAt.isAfter(item.startAt, "minute")) {
      this.startAt = item.startAt.local();
    }

    if (this.endAt.isBefore(item.endAt, "minute")) {
      this.endAt = item.endAt.local();
    }

    this.bookedSlots += item.bookings.length;
    this.slots += item.slotData.length;
    this.duration += item.duration;
  }
}
