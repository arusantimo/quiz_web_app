// 파이 차트를 그리는 함수
function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) {
  const angleInRadians: number = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  const largeArcFlag: string = endAngle - startAngle <= 180 ? "0" : "1";

  const d: string = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");

  return d;
}

const PieChart = ({
  data,
}: {
  data: Array<{
    value: number;
    label: string;
    color: string;
  }>;
}) => {
  const total: number = data.reduce((acc, curr) => acc + curr.value, 0);
  let startAngle: number = 0;

  const slices: JSX.Element[] = data.map((item, index) => {
    const angle: number = (item.value / total) * 360;
    const labelPosition = polarToCartesian(50, 50, 40, startAngle + angle / 2);
    const slice: JSX.Element = (
      <g key={index}>
        <path
          d={describeArc(50, 50, 40, startAngle, startAngle + angle)}
          fill="none"
          stroke={item.color}
          strokeWidth="30"
        />
        <text x={labelPosition.x} y={labelPosition.y} textAnchor="middle">
          {item.label}
        </text>
      </g>
    );
    startAngle += angle;
    return slice;
  });

  return (
    <svg width="auto" height="200" viewBox="-25 -25 150 150">
      {slices}
    </svg>
  );
};

export default PieChart;
