import { useEffect, useState } from "react";

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState<boolean>(
    window.matchMedia(query).matches
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const documentChangeHandler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQueryList.addEventListener("change", documentChangeHandler);

    return () =>
      mediaQueryList.removeEventListener("change", documentChangeHandler);
  }, [query]);

  return matches;
};

export default useMediaQuery;
