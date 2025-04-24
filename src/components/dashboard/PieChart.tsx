
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart as Chart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { cn } from "@/lib/utils";

interface PieChartProps {
  title: string;
  data: Array<{ name: string; value: number }>;
  height?: number;
  className?: string;
  description?: string;
  colors?: string[];
}

const COLORS = ['#0ea5e9', '#0891b2', '#6366f1', '#8b5cf6', '#d946ef'];

const PieChart: React.FC<PieChartProps> = ({
  title,
  data,
  height = 300,
  className,
  description,
  colors = COLORS
}) => {
  // Simplify data by showing only top 4 items and grouping the rest as "Other"
  const simplifiedData = data.length > 4
    ? [...data]
        .sort((a, b) => b.value - a.value)
        .reduce((acc, item, index) => {
          if (index < 4) {
            acc.push(item);
          } else {
            const otherItem = acc.find(i => i.name === "Other");
            if (otherItem) {
              otherItem.value += item.value;
            } else {
              acc.push({ name: "Other", value: item.value });
            }
          }
          return acc;
        }, [] as Array<{ name: string; value: number }>)
    : data;

  return (
    <Card className={cn("h-full overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
        {data.length > 4 && <p className="text-xs text-muted-foreground mt-1">Showing top 4 categories</p>}
      </CardHeader>
      <CardContent>
        <div style={{ height: `${height}px` }}>
          <ResponsiveContainer width="100%" height="100%">
            <Chart>
              <Pie
                data={simplifiedData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                innerRadius={50}
                paddingAngle={5}
                dataKey="value"
              >
                {simplifiedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value}`, '']}
                contentStyle={{
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  fontSize: '12px'
                }}
              />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                formatter={(value) => <span style={{ fontSize: '11px' }}>{value}</span>}
              />
            </Chart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PieChart;
