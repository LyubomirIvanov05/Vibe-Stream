
import Image from "next/image";
import NavigationBar from "./pages/NavigationBar";
import LibrarySidebar from "./pages/LibrarySidebar";


export default function Home() {
  return (
    <div className="flex flex-col gap-5 p-2">
      <NavigationBar></NavigationBar>
      <LibrarySidebar></LibrarySidebar>
    </div>
  );
}
