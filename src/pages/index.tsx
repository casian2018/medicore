import Nav from '@/components/nav';
import Footer from '@/components/footer';
import Main from '@/components/main';
import Testimoniale from '@/components/testimoniale';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <Main />
      <Testimoniale />
      <div className="flex-1" />
      <Footer />
    </div>
  );
}