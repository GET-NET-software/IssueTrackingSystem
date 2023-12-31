import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";



function Signup(){
  
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    companyId: 1
  });
  
  
  const [companies, setCompanies] = useState([]);
  const[selectedoption, setSelectedOption] = useState(1);


  // You can fetch and populate the `companies` state here
  useEffect(() => {
    // Fetch your company data and set it in the state
    const fetchCompanies = async () => {
      try {
        // Fetch your companies data here, e.g., from an API
        const response = await axios.get('http://localhost:5286/user/Register');
        const data = await response.data;
        setCompanies(data);
        console.log(data[0].companyId)
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    // Call the fetchCompanies function
    fetchCompanies();
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setSelectedOption(parseInt(e.target.value) );
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
       // Update the companyId in formData before sending the request
       formData.companyId = selectedoption; 
      // Send a POST request to your API endpoint for user signup
      const response = await axios.post('http://localhost:5286/user/Register', formData);
      navigate('/history',{ replace:true})

      // Handle the response, e.g., show a success message or redirect
      console.log('User signed up successfully:', response.data);
      alert("user registered succesfully");
      // toHistory()
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error('Error signing up:', error);
      alert("Error signing up");

    }
    localStorage.setItem("name", JSON.stringify("Hello " + formData.userName));

  };
    const navigate = useNavigate();

  const toContact = () => {
    navigate('/contact',{ replace:true})
  }
  const toHome = () => {
    navigate('/',{ replace:true})
  }
  const toClient = () => {
    navigate('/client',{ replace:true})
  }
  const toLogin = () => {
    navigate('/login',{ replace:true})
  }
  // const toHistory = () => {
  //   navigate('/history',{ replace:true})
  // }
  const toHistory = ({name}) => {
    navigate('/history',{ replace:true})
  }
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
      
     <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                 Sign Up
              </h1>
              <form onSubmit={handleSubmit} class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for=" userName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Username </label>
                      <input value={formData. userName} onChange={handleChange} type="text" name="userName" id="userName" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required=""></input>
                  </div>
                  <div>
                      <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                      <input value={formData.email} onChange={handleChange} type="email" name="email" id="email" placeholder="info@example.com" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""></input>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input  value={formData.password} onChange={handleChange} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""></input>
                  </div>

                
        
                  <div>
      <label htmlFor="companyName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Company Name
      </label>
      <select
        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="companyName"
        type="number"
        placeholder="Select company"
        value={selectedoption}
        onChange={handleChange}

       
      >
        {/* Map through the companies array and generate options */}
        {companies.map((company) => (
          <option key={company.id} value={company.companyId}>
            {company.companyName} 
            
          </option>
        ))}
      </select>
    </div>
                  <div>
        <button  type="submit" class="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Register</button>
      </div>
                  {/* <div class="flex items-start">
                   
                  </div> */}
                  {/* <button type="submit" class="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button> */}
                  <p class="text-sm font-light text-center text-gray-500 dark:text-gray-400">
                      Already have an account? <div onClick={toLogin} class="font-medium text-orange-600 hover:underline dark:text-orange-800">Login here</div>
                  </p>
              </form>
          </div>
    </div>
  </div>
  </div>
        </>
    )
}
export default Signup;