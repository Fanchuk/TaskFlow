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
        <h1 className="bg-gradient-to-br from-[#975bec] to-[#7562f3] bg-clip-text font-serif text-[120px] font-extrabold leading-none text-transparent md:text-[180px]">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold text-black md:text-3xl">
          This page took a day off
        </h2>
        <p className="mx-auto mt-3 max-w-md text-black/60">
          The page you're looking for doesn't exist or was moved. Let's get you back on track.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/">
            <Button variant="purpleSolid" icon>Back to home</Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="purpleOutline">Go to dashboard</Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}