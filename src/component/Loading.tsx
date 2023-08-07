import { useEffect, useState } from "react";

export default function Loading() {
  const [loadingText, setLoadingText] = useState("Loading");

  useEffect(() => {
    const interval = setInterval(() => {
      switch (loadingText) {
        case "Loading":
          setLoadingText("Loading.");
          break;
        case "Loading.":
          setLoadingText("Loading..");
          break;
        case "Loading..":
          setLoadingText("Loading...");
          break;
        default:
          setLoadingText("Loading");
          break;
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [loadingText]);

  return (
    <div id={"loading"}>
      <h3>{loadingText}</h3>
    </div>
  );
}
