import apiRequest from "@/lib/api/ip";
import { IpInfo, ReservedType } from "@/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type IPContextType = {
  userData: IpInfo;
  handleSearchIp: (ip: string) => Promise<void>;
  requestStatus?: requestStatus;
  errorMessage?: string;
};

type requestStatus = "idle" | "pending" | "success" | "error";

const IpContext = createContext<IPContextType>({} as IPContextType);

const IpProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<IpInfo>({} as IpInfo);
  const [requestStatus, setRequestStatus] = useState<requestStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      setRequestStatus("pending");
      try {
        const response = await apiRequest.getUserData();
        setUserData(response);
        setRequestStatus("success");
      } catch (error) {
        setRequestStatus("error");
      }
    };
    getUserData();
  }, []);

  const handleSearchIp = useCallback(
    async (ip: string) => {
      setRequestStatus("pending");
      try {
        const { data } = await apiRequest.searchIp(ip);
        if ((data as ReservedType).error) {
          setErrorMessage((data as ReservedType).reason);
          throw new Error((data as ReservedType).reason);
        }
        setUserData(data as IpInfo);
        setRequestStatus("success");
      } catch (error) {
        setRequestStatus("error");
      }
    },
    [setUserData]
  );

  return (
    <IpContext.Provider
      value={{ userData, handleSearchIp, requestStatus, errorMessage }}
    >
      {children}
    </IpContext.Provider>
  );
};

function useIp() {
  const context = useContext(IpContext);
  if (!context) {
    throw new Error("useIp must be used within a IpProvider");
  }
  return context;
}

export { IpProvider, useIp };
