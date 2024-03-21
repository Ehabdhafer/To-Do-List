import AllTask from "./all_tasks";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import Notification from "./notification";

const Home = () => {
    const navigate = useNavigate();
    const [notify, setNotify] = useState(false);
    const [cookie] = useCookies(["token"], {
        token: null,
      });

      useEffect(() => {
        if (cookie.token === undefined) {
            navigate('/login');
        }
    }, [cookie.token, navigate]);

    // useEffect(() => {
    //     if (cookie.token !== undefined) {
    //       setNotify(true);
    //     } else {
    //       setNotify(false);
    //     }
    //   }, []);

    return (
        <div>
            {notify && <Notification />}
            <AllTask />
        </div>
    );

}

export default Home;