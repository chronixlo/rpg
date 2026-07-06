import { useState } from "react";
import Inventory from "./Inventory/Inventory";
import Nav from "./Nav/Nav";
import Dungeon from "./Dungeon/Dungeon";
import Hero from "./Hero/Hero";

function App() {
  const [view, setView] = useState("dungeon");

  return (
    <div className="w-full max-w-lg h-full flex flex-col flex-1 border border-gray-500 m-1 md:m-5 rounded-sm">
      <div className="flex-1 overflow-hidden flex flex-col">
        {view === "dungeon" && <Dungeon />}
        {view === "hero" && <Hero />}
        {view === "inventory" && <Inventory />}
      </div>
      <Nav onClick={(page) => setView(page)} />
    </div>
  );
}

export default App;
