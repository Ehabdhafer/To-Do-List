import axios from "axios";
import {  useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";


const Profile = () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const [user,setUser] = useState(null);
    const [formData,SetFormData] = useState({
        name:'',
        email:'',
    });
    const fetchData = async () => {
        try{
            const response = await axios.get(`http://localhost:8000/getuser`,{
        });
        const user = response.data; 
        setUser(user);

        SetFormData({
            name: user.name,
            email: user.email
        });

        }catch (error){
            console.error('error fetching data',error);
        }
    }
    useEffect (() => {
        fetchData();
}, []);

    const handleChange = (e) => {
        SetFormData({...formData,[e.target.name]:e.target.value})
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const updatedData = { ...formData, id }; 
            await axios.put('http://localhost:8000/updateuser',
            updatedData);
            setError("Your Profile updated successfully");
            setTimeout(() => {
                navigate("/");
            }, 1000);
        }catch(e){
            console.error('error posting data',e);
            setError("All Fields are required");
        }
    };

    return (
        <>
        <div
            className="p-20 bg-image bg-[50%] bg-cover"
            style={{
                backgroundImage:
                "url(https://blog.hubspot.com/hubfs/To_Do_List.png)",
                height: "400px",
            }}
            >
            <div className="flex justify-center items-center h-screen">
                <div className="bg-white px-20 py-5 rounded-lg shadow-xl backdrop-filter backdrop-blur-lg">
                <h2 className="font-bold text-2xl mb-5 text-center">Your Profile</h2>

                <div className="text-left">

                <span>Name: </span>
                <input
                    name="name"
                    className="w-full p-2 border rounded-md mt-4"
                    id="name"
                    placeholder="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    />

                <span>Email: </span>
                <input
                    name="email"
                    className="w-full p-2 border rounded-md mt-4"
                    placeholder="Email"
                    type="email"
                    required
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                    
                </div>
                {error && (
                    <p className="text-red-500 transition delay-150 duration-300 ease-in-out">
                    {error}
                    </p>
                )}
                <br />
                <br />

                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="w-full p-2 bg-teal-600 text-white rounded-3xl mt-4 hover:bg-teal-400"
                    >
                        Update Your Profile
                    </button>
                    <br />
                    <br />
                    <br />
                    </div>
                </div>
            </div>

</>


    )
}

export default Profile;