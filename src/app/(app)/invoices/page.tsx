import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Edit, Trash2, Eye, FileText as FileTextIcon } from "lucide-react";
import type { Invoice } from "@/lib/types";

// Mock data for invoices
const mockInvoices: Invoice[] = [
  { id: "INV001", invoiceNumber: "GST-001", clientId: "C001", clientName: "Tech Solutions Ltd.", date: "2024-07-15", totalAmount: 1250.00, isGstInvoice: true, status: "paid", items: [] , subTotal: 1000, gstAmount: 250},
  { id: "INV002", invoiceNumber: "NGST-001", clientId: "C002", clientName: "Creative Designs Co.", date: "2024-07-18", totalAmount: 800.00, isGstInvoice: false, status: "sent", items: [] , subTotal: 800},
  { id: "INV003", invoiceNumber: "GST-002", clientId: "C001", clientName: "Tech Solutions Ltd.", date: "2024-07-20", totalAmount: 2100.00, isGstInvoice: true, status: "overdue", items: [] , subTotal: 1800, gstAmount: 300},
];

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">Invoice Generation</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Invoice
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoice List</CardTitle>
          <CardDescription>Manage GST and Non-GST invoices.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Client Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                     <FileTextIcon className="h-4 w-4 text-muted-foreground" />
                    {invoice.invoiceNumber}
                  </TableCell>
                  <TableCell>{invoice.clientName}</TableCell>
                  <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={invoice.isGstInvoice ? "default" : "secondary"}>
                      {invoice.isGstInvoice ? "GST" : "Non-GST"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">${invoice.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        invoice.status === 'paid' ? 'secondary' : 
                        invoice.status === 'overdue' ? 'destructive' : 
                        'outline'
                      }
                      className="capitalize"
                    >
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" aria-label="View invoice">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" aria-label="Edit invoice">
                        <Edit className="h-4 w-4" />
                      </Button>
                       <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" aria-label="Delete invoice">
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
