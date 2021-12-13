import { Trans } from '@lingui/macro';
import { useMediatorApi } from 'hooks/useMediatorApi';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Provider } from 'types';
import {
    Button,
    Modal,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalProps,
} from 'ui';

interface ReconfirmProvidersModalProps extends ModalProps {
    verifiedProviders: Provider[];
}

export const ReconfirmProvidersModal: React.FC<
    ReconfirmProvidersModalProps
> = ({ verifiedProviders }) => {
    const [done, setDone] = useState<number>(0);
    const navigate = useNavigate();
    const api = useMediatorApi();
    const closeModal = () => navigate('/mediator/providers');

    const doReconfirmProviders = async () => {
        await Promise.all(
            verifiedProviders.map((provider) =>
                api.reconfirmProvider(provider).then(() => setDone(done + 1))
            )
        ).then(() => {
            closeModal();
        });
    };

    return (
        <Modal onClose={closeModal}>
            <ModalHeader>
                <Trans id="mediator.providers.reconfirm-modal.title">
                    Alle neu bestätigen
                </Trans>
            </ModalHeader>

            <ModalContent>
                <div className="kip-provider-data">
                    {(done > 0 && (
                        <Trans id="mediator.providers.reconfirm-modal.in-progress">
                            Bestätige Anbieter {done} von{' '}
                            {verifiedProviders.length}...
                        </Trans>
                    )) || (
                        <Trans id="mediator.providers.reconfirm-modal.info">
                            Wollen Sie alle bestätigten Anbieter neu bestätigen?
                        </Trans>
                    )}
                </div>
            </ModalContent>

            <ModalFooter>
                <Button onClick={doReconfirmProviders}>
                    <Trans id="mediator.providers.reconfirm-modal.button-submit">
                        Alle neu bestätigen
                    </Trans>
                </Button>
            </ModalFooter>
        </Modal>
    );
};
