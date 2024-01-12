import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { useMediaQuery } from "@/hooks";

type PanelProps = {
  info?: React.ReactNode;
  map?: React.ReactNode;
};

export default function Panel({ info, map }: PanelProps) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  return (
    <ResizablePanelGroup direction={isMobile ? "vertical" : "horizontal"}>
      <ResizablePanel>{info}</ResizablePanel>
      <ResizableHandle
        className="bg-primary p-[1px]"
        withHandle
      ></ResizableHandle>
      <ResizablePanel defaultSize={isMobile ? 50 : 75}>{map}</ResizablePanel>
    </ResizablePanelGroup>
  );
}
