// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { toast } from 'react-toastify';
// import { Link, useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import bcakendUrl from '../config/bcakendUrl';

// const schema = yup.object().shape({
//   email: yup.string().email('Invalid email').required('Email is required'),
//   password: yup.string().required('Password is required'),
// });

// const SignIn = () => {
//   const navigate = useNavigate();
//   const { register, handleSubmit, formState: { errors } } = useForm({
//     resolver: yupResolver(schema),
//   });
//   const [isLoading, setIsLoading] = useState(false);

//   const onSubmit = async (data) => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(`${bcakendUrl}/api/auth/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || response.statusText);
//       }

//       const result = await response.json();
//       const { role, token } = result;

//       if (token) {
//         localStorage.setItem('token', token);
//         toast.success('Sign In successful!');
//         if (role === 'admin') {
//           navigate('/admin-dashboard');
//         } else if (role === 'seller') {
//           navigate('/seller-dashboard');
//         } else if (role === 'buyer') {
//           navigate('/buyer-dashboard');
//         } else {
//           navigate('/');
//         }
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-signup-bg bg-cover bg-center">
//       <Navbar />
//       <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 mt-9">
//         <div className="max-w-md mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
//           <div className="px-6 py-8 sm:p-10">
//             <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
//               Sign In to Your Account
//             </h2>
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                   Email address
//                 </label>
//                 <div className="mt-1 relative rounded-md shadow-sm">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                       <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//                       <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//                     </svg>
//                   </div>
//                   <input
//                     id="email"
//                     type="email"
//                     {...register('email')}
//                     className={`block w-full pl-10 pr-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
//                     placeholder="you@example.com"
//                   />
//                 </div>
//                 {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
//               </div>

//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                   Password
//                 </label>
//                 <div className="mt-1 relative rounded-md shadow-sm">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                       <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <input
//                     id="password"
//                     type="password"
//                     {...register('password')}
//                     className={`block w-full pl-10 pr-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
//                     placeholder="••••••••"
//                   />
//                 </div>
//                 {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
//               </div>

//               <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <input
//                     id="remember-me"
//                     name="remember-me"
//                     type="checkbox"
//                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                   />
//                   <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
//                     Remember me
//                   </label>
//                 </div>

//                 <div className="text-sm">
//                   <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
//                     Forgot your password?
//                   </Link>
//                 </div>
//               </div>

//               <div>
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
//                 >
//                   {isLoading ? (
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                   ) : null}
//                   {isLoading ? 'Signing In...' : 'Sign In'}
//                 </button>
//               </div>
//             </form>
//             <p className="mt-8 text-center text-sm text-gray-600">
//           Don't have an account?{' '}
//           <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
//             Sign Up
//           </Link>
//         </p>
//           </div>
         
          
//         </div>
       
//       </div>
//     </div>
//   );
// };

// export default SignIn;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import bcakendUrl from '../config/bcakendUrl';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});
const SignIn = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${bcakendUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || response.statusText);
      }

      const result = await response.json();
      const { role, token } = result;

      if (token) {
        localStorage.setItem('token', token);
        toast.success('Sign In successful!');
        if (role === 'admin') {
          navigate('/admin-dashboard');
        } else if (role === 'seller') {
          navigate('/seller-dashboard');
        } else if (role === 'buyer') {
          navigate('/buyer-dashboard');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLoginSuccess = async (response) => {
    setIsLoading(true);
    console.log("Hi")
    try {
      const result = await fetch(`${bcakendUrl}/api/auth/google-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken: response.credential }),
      });
      console.log(result)
      if (!result.ok) {
        const errorData = await result.json();
        throw new Error(errorData.error || result.statusText);
      }

      const data = await result.json();
      const { role, token } = data;

      if (token) {
        localStorage.setItem('token', token);
        toast.success('Google Sign-In successful!');
        if (role === 'admin') {
          navigate('/admin-dashboard');
        } else if (role === 'seller') {
          navigate('/seller-dashboard');
        } else if (role === 'buyer') {
          navigate('/buyer-dashboard');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLoginError = (error) => {
    console.log('Google Sign-In Error:', error);
    toast.error('Google Sign-In failed');
  };

  return (
    
      <div className="min-h-screen bg-signup-bg bg-cover bg-center">
        <Navbar />
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 mt-9">
          <div className="max-w-md mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
            <div className="px-6 py-8 sm:p-10">
              <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
                Sign In to Your Account
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <input
                      id="email"
                      type="email"
                      {...register('email')}
                      className={`block w-full pl-10 pr-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      id="password"
                      type="password"
                      {...register('password')}
                      className={`block w-full pl-10 pr-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                      Forgot your password?
                    </Link>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${isLoading ? 'opacity-75' : ''}`}
                  >
                    {isLoading ? (
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : null}
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </button>
                </div>
              </form>

              <div className="mt-6 flex items-center justify-center space-x-4">
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={handleGoogleLoginError}
                  className="w-full"
                />
              </div>

              <p className="mt-8 text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default SignIn;


