import AuthForm from '../components/authForm'
import Nav from "@/components/nav"
import Footer from '@/components/footer'
export default function SignupPage() {
  return( 
    <main >  
       <Nav />
         <div className="min-h-screen pt-16 ">
           <AuthForm variant="signup" />
         </div>
         <Footer />
       </main>
  )
}