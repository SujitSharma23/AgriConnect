import { useNavigate } from 'react-router-dom';
import { Sprout, Building2, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface IndexProps {
  onRoleSelect: (role: 'farmer' | 'business') => void;
}

const stats = [
  { label: 'Active Farmers', value: '2,400+' },
  { label: 'Business Buyers', value: '580+' },
  { label: 'Tonnes Traded', value: '12,000+' },
  { label: 'Districts Covered', value: '45+' },
];

const Index = ({ onRoleSelect }: IndexProps) => {
  const navigate = useNavigate();

  const handleRole = (role: 'farmer' | 'business') => {
    onRoleSelect(role);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero px-4 py-20 sm:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-accent" />
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-secondary" />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-foreground/10 backdrop-blur">
              <Sprout className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="font-serif text-4xl tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
              AgriConnect
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80 sm:text-xl">
              Nepal's B2B marketplace connecting farmers directly with business buyers. 
              Smart matching, harvest prediction, and real-time market data.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <button
              onClick={() => handleRole('farmer')}
              className="group flex w-full items-center justify-center gap-3 rounded-xl bg-primary-foreground px-8 py-4 text-lg font-semibold text-primary shadow-elevated transition-transform hover:scale-[1.02] sm:w-auto"
            >
              <Sprout className="h-5 w-5" />
              I'm a Farmer
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => handleRole('business')}
              className="group flex w-full items-center justify-center gap-3 rounded-xl border-2 border-primary-foreground/30 px-8 py-4 text-lg font-semibold text-primary-foreground transition-transform hover:scale-[1.02] hover:bg-primary-foreground/10 sm:w-auto"
            >
              <Building2 className="h-5 w-5" />
              I'm a Business Buyer
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-card py-12">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-4 sm:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.5 }}
              className="text-center"
            >
              <p className="font-serif text-3xl text-foreground">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-serif text-3xl text-foreground">Why AgriConnect?</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              { icon: TrendingUp, title: 'Market Intelligence', desc: 'Real-time wholesale prices and trend data across all major crops in Nepal.' },
              { icon: ShieldCheck, title: 'Smart Matching', desc: 'AI-powered matching connects your harvest with the right buyers automatically.' },
              { icon: Sprout, title: 'Harvest Tools', desc: 'Predict harvest dates, estimate yields, and plan logistics—all in one place.' },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.8 }}
                className="rounded-xl border border-border bg-card p-6 shadow-soft"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 font-serif text-lg text-card-foreground">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card px-4 py-8">
        <div className="mx-auto max-w-5xl text-center">
          <div className="flex items-center justify-center gap-2">
            <Sprout className="h-5 w-5 text-primary" />
            <span className="font-serif text-lg text-foreground">AgriConnect</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            © 2026 AgriConnect Nepal. Empowering agricultural commerce.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
