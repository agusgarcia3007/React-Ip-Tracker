import { useIp } from "@/context/ip-context";
import { Search } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";

type InputEvent = React.ChangeEvent<HTMLInputElement>;

export default function SearchInput() {
  const [ip, setIp] = useState("");
  const { handleSearchIp } = useIp();
  const { toast } = useToast();

  const handleEnterIp = useCallback((e: InputEvent) => {
    setIp(e.target.value);
  }, []);

  const ipIsValid = useCallback(() => {
    const regex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    return ip.trim() !== "" && ip.match(regex);
  }, [ip]);

  const handleSearch = useCallback(() => {
    if (!ipIsValid()) {
      toast({
        title: "Invalid IP",
        description: "IP address should match IPv4 format",
        variant: "destructive",
      });
      return;
    }

    handleSearchIp(ip);
    setIp("");
  }, [handleSearchIp, ip, ipIsValid, toast]);

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        placeholder="Enter an ip address..."
        value={ip || ""}
        onChange={handleEnterIp}
      />
      <Button type="button" size="icon" onClick={handleSearch}>
        <Search />
      </Button>
    </div>
  );
}
