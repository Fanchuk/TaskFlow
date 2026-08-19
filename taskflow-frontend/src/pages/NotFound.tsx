import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.h1
          animate={{ opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="tf-gradient-text text-[120px] font-extrabold leading-none md:text-[180px]"
          style={{ filter: 'drop-shadow(0 0 40px rgba(59,130,246,0.4))' }}
        >
          404
        </motion.h1>
        <h2 className="mt-4 text-2xl font-bold text-white md:text-3xl">This page took a day off</h2>
        <p className="mx-auto mt-3 max-w-md text-white/55">
          The page you're looking for doesn't exist or was moved. Let's get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/"><Button variant="purpleSolid" icon>Back to home</Button></Link>
          <Link to="/dashboard"><Button variant="purpleOutline">Go to dashboard</Button></Link>
        </div>
      </motion.div>
    </div>
  );
}