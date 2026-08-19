import { useSearchParams, useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '../lib/axios';
import { useAuthStore } from '../stores/authStore';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';

const PLANS: Record<string, { name: string; price: string }> = {
  individuals: { name: 'Individuals', price: '$9.99' },
  elite: { name: 'Elite Team', price: '$12.99' },
  startup: { name: 'Startup', price: 'Custom' },
};

export default function Checkout() {
  const [params] = useSearchParams();
  const planKey = params.get('plan') ?? 'elite';
  const plan = PLANS[planKey] ?? PLANS.elite;
  const navigate = useNavigate();
  const isAuth = useAuthStore((s) => s.isAuthenticated);
  const [paying, setPaying] = useState(false);

  if (!isAuth) return <Navigate to={`/register?plan=${planKey}`} replace />;

  const handlePay = async () => {
    setPaying(true);
    try {
      const { data } = await api.post('/payments/checkout', { plan: planKey });
      window.location.href = data.url;
    } catch {
      toast.error('Payment failed. Try again.');
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="tf-card w-full max-w-lg p-8 md:p-10"
      >
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#22d3ee]">Checkout</span>
        <h1 className="mt-2 text-3xl font-bold text-white">{plan.name} plan</h1>
        <div className="mt-8 flex items-baseline justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-6 py-5">
          <span className="text-white/60">Billed monthly</span>
          <span className="text-3xl font-bold tf-gradient-text">{plan.price}</span>
        </div>
        <ul className="mt-6 space-y-3 text-white/60">
          {['14-day free trial', 'Cancel anytime', 'No card required for trial'].map((t) => (
            <li key={t} className="flex items-center gap-3">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#22d3ee]" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {t}
            </li>
          ))}
        </ul>
        <Button variant="purpleSolid" className="mt-8 w-full" onClick={handlePay} disabled={paying}>
          {paying ? <Spinner /> : 'Start free trial'}
        </Button>
        <button onClick={() => navigate('/')} className="mt-3 w-full rounded-full py-2.5 font-semibold text-white/40 hover:bg-white/5 transition">
          Back to home
        </button>
      </motion.div>
    </div>
  );
}