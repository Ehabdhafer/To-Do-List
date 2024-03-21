import AllTask from "./all_tasks";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import {useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const [cookie] = useCookies(["token"], {
        token: null,
      });

      useEffect(() => {
        if (cookie.token === undefined) {
            navigate('/login');
        }
    }, [cookie.token, navigate]);

    return (
        <div>
            <AllTask />
        </div>
    );

}

export default Home;