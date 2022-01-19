import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalProps,
  Title,
} from "@kiebitz-oss/common";
import { Trans } from "@lingui/macro";
import { AppointmentSeriesForm } from ".";

interface CreateAppointmentSeriesModal extends ModalProps {}

export const CreateAppointmentSeriesModal: React.FC<
  CreateAppointmentSeriesModal
> = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <ModalHeader>
        <Title>
          <Trans id="provider.schedule.create.appointment-series-modal.new-title">
            Neue Terminserie erstellen
          </Trans>
        </Title>
      </ModalHeader>

      <ModalContent className="flex flex-col gap-6">
        <AppointmentSeriesForm onSuccess={onClose} />
      </ModalContent>
    </Modal>
  );
};
