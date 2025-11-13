import { useEffect, useState } from "react";
import { CreateServerModal } from "~/components/modals/CreateServerModal";
import { InviteModal } from "~/components/modals/InviteModal";
import { EditServerModal } from "~/components/modals/EditServerModal";
import { MembersModal } from "~/components/modals/MembersModal";
import { EditUserProfileModal } from "~/components/modals/EditUserProfileModal";
import { AcceptInviteModal } from "../modals/AcceptInviteModal";
import { PostRegistrationModal } from "../modals/PostRegistrationModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <PostRegistrationModal />
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MembersModal />
      <EditUserProfileModal />
      <AcceptInviteModal />
    </>
  );
};
