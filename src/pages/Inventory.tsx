
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { InventoryService } from "@/services/api";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Loader2, Package, Plus, Search } from "lucide-react";
import AddInventoryItemForm from "@/components/inventory/AddInventoryItemForm";
import { cn } from "@/lib/utils";

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [addItemOpen, setAddItemOpen] = useState(false);

  const { data: inventory, isLoading, refetch } = useQuery({
    queryKey: ["inventory"],
    queryFn: InventoryService.getAll,
  });

  const filteredInventory = inventory?.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = inventory
    ? [...new Set(inventory.map((item) => item.category).filter(Boolean))]
    : [];

  const getStockLevel = (item: { quantity: number; reorderLevel: number }) => {
    if (item.quantity <= item.reorderLevel) {
      return { label: "Low Stock", color: "bg-red-500" };
    } else if (item.quantity <= item.reorderLevel * 2) {
      return { label: "Medium Stock", color: "bg-yellow-500" };
    } else {
      return { label: "In Stock", color: "bg-green-500" };
    }
  };

  const handleAddItemSuccess = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex h-[calc(100vh-120px)] items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="mt-4 text-lg text-muted-foreground">Loading inventory...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Inventory</h2>
          <div className="flex items-center gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search inventory..."
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={() => setAddItemOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={!filterCategory ? "secondary" : "outline"}
            size="sm"
            onClick={() => setFilterCategory(null)}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={filterCategory === category ? "secondary" : "outline"}
              size="sm"
              onClick={() => setFilterCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              <CardTitle>Inventory Items</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-1 gap-4 bg-muted/50 p-4 text-sm font-medium text-muted-foreground md:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
                <div>Item Name</div>
                <div className="hidden md:block">Category</div>
                <div className="hidden md:block">Stock Level</div>
                <div className="hidden md:block">Quantity</div>
                <div className="hidden md:block">Actions</div>
              </div>
              {filteredInventory && filteredInventory.length > 0 ? (
                <div className="divide-y">
                  {filteredInventory.map((item) => {
                    const stockLevel = getStockLevel(item);
                    const stockPercentage = Math.min(
                      100,
                      Math.round((item.quantity / (item.reorderLevel * 3)) * 100)
                    );

                    return (
                      <div
                        key={item.id}
                        className="grid grid-cols-1 gap-4 p-4 text-sm md:grid-cols-[2fr_1fr_1fr_1fr_1fr]"
                      >
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <div className="md:hidden">
                            <div className="mt-1">
                              <Badge variant="outline">{item.category}</Badge>
                              <Badge
                                className={cn(
                                  "ml-2",
                                  stockLevel.label === "Low Stock"
                                    ? "bg-red-100 text-red-800"
                                    : stockLevel.label === "Medium Stock"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                                )}
                              >
                                {stockLevel.label}
                              </Badge>
                            </div>
                            <div className="mt-2">
                              <Progress
                                value={stockPercentage}
                                className="h-2 w-full"
                                indicatorClassName={stockLevel.color}
                              />
                              <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                                <span>Qty: {item.quantity}</span>
                                <span>Reorder at: {item.reorderLevel}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="hidden md:block">
                          <Badge variant="outline">{item.category}</Badge>
                        </div>
                        <div className="hidden md:block">
                          <Badge
                            className={cn(
                              stockLevel.label === "Low Stock"
                                ? "bg-red-100 text-red-800"
                                : stockLevel.label === "Medium Stock"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            )}
                          >
                            {stockLevel.label}
                          </Badge>
                        </div>
                        <div className="hidden md:block">
                          <div className="space-y-1">
                            <Progress
                              value={stockPercentage}
                              className="h-2"
                              indicatorClassName={stockLevel.color}
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>{item.quantity}</span>
                              <span>Min: {item.reorderLevel}</span>
                            </div>
                          </div>
                        </div>
                        <div className="hidden space-x-2 md:flex">
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            Restock
                          </Button>
                        </div>
                        <div className="flex space-x-2 md:hidden">
                          <Button size="sm" variant="outline" className="flex-1">
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            Restock
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex h-32 items-center justify-center p-4">
                  <p className="text-center text-muted-foreground">
                    {searchTerm
                      ? "No inventory items match your search criteria."
                      : "No inventory items found."}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <AddInventoryItemForm 
        open={addItemOpen} 
        onOpenChange={setAddItemOpen} 
        onSuccess={handleAddItemSuccess} 
      />
    </DashboardLayout>
  );
};

export default Inventory;
