import React, { useState, useEffect } from "react"
import axios from 'axios'
import './GetMemory.css'
import { MdEdit } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { useNavigate } from 'react-router-dom'
import './GetSpecificMemory.css'
export default function GetSpecificMemory() {
    const [memory, setMemories] = useState([]);
    const [emotions, setEmotions] = useState('All');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchMemory = async () => {
            const id = await localStorage.getItem('id');

            const response = await
                axios.get(`${process.env.REACT_APP_BACKEND_URL}/getEmotionalMemories/${id}/${emotions}`);
            console.log(response.data);
            setMemories(response.data);
        }
        fetchMemory();
    }, [emotions])

    const deleteMemory = async (id) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete/${id}`);
            console.log(response.data);
            setMemories(memory.filter((memoryItem) => memoryItem._id !== id));
        } catch (error) {
            console.log(error);
        }
    }
    function handleEdit(id) {
        navigate(`updateMemory/${id}`)
    }

    function renderMultimedia(multimediaURL) {


        const FileType = multimediaURL ? multimediaURL.split('.').pop().toLowerCase() : '';
        if (['jpg', 'jpeg', 'gif'].includes(FileType)) {
            return <img src={multimediaURL}
                className='img'
                /* onClick={() => toggleModal(multimediaURL, FileType)} */ />
        }
        else if (['mp3'].includes(FileType)) {
            return (<audio controls className="audio">
                <source src={multimediaURL} type={`audio/${FileType}`} />
                Your browser does not support the audio element.
            </audio>)
        }
        else if (['mp4', 'webm', 'org'].includes(FileType)) {
            return (
                <video controls
                    className='img'
                    /* onClick={() => toggleModal(multimediaURL, FileType)} */>
                    <source src={multimediaURL} type={`video/${FileType}`} />
                    Your browser does not support the video tag.
                </video>);
        }
        else if (['pdf'].includes(FileType)) {
            // Render a link to the PDF or embed the PDF
            return (
                <embed src={multimediaURL} type="application/pdf" />
            );
        } else {
            // For unsupported file types, show a download link
            return <a href={multimediaURL} download>Download File</a>;
        }
    }
    return (<div>
        
        <label className="filter">
            <b>Filter by Emotions : </b>
            <select value={emotions} onChange={(e) => setEmotions(e.target.value)}>
                <option value="All">All</option>
                <option value="happy">Happy</option>
                <option value="sad">Sad</option>
                <option value="proud">Proud</option>
                <option value="nostalgic">Nostalgic</option>
            </select>
        </label>
        {memory.length > 0 ? (<div>
            <ul className="Memory">
                {memory.map(memoryItem => (<div className="MemoryCard">
                    <h2>{memoryItem.title}</h2>
                    
                    {renderMultimedia(memoryItem.multimedia)}
                    <div className="btnCSS">
                        <button className="deleteBtn"
                            onClick={() => handleEdit(memoryItem._id)}><MdEdit /></button>
                        <button className="deleteBtn"
                            onClick={() => deleteMemory(memoryItem._id)}><ImCross /></button>
                    </div>


                </div>))}

            </ul>

        </div>) : (<div className="Banner">
            <div>
                <h1>Unfortunate to know that you do not have any memory of
                    this category</h1>
               
            </div>
            <div className="BannerImgDiv">
                <img className="NoMemory" 
                src="https://i.pinimg.com/474x/3b/fc/90/3bfc9038ed8dbe9a397df583dbafa674.jpg" />
                
            </div>

        </div>)}

    </div>)
}