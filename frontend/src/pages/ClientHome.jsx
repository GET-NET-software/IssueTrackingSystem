
import React from 'react';
import NavBar from '../component/NavBar.jsx';
import Footer from '../component/Footer.jsx';


const ClientHome = () => {
  return (
    <>
    <div>
      <NavBar />
      <div className="bg-amber-50">
      <div className="py-[25px] px-[20px] h-[100px] w-[300px] ">
    <img className="h-[200px] w-[200px] rounded-lg object-cover object-center"
      src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c29mdHdhcmUlMjBjb21wYW55fGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60"
      alt="Company image"/>
    </div>

    <div>
      
    <p className="mb-3 text-black font-semibold text-left py-0 px-80 "> Our mission is to empower businesses and individuals with transformative software solutions that harness the power of technology to solve complex challenges. We strive to deliver excellence through our unwavering commitment to innovation, quality, and customer satisfaction.</p>

    </div>

    <div className="py-4 px-96" >
    <button class="bg-orange-600 hover:bg-orange-800 text-white font-semibold py-2 px-4 rounded">Learn More</button>
    </div>
  
    </div>
    <div className="text-orange-500 font-extrabold text-3xl text-center py-6">
      Our Products
     </div>


{/* product card 2 */}
<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="rounded-t-lg" src="https://media.istockphoto.com/id/906778080/photo/doctor-working-on-laptop-computer-with-report-analysis-and-money-about-healthcare-costs-and.webp?b=1&s=170667a&w=0&k=20&c=Vht-Cxn1qVXl25MP00vXUIb1ABnojT68H5LP67kRx1s=" alt="product image" />
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Hospital Management System</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Optimize healthcare operations seamlessly with our advanced Hospital Management System, empowering medical facilities to enhance patient care and streamline administrative tasks.</p>
        <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
             <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a>
    </div>
</div>
{/* product card 3 */}
<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="rounded-t-lg" src="https://media.istockphoto.com/id/1335050732/photo/businessman-using-a-computer-to-document-management-concept-online-documentation-database-and.webp?b=1&s=170667a&w=0&k=20&c=6eJ_nYSg_9m_vJ_usNLPnwvhoq23XYI6cE9NZv18Z3A=" alt="product image" />
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">License Management System</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Simplify software compliance and maximize license utilization with our innovative License Management System, empowering businesses to effortlessly manage their software assets</p>
        <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
             <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a>
    </div>
</div>

</div>

{/* carousel */}
    <div
  id="carouselExampleIndicators"
  class="relative"
  data-te-carousel-init
  data-te-ride="carousel">
  {/* <!--Carousel indicators--> */}
  <div
    class="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
    data-te-carousel-indicators>
    <button
      type="button"
      data-te-target="#carouselExampleIndicators"
      data-te-slide-to="0"
      data-te-carousel-active
      class="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
      aria-current="true"
      aria-label="Slide 1"></button>
    <button
      type="button"
      data-te-target="#carouselExampleIndicators"
      data-te-slide-to="1"
      class="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
      aria-label="Slide 2"></button>
    <button
      type="button"
      data-te-target="#carouselExampleIndicators"
      data-te-slide-to="2"
      class="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
      aria-label="Slide 3"></button>
  </div>

  {/* <!--Carousel items--> */}
  <div
    class="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
    {/* <!--First item--> */}
    <div
      class="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
      data-te-carousel-item
      data-te-carousel-active>
      <img
        src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNvZnR3YXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
        class="block w-full"
        alt="Software 1" />
    </div>
    {/* <!--Second item--> */}
    <div
      class="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
      data-te-carousel-item>
      <img
        src="https://mdbcdn.b-cdn.net/img/nehttps://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNvZnR3YXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60w/slides/042.webp"
        class="block w-full"
        alt="Software 2" />
    </div>
    {/* <!--Third item--> */}
    <div
      class="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
      data-te-carousel-item>
      <img
        src="https://plus.unsplash.com/premium_photo-1683147803878-48aaeed6684f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHNvZnR3YXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
        class="block w-full"
        alt="Software 3" />
    </div>
  </div>

  {/* <!--Carousel controls - prev item--> */}
  <button
    class="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
    type="button"
    data-te-target="#carouselExampleIndicators"
    data-te-slide="prev">
    <span class="inline-block h-8 w-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-6 w-6">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </span>
    <span
      class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >Previous</span
    >
  </button>
  {/* <!--Carousel controls - next item--> */}
  <button
    class="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
    type="button"
    data-te-target="#carouselExampleIndicators"
    data-te-slide="next">
    <span class="inline-block h-8 w-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-6 w-6">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </span>
    <span
      class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >Next</span
    >
  </button>
</div>

      <Footer />


    </>
  );
}

export default ClientHome;
