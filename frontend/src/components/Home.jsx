import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import './Home.css'
import Memories from './Memory';

import Navbar from './Navbar';

export default function Home() {
    const navigate = useNavigate();

    function isExpired(token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return (payload.exp * 1000) < Date.now();
    }
    const fetchHomePage = async (req, res) => {
        const token = await localStorage.getItem('token');
        console.log(token);
        if (token === null || isExpired(token)) {
            navigate('/login');
        }
        try {
            const response = await
                axios.get(`${process.env.REACT_APP_BACKEND_URL}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,

                    },

                    withCredentials: true,  // Ensures cookies/auth headers are sent with the request

                });
           
        } catch (error) {
            if (error) {
                console.log(error);
                navigate('/login');
            }
        }


    }

    fetchHomePage();

    return (<div className='HomeMainDiv'>

        <Navbar />
        


    </div>);
}