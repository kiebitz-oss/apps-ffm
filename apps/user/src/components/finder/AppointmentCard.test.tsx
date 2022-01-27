import dayjs from "dayjs";
import { axe } from "jest-axe";
import type { AggregatedPublicAppointment, PublicProvider } from "vanellus";
import { act, render, screen } from "../../tests/test-utils";
import { AppointmentCard } from "./AppointmentCard";

const provider: PublicProvider = {
  id: "1",
  name: "Impfstelle 3000",
  street: "Bockenheimer Warte 23",
  city: "Frankfurt",
  zipCode: "60325",
  description: "Ein wirklich tolles Impfzentrum",
  accessible: true,
};

const appointment: AggregatedPublicAppointment = {
  id: "1",
  provider,
  startAt: dayjs(),
  endAt: dayjs().add(5, "minutes"),
  duration: 5,
  vaccine: "moderna",
  properties: {},
};

describe("appointmentCard", () => {
  it("should render", () => {
    expect.hasAssertions();

    render(<AppointmentCard appointment={appointment} />);

    const card = screen.getByRole("article");

    expect(card).toBeInTheDocument();
  });

  it("should not have a11y violations", async () => {
    expect.hasAssertions();

    const { container } = render(<AppointmentCard appointment={appointment} />);

    await act(async () => {
      await expect(axe(container)).resolves.toHaveNoViolations();
    });
  });
});
