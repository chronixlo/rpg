interface Props extends React.PropsWithChildren {
  onClick: (e: React.MouseEvent) => void;
}

const Button: React.FC<Props> = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className="border px-1">
      {children}
    </button>
  );
};

export default Button;
