import Head from "next/head";
import router from "next/router";
import { theme } from "../../theme";
import { Notifications } from "../Notifications";

interface PageProps extends React.ComponentProps<"main"> {
  narrow?: boolean;
  title?: string;
}

export const Page: React.FC<PageProps> = ({
  children,
  narrow = false,
  title,
  ...props
}) => {
  return (
    <main {...props}>
      <Head>
        <title>{title || theme.meta.title}</title>

        <meta name="robots" content={theme.meta.robots} />
        <meta name="description" content={theme.meta.description} />
        <meta property="og:url" content={`${theme.meta.url}${router.asPath}`} />
        <link rel="canonical" href={`${theme.meta.url}${router.asPath}`} />

        {/* Open Graph */}
        <meta property="og:type" content={theme.meta.type} />
        <meta property="og:site_name" content={theme.meta.siteName} />
        <meta property="og:description" content={theme.meta.description} />
        <meta property="og:title" content={theme.meta.title} />
      </Head>

      <Notifications />

      {narrow ? <div className="max-w-2xl">{children}</div> : children}
    </main>
  );
};
