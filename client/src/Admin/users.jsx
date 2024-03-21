import axios from "axios";
import {  useEffect, useState } from "react";
import Cookies from "js-cookie";


const Users = () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const [users,setUsers] = useState(null);


    const handleDelete = async (id) => {
        try{
            await axios.delete(
                `http://localhost:8000/deleteuser` ,
                { data: { id } }
            );
            fetchData();
        }catch(error){
            console.error('error deleting user',error);
        }
    }

    const fetchData = async () => {
        try{
            const response = await axios.get(`http://localhost:8000/getalluser`);
            setUsers(response.data);
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
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created At
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">

        {users ? (
            users.map(user => (
                <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="text-sm text-gray-900">
                    {user.created_at.split("T")[0]}
                    </div>
                </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role_id === 1 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {user.role_id === 1 ? 'Admin' : 'User'}
                    </span>
                </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex items-center">
                    {user.email}
                </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                <div className="flex items-center justify-evenly">
                    <button 
                    // onClick={() => handleDelete(user.id)}
                    className="text-green-400 hover:text-green-500">
                    AsignTask
                    </button>
                    {/* <button href="#" className="ml-2 text-indigo-600 hover:text-indigo-900">
                    Edit
                    </button> */}
                    <button 
                    onClick={() => handleDelete(user.id)}
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

export default Users;