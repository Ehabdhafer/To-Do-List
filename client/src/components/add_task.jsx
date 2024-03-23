import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const AddTask = () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [formData,SetFormData] = useState({
        title:'',
        description:'',
        priority:'High',
        due_date:'',
    });

    const handleChange = (e) => {
        SetFormData({...formData,[e.target.name]:e.target.value})
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await axios.post('http://localhost:8000/addtask',
            formData);
            setError("Task added Successfully");
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1000);
        }catch(e){
            console.error('error posting data',e);
            setError("All Fields except due_date are required");
        }
    };

    return (
        <>
  <section className="bg-gray-100 ">
    <div className="mx-auto max-w-screen-xl px-4 py-16 xl:py-0 sm:px-6 lg:px-8 ">
      <div className="flex justify-center items-center h-screen lg:grid-cols-5">
        
        <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
            <span>Priority :</span>
              <select
                id="priority"
                name="priority"
                placeholder="priority"
                type="text"
                className={`mt-1 p-2 border-2 rounded-md w-full ${
                    formData.priority === "High"
                      ? "border-red-600 text-red-600"
                      : formData.priority === "Medium"
                      ? "border-yellow-500 text-yellow-500"
                      : formData.priority === "Low" 
                      ? "border-green-500 text-green-500" 
                      : "border-red-600 text-red-600"
                  }`}
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="High" className="text-red-600">
                  High
                </option>
                <option value="Medium" className="text-yellow-500">
                  Medium
                </option>
                <option value="Low" className="text-green-500">
                  Low
                </option>
              </select>
            </div>
            </div>
                <div>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="border w-full rounded-lg border-gray-200 p-3 text-sm"
                    id="title"
                />
                </div>
            <div>
                <input
                name="due_date"
                type="date"
                placeholder="Due_Date"
                value={formData.due_date}
                onChange={handleChange}
                className="border w-full rounded-lg border-gray-200 p-3 text-sm"
                id="phone"
                />
              </div>
            <div>
              <textarea
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="border w-full rounded-lg border-gray-200 p-3 text-sm"
                rows={8}
              />
            </div>
            {error && (
            <p className="text-red-500 transition delay-150 duration-300 ease-in-out">
              {error}
            </p>
          )}
            <div className="mt-4">
              <button
                onClick={handleSubmit}
                type="submit"
                className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
              >
                Add Your Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</>


    )
}

export default AddTask;