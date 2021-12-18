import { Accessibility24 } from "@carbon/icons-react";
import clsx from "clsx";
import React from "react";
import type { PublicProvider } from "types";
import { Title } from "ui";

export interface ProviderCardProps {
  provider: PublicProvider;
  className?: string;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({
  provider,
  className,
}) => {
  return (
    <div
      className={clsx(
        "flex justify-between p-4 rounded-2xl border-2 border-black",
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
    </div>
  );
};
