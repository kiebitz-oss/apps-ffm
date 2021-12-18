// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import React from "react";

export interface WizardProps {
  step: string;
}

export const Wizard: React.FC<WizardProps> = ({ children, step }) => {
  const pages: Record<string, React.ReactNode> = {};

  React.Children.toArray(children).map((page) => {
    // @ts-expect-error we use the opject to set the step-name
    pages[page.type?.name?.toLowerCase()] = page;
  });

  return (
    <>
      {pages?.[step + "step"]
        ? pages[step + "step"]
        : pages[Object.keys(pages)[0]]}
    </>
  );
};
