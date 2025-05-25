import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Edit, Trash2, Eye, Printer, Truck as TruckIcon } from "lucide-react";
import type { DeliveryChallan } from "@/lib/types";

// Mock data for delivery challans
const mockChallans: DeliveryChallan[] = [
  { id: "DC001", challanNumber: "DCN-2024-07-001", date: "2024-07-15", type: "finished_good_delivery", recipientName: "Tech Solutions Ltd.", items: [{itemId: "FP001", itemName: "Premium Widget A", quantity: 50, unit: "units"}], isBilled: true, invoiceId: "INV001" },
  { id: "DC002", challanNumber: "DCN-2024-07-002", date: "2024-07-18", type: "raw_material_dispatch", recipientName: "Self/Production Floor", items: [{itemId: "RM001", itemName: "Steel Plate", quantity: 100, unit: "pcs"}], isBilled: false },
  { id: "DC003", challanNumber: "DCN-2024-07-003", date: "2024-07-20", type: "finished_good_delivery", recipientName: "Creative Designs Co.", items: [{itemId: "FP002", itemName: "Eco Gadget B", quantity: 20, unit: "units"}], isBilled: false },
];

export default function DeliveryChallansPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">Delivery Challans</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Challan
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Challan List</CardTitle>
          <CardDescription>Manage and track delivery challans.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Challan #</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockChallans.map((challan) => (
                <TableRow key={challan.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <TruckIcon className="h-4 w-4 text-muted-foreground" />
                    {challan.challanNumber}
                  </TableCell>
                  <TableCell>{new Date(challan.date).toLocaleDateString()}</TableCell>
                  <TableCell className="capitalize">{challan.type.replace(/_/g, ' ')}</TableCell>
                  <TableCell>{challan.recipientName}</TableCell>
                  <TableCell>{challan.items.length}</TableCell>
                  <TableCell>
                    <Badge variant={challan.isBilled ? "secondary" : "outline"}>
                      {challan.isBilled ? "Billed" : "Pending Billing"}
                    </Badge>
                    {challan.isBilled && challan.invoiceId && (
                      <span className="text-xs text-muted-foreground ml-1">({challan.invoiceId})</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" aria-label="View challan">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" aria-label="Print challan">
                        <Printer className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" aria-label="Edit challan">
                        <Edit className="h-4 w-4" />
                      </Button>
                       <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" aria-label="Delete challan">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
