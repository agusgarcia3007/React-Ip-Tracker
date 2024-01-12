import IpCard from "@/components/ip-card";
import Loader from "@/components/loader";
import Map from "@/components/map";
import Nav from "@/components/nav";
import Panel from "@/components/panel";
import { useIp } from "@/context/ip-context";
import { useMemo } from "react";

export default function App() {
  const { userData, requestStatus, errorMessage } = useIp();

  const content = useMemo(() => {
    switch (requestStatus) {
      case "success":
        return (
          <Panel
            info={
              <div className="h-full p-4 overflow-y-auto">
                <IpCard userData={userData} />
              </div>
            }
            map={<Map lat={userData.latitude} long={userData.longitude} />}
          />
        );
      case "error":
        return (
          <div className="flex w-full h-full justify-center items-center">
            <p className="text-destructive text-xl">
              {errorMessage || "no data available"}
            </p>
          </div>
        );
      case "pending":
        return <Loader />;
      default:
        return null;
    }
  }, [requestStatus, userData, errorMessage]);

  return (
    <main className="h-screen bg-background text-primary">
      <Nav />

      <div className="h-[calc(100vh-40px)]">{content}</div>
    </main>
  );
}
