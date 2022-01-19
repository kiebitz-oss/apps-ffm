import { Accessibility24 } from "@carbon/icons-react";
import { Title } from "@kiebitz-oss/common";
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
    <section
      className={clsx(
        "flex gap-4 justify-between p-4 min-w-full rounded border-2 border-black",
        "hover:border-highlight hover:shadow-provider",
        className
      )}
      key={provider.id}
    >
      <div>
        <Title variant="h3">{provider.name}</Title>

        <address>
          {provider.street}, {provider.zipCode} {provider.city}
        </address>
      </div>

      {provider.accessible && <Accessibility24 />}
    </section>
  );
};
