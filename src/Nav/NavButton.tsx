import { cls } from "../utils";

type Props = {
  label: string;
  selected: boolean;
  onClick: () => void;
};

const NavButton: React.FC<Props> = ({ label, selected, onClick }) => {
  return (
    <button
      className={cls([
        "border-2 border-amber-700 text-amber-700 p-1 w-30 rounded-xl",
        selected && "bg-amber-700 text-white",
      ])}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default NavButton;
