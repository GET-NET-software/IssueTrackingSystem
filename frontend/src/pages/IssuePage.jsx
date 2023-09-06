import React from "react";
import '../assets/css/issue.css';

function Issue(){
    return (
        <>
        <div className="h-screen w-full bg-amber-50 overflow-auto">
        <div className="text-orange font-extrabold text-3xl text-center py-2">Hello!</div>
        <div className="text-orange font-semibold text-ellipsis text-center py-0"> Please Submit your Issue here </div>
        <div className="issue"> 
        <div className="centered-content">
        <form class="w-full max-w-lg mt-10">
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/2 px-10 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-orange-950 text-xs font-bold mb-2" for="grid-first-name">
         Name
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder=" Issue reporter name"></input>
    </div>
    <div class="w-full md:w-1/2 px-10">
      <label class="block uppercase tracking-wide text-orange-950 text-xs font-bold mb-2" for="grid-last-name">
         Company Branch Name
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Branch name"></input>
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-10">
      {/* <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="Please describe your issue here"></input> */}
      
        <label for="message" class="block uppercase tracking-wide text-orange-950 text-xs font-bold mb-2">ISSUE DESCRIPTION</label>
        <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Describe your issue here..."></textarea>

    </div>
  </div>

{/* license */}
<div class="flex flex-wrap -mx-3 mb-6"> 
<div class="w-full md:w-1/2 px-10 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-orange-950 text-xs font-bold mb-2" for="grid-license">
         License 
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-license" type="string" placeholder="license"></input>
    </div>
    </div>
  <div class="flex flex-wrap -mx-3 mb-2">
   
    <div class="w-full md:w-1/2 px-10 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-orange-950 text-xs font-bold mb-2" for="grid-state">
         Category
      </label>
      <div class="relative">
        <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
          <option>Category 1</option>
          <option>Category 2</option>
          <option>Category 3</option>
          <option>Unknown</option>
        </select>

        <div className="py-10">
        <label class="block uppercase tracking-wide text-orange-950 text-xs font-bold mb-2" for="file_input">UPLOAD FILE</label>
        <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"></input>
        </div>
        
        <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-orange-600 px-35 py-1.5 text-sm  font-semibold leading-6 text-white shadow-sm hover:bg-orange-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
      </div>
      
      </div>
    </div>
  </div>
</form>
</div>
</div>

        </div>
        </>
    )
}
export default Issue;