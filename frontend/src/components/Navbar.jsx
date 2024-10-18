import { useNavigate } from "react-router-dom"
import { CiCirclePlus } from "react-icons/ci";
import GetMemory from './GetMemory';
import { useState } from "react";


export default function Navbar() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [memories, setMemories] = useState([]);
    const handleMemoriesUpdate = (newMemories) => {
        setMemories(newMemories);
    };


    function handleClick() {
        localStorage.removeItem('token');
        navigate('/login');
    }
    function getSpecificMemory() {
        navigate('/getSpecificMemory');
    }
    function getEmotionalMemory() {
        navigate('/getEmotionalMemories')
    }
    function getFavoriteMemory() {
        navigate('/getFavoriteMemory')
    }
    return (
        <div>
            <div className='Navbar'>
                <h2>Digital Memory</h2>
                <div className='addIcon'>
                    <div className="searchMemoryDiv">
                        <input type="text"
                            placeholder="Search Memory"
                            className="searchMemory"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}>
                        </input>
                       
                    </div>


                    <div className="buttonDiv">
                        <button onClick={() => getFavoriteMemory()}><b>
                            Favorite Images</b></button>
                        <button onClick={() => getEmotionalMemory()}><b>
                            Filter  Emotions</b></button>
                        <button onClick={() => getSpecificMemory()}>
                            <b>Filter  Category</b></button>
                        <h2 onClick={() => navigate('/memories')}>
                            <CiCirclePlus /></h2>
                    </div>

                </div>

                <button onClick={() => handleClick()}
                    className='LogOutCss'><b>Log Out</b></button>.

            </div>
            <GetMemory searchTerm={searchTerm}
                onMemoriesUpdate={handleMemoriesUpdate} />
        </div >

    )
}