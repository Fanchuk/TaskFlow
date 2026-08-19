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
        const { data } = await api.post('/payments/checkout', { plan: planKey })
        window.location.href = data.url
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
        className="w-full max-w-lg rounded-[24px] border border-black/[0.06] bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)] md:p-10"
      >
        <span className="text-sm font-semibold uppercase tracking-wide text-[#975bec]">Checkout</span>
        <h1 className="mt-2 font-serif text-3xl font-bold text-black">{plan.name} plan</h1>
        <div className="mt-8 flex items-baseline justify-between rounded-2xl bg-[#f4effd] px-6 py-5">
          <span className="text-black/70">Billed monthly</span>
          <span className="text-3xl font-extrabold text-black">{plan.price}</span>
        </div>
        <ul className="mt-6 space-y-3 text-black/70">
          <li>✓ 14-day free trial</li>
          <li>✓ Cancel anytime</li>
          <li>✓ No card required for trial</li>
        </ul>
        <Button variant="purpleSolid" className="mt-8 w-full" onClick={handlePay} disabled={paying}>
          {paying ? <Spinner /> : 'Start free trial'}
        </Button>
        <button onClick={() => navigate('/')} className="mt-3 w-full rounded-full py-2.5 font-semibold text-black/50 hover:bg-black/5">
          Back to home
        </button>
      </motion.div>
    </div>
  );
}