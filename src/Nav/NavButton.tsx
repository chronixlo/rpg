type Props = {
  label: string;
  onClick: () => void;
};

const NavButton: React.FC<Props> = ({ label, onClick }) => {
  return (
    <button className="border p-1 w-20 h-20" onClick={onClick}>
      {label}
    </button>
  );
};

export default NavButton;
