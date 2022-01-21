import { Fragment } from "react";
import { CopyToClipboardButton } from "./CopyToClipboardButton";

const renderSecret = (secret: string) => {
  const chunks = secret?.match(/.{1,4}/g) || [];
  const fragments: React.ReactNode[] = [];

  for (let i = 0; i < chunks.length; i++) {
    fragments.push(<Fragment key={`${i}-main`}>{chunks[i]}</Fragment>);

    if (i < chunks.length - 1)
      fragments.push(
        <strong key={`${i}-dot`} style={{ userSelect: "none" }} aria-hidden>
          ·
        </strong>
      );
  }

  return <>{fragments}</>;
};

export interface SecretBoxProps {
  secret: string;
  copy?: boolean;
}

export const SecretBox: React.FC<SecretBoxProps> = ({
  secret,
  copy = false,
}) => {
  return (
    <code className="flex justify-center items-center p-4 text-2xl font-bold text-white uppercase bg-black rounded">
      {renderSecret(secret)}
      {copy && (
        <CopyToClipboardButton toCopy={secret} className="ml-4 text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
            />
          </svg>
        </CopyToClipboardButton>
      )}
    </code>
  );
};
