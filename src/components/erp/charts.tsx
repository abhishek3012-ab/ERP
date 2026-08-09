import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const chartColors = {
  blue: "#3b82f6",
  green: "#10b981",
  orange: "#f97316",
  violet: "#a855f7",
  red: "#ef4444",
  yellow: "#eab308",
};

interface ChartDataPoint {
  [key: string]: string | number;
}

interface ChartKeyConfig {
  key: string;
  color: string;
  label: string;
}

interface AreaChartProps {
  data: ChartDataPoint[];
  keys: ChartKeyConfig[];
  height: number;
}

export function TrendArea({ data, keys, height }: AreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
        <XAxis
          dataKey="name"
          stroke="rgba(0,0,0,0.4)"
          style={{ fontSize: "12px" }}
        />
        <YAxis stroke="rgba(0,0,0,0.4)" style={{ fontSize: "12px" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255,255,255,0.95)",
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: "8px",
          }}
          cursor={{ stroke: "rgba(0,0,0,0.1)" }}
        />
        <Legend />
        {keys.map((k) => (
          <Area
            key={k.key}
            type="monotone"
            dataKey={k.key}
            stroke={k.color}
            fill={k.color}
            fillOpacity={0.1}
            name={k.label}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function Bars({ data, keys, height }: AreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
        <XAxis
          dataKey="name"
          stroke="rgba(0,0,0,0.4)"
          style={{ fontSize: "12px" }}
        />
        <YAxis stroke="rgba(0,0,0,0.4)" style={{ fontSize: "12px" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255,255,255,0.95)",
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: "8px",
          }}
        />
        <Legend />
        {keys.map((k) => (
          <Bar key={k.key} dataKey={k.key} fill={k.color} name={k.label} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

interface DonutProps {
  data: Array<{ name: string; value: number; color: string }>;
  height: number;
}

export function Donut({ data, height }: DonutProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255,255,255,0.95)",
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: "8px",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
