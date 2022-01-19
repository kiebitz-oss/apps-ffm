import { Message, theme } from "@impfen/common";
import { Trans } from "@lingui/macro";
import clsx from "clsx";
import dayjs from "dayjs";

interface BackupDataLinkProps {
  providerName: string;
  blob: Blob | null;
  className?: string;
  onSuccess?: () => void;
  downloadText?: string;
}

export const BackupDataLink: React.FC<BackupDataLinkProps> = ({
  providerName,
  blob,
  className,
  onSuccess,
  downloadText,
}) => {
  try {
    providerName = providerName.replace(/[^a-zA-Z\d ]/g, "-").toLowerCase();
  } catch (error) {
    // ignore?
  }

  const dateString = dayjs().format("YYYY-MM-DD-HH-mm");

  const filename =
    `${theme.title}-backup-${dateString}-${providerName}.enc`.toLowerCase();

  if (blob) {
    return (
      <a
        onClick={onSuccess}
        className={clsx("button primary md", className)}
        download={filename}
        href={URL.createObjectURL(blob)}
      >
        {downloadText || (
          <Trans id="provider.onboarding.download-backup-data">
            Sicherungsdatei herunterladen
          </Trans>
        )}
      </a>
    );
  }

  return (
    <Message waiting variant="warning">
      <Trans id="provider.onboarding.generating-backup-data">
        Bitte warten, erstelle Sicherungsdaten...
      </Trans>
    </Message>
  );
};
