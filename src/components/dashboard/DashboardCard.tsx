import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
  value?: string;
  valueLabel?: string;
}

export default function DashboardCard({ title, description, href, icon: Icon, value, valueLabel }: DashboardCardProps) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold text-primary">{title}</CardTitle>
        <Icon className="h-6 w-6 text-accent" />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        {value && valueLabel && (
          <div className="mb-4">
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground">{valueLabel}</p>
          </div>
        )}
        <Button asChild variant="outline" className="w-full group">
          <Link href={href}>
            Go to {title}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
