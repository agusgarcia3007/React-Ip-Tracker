import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { IpInfo } from "@/types";
import { ChevronUp } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

export default function IpCard({ userData }: { userData: IpInfo }) {
  const [isOpen, setIsOpen] = useState(false);

  const parseValue = useCallback((value: string) => {
    return value
      .replace(/_/g, " ")
      .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
  }, []);

  const remainingData = useMemo(() => {
    const allKeys = Object.keys(userData);

    const filteredKeys = allKeys.filter(
      (key) => !["ip", "country_name", "city", "org"].includes(key)
    );

    const data = filteredKeys.reduce((acc, key) => {
      return {
        ...acc,
        [key]: userData[key as keyof IpInfo],
      };
    }, {});

    return data;
  }, [userData]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <CardTitle>IP Info</CardTitle>
          <ModeToggle />
        </div>
      </CardHeader>
      <CardContent>
        <ul className="list-none space-y-2">
          <li>
            <b>Looking IP:</b>
            <span className="text-muted-foreground">{userData.ip}</span>
          </li>
          <li>
            <b>From:</b>
            <span className="text-muted-foreground">
              {userData.country_name}
            </span>
          </li>
          <li>
            <b>City:</b>{" "}
            <span className="text-muted-foreground">{userData.city}</span>
          </li>
          <li>
            <b>ORG:</b>{" "}
            <span className="text-muted-foreground">{userData.org}</span>
          </li>
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            {!isOpen && (
              <CollapsibleTrigger asChild>
                <Button variant="secondary">More Info</Button>
              </CollapsibleTrigger>
            )}
            <CollapsibleContent>
              {Object.entries(remainingData).map(([key, value]) => (
                <li key={key}>
                  <b>{parseValue(key)}:</b>
                  <span className="text-muted-foreground">
                    {value as string}
                  </span>
                </li>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </ul>
      </CardContent>
      <CardFooter>
        {isOpen && (
          <div className="flex items-center justify-around">
            <p className="text-muted-foreground">
              Add new IP address to see more information
            </p>

            <Button
              variant="secondary"
              className="cursor-pointer"
              asChild
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <ChevronUp />
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
