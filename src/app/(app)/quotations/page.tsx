import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Edit, Trash2, Eye, FileEdit as FileEditIcon, Bell } from "lucide-react";
import type { Quotation } from "@/lib/types";

// Mock data for quotations
const mockQuotations: Quotation[] = [
  { id: "Q001", quotationNumber: "QTN-2024-001", clientId: "C003", clientName: "Innovate Corp", date: "2024-07-10", totalAmount: 5500.00, status: "approved", items: [], subTotal: 5000, gstAmount: 500 },
  { id: "Q002", quotationNumber: "QTN-2024-002", clientId: "C004", clientName: "Global Solutions", date: "2024-07-12", totalAmount: 3200.00, status: "sent", items: [], subTotal: 3200 },
  { id: "Q003", quotationNumber: "QTN-2024-003", clientId: "C003", clientName: "Innovate Corp", date: "2024-07-19", totalAmount: 1800.00, status: "follow-up", items: [], subTotal: 1800 },
  { id: "Q004", quotationNumber: "QTN-2024-004", clientId: "C005", clientName: "Future Systems", date: "2024-07-22", totalAmount: 750.00, status: "rejected", items: [], subTotal: 750 },
];

export default function QuotationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">Quotation Management</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Quotation
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quotation List</CardTitle>
          <CardDescription>Manage and track quotations for clients.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quotation #</TableHead>
                <TableHead>Client Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockQuotations.map((quotation) => (
                <TableRow key={quotation.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <FileEditIcon className="h-4 w-4 text-muted-foreground"/>
                    {quotation.quotationNumber}
                  </TableCell>
                  <TableCell>{quotation.clientName}</TableCell>
                  <TableCell>{new Date(quotation.date).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">${quotation.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        quotation.status === 'approved' ? 'secondary' : 
                        quotation.status === 'rejected' ? 'destructive' : 
                        quotation.status === 'follow-up' ? 'default' :
                        'outline'
                      }
                      className="capitalize items-center gap-1"
                    >
                      {quotation.status === 'follow-up' && <Bell className="h-3 w-3" />}
                      {quotation.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" aria-label="View quotation">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" aria-label="Edit quotation">
                        <Edit className="h-4 w-4" />
                      </Button>
                       <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" aria-label="Delete quotation">
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
