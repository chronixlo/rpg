interface Props extends React.PropsWithChildren {
  onClick: (e: React.MouseEvent) => void;
}

const Button: React.FC<Props> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="border-2 border-amber-700 bg-amber-700 px-1 rounded-sm"
    >
      {children}
    </button>
  );
};

export default Button;
