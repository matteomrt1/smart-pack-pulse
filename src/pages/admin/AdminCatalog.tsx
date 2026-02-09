import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockProducts, categoryLabels } from '@/data/mockData';
import { Product, ProductCategory } from '@/types';
import { Plus, Pencil, Trash2, Leaf, Search } from 'lucide-react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter
} from '@/components/ui/dialog';

export default function AdminCatalog() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [search, setSearch] = useState('');
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Gestione Catalogo</h1>
          <p className="text-muted-foreground mt-1">Gestisci prodotti, prezzi e disponibilità</p>
        </div>
        <Button onClick={() => { setEditProduct(null); setDialogOpen(true); }}>
          <Plus className="w-4 h-4 mr-2" /> Nuovo Prodotto
        </Button>
      </div>

      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Cerca..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary">
            <tr>
              <th className="text-left p-3 font-medium">Prodotto</th>
              <th className="text-left p-3 font-medium">Categoria</th>
              <th className="text-right p-3 font-medium">Prezzo</th>
              <th className="text-center p-3 font-medium">Eco</th>
              <th className="text-center p-3 font-medium">Stato</th>
              <th className="text-right p-3 font-medium">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(product => (
              <tr key={product.id} className="border-t hover:bg-secondary/30 transition-colors">
                <td className="p-3">
                  <p className="font-medium">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.description}</p>
                </td>
                <td className="p-3">
                  <Badge variant="secondary">{categoryLabels[product.category]}</Badge>
                </td>
                <td className="p-3 text-right font-medium">€{product.price.toFixed(2)}/{product.unit}</td>
                <td className="p-3 text-center">
                  {product.ecoFriendly && <Leaf className="w-4 h-4 text-accent mx-auto" />}
                </td>
                <td className="p-3 text-center">
                  <Badge variant={product.available ? 'secondary' : 'destructive'}>
                    {product.available ? 'Attivo' : 'Esaurito'}
                  </Badge>
                </td>
                <td className="p-3 text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" onClick={() => { setEditProduct(product); setDialogOpen(true); }}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editProduct ? 'Modifica Prodotto' : 'Nuovo Prodotto'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Nome</Label>
              <Input defaultValue={editProduct?.name || ''} />
            </div>
            <div>
              <Label>Prezzo (€)</Label>
              <Input type="number" step="0.01" defaultValue={editProduct?.price || ''} />
            </div>
            <div>
              <Label>Descrizione</Label>
              <Input defaultValue={editProduct?.description || ''} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Annulla</Button>
            <Button onClick={() => setDialogOpen(false)}>Salva</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
