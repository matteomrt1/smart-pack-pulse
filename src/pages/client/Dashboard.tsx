import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, FileText, Leaf, ArrowRight } from 'lucide-react';
import { mockConfigs } from '@/data/mockData';

export default function ClientDashboard() {
  const configs = mockConfigs;

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Benvenuto, Tech S.r.l.</p>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Nuova configurazione</p>
              <p className="text-2xl font-bold mt-1">Configura</p>
            </div>
            <Link to="/configurator">
              <Button variant="secondary" size="icon">
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
              <FileText className="w-6 h-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Configurazioni</p>
              <p className="text-2xl font-bold">{configs.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
              <Leaf className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">CO₂ Risparmiata</p>
              <p className="text-2xl font-bold">165g</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent configs */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Configurazioni Recenti</h2>
        <div className="space-y-3">
          {configs.map(cfg => (
            <Card key={cfg.id}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <Package className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{cfg.input.productType} — {cfg.input.length}×{cfg.input.width}×{cfg.input.height}cm</p>
                    <p className="text-xs text-muted-foreground">{new Date(cfg.createdAt).toLocaleDateString('it-IT')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {cfg.co2Saved > 0 && (
                    <Badge className="bg-accent/10 text-accent border-0">
                      <Leaf className="w-3 h-3 mr-1" /> -{cfg.co2Saved}g CO₂
                    </Badge>
                  )}
                  <Badge variant={cfg.status === 'quoted' ? 'default' : 'secondary'}>
                    {cfg.status === 'saved' ? 'Salvata' : cfg.status === 'quoted' ? 'Preventivata' : 'Bozza'}
                  </Badge>
                  <span className="text-sm font-semibold">€{cfg.totalCost.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
