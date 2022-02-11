<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { AppointmentStatus } from "vanellus";
  import type { CalendarItem } from "./CalendarItem";

  export let item: CalendarItem;

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

  const dispatcher = createEventDispatcher<{
    open: CalendarItem;
  }>();

  const handleClick: svelte.JSX.EventHandler<
    MouseEvent,
    HTMLButtonElement
  > = () => {
    dispatcher("open", item);
  };

  const canceled = item.item.status === AppointmentStatus.CANCELED;
</script>

<button on:click={handleClick}>
  <div
    style:height={`${height}px`}
    style:min-height={`${height}px`}
    style:width={`${width}%`}
    style:top={`${top}%`}
    style:left={`${left}%`}
    style:opacity={canceled ? 0.25 : 1}
    style:background-color={canceled
      ? "lightgray"
      : `hsl(${((100 - percentUsed) / 100) * 120}, 75%, 90%)`}
  >
    <h4>
      {item.startAt.format("HH:mm")} - {item.endAt.format("HH:mm")}
    </h4>

    <div>
      {#if item.isSeries}
        SERIE -
      {/if}
      {item.bookedSlots}/{item.slots}
      {#if item.isSeries}
        <br />
        {item.items.length} x {item.items[0].duration} Min auf
        {item.items[0].slotData.length} Lanes mit {item.vaccine}
      {:else}
        " " + item.vaccine
      {/if}
    </div>

    {item.vaccine}
  </div>
</button>

<style lang="postcss">
  div {
    overflow: hidden;
    position: absolute;
    z-index: 10;
    padding: 8px;
    cursor: pointer;
  }
</style>
