export interface FooterProps extends React.ComponentProps<"footer"> {}

export const Footer: React.FC<FooterProps> = ({ children }) => {
  return (
    <footer className="hidden sm:flex gap-8 sm:p-8 md:p-16">{children}</footer>
  );
};
