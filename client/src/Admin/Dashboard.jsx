import { useState } from "react";
import AdminTasks from "./tasks";
import Users from "./users";


const Dashboard = () => {

    const [selectedOption, setSelectedOption] = useState("users");

    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    };

    return (
        <div>
            <select value={selectedOption} onChange={handleChange}
            className="w-48 h-10 text-3xl text-center  mt-4 mb-4"
            >
                <option value="users">Users</option>
                <option value="tasks">Tasks</option>
            </select>
            {selectedOption === "users" ? <Users /> : <AdminTasks />}
        </div>
    );

}

export default Dashboard;