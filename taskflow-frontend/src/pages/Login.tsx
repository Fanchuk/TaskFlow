import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import toast from 'react-hot-toast';
import { authService } from '../services/auth.service';
import { useAuthStore } from '../stores/authStore';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import { AuthAside } from '../components/auth/AuthAside';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Enter your password'),
});
type FormData = z.infer<typeof schema>;

const inputCls =
  'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder-white/35 outline-none ' +
  'focus:border-[#3b82f6]/60 focus:ring-4 focus:ring-[#3b82f6]/20 transition';

export default function Login() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await authService.login(data);
      setAuth(res);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.message ?? 'Invalid credentials');
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
          title="Welcome back to your workspace."
          points={['Pick up right where you left off', 'All your projects in sync', 'Trusted by 12k+ teams']}
        />

        <div className="p-8 md:p-11">
          <h1 className="text-3xl font-bold text-white">Welcome back</h1>
          <p className="mt-2 text-white/55">Log in to your TaskFlow account.</p>
          <form onSubmit={handleSubmit(onSubmit, onError)} className="mt-8 space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-white/70">Email</label>
              <input {...register('email')} type="email" placeholder="jane@work.com" className={inputCls} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-white/70">Password</label>
              <input {...register('password')} type="password" placeholder="••••••••" className={inputCls} />
            </div>
            <Button type="submit" variant="purpleSolid" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <Spinner /> : 'Log in'}
            </Button>
          </form>
          <p className="mt-6 text-center text-white/55">
            No account?{' '}
            <Link to="/register" className="font-semibold tf-gradient-text hover:underline">Sign up</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}