// import React, { useState } from 'react';
// import { loginUser } from '../../services/api';
// import { useNavigate } from 'react-router-dom';

// export default function LoginForm() {
//   const [formData, setFormData] = useState({ email: '', password: '', role: 'student' });
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setError('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     try {
//       const response = await loginUser(formData);
//       console.log("Response from the login ui : ",response);
//       localStorage.setItem('token', response.token);
//       localStorage.setItem('role', response.user.role);
//       localStorage.setItem('UserId', response.user._id);

//       console.log("login form response: ",response);
//       switch (response.user.role) {
//         case 'student':
//         case 'clubLead':
//           navigate('/dashboard');
//           break;
//         case 'professor':
//           navigate("/faculty-dashboard");
//         case 'proctor':
//           navigate('/faculty-dashboard');
//           break;
//         case 'admin':
//           navigate('/admin-dashboard');
//           break;
//         default:
//           navigate('/');
//       }
//     } catch (error) {
//       setError(error.response?.data?.message || 'An error occurred during login');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Welcome Back
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Sign in to your account
//           </p>
//         </div>

//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm space-y-4">
//             {error && (
//               <div className="bg-red-50 p-4 rounded-md flex items-center">
//                 <span className="text-sm text-red-700">{error}</span>
//               </div>
//             )}

//             <div className="relative">
//               <input
//                 name="email"
//                 type="email"
//                 required
//                 className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                 placeholder="Email address"
//                 onChange={handleChange}
//                 value={formData.email}
//               />
//             </div>

//             <div className="relative">
//               <input
//                 name="password"
//                 type="password"
//                 required
//                 className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                 placeholder="Password"
//                 onChange={handleChange}
//                 value={formData.password}
//               />
//             </div>

//             <div className="relative">
//               <select
//                 name="role"
//                 required
//                 className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                 onChange={handleChange}
//                 value={formData.role}
//               >
//                 <option value="student">Student</option>
//                 <option value="faculty">Faculty</option>
//                 <option value="admin">Admin</option>
//               </select>
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               disabled={isLoading}
//               className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${isLoading
//                 ? 'bg-blue-400 cursor-not-allowed'
//                 : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
//                 }`}
//             >
//               {isLoading ? 'Signing in...' : 'Sign in'}
//             </button>
//           </div>
//         </form>

//         <div className="text-center">
//           <span className="text-sm text-gray-600">
//             Don't have an account?{' '}
//             <a href="/register" className="font-medium text-blue-600 hover:text-blue-500">
//               Sign up
//             </a>
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// ----------------------------------------------------

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student'
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await login(formData.email, formData.password, formData.role);
      console.log("frontend result : ",result);
      if (result.success) {
        switch (result.user.role) {
          case 'student':
            // navigate(result.user.isClubLead ? '/club-lead-dashboard' : '/student-dashboard');
            navigate('/student-dashboard');
            break;
          case 'professor':
            navigate(result.user.isProctor ? '/proctor-dashboard' : '/professor-dashboard');
            // navigate('/professor-dashboard');
            break;
          case 'admin':
            navigate('/admin-dashboard');
            break;
          default:
            navigate('/dashboard');
        }
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (error) {
      setError('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to your account
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 p-4 rounded-md">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="rounded-md shadow-sm space-y-4">
            <input
              name="email"
              type="email"
              required
              className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Email address"
              onChange={handleChange}
              value={formData.email}
            />

            <input
              name="password"
              type="password"
              required
              className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
            />

            <select
              name="role"
              required
              className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={handleChange}
              value={formData.role}
            >
              <option value="student">Student</option>
              <option value="professor">Professor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}