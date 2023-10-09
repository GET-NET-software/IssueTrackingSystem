import React from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { useEffect, useState } from 'react'
import { selectToken } from "../store/authSlice";
import Cookies from 'js-cookie';


function History(){

    const navigate = useNavigate();

  const toIssue = () => {
    navigate('/issue',{ replace:true})
  }
  
  const toProfile = () => {
    navigate('/Profile',{ replace:true})
  }
  
  const toHome = () => {
    navigate('/',{ replace:true})
  }
  const [data, setData] = useState([]);
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  const token = Cookies.get('token');

  useEffect(() => {
    // console.log("token",token)
    const saved = localStorage.getItem("name");
    const initialValue = JSON.parse(saved);
    console.log("Hello" + initialValue)
    
    const fetchData = async () => {
        try {
          const apiUrl = 'http://localhost:5286/dashboard/getallcardsforuser';

          const response = await axios.get(apiUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          // Assuming the response contains an array of cards, update the state
          setData(response.data);
          console.log(response.data)
        // console.log(data)
        } catch (err) {
          setError(err);
        }
      };
  
      fetchData();
      
  }, [])
  


    return (
        <> 
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
							<div  onClick={toHome} className="px-3 py-2 flex items-center text-lg uppercase font-bold leading-snug text-white hover:opacity-75">
                            <Icon icon="material-symbols:home-outline"/>
							</div>
							</li>

							<li className="nav-item">
							<div  onClick={toProfile} className="px-3 py-2 flex items-center text-lg uppercase font-bold leading-snug text-white hover:opacity-75">
                            <Icon icon="gg:profile"/>	
                            </div>
							</li>

                            <li className="nav-item">
							<div className="px-3 py-2 flex items-center text-lg uppercase font-bold leading-snug text-white hover:opacity-75">
                            <Icon icon="tabler:logout"/>
							</div>
							</li>

						</ul>
					</div>
				</div>
			</nav>
		</div>


    <div className="text-black text-center text-3xl font-semibold">
        Client Issue History 
    </div>
    <div className="px-3 text-2xl font-semibold text-orange-700">{localStorage.getItem("name").toUpperCase()}</div>
<div class="relative overflow-x-auto shadow-md sm:rounded-lg py-3">
{/* { error ? (
    <p>{error}</p>
  ) : ( */}
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              
                <th scope="col" class="px-6 py-3">
                    <div class="flex items-center">
                        Issue Title 
                        <a href="#"><svg class="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
  </svg></a>
                    </div>
                </th>
                <th scope="col" class="px-6 py-3">
                    <div class="flex items-center">
                        Issue Description 
                        <a href="#"><svg class="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
  </svg></a>
                    </div>
                </th>
                <th scope="col" class="px-6 py-3">
                    <div class="flex items-center">
                        Issue Category 
                        <a href="#"><svg class="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
  </svg></a>
                    </div>
                </th>
                {/* <th scope="col" class="px-6 py-3">
                    <div class="flex items-center">
                        File 
                        <a href="#"><svg class="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
  </svg></a>
                    </div>
                </th> */}
                <th scope="col" class="px-6 py-3">
                    <div class="flex items-center">
                        Assignee Name 
                        <a href="#"><svg class="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
  </svg></a>
                    </div>
                </th>
                <th scope="col" class="px-6 py-3">
                    <div class="flex items-center">
                        Issue Status
                        <a href="#"><svg class="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
  </svg></a>
                    </div>
                </th>
                {/* <th scope="col" class="px-6 py-3">
                    Product name
                </th> */}
                {/* <th scope="col" class="px-6 py-3">
                    <span class="sr-only">Edit</span>
                </th> */}
            </tr>

        </thead>
                <tbody>
                     {data.map((cards) =>(

                     
            <tr  key={cards.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

                <td class="px-6 py-4">
                    {cards.title}
                </td>
                <td class="px-6 py-4">
                    {cards.description}
                </td>
                <td class="px-6 py-4">
                    {cards.category}
                </td>  
                {/* <td class="px-6 py-4">
                    {cards.file}
                </td> */}
                <td class="px-6 py-4">
                    {cards.assignee}
                </td>
                <td class="px-6 py-4">
                    {cards.statename}
                </td>
                {/* <td class="px-6 py-4">
            {cards.productName}
                </td> */}
            </tr>
                 

            ))}
        </tbody> 
    </table> 
</div>
<div className="flex py-4 px-3.5">
<button onClick={toIssue} class="bg-orange-600 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded-full">
  Add Issue 
</button>

</div>

</>
)
}
export default History; 