import { IpInfo, ReservedType } from "@/types";
import axios from "axios";

const getIpApiUrl = (ip: string) => `https://ipapi.co/${ip}/json/`;

const getUserData: () => Promise<IpInfo> = async () => {
  const { data } = await axios.get("https://api.ipify.org?format=json");
  if (data.ip) {
    const { data: userData } = await axios.get(getIpApiUrl(data.ip));
    return userData;
  }
  return data;
};

const searchIp: (
  ip: string
) => Promise<{ data: IpInfo | ReservedType }> = async (ip: string) => {
  return await axios.get(getIpApiUrl(ip));
};

const apiRequest = {
  getUserData,
  searchIp,
};

export default apiRequest;
