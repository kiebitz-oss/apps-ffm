import { theme } from "@impfen/common";
import { Trans } from "@lingui/macro";
import clsx from "clsx";
import dayjs from "dayjs";
import { useApp } from "lib/AppProvider";

interface BackupKeyPairsProps {
  className?: string;
  onSuccess?: () => void;
  downloadText?: string;
}

export const BackupKeyPairs: React.FC<BackupKeyPairsProps> = ({
  className,
  onSuccess,
  downloadText,
}) => {
  const { keyPairs } = useApp();

  const dateString = dayjs().format("YYYY-MM-DD-HH-mm");

  const filename = `${theme.title}-backup-${dateString}.enc`.toLowerCase();

  return (
    <a
      onClick={onSuccess}
      className={clsx("button primary md", className)}
      download={filename}
      href={URL.createObjectURL(
        new Blob([new TextEncoder().encode(JSON.stringify(keyPairs))], {
          type: "application/octet-stream",
        })
      )}
    >
      {downloadText || (
        <Trans id="mediator.download-backup-data">
          Sicherungsdatei herunterladen
        </Trans>
      )}
    </a>
  );
};
