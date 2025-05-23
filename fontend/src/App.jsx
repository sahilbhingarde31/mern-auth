import { Navigate, Route, Routes } from "react-router-dom"
import FloatingShape from "./components/floatingShape"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import EmailVerification from "./pages/EmailVerification"
import {Toaster} from 'react-hot-toast'
import useAuthStore from "./store/authStore.js"
import { useEffect } from "react"
import HomePage from "./pages/HomePage.jsx"

// protect routes that require authentication
const ProtectedRoute = ({ children }) => { 
  const { isAuthenticated, user } = useAuthStore(); 

  if (!isAuthenticated) { 
    return <Navigate to='/login' replace />; 
  } 

  if (!user.isVerified) { 
    return <Navigate to='/email-verify' replace/>; 
  } 


  return children; 
};


//redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({children}) =>{ 
  const { isAuthenticated, user } = useAuthStore();
  if(isAuthenticated && user.isVerified){
    return <Navigate to='/' replace/>;
  }
  return children;
}
function App() {
  //fecthing the user data from database and display in home 
  const { checkAuth, isAuthenticated, user} = useAuthStore();
  useEffect(()=>{
    checkAuth();
  },[checkAuth]);
  console.log("isAuthenticated",isAuthenticated);
  console.log("user",user);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
      <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0}/> {/*with Floating shape we passing props(properties) */}
      <FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5}/>{/*with Floating shape we passing props(properties) */}
      <FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2}/>{/*with Floating shape we passing props(properties) */}

      <Routes>
        <Route path="/" element={
           <ProtectedRoute>
             <HomePage/>
           </ProtectedRoute>
          }>
          </Route>
        <Route path="/signup" element={
          <RedirectAuthenticatedUser>
           <SignUp/>
         </RedirectAuthenticatedUser>
         }>
        </Route>
        <Route path="/login" element={
          <RedirectAuthenticatedUser>
            <Login/>
          </RedirectAuthenticatedUser>
         }>
        </Route>
        <Route path="/email-verify" element={<EmailVerification/>}></Route>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
