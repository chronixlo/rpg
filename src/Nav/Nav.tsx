import NavButton from "./NavButton";

const PAGES = [
  {
    label: "Dungeon",
    value: "dungeon",
  },
  {
    label: "Hero",
    value: "hero",
  },
  {
    label: "Inventory",
    value: "inventory",
  },
];

type Props = {
  selectedView: string;
  onClick: (page: string) => void;
};

const Nav: React.FC<Props> = ({ selectedView, onClick }) => {
  return (
    <div className="w-full flex justify-center items-center gap-4 p-2 border-t border-amber-800">
      {PAGES.map(({ label, value }) => (
        <NavButton
          label={label}
          selected={selectedView === value}
          onClick={() => onClick(value)}
        />
      ))}
    </div>
  );
};

export default Nav;
