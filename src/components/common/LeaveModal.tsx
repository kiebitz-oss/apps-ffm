import { Trans } from "@lingui/macro";
import { useState } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Title,
} from "ui";

export const LeaveModal: React.FC = () => {
  const [ask, setAsk] = useState(false);

  return (
    <Modal>
      <ModalHeader>
        <Title>
          <Trans id="common.leave.title">
            Möchten Sie diese Seite wirklich verlassen?
          </Trans>
        </Title>
      </ModalHeader>

      <ModalContent>
        <Trans id="comon.leave.text">
          Es gibt ungespeicherte Änderungen auf der aktuellen Seite. Wollen Sie
          diese wirklich verlassen?
        </Trans>
      </ModalContent>

      <ModalFooter>
        <Button>
          <Trans id="common.leave.submit-button">Seite verlassen</Trans>
        </Button>
        <Button>
          <Trans id="common.leave.cancel-button">Zurück</Trans>
        </Button>
      </ModalFooter>
    </Modal>
  );
};
