// Product register form
import NavBar from "./NavBar";
function FormP(){
    return(
      <>
      
      <NavBar/>
      <div className="min-h-screen w-full bg-amber-50">
        <div className="flex  flex-col justify-center px-6  lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black">Product Register From</h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-black">Product name</label>
                  <div className="mt-2">
                    <input id="username" name="username" type="username" autoComplete="username" required className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
                  </div>
              </div>
              <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-black">Product discription</label>
                  <div className="mt-2">
                    <input id="username" name="username" type="username" autoComplete="username" required className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
                  </div>
              </div>
              <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-black">Product licence</label>
                  <div className="mt-2">
                    <input id="username" name="licence"  required className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
                  </div>
              </div>

              <div>
                <button type="submit" className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>    
      </>
    )
}
export default FormP;

