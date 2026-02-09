import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Package, Leaf, Shield, BarChart3, ArrowRight } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">PackConfig</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/dashboard">
              <Button variant="ghost">Accedi</Button>
            </Link>
            <Link to="/dashboard">
              <Button>Registrati</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Imballaggio intelligente,{' '}
            <span className="text-primary">eco-ottimizzato</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Configura l'imballaggio ideale per ogni prodotto. L'AI analizza dimensioni, peso e fragilità
            per suggerirti il mix perfetto di materiali, riducendo sprechi e costi.
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/configurator">
              <Button size="lg">
                Prova il Configuratore <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/catalog">
              <Button variant="outline" size="lg">Esplora il Catalogo</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-card border-y">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">Come funziona</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Package, title: 'Inserisci il prodotto', desc: 'Dimensioni, peso e livello di fragilità. Basta questo.' },
              { icon: Shield, title: 'AI suggerisce il mix', desc: 'Il motore AI calcola la combinazione ottimale di materiali protettivi.' },
              { icon: BarChart3, title: 'Risparmia e proteggi', desc: 'Visualizza costi, schema 2D e impatto ambientale in un click.' },
            ].map((f, i) => (
              <Card key={i}>
                <CardContent className="p-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                    <f.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Eco badge */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
            <Leaf className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-2xl font-bold">Sostenibilità al centro</h2>
          <p className="text-muted-foreground">
            Ogni configurazione propone alternative eco-friendly e calcola la CO₂ risparmiata
            rispetto all'imballaggio standard. Il tuo contributo all'ambiente, misurabile.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-muted-foreground">
          <span>© 2026 PackConfig. Tutti i diritti riservati.</span>
          <span>Configuratore di Imballaggio Eco-Ottimizzato</span>
        </div>
      </footer>
    </div>
  );
}
