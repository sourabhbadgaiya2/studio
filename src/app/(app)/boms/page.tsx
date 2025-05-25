import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Edit, Trash2, Eye } from "lucide-react";
import type { BOM } from "@/lib/types";

// Mock data for BOMs
const mockBOMs: BOM[] = [
  { 
    id: "BOM001", 
    productId: "FP001",
    productName: "Premium Widget A", 
    items: [
      { materialId: "RM001", materialName: "Steel Plate", quantity: 2 },
      { materialId: "RM002", materialName: "Plastic Casing", quantity: 1 },
      { materialId: "RM005", materialName: "Screw Pack", quantity: 5 },
    ],
    description: "Standard BOM for Premium Widget A"
  },
  { 
    id: "BOM002", 
    productId: "FP002",
    productName: "Eco Gadget B", 
    items: [
      { materialId: "RM003", materialName: "Recycled Aluminum", quantity: 1.5 },
      { materialId: "RM004", materialName: "Biodegradable Polymer", quantity: 0.5 },
    ],
    description: "Eco-friendly BOM for Eco Gadget B"
  },
];

export default function BOMsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">Bill of Materials (BOM)</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Create New BOM
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>BOM List</CardTitle>
          <CardDescription>Manage Bill of Materials for your products.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>BOM ID</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Number of Items</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockBOMs.map((bom) => (
                <TableRow key={bom.id}>
                  <TableCell>{bom.id}</TableCell>
                  <TableCell className="font-medium">{bom.productName}</TableCell>
                  <TableCell>{bom.items.length}</TableCell>
                  <TableCell>{bom.description || "-"}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" aria-label="View BOM">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" aria-label="Edit BOM">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" aria-label="Delete BOM">
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
