import axios from "axios";
import {  useEffect, useState } from "react";
import Cookies from "js-cookie";


const AdminTasks = () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const [tasks,setTasks] = useState(null);



    const handleDelete = async (id) => {
        try{
            await axios.delete(
                `http://localhost:8000/deletetaskadmin` ,
                { data: { id } }
            );
            fetchData();
        }catch(error){
            console.error('error deleting task',error);
        }
    }

    const fetchData = async () => {
        try{
            const response = await axios.get(`http://localhost:8000/adminalltask`);
            setTasks(response.data);
        }catch (error){
            console.error('error fetching data',error);
        }
    }
    useEffect (() => {
        fetchData();
}, []);


    return (
        <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Priority
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created At
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Due date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">

        {tasks ? (
            tasks.map(task => (
                <tr key={task.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        
                        <div className="text-sm font-medium text-gray-900">{task.title}</div>
                    </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex items-center">
                {task.description.split(" ").slice(0, 5).join(" ")}
                {task.description.split(" ").length > 5 && "..."}
                </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${
                        task.status === "inactive"
                        ? "bg-red-600 text-white"
                        : task.status === "pending"
                        ? "bg-yellow-500 text-white"
                        : task.status === "completed" 
                        ? "bg-green-500 text-white" 
                        : "bg-red-600 text-white"
                    }`}>
                        {task.status}
                    </span>
                </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className={`flex items-center border-2 rounded-md justify-center
                ${
                    task.priority === "High"
                    ? "border-red-600 text-red-600"
                    : task.priority === "Medium"
                    ? "border-yellow-500 text-yellow-500"
                    : task.priority === "Low" 
                    ? "border-green-500 text-green-500" 
                    : "border-red-600 text-red-600"
                }`}>
                    {task.priority}
                </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="text-sm text-gray-900">
                    {task.created_at.split("T")[0]}
                    </div>
                </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    {task.due_date.split(" ")[0]}
                </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                <div className="flex items-center justify-evenly">
                    <button 
                    // onClick={() => navigate("/adminaddtask", { state: { id: task.id } })}
                    className="text-green-400 hover:text-green-500">
                    AsignTask
                    </button>
                    <button 
                    onClick={() => handleDelete(task.id)}
                    className="ml-2 text-red-600 hover:text-red-900">
                    Delete
                    </button>
                </div>
                </td>
                </tr>
                ))
                ) : (
                    <tr>
                        <td colSpan="6" className="px-6 py-4 whitespace-nowrap text-2xl">
                            Loading ...
                        </td>
                    </tr>
                )}
            </tbody>
            </table>

        </div>
    )
}

export default AdminTasks;