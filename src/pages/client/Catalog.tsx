import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Leaf, Search, Shield, Box, Package } from 'lucide-react';
import { mockProducts, categoryLabels } from '@/data/mockData';
import { ProductCategory } from '@/types';
import { cn } from '@/lib/utils';

const categoryIconMap: Record<string, React.ElementType> = {
  protective: Shield,
  tapes: Package,
  boxes: Box,
  other: Package,
};

const categories: ProductCategory[] = ['protective', 'tapes', 'boxes', 'other'];

export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all');
  const [search, setSearch] = useState('');

  const filtered = mockProducts.filter(p => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Catalogo Prodotti</h1>
        <p className="text-muted-foreground mt-1">Esplora i materiali disponibili per l'imballaggio</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Cerca prodotto..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={activeCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveCategory('all')}
          >
            Tutti
          </Button>
          {categories.map(cat => (
            <Button
              key={cat}
              variant={activeCategory === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(cat)}
            >
              {categoryLabels[cat]}
            </Button>
          ))}
        </div>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(product => {
          const Icon = categoryIconMap[product.category] || Package;
          return (
            <Card key={product.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <Icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  {product.ecoFriendly && (
                    <Badge className="bg-accent/10 text-accent border-0 text-xs">
                      <Leaf className="w-3 h-3 mr-1" /> Eco
                    </Badge>
                  )}
                </div>
                <h3 className="font-semibold text-sm">{product.name}</h3>
                <p className="text-xs text-muted-foreground mt-1 mb-3">{product.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {Object.entries(product.specs).map(([k, v]) => (
                    <span key={k} className="text-xs bg-secondary px-2 py-0.5 rounded">
                      {k}: {v}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">€{product.price.toFixed(2)}/{product.unit}</span>
                  <Badge variant={product.available ? 'secondary' : 'destructive'}>
                    {product.available ? 'Disponibile' : 'Esaurito'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
