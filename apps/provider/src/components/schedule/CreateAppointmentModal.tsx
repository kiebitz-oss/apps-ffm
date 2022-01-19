import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalProps,
  Title,
} from "@impfen/common";
import { Trans } from "@lingui/macro";
import type { Appointment } from "vanellus";
import { AppointmentForm } from "./AppointmentForm";

interface CreateAppointmentModal extends ModalProps {
  appointment?: Appointment;
}

export const CreateAppointmentModal: React.FC<CreateAppointmentModal> = ({
  appointment,
  onClose,
}) => {
  return (
    <Modal onClose={onClose}>
      <ModalHeader>
        <Title>
          {appointment ? (
            <Trans id="provider.schedule.create.appointment-modal.edit-title">
              Termin bearbeiten
            </Trans>
          ) : (
            <Trans id="provider.schedule.create.appointment-modal.new-title">
              Neuen Termin erstellen
            </Trans>
          )}
        </Title>
      </ModalHeader>

      <ModalContent className="flex flex-col gap-6">
        <AppointmentForm appointment={appointment} onSuccess={onClose} />
      </ModalContent>
    </Modal>
  );
};
