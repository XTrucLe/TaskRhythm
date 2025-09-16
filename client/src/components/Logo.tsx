type LogoProps = {
  className?: string;
  size?: number; // default size
};

export default function Logo({ className = "", size = 80 }: LogoProps) {
  const width = size * 3.1; // tỷ lệ width ~3:1 so với height
  const height = size;
  const fontSize = size * 0.45;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <text
        x={width * 0.04}
        y={height * 0.625}
        fontFamily="Arial, sans-serif"
        fontSize={fontSize}
        fontWeight="bold"
        style={{ fill: "var(--color-text-secondary)" }}
      >
        Task
      </text>

      <text
        x={width * 0.36}
        y={height * 0.625}
        fontFamily="Arial, sans-serif"
        fontSize={fontSize}
        fontWeight="bold"
        style={{ fill: "var(--color-primary)" }}
      >
        Rhythm
      </text>
    </svg>
  );
}
