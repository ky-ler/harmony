export interface User {
  id: string;
  userId?: string;
  username: string;
  imageUrl?: string;
}

export enum MemberRole {
  "Admin",
  "Moderator",
  "Member",
}

export interface Member extends User {
  memberRole: MemberRole;
}

export enum ChannelType {
  Text,
  Voice,
}

export type Channel = {
  id: string;
  name: string;
  serverId: string;
  messages?: string[];
  createdAt: string;
  updatedAt: string;
  members?: Member[];
  channelType: ChannelType;
};

export type ServerInfo = {
  userId: string | undefined;
  id: string;
  name: string;
  imageUrl: string;
  inviteCode?: string;
  messages?: string[];
  members: Member[];
  createdAt?: string;
  updatedAt?: string;
  channels: Channel[];
};

export interface GetServerFromInvite extends ServerInfo {
  userIsMember: boolean;
  memberCount: number;
}
