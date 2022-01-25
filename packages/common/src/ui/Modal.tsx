// @see https://headlessui.dev/react/dialog

import { Dialog } from "@headlessui/react";
import { Trans } from "@lingui/macro";
import { useState } from "react";

export interface ModalProps {
  onClose?: () => void;
  open?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  onClose,
  open = true,
}) => {
  const [isOpen, setIsOpen] = useState(open);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }

    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} className="modal">
      <div className="container">
        <Dialog.Overlay className="overlay" />

        <div className="inner">
          <div className="hidden absolute top-0 right-0 pt-6 pr-6 sm:block">
            <button
              type="button"
              className="text-gray-700 hover:text-primary rounded-md"
              onClick={handleClose}
            >
              <span className="sr-only">
                <Trans id="common.close">Schließen</Trans>
              </span>
              <svg
                className="w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          {children}
        </div>
      </div>
    </Dialog>
  );
};
