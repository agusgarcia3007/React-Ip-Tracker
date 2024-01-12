import SearchInput from "./search-input";
import { Button } from "./ui/button";

export default function Nav() {
  return (
    <header className="flex sm:w-full items-center sm:gap-x-4 justify-center sm:justify-around mx-3 sm:mx-0 my-3">
      <Button
        className="hidden sm:inline-block sm:text-4xl text-primary font-semibold"
        variant="ghost"
        size="lg"
      >
        <a href="https://github.com/agusgarcia3007" target="_blank">
          IPTracker
        </a>
      </Button>
      <Button
        className="text-3xl sm:hidden text-primary font-semibold"
        variant="ghost"
      >
        <a href="https://github.com/agusgarcia3007" target="_blank">
          IPT
        </a>
      </Button>

      <SearchInput />
    </header>
  );
}
