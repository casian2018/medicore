import AuthForm from '../components/authForm'
import Nav from "@/components/nav"

export default function SignupPage() {
  return( 
    <main className="min-h-screen pt-16">  
       <Nav />
         <div className="container mx-auto px-4">
           <AuthForm variant="signup" />
         </div>
       </main>
  )
}