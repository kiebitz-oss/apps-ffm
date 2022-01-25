import type { CalendarItem } from "./CalendarItem";

interface AppointmentCellProps {
  item: CalendarItem;
}

export const AppointmentCell: React.FC<AppointmentCellProps> = ({ item }) => {
  const height = Math.floor((item.duration / 60) * 100);
  const width = Math.floor(100 / (1 + item.maxOverlap));
  const top = Math.floor((item.startAt.get("minutes") / 60) * 100);

  const i = item.overlapsWith.filter(
    (overlappingItem) => overlappingItem.overlapIndex < item.overlapIndex
  ).length;

  const left = Math.floor(i * width);
  // const tiny = height < 33 || width < 50;

  // if (tiny) {
  //   return null;
  // }

  const percentUsed = item.bookedSlots * (item.slots / 100);

  return (
    <div
      style={{
        height: `${height}px`,
        minHeight: `${height}px`,
        width: `${width}%`,
        top: `${top}%`,
        left: `${left}%`,
        backgroundColor: `hsl(${((100 - percentUsed) / 100) * 120}, 88%, 43%)`,
      }}
      className="overflow-hidden hover:overflow-visible absolute z-10 hover:z-20 flex-col p-2 hover:!w-full hover:!h-auto text-xs hover:text-base hover:shadow-box opacity-80 hover:opacity-100 transition-all cursor-pointer"
    >
      <h4>
        {item.startAt.format("HH:mm")} - {item.endAt.format("HH:mm")}
      </h4>

      <div>
        {item.isSeries ? <>SERIE - </> : null}
        {item.bookedSlots}/{item.slots}
        {item.isSeries ? (
          <>
            <br />
            {item.items.length} x {item.items[0].duration} Min auf{" "}
            {item.items[0].slotData.length} Lanes mit {item.vaccine}
          </>
        ) : (
          " " + item.vaccine
        )}
      </div>

      {/* {item.vaccine} */}
    </div>
  );
};
