import { useState } from "react";
import Inventory from "./Inventory/Inventory";
import Nav from "./Nav/Nav";
import Dungeon from "./Dungeon/Dungeon";

function App() {
  const [view, setView] = useState("dungeon");

  return (
    <div className="w-full max-w-lg h-full flex flex-col flex-1 border border-gray-500 m-1 md:m-5 rounded-sm">
      <div className="flex-1">
        {view === "dungeon" && <Dungeon />}
        {view === "inventory" && <Inventory />}
      </div>
      <Nav onClick={(page) => setView(page)} />
    </div>
  );
}

export default App;
