type Props = {
  label: string;
  onClick: () => void;
};

const NavButton: React.FC<Props> = ({ label, onClick }) => {
  return (
    <button
      className="border-2 border-amber-700 text-amber-700 p-1 w-30 rounded-xl"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default NavButton;
