import { Navigate, Route, Routes } from "react-router-dom"
import FloatingShape from "./components/floatingShape"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import EmailVerification from "./pages/EmailVerification"
import {Toaster} from 'react-hot-toast'
import useAuthStore from "./store/authStore.js"
import { useEffect } from "react"
import HomePage from "./pages/HomePage.jsx"
import LoadingSpinner from "./components/LoadingSpinner.jsx"
import ForgotPassword from "./pages/ForgotPassword.jsx"
import ResetPassword from "./pages/ResetPassword.jsx"
import Header from "./components/Header.jsx"
import AboutUs from "./pages/AboutUs.jsx"
import Feedback from "./pages/Feedback.jsx"
import Profile from "./pages/Profile.jsx"

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
  const { isCheckingAuth, checkAuth} = useAuthStore();
  //checkAuth is a function that checks if the user is authenticated or not
  useEffect(()=>{
    checkAuth();
  },[checkAuth]);
  if(isCheckingAuth){
    return <LoadingSpinner/>
  }
  return (
    <>
    <Header/>
    <div className="h-[640px] bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
      <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0}/> {/*with Floating shape we passing props(properties) */}
      <FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5}/>{/*with Floating shape we passing props(properties) */}
      <FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2}/>{/*with Floating shape we passing props(properties) */}
      <Routes>
        <Route path="/" 
         element={
           <ProtectedRoute>
             <HomePage/>
           </ProtectedRoute>
          }>
          </Route>

        <Route path="/signup" 
         element={
          <RedirectAuthenticatedUser>
           <SignUp/>
         </RedirectAuthenticatedUser>
         }>
        </Route>

        <Route path="/login" 
         element={
          <RedirectAuthenticatedUser>
            <Login/>
          </RedirectAuthenticatedUser>
         }>
        </Route>

        <Route path="/verify-email" 
         element={
          <RedirectAuthenticatedUser>
            <EmailVerification/>
          </RedirectAuthenticatedUser>
          }>
          </Route>

          <Route path="/forgot-password" 
           element={
            <RedirectAuthenticatedUser>
              <ForgotPassword/>
            </RedirectAuthenticatedUser>
          }
          >
          </Route>

          <Route
          path="/reset-password/:token"
          element={
          <RedirectAuthenticatedUser>
            <ResetPassword/>
          </RedirectAuthenticatedUser>}
          >
          </Route>

          <Route
          path="/about-us"
          element={
            <AboutUs/>
          }
          >
          </Route>

          <Route
          path="/feedback"
          element={
            <ProtectedRoute>
              <Feedback/>
            </ProtectedRoute>
          }
          >
          </Route>

          <Route
          path= "/profile-update"
          element={
            <Profile/>
          }
          >
          </Route>
      </Routes>
      <Toaster/>
    </div>
    </>
  )
}

export default App
