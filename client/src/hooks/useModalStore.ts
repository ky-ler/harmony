import { User } from "@auth0/auth0-react";
import { create } from "zustand";
import { GetServerFromInvite, ServerInfo } from "~/types";

export type ModalType =
  | "createServer"
  | "invite"
  | "editServer"
  | "members"
  | "createChannel"
  | "leaveServer"
  | "deleteServer"
  | "editUserProfile"
  | "acceptInvite"
  | "postRegistration";

type ModalData = {
  server?: ServerInfo;
  user?: User;
  serverFromInvite?: GetServerFromInvite;
};

type ModalStore = {
  modalType: ModalType | null;
  modalData: ModalData;
  isOpen: boolean;
  onOpen: (modalType: ModalType, modalData?: ModalData) => void;
  onClose: () => void;
};

export const useModal = create<ModalStore>((set) => ({
  modalType: null,
  modalData: {},
  isOpen: false,
  onOpen: (modalType, modalData = {}) =>
    set({ modalType, modalData, isOpen: true }),
  onClose: () => set({ modalType: null, isOpen: false }),
}));
