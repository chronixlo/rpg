type Props = React.PropsWithChildren;

const Icon: React.FC<Props> = ({ children }) => {
  return (
    <div className="w-full aspect-square flex items-center justify-center">
      {children}
    </div>
  );
};

export default Icon;
