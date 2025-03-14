import AuthForm from '../components/authForm'
import Nav from "@/components/nav"
import Footer from '@/components/footer'

export default function LoginPage() {
  return(
    <main >  
          <Nav />
            <div className="min-h-screen pt-16 ">
              <AuthForm variant="login" />
            </div>
            <Footer />
          </main>
  )
}