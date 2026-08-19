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

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Enter your password'),
});
type FormData = z.infer<typeof schema>;

const inputCls = 'w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-[#975bec] focus:ring-4 focus:ring-[#975bec]/20 transition';

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
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-[24px] border border-black/[0.06] bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)] md:p-10"
      >
        <h1 className="font-serif text-3xl font-bold text-black">Welcome back</h1>
        <p className="mt-2 text-black/60">Log in to your TaskFlow account.</p>
        <form onSubmit={handleSubmit(onSubmit, onError)} className="mt-8 space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-black/80">Email</label>
            <input {...register('email')} type="email" placeholder="jane@work.com" className={inputCls} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-black/80">Password</label>
            <input {...register('password')} type="password" placeholder="••••••••" className={inputCls} />
          </div>
          <Button type="submit" variant="purpleSolid" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <Spinner /> : 'Log in'}
          </Button>
        </form>
        <p className="mt-6 text-center text-black/60">
          No account?{' '}
          <Link to="/register" className="font-semibold text-[#975bec] hover:underline">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
}