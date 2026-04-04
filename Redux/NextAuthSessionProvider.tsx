"use client";

import { SessionProvider } from "next-auth/react";

// Wrap All Pages Into Next Auth Session Provider
const NextAuthSessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthSessionProvider;
