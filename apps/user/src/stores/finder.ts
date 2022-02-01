import type { Vaccine } from "@impfen/common";
import type { AggregatedPublicAppointment, PublicProvider } from "vanellus";
import create from "zustand";

type FinderState = {
  date: Date;
  provider?: PublicProvider;
  accessible?: true;
  vaccine?: Vaccine;
  appointment?: AggregatedPublicAppointment<Vaccine>;
};

export const useFinder = create<FinderState>(() => ({
  date: new Date(),
}));

export const setProvider = (provider: PublicProvider) =>
  useFinder.setState({ provider });

export const setDate = (date: Date) => useFinder.setState({ date });

export const setAppointment = (
  appointment: AggregatedPublicAppointment<Vaccine>
) =>
  useFinder.setState({
    appointment,
  });

export const setAccessible = (accessible?: true) =>
  useFinder.setState({ accessible });

export const setVaccine = (vaccine?: Vaccine) =>
  useFinder.setState({ vaccine });

export const reset = () =>
  useFinder.setState(
    {
      date: new Date(),
    },
    true
  );
