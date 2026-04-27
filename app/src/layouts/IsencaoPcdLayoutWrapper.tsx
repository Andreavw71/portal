import { IsencaoPcdProvider } from "../contexts/IsencaoPcdContext";
import { IsencaoPcdLayout } from "./IsencaoPcdLayout";

export function IsencaoPcdLayoutWrapper() {
  return (
    <IsencaoPcdProvider>
      <IsencaoPcdLayout />
    </IsencaoPcdProvider>
  );
}
