import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import type { Vendor } from "@/lib/types";

// Mock data for vendors
const mockVendors: Vendor[] = [
  { id: "V001", name: "Apex Supplies Co.", email: "sales@apexsupplies.com", paymentTerms: "Net 30", contactPerson: "John Doe", phone: "555-1234", pendingAmount: 1500.00 },
  { id: "V002", name: "Beta Materials Inc.", email: "contact@betamaterials.com", paymentTerms: "Net 45", contactPerson: "Jane Smith", phone: "555-5678", pendingAmount: 0 },
  { id: "V003", name: "Gamma Components Ltd.", email: "info@gammacomp.com", paymentTerms: "COD", contactPerson: "Robert Brown", phone: "555-9012", pendingAmount: 320.50 },
];

export default function VendorsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">Vendor Management</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Vendor
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vendor List</CardTitle>
          <CardDescription>Manage your company's vendors and their details.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Payment Terms</TableHead>
                <TableHead className="text-right">Pending Amount</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockVendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell>{vendor.id}</TableCell>
                  <TableCell className="font-medium">{vendor.name}</TableCell>
                  <TableCell>{vendor.contactPerson || "-"}</TableCell>
                  <TableCell>{vendor.email}</TableCell>
                  <TableCell>{vendor.phone || "-"}</TableCell>
                  <TableCell>
                    <Badge variant={vendor.paymentTerms === 'COD' ? 'secondary' : 'outline'}>
                      {vendor.paymentTerms}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">${vendor.pendingAmount?.toFixed(2) || '0.00'}</TableCell>
                  <TableCell>
                    <div className="flex gap-2 justify-end">
                      <Button variant="ghost" size="icon" aria-label="Edit vendor">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" aria-label="Delete vendor">
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
