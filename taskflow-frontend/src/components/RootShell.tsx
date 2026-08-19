import { Outlet } from 'react-router-dom';
import { Backdrop } from './motion/Decor';
import Header from './layout/Header';
import Footer from './layout/Footer';

export default function RootShell({ chrome = true }: { chrome?: boolean }) {
  return (
    <div className="relative min-h-screen">
      <Backdrop />
      {chrome && <Header />}
      <main>
        <Outlet />
      </main>
      {chrome && <Footer />}
    </div>
  );
}