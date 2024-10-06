import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'
export default function SignUp() {
    const navigate=useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const handleSignUP = async () => {
        try {
            const response=await axios.post('https://digitallibraryofpersonalmemories.onrender.com', {
                email: email,
                fullName: fullName,
                password: password
            })
            const data=response.data;
            if(data.error)
            {
                console.log(data.error);
            }
            else
            {
                console.log("User Registered Successfully");
                navigate('/login');
            }
        } catch(err) {
            console.log(err);
        }
    }
    return (
        <div className="Login">
            <form className="LoginForm">
                <label>Email</label>
                <input
                    type="email"
                    required="true"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email" />
                <label>Enter Full Name</label>
                <input
                    type="text"
                    placeholder="Enter Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)} />

                <label>Password</label>
                <input
                    type="text"
                    required="true"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password" />
            </form>
            <div className="SignUpbtn">
                <button onClick={() => handleSignUP()} >SignUp</button>
            </div>

        </div >
    )
}