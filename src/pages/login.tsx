import AuthForm from '../components/authForm'
import Nav from "@/components/nav"

export default function LoginPage() {
  return(
    <main className="min-h-screen pt-16">  
    <Nav />
      <div className="container mx-auto px-4">
        <AuthForm variant="login" />
      </div>
    </main>
  )
}