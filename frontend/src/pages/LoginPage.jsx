import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useDispatch} from  'react-redux';
import Cookies from 'js-cookie';
import { loginSuccess } from "../store/authSlice";
import jwtDecode from 'jwt-decode';

function Login(){
  const dispatch =useDispatch();
  const navigate = useNavigate();

  const toHistory = ({name}) => {
    navigate('/history',{ replace:true})
  }
  const toSignup = ({name}) => {
    navigate('/signup',{ replace:true})
  }
  const toHome = () => {
    navigate('/',{ replace:true})
  }
  const toContact = () => {
    navigate('/contact',{ replace:true})
  }
  const [formData, setFormData] = useState({
    userName: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
   
  //  localStorage.setItem("name", JSON.stringify("Hello " + formData.userName));
  //  navigate('/history',{ replace:true})
    try {
      // Send a POST request to your API endpoint for user signup
      const response = await axios.post('http://localhost:5286/api/Auth/login', formData);
      const token = response.data.jwtToken; 
      // Handle the response, e.g., show a success message or redirect
      // Store the token in a cookie
      const decodedToken = jwtDecode(token);

console.log(decodedToken.name);
    Cookies.set('token', token);

    dispatch(loginSuccess({ token: token, userName: decodedToken.name }));
    navigate('/history',{ replace:true})

      console.log('User logged in  successfully:', response.data);
      alert("logged in succesfully");
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error('Error logging in:', error);
      alert("error logging in please check your username and password");
    }
    
   localStorage.setItem("name", JSON.stringify("Hello " + formData.userName));
  //  navigate('/history',{ replace:true})
  };
    return (
        <>
        <div>
        <div className="header">
			<nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-slate-800 mb-3 rounded-lg">
				<div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
					<div className="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
						
							<img
    							src="src/images/logo.png"
    							class="h-auto max-w-xs rounded-full"
    								alt="logo" />
						<button
							className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
							type="button"
						>
							<span className="block relative w-6 h-px rounded-sm bg-white"></span>
							<span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
							<span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
						</button>
					</div>
					<div className="lg:flex flex-grow items-center">
						<ul className="flex flex-col lg:flex-row list-none ml-auto">
							<li className="nav-item">
							<div  onClick={toHome} className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
								Home
							</div>
							</li>

							<li className="nav-item">
							<div  onClick={toContact} className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
								Contact Us
							</div>
							</li>

							{/* <li className="nav-item">
							<div  onClick={toProfile} className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
								Profile
							</div>
							
							</li> */}
						</ul>
					</div>
				</div>
			</nav>
		</div>
        </div>



        <div className="h-screen w-full bg-amber-50 overflow-auto">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black">Sign in </h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form onSubmit={handleSubmit} class="space-y-6" action="#" method="POST">
      <div>
        <label for="userName" class="block text-sm font-medium leading-6 text-black">Username</label>
        <div class="mt-2">
          <input value={formData.userName} onChange={handleChange} id="userName" name="userName" type="userName"  autocomplete="userName" required class="block w-full rounded-md border-0 py-1.5 px-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 placeholder text-black">Password</label>
          {/* <div class="text-sm">
            <a href="#" class="font-semibold text-black hover:text-orange-800">Forgot password?</a>
          </div> */}
        </div>
        <div class="mt-2">
          <input value={formData.password} onChange={handleChange} id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 px-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
        </div>
      </div>

      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >Sign in</button>
      </div>
    </form>

    <p class="mt-10 text-center text-sm text-gray-500">
      Don't have an account?
      <a onClick={toSignup}  href="#" class="font-semibold leading-6 text-orange-600 hover:text-orange-800"> Sign Up</a>
    </p>
  </div>
</div>
        </div>
        </>
    )
}
export default Login;