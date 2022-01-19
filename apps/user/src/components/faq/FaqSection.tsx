import { Title } from "@kiebitz-oss/common";

export interface FaqSectionProps {
  title: string;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  children,
  title,
  ...props
}) => {
  return (
    <section className="flex flex-col" {...props}>
      <Title
        as="h3"
        variant="section"
        className="mb-5 text-lg font-semibold tracking-wider uppercase"
      >
        {title}
      </Title>

      <div className="flex flex-col px-8 md:gap-10 md:px-0 md:ml-6">
        {children}
      </div>
    </section>
  );
};
