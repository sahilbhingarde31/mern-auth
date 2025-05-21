import { Route, Routes } from "react-router-dom"
import FloatingShape from "./components/floatingShape"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import EmailVerification from "./pages/EmailVerification"

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
      <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0}/> {/*with Floating shape we passing props(properties) */}
      <FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5}/>{/*with Floating shape we passing props(properties) */}
      <FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2}/>{/*with Floating shape we passing props(properties) */}

      <Routes>
        <Route path="/" element={"Home"}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/email-verify" element={<EmailVerification/>}></Route>
      </Routes>
    </div>
  )
}

export default App
