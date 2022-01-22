import { axe } from "jest-axe";
import type { PublicProvider } from "vanellus";
import { act, render, screen } from "../../tests/test-utils";
import { ProviderCard } from "./ProviderCard";

const provider: PublicProvider = {
  id: "1",
  name: "Impfstelle 3000",
  street: "Bockenheimer Warte 23",
  city: "Frankfurt",
  zipCode: "60325",
  description: "Ein wirklich tolles Impfzentrum",
  accessible: true,
};

describe("providerCard", () => {
  it("should render", () => {
    expect.hasAssertions();

    render(<ProviderCard provider={provider} />);

    const card = screen.getByRole("article");

    expect(card).toBeInTheDocument();
  });

  it("should not have a11y violations", async () => {
    expect.hasAssertions();

    const { container } = render(<ProviderCard provider={provider} />);

    await act(async () => {
      await expect(axe(container)).resolves.toHaveNoViolations();
    });
  });
});
