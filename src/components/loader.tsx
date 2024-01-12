import { LoaderIcon } from "lucide-react";

export default function Loader() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <LoaderIcon className="animate-spin h-10 w-10" />
    </div>
  );
}
