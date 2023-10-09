import React, { useEffect, useState, useRef } from "react";
import { Bar, Pie } from "react-chartjs-2";
import SideBar from "../components/SideBar";
import "chart.js/auto";
import axios from "axios";


function statistics() {
  const [chartData, setChartData] = useState({
    labels: ["Total Issues", "Solved Issues", "Not Solved Issues"],
    datasets: [
      {
        label: "Data",
        data: [10, 5, 5],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
        
          "rgba(75, 192, 192, 0.6)",
        ],
      },
    ],
  });
  
  const [pieData, setPieData] = useState({
    labels: ["Solved Issues", "Not Solved Issues"],
    datasets: [
      {
        label: "Data",
        data: [10, 5],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
      },
    ],
  }); 
  const ref = useRef(null);
  // const solvedIssues = useState

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: true,
      },
      y: {
        display: true,
        beginAtZero: true,
      },
    },
  };
  
  
  
  const [solvedD, setSolvedD] = useState(Number)
  const [issueTotal, setTotal] = useState(Number)
  const [unsolved, setUnsolved] = useState(Number)
  
  // useEffect(() => {
  //   // Fetch data from http://localhost:5286/stat/getnoissues using Axios
  //   // axios
  //   //   .get("http://localhost:5286/stat/getnoissues")
  //   //   .then((response) => {
  //   //     const data = response.data;
  //   //     setChartData({
  //   //       labels: ["Total Issues", "Solved Issues", "Not Solved Issues"],
  //   //       datasets: [
  //   //         {
  //   //           label: "Data",
  //   //           data: [data.totalIssues, data.solvedIssues, data.notSolvedIssues],
  //   //           backgroundColor: [
  //   //             "rgba(255, 99, 132, 0.6)",
  //   //             "rgba(54, 162, 235, 0.6)",
  //   //             "rgba(75, 192, 192, 0.6)",
  //   //           ],
  //   //         },
  //   //       ],
  //   //     });
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error("Error fetching data from /stat/getnoissues", error);
  //   //   });

  //   // // Fetch data from http://localhost:5286/stat/getsolvedissues using Axios
  //   // axios
  //   //   .get("http://localhost:5286/stat/getsolvedissues")
  //   //   .then((response) => {
  //   //     const data = response.data;
  //   //     console.log(data)
  //   //     setPieData({
  //   //       labels: ["Solved Issues", "Not Solved Issues"],
  //   //       datasets: [
  //   //         {
  //   //           label: "Data",
  //   //           data: [data.solvedIssues, data.notSolvedIssues],
  //   //           backgroundColor: [
  //   //             "rgba(255, 99, 132, 0.6)",
  //   //             "rgba(54, 162, 235, 0.6)",
  //   //           ],
  //   //         },
  //   //       ],
  //   //     });
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error("Error fetching data from /stat/getsolvedissues", error);
  //   //   });


  //   const  solved  = async () => {
  //     try{
  //       const response =  await axios.get("http://localhost:5286/stat/getsolvedissues")
  //       // setSolvedD(response.data)
  //       // setChartData()
  //     } catch(error){
  //       console.log(error)
  //     }
  //   }
  //   solved()
  //   const totalIssues = async () => {
  //    try{
  //     const response = await axios.get("http://localhost:5286/stat/getnoissues")
  //     setTotal(response.data)
  //     console.log(issueTotal)
  //    }catch(error){
  //     console.log(error)
  //    }
  //   }
  //   totalIssues()
  //   setUnsolved(issueTotal - solvedD)
  // }, []);
  // console.log(issueTotal)  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the first URL
        const solvedResponse = await axios.get("http://localhost:5286/stat/getsolvedissues");
        const solvedData = solvedResponse.data;

        // Fetch data from the second URL
        const noIssuesResponse = await axios.get("http://localhost:5286/stat/getnoissues");
        const noIssuesData = noIssuesResponse.data;

        // Update chartData state with the fetched data
        setChartData({
          labels: ["Total Issues", "Solved Issues", "Not Solved Issues"],
          datasets: [
            {
              label: "Data",
              data: [noIssuesData, solvedData, noIssuesData - solvedData ],
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(75, 192, 192, 0.6)",
              ],
            },
          ],
        });

        setPieData({
          labels: [ "Solved Issues", "Not Solved Issues"],
          datasets: [
            {
              label: "Data",
              data: [solvedData, noIssuesData - solvedData ],
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(75, 192, 192, 0.6)",
              ],
            },
          ],
        });

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  },[])
  return (
    <>
      <SideBar />
      <div className="ml-72 flex gap-20">
        <div className="pl-10 mt-20 h-[400px] w-[400px]">
          <Bar ref={ref} data={chartData} options={chartOptions} />
        </div>
        <div className="mt-20 h-[400px] w-[400px]">
          <Pie ref={ref} data={pieData} options={chartOptions} />
        </div>
      </div>
    </>
  );
}

export default statistics;