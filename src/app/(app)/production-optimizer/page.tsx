import ProductionOptimizerForm from '@/components/production-optimizer/ProductionOptimizerForm';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProductionOptimizerPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">AI Production Optimizer</h1>
      <ProductionOptimizerForm />
    </div>
  );
}
