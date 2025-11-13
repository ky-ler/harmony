import { api } from "~/lib/api";
import { ServerInfo } from "~/types";

export const getCurrentServerInfo = async (id: string): Promise<ServerInfo> => {
  const response = await api.get(`servers/${id}`);
  return response.data;
};
