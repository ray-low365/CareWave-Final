
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { InventoryItem } from "@/types";
import { cn } from "@/lib/utils";

interface InventoryStatusProps {
  items: InventoryItem[];
  className?: string;
}

const InventoryStatus: React.FC<InventoryStatusProps> = ({ items, className }) => {
  // Sort items by stock level (lowest percentage first)
  const sortedItems = [...items]
    .map(item => ({
      ...item,
      stockPercentage: (item.quantity / (item.reorderLevel * 3)) * 100
    }))
    .sort((a, b) => a.stockPercentage - b.stockPercentage)
    .slice(0, 5);

  const getStockStatus = (item: InventoryItem) => {
    const percentage = (item.quantity / (item.reorderLevel * 3)) * 100;
    
    if (item.quantity <= item.reorderLevel) {
      return { label: 'Low', class: 'bg-red-100 text-red-800' };
    } else if (percentage < 50) {
      return { label: 'Medium', class: 'bg-yellow-100 text-yellow-800' };
    } else {
      return { label: 'Good', class: 'bg-green-100 text-green-800' };
    }
  };

  const getProgressColor = (item: InventoryItem) => {
    const percentage = (item.quantity / (item.reorderLevel * 3)) * 100;
    
    if (item.quantity <= item.reorderLevel) {
      return 'bg-red-500';
    } else if (percentage < 50) {
      return 'bg-yellow-500';
    } else {
      return 'bg-green-500';
    }
  };

  return (
    <Card className={cn("h-full overflow-hidden", className)}>
      <CardHeader>
        <CardTitle className="text-base font-medium">Inventory Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {sortedItems.map((item) => {
            const status = getStockStatus(item);
            const progressColor = getProgressColor(item);
            const percentage = Math.min(100, Math.round((item.quantity / (item.reorderLevel * 3)) * 100));
            
            return (
              <div key={item.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm">{item.name}</span>
                  <Badge className={cn("font-normal", status.class)}>
                    {status.label}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <Progress value={percentage} className="h-2" indicatorClassName={progressColor} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Qty: {item.quantity}</span>
                    <span>Reorder at: {item.reorderLevel}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryStatus;
