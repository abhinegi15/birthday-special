import { useEffect } from "react";
import Home from "./pages/home";

export default function App() {
  useEffect(() => {
    document.title = "Happy Birthday, My Love ♥";
  }, []);

  return <Home />;
}
