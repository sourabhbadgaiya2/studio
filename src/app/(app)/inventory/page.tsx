import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Edit, Bell, AlertTriangle } from "lucide-react";
import type { InventoryItem, InventoryItemType } from "@/lib/types";

// Mock data for inventory items
const mockInventory: InventoryItem[] = [
  { id: "INV001", itemId: "RM001", name: "Steel Plate", type: "raw_material", quantity: 150, unit: "pcs", minStockLevel: 50, lastUpdated: "2024-07-20" },
  { id: "INV002", itemId: "FP001", name: "Premium Widget A", type: "finished_good", quantity: 75, unit: "units", minStockLevel: 20, lastUpdated: "2024-07-21" },
  { id: "INV003", itemId: "FL001", name: "Diesel", type: "fuel", quantity: 500, unit: "liters", minStockLevel: 100, lastUpdated: "2024-07-19" },
  { id: "INV004", itemId: "EP001", name: "Machine Bearing X1", type: "equipment_part", quantity: 10, unit: "pcs", minStockLevel: 5, lastUpdated: "2024-07-15" },
  { id: "INV005", itemId: "RM002", name: "Plastic Casing", type: "raw_material", quantity: 30, unit: "pcs", minStockLevel: 100, lastUpdated: "2024-07-22" }, // Low stock example
];

const inventoryTypes: { value: InventoryItemType; label: string }[] = [
  { value: "raw_material", label: "Raw Materials" },
  { value: "finished_good", label: "Finished Goods" },
  { value: "fuel", label: "Fuel" },
  { value: "equipment_part", label: "Equipment Parts" },
];

function InventoryTable({ items }: { items: InventoryItem[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Item ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead>Min. Stock</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Updated</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id} className={item.quantity < item.minStockLevel ? "bg-destructive/10" : ""}>
            <TableCell>{item.itemId}</TableCell>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>{item.unit}</TableCell>
            <TableCell>{item.minStockLevel}</TableCell>
            <TableCell>
              {item.quantity < item.minStockLevel ? (
                <Badge variant="destructive" className="items-center gap-1">
                  <AlertTriangle className="h-3 w-3" /> Low Stock
                </Badge>
              ) : (
                <Badge variant="secondary">In Stock</Badge>
              )}
            </TableCell>
            <TableCell>{new Date(item.lastUpdated).toLocaleDateString()}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" aria-label="Edit item">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">Inventory Tracking</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Stock / Adjustment
        </Button>
      </div>

      <Tabs defaultValue="raw_material">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-4">
          {inventoryTypes.map((type) => (
            <TabsTrigger key={type.value} value={type.value}>{type.label}</TabsTrigger>
          ))}
        </TabsList>

        {inventoryTypes.map((typeInfo) => (
          <TabsContent key={typeInfo.value} value={typeInfo.value}>
            <Card>
              <CardHeader>
                <CardTitle>{typeInfo.label}</CardTitle>
                <CardDescription>Current stock levels for {typeInfo.label.toLowerCase()}.</CardDescription>
              </CardHeader>
              <CardContent>
                <InventoryTable items={mockInventory.filter(item => item.type === typeInfo.value)} />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
       <Card className="mt-6 border-accent border-2">
        <CardHeader className="flex flex-row items-center gap-2">
          <Bell className="h-6 w-6 text-accent" />
          <CardTitle className="text-accent">Stock Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Items highlighted in <span className="text-destructive font-semibold">red</span> are below minimum stock levels.
          </p>
          {/* Potentially list low stock items here for quick view */}
        </CardContent>
      </Card>
    </div>
  );
}
