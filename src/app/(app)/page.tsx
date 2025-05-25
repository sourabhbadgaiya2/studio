import DashboardCard from '@/components/dashboard/DashboardCard';
import {
  Users,
  ListChecks,
  Package,
  FileText,
  FileEdit,
  Truck,
  Brain,
  BarChart3,
  DollarSign
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const dashboardItems = [
  {
    title: 'Vendor Management',
    description: 'Manage vendor details, purchase orders, and payments.',
    href: '/vendors',
    icon: Users,
    value: "15", // Example value
    valueLabel: "Active Vendors" // Example label
  },
  {
    title: 'BOM Management',
    description: 'Define and manage Bill of Materials for products.',
    href: '/boms',
    icon: ListChecks,
    value: "120",
    valueLabel: "Configured BOMs"
  },
  {
    title: 'Inventory Tracking',
    description: 'Monitor stock levels of materials and products.',
    href: '/inventory',
    icon: Package,
    value: "5",
    valueLabel: "Items Low Stock"
  },
  {
    title: 'Invoice Generation',
    description: 'Create and manage GST and Non-GST invoices.',
    href: '/invoices',
    icon: FileText,
    value: "$12,500",
    valueLabel: "Invoiced This Month"
  },
  {
    title: 'Quotation Management',
    description: 'Prepare and track quotations for clients.',
    href: '/quotations',
    icon: FileEdit,
    value: "8",
    valueLabel: "Pending Quotations"
  },
  {
    title: 'Delivery Challans',
    description: 'Issue and manage delivery challans.',
    href: '/delivery-challans',
    icon: Truck,
    value: "22",
    valueLabel: "Deliveries Today"
  },
  {
    title: 'AI Production Optimizer',
    description: 'Get AI-powered insights for production schedules.',
    href: '/production-optimizer',
    icon: Brain,
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight text-primary">Lean Factory Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Production Output</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350 Units</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <ListChecks className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+5 from yesterday</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {dashboardItems.map((item) => (
          <DashboardCard
            key={item.title}
            title={item.title}
            description={item.description}
            href={item.href}
            icon={item.icon}
            value={item.value}
            valueLabel={item.valueLabel}
          />
        ))}
      </div>
    </div>
  );
}
