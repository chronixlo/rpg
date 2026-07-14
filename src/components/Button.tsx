import { cls } from "../utils";

interface Props extends React.PropsWithChildren {
  onClick: (e: React.MouseEvent) => void;
  className?: string;
  type?: "default" | "outline";
}

const Button: React.FC<Props> = ({
  onClick,
  children,
  className,
  type = "default",
}) => {
  return (
    <button
      onClick={onClick}
      className={cls([
        "border-2 border-amber-700 text-amber-700 px-1 rounded-sm",
        type === "default" && "bg-amber-700 text-white",
        className,
      ])}
    >
      {children}
    </button>
  );
};

export default Button;
