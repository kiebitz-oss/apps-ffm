// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { Message } from "@kiebitz-oss/ui";
import { Trans } from "@lingui/macro";
import { Link } from "components/Link";

export const ErrorFallback: React.FC = () => {
  const supportEmail = "info@kiebitz.de"; //settings.get('supportEmail');

  return (
    <main>
      <Message variant="danger">
        <Trans id="common.error.common-error">
          Es tut uns schrecklich leid aber es ist ein unerwarteter Fehler
          aufgetreten. Bitte{" "}
          <Link href={`mailto:${supportEmail}`} external>
            kontaktieren Sie uns zur Behebung
          </Link>
          .
        </Trans>
      </Message>
    </main>
  );
};
