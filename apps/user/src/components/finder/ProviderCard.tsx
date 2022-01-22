import { Accessibility24 } from "@carbon/icons-react";
import { Title } from "@impfen/common";
import clsx from "clsx";
import type { PublicProvider } from "vanellus";

export interface ProviderCardProps {
  provider: PublicProvider;
  className?: string;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({
  provider,
  className,
}) => {
  return (
    <article className={clsx("provider-card", className)} key={provider.id}>
      <div>
        <Title variant="h3">{provider.name}</Title>

        <address>
          {provider.street}, {provider.zipCode} {provider.city}
        </address>
      </div>

      {provider.accessible && <Accessibility24 />}
    </article>
  );
};
