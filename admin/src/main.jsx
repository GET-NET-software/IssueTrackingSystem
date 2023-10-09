import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Home from "./pages/homepage.jsx";
import CustomerReg from "./pages/customerReg.jsx";
import ProductReg from "./pages/productReg.jsx";
import Statistics from "./pages/statistics.jsx";
import IssueTable from "./pages/issueTable.jsx";
// import LoginPage from "./pages/LoginPage.jsx";
// import Chart from "./pages/chart.jsx";
import Kanban from "./pages/kanban.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Login from "./pages/LoginPage.jsx";
const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/customer",
		element: <CustomerReg />,
	},
	{
		path: "/product",
		element: <ProductReg />,
	},
	{
		path: "/kanban",
		element: <Kanban />,
	},
	{
		path: "/issue",
		element: <IssueTable />,
	},
	{
		path: "/statistics",
		element: <Statistics />,
	},
	// {
	// 	path: "/login",
	// 	element: <LoginPage />,
	// },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
