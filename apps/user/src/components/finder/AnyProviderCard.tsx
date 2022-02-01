import { Title } from "@impfen/common";
import { Trans } from "@lingui/macro";
import clsx from "clsx";

export interface AnyProviderCardProps {
  className?: string;
}

export const AnyProviderCard: React.FC<AnyProviderCardProps> = ({
  className,
}) => {
  return (
    <article className={clsx("provider-card", className)} key="any-provider">
      <div>
        <Title variant="h3">
          <Trans id="provider-card.any-provider">Beliebige Impfstelle</Trans>
        </Title>
      </div>
    </article>
  );
};
