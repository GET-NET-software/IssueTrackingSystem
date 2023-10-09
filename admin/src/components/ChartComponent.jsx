import React, { useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";

const ChartComponent = () => {
	const chartRef = useRef(null);

	//   useEffect(() => {
	//     // Destroy the previous chart when the component unmounts
	//     return () => {
	//       if (chartRef.current) {
	//         chartRef.current.chartInstance.destroy();
	//       }
	//     };
	//   }, []);

	const data = {
		labels: ["Red", "Blue", "Yellow"],
		datasets: [
			{
				data: [300, 50, 100],
				backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
				hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
			},
		],
	};

	return (
		<div>
			<Line data={data} ref={chartRef} />
		</div>
	);
};

export default ChartComponent;
