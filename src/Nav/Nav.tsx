import NavButton from "./NavButton";

type Props = {
  onClick: (page: string) => void;
};

const Nav: React.FC<Props> = ({ onClick }) => {
  return (
    <div className="w-full flex justify-center items-center gap-4 border-t border-gray-500">
      <NavButton label="Dungeon" onClick={() => onClick("dungeon")} />
      <NavButton label="Inventory" onClick={() => onClick("inventory")} />
    </div>
  );
};

export default Nav;
