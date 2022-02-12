export interface Theme {
  title: string;
  supportEmail: string;
  logoAlt: string;
  logoUrl: string;
  content: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    imprint: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    privacy: any;
  };
  meta: {
    title: string;
    siteName: string;
    description: string;
    url: string;
    type: string;
    robots: string;
    image: string;
  };
  // logo: any;
  // footer: React.ReactNode;
  // primaryColor: string;
  // secondaryColor: string;
}
