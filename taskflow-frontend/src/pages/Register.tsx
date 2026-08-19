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

const schema = z.object({
  fullName: z.string().min(2, 'Enter your name'),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'At least 6 characters'),
});
type FormData = z.infer<typeof schema>;

const inputCls = 'w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-[#975bec] focus:ring-4 focus:ring-[#975bec]/20 transition';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-black/80">{label}</label>
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
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-[24px] border border-black/[0.06] bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)] md:p-10"
      >
        <h1 className="font-serif text-3xl font-bold text-black">Create your account</h1>
        <p className="mt-2 text-black/60">
          {plan ? `You're signing up for the ${plan} plan.` : 'Start managing your team in minutes.'}
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
        <p className="mt-6 text-center text-black/60">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-[#975bec] hover:underline">Log in</Link>
        </p>
      </motion.div>
    </div>
  );
}