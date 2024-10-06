import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import './Home.css'
export default function Home() {
    const navigate = useNavigate();
    function isExpired(token)
    {
        const payload=JSON.parse(atob(token.split('.')[1]));
        return (payload.exp*1000)<Date.now();
    }
    const fetchHomePage = async (req, res) => {
        const token = await localStorage.getItem('token');
        console.log(token);
        if(token===null || isExpired(token))
        {
            navigate('/login');
        }
        try {
            const response = await 
            axios.get('https://digitalmemory.onrender.com', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data.message);
        } catch (error) {
            if (error) {
                console.log(error);
                navigate('/login');
            }
        }


    }
    
    fetchHomePage();
    function handleClick()
    {
        localStorage.removeItem('token');
        navigate('/login');
    }
    return (<div>
        <button onClick={()=>handleClick()}
            className='LogOutCss'>Log Out</button>
    </div>);
}