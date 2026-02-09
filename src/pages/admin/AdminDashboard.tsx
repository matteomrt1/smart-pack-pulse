import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Package, FileText, TrendingUp } from 'lucide-react';
import { mockConfigs, mockClients } from '@/data/mockData';

export default function AdminDashboard() {
  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Pannello di Gestione</h1>
        <p className="text-muted-foreground mt-1">Panoramica attività e statistiche</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Clienti Attivi', value: mockClients.length, icon: Users, color: 'text-primary' },
          { label: 'Configurazioni', value: mockConfigs.length, icon: FileText, color: 'text-accent' },
          { label: 'Prodotti', value: 12, icon: Package, color: 'text-muted-foreground' },
          { label: 'Preventivi Mese', value: 8, icon: TrendingUp, color: 'text-primary' },
        ].map(stat => (
          <Card key={stat.label}>
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                <stat.icon className={cn('w-6 h-6', stat.color)} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Ultime Configurazioni</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockConfigs.map(cfg => {
              const client = mockClients.find(c => c.id === cfg.clientId);
              return (
                <div key={cfg.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{client?.companyName || 'N/D'}</p>
                    <p className="text-xs text-muted-foreground">
                      {cfg.input.productType} — {cfg.input.length}×{cfg.input.width}×{cfg.input.height}cm
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={cfg.status === 'quoted' ? 'default' : 'secondary'}>
                      {cfg.status === 'saved' ? 'Salvata' : 'Preventivata'}
                    </Badge>
                    <span className="text-sm font-semibold">€{cfg.totalCost.toFixed(2)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Top clients */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Clienti Più Attivi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockClients.map(client => (
              <div key={client.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">{client.companyName}</p>
                  <p className="text-xs text-muted-foreground">{client.email}</p>
                </div>
                <Badge variant="secondary">{client.sector}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}
