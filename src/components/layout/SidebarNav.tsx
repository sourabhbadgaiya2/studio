'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  ListChecks,
  Package,
  FileText,
  FileEdit,
  Truck,
  Brain,
  Building,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/lib/types';

const navItems: NavItem[] = [
  { title: 'Dashboard', href: '/', icon: LayoutDashboard },
  { title: 'Vendors', href: '/vendors', icon: Users },
  { title: 'BOMs', href: '/boms', icon: ListChecks },
  { title: 'Inventory', href: '/inventory', icon: Package },
  { title: 'Invoices', href: '/invoices', icon: FileText },
  { title: 'Quotations', href: '/quotations', icon: FileEdit },
  { title: 'Delivery Challans', href: '/delivery-challans', icon: Truck },
  { title: 'Production Optimizer', href: '/production-optimizer', icon: Brain },
];

interface SidebarNavProps {
  isMobile?: boolean;
  className?: string;
}

export default function SidebarNav({ isMobile = false, className }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex flex-col gap-2 text-sm font-medium", className)}>
      {isMobile && (
         <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-3 text-sidebar-primary transition-all hover:text-sidebar-primary"
          >
            <Building className="h-6 w-6" />
            <span className="text-lg font-semibold">Lean Factory</span>
        </Link>
      )}
      {navItems.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-sidebar-primary',
            pathname === item.href
              ? 'bg-sidebar-accent text-sidebar-accent-foreground'
              : 'text-sidebar-foreground hover:bg-sidebar-accent/50',
            item.disabled && 'cursor-not-allowed opacity-50'
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
