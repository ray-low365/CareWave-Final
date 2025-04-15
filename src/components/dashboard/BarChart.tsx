
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart as Chart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from "@/lib/utils";

interface BarChartProps {
  title: string;
  data: Array<{ [key: string]: string | number }>;
  xKey: string;
  yKey: string;
  height?: number;
  className?: string;
  description?: string;
  color?: string;
}

const BarChart: React.FC<BarChartProps> = ({
  title,
  data,
  xKey,
  yKey,
  height = 300,
  className,
  description,
  color = "#0ea5e9"
}) => {
  return (
    <Card className={cn("h-full overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </CardHeader>
      <CardContent>
        <div style={{ height: `${height}px` }}>
          <ResponsiveContainer width="100%" height="100%">
            <Chart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey={xKey} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: 'none', 
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  fontSize: '12px'
                }} 
              />
              <Bar dataKey={yKey} fill={color} radius={[4, 4, 0, 0]} barSize={30} />
            </Chart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarChart;
