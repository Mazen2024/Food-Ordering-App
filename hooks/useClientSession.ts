import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";


/// Hook For Sharing User Session
export const useClientSession = (initialSession: Session | null) => {
  const { data: session, status } = useSession();
  const [currentSession, setcurrentSession] = useState(initialSession);
  useEffect(() => {
    if (session) {
      setcurrentSession(session);
    }
  }, [session]);

  useEffect(() => {
    if (initialSession) {
      setcurrentSession(initialSession);
    }
  }, [initialSession]);

  return { data: currentSession, status };
};
