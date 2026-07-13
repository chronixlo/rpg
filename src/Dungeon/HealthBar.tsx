type Props = {
  damageTaken: number;
  maxHealth: number;
};

const HealthBar: React.FC<Props> = ({ damageTaken, maxHealth }) => {
  const health = maxHealth - damageTaken;

  return (
    <div className="flex-1 h-4 relative border-4 border-green-500 rounded-xl overflow-hidden">
      <div className="absolute inset-0 text-center text-lg flex justify-center items-center">
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
