import { useMemo } from "react";
import IpCard from "@/components/ip-card";
import Loader from "@/components/loader";
import Map from "@/components/map";
import Nav from "@/components/nav";
import Panel from "@/components/panel";
import { useIp } from "@/context/ip-context";

export default function App() {
  const { userData, requestStatus } = useIp();

  const isError = useMemo(() => requestStatus === "error", [requestStatus]);

  const isLoading = useMemo(() => requestStatus === "pending", [requestStatus]);

  if (isError) {
    return <p className="text-red-500">No data available</p>;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="h-screen bg-background text-primary">
      <Nav />

      <div className="h-[calc(100vh-40px)]">
        {userData.latitude && userData.longitude && (
          <Panel
            info={
              <div className="h-full p-4 overflow-y-auto">
                <IpCard userData={userData} />
              </div>
            }
            map={<Map lat={userData.latitude} long={userData.longitude} />}
          />
        )}
      </div>
    </main>
  );
}
