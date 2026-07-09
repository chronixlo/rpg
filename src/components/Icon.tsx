interface Props extends React.PropsWithChildren {
  src?: string | null;
}

const icons = import.meta.glob<{
  default: React.FC<React.SVGProps<SVGSVGElement>>;
}>("../icons/**/*.svg", {
  query: "?react",
  eager: true,
});

const Icon: React.FC<Props> = ({ src, children }) => {
  const path = `../icons/${src}`;
  const IconComponent = icons[path]?.default;
  return (
    <div className="w-full aspect-square flex items-center justify-center relative">
      {IconComponent && (
        <IconComponent style={{}} className="absolute inset-0" />
      )}
      {children}
    </div>
  );
};

export default Icon;
