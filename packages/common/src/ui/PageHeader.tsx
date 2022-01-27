import clsx from "clsx";
import { BackLink } from "./BackLink";
import { Text } from "./Text";
import { Title } from "./Title";

interface PageHeaderProps {
  title: string;
  intro?: string;
  backLink?: {
    title: string;
    href: string;
  };
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  children,
  title,
  intro,
  backLink,
}) => {
  return (
    <header className="relative mb-8">
      {backLink ? (
        <BackLink href={backLink.href}>{backLink.title}</BackLink>
      ) : null}

      <div className={clsx("ml-4 sm:ml-0", { "mt-8": !backLink })}>
        <div className="flex flex-row justify-between">
          <Title variant="h1" as="h1">
            {title}
          </Title>

          {children}
        </div>

        {intro ? <Text variant="text1">{intro}</Text> : null}
      </div>
    </header>
  );
};
