type Props = {
  damageTaken: number;
  maxHealth: number;
};

const HealthBar: React.FC<Props> = ({ damageTaken, maxHealth }) => {
  const health = maxHealth - damageTaken;

  return (
    <div className="h-4 relative border border-gray-500">
      <div className="absolute inset-0 text-center text-xs">
        {health}/{maxHealth}
      </div>
      <div
        className="h-full bg-green-500 health-bar-inner"
        style={{
          width: (health / maxHealth) * 100 + "%",
        }}
      />
    </div>
  );
};

export default HealthBar;
