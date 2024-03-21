import axios from "axios";
import {  useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const TodayTasks = () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const [tasks,setTasks] = useState(null);


    const handleDelete = async (id) => {
        try{
            await axios.delete(
                `http://localhost:8000/deletetask` ,
                { data: { id } }
            );
            fetchData();
        }catch(error){
            console.error('error posting data',error);
        }
    }

    const fetchData = async () => {
        try{
            const response = await axios.get(`http://localhost:8000/todaytasks`);
            setTasks(response.data);
        }catch (error){
            console.error('error fetching data',error);
        }
    }
    useEffect (() => {
        fetchData();
}, []);


    return (
        <div className=" mt-12">
            <div>
            {
                tasks ? (
                    <div className="xl:ml-[15rem] lg:ml-20 flex flex-wrap justify-evenly gap-y-5">
                    {tasks.map((item) => (
            <div className="  w-96 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {item.title}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex flex-wrap justify-around">
                <span className={`mt-1 p-2 border-2 rounded-md w-full ${
                    item.status === "inactive"
                      ? "border-red-600 text-red-600"
                      : item.status === "pending"
                      ? "border-yellow-500 text-yellow-500"
                      : item.status === "completed" 
                      ? "border-green-500 text-green-500" 
                      : "border-red-600 text-red-600"
                  }`}>
                    Status: {item.status}
                </span>
                <span className={`mt-1 p-2 border-2 rounded-md w-full ${
                    item.priority === "High"
                      ? "border-red-600 text-red-600"
                      : item.priority === "Medium"
                      ? "border-yellow-500 text-yellow-500"
                      : item.priority === "Low" 
                      ? "border-green-500 text-green-500" 
                      : "border-red-600 text-red-600"
                  }`}>
                    Priority: {item.priority}
                </span>
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 overflow-hidden line-clamp-2 text-left">
                Description: {item.description}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex flex-wrap justify-around">
                <span className=" ">
                    Created_at: {item.created_at.split("T")[0]}
                </span>
                /
                <span className="  ">
                {item.due_date ? `Due_date: ${item.due_date.split(" ")[0]}` : "Due-date:No final date"}

                </span>
            </p>
            <div className="flex flex-wrap justify-around">
                <Link to={`/details/${item.id}`}>
            <button
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Read more and update
                <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
                >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                />
                </svg>
            </button>
            </Link>
            {"    "}
            
            <button
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => handleDelete(item.id)}
            >
                Delete
                <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
                >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                />
                </svg>
            </button>
            </div>
                </div>
                ))}
                </div>
            ) : (
                <div className="text-2xl">Loading ...</div>
            )}
            </div>
        </div>
    )
}


export default TodayTasks;