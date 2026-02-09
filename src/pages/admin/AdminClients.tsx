import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockClients, mockConfigs } from '@/data/mockData';
import { Search, Mail, Building, FileText } from 'lucide-react';
import { useState } from 'react';

export default function AdminClients() {
  const [search, setSearch] = useState('');

  const filtered = mockClients.filter(c =>
    (c.companyName || '').toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Gestione Clienti</h1>
        <p className="text-muted-foreground mt-1">Anagrafica clienti e storico interazioni</p>
      </div>

      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Cerca cliente..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(client => {
          const clientConfigs = mockConfigs.filter(c => c.clientId === client.id);
          return (
            <Card key={client.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{client.companyName}</h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <Mail className="w-3 h-3" /> {client.email}
                    </div>
                  </div>
                  <Badge variant="secondary">{client.sector}</Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Building className="w-3 h-3" /> P.IVA: {client.vatNumber}
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText className="w-3 h-3" /> {clientConfigs.length} configurazioni
                  </span>
                </div>
                {clientConfigs.length > 0 && (
                  <div className="pt-2 border-t space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">Ultime configurazioni</p>
                    {clientConfigs.slice(0, 2).map(cfg => (
                      <div key={cfg.id} className="flex items-center justify-between text-xs bg-secondary/50 p-2 rounded">
                        <span>{cfg.input.productType} — {cfg.input.length}×{cfg.input.width}×{cfg.input.height}cm</span>
                        <span className="font-semibold">€{cfg.totalCost.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
