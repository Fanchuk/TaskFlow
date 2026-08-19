import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import toast from 'react-hot-toast';
import { authService } from '../services/auth.service';
import { useAuthStore } from '../stores/authStore';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import { AuthAside } from '../components/auth/AuthAside';

const schema = z.object({
  fullName: z.string().min(2, 'Enter your name'),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'At least 6 characters'),
});
type FormData = z.infer<typeof schema>;

const inputCls =
  'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder-white/35 outline-none ' +
  'focus:border-[#3b82f6]/60 focus:ring-4 focus:ring-[#3b82f6]/20 transition';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-white/70">{label}</label>
      {children}
    </div>
  );
}

export default function Register() {
  const [params] = useSearchParams();
  const plan = params.get('plan');
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await authService.register(data);
      setAuth(res);
      toast.success('Account created!');
      navigate(plan ? `/checkout?plan=${plan}` : '/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.message ?? 'Something went wrong');
    }
  };

  const onError = (errors: any) => {
    Object.values(errors).forEach((err: any) => toast.error(err.message));
  };

  return (
    <div className="mx-auto flex min-h-[86vh] max-w-[1100px] items-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="tf-card grid w-full overflow-hidden lg:grid-cols-2"
      >
        <AuthAside
          title="Start managing your team in minutes."
          points={['Unlimited projects & clients', 'Real-time collaboration', '14-day free trial, no card']}
        />

        <div className="p-8 md:p-11">
          <h1 className="text-3xl font-bold text-white">Create your account</h1>
          <p className="mt-2 text-white/55">
            {plan ? `You're signing up for the ${plan} plan.` : 'Get started free — no card required.'}
          </p>
          <form onSubmit={handleSubmit(onSubmit, onError)} className="mt-8 space-y-5">
            <Field label="Full name">
              <input {...register('fullName')} placeholder="Jane Cooper" className={inputCls} />
            </Field>
            <Field label="Email">
              <input {...register('email')} type="email" placeholder="jane@work.com" className={inputCls} />
            </Field>
            <Field label="Password">
              <input {...register('password')} type="password" placeholder="••••••••" className={inputCls} />
            </Field>
            <Button type="submit" variant="purpleSolid" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <Spinner /> : 'Create account'}
            </Button>
          </form>
          <p className="mt-6 text-center text-white/55">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold tf-gradient-text hover:underline">Log in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}