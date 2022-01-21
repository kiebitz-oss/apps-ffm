export interface FooterProps extends React.ComponentProps<"footer"> {}

export const Footer: React.FC<FooterProps> = ({ children }) => {
  return (
    <footer className="hidden gap-8 sm:flex sm:p-8 md:p-16">{children}</footer>
  );
};
