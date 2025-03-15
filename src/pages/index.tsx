import Nav from '@/components/nav'
import Footer from '@/components/footer'
import Main from '@/components/main'
import Testimoniale from '@/components/testimoniale';

export default function Home() {
  return (
    <>
    <Nav />
    <Main />
    <Testimoniale/>
    <div className='flex h-20'>
      <h1></h1>
    </div>
  
    <Footer/>
    </>
  );
}
