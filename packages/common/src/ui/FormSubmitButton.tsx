import type { FormState } from "react-hook-form";
import { Button, ButtonProps } from "./Button";

interface FormSubmitButton extends ButtonProps {
  waiting?: boolean;
  formState: FormState<unknown>;
}

export const FormSubmitButton: React.FC<FormSubmitButton> = ({
  children,
  formState,
  ...props
}) => {
  return (
    <Button
      type="submit"
      variant="primary"
      disabled={formState.isSubmitting}
      {...props}
    >
      {children}
    </Button>
  );
};
