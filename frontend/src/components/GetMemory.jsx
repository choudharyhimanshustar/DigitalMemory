import React, { useState, useEffect } from "react"
import axios from 'axios'
import './GetMemory.css'
import { MdEdit } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { useNavigate } from 'react-router-dom'
import { MdFavoriteBorder } from "react-icons/md";
import { MdOutlineFavorite } from "react-icons/md";
import Fuse from 'fuse.js'
export default function GetMemory({ searchTerm,onMemoriesUpdate  }) {
    const [memory, setMemories] = useState([]);
    /*  const [selectedMedia, setSelectedMedia] = useState(null);
     const [isModalOpen, setIsModalOpen] = useState(false);*/
    const navigate = useNavigate();
    useEffect(() => {
        const fetchMemory = async () => {
            const id = await localStorage.getItem('id');

            const response = await
                axios.get(`${process.env.REACT_APP_BACKEND_URL}/getMemories`, { params: { id } });
            console.log(response.data.response);
            setMemories(response.data.response);
            onMemoriesUpdate(response.data.response);
        }
        fetchMemory();
    }, [])
    /* const toggleModal = (mediaURL, fileType) => {
        navigate(`/GetMemory?url=${encodeURIComponent(mediaURL)}&type=${fileType}`)
    }; */
    const toggleFav = async (id, favStatus) => {

        try {
            const response = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/update/${id}/${favStatus}`,
                { headers: { 'Content-Type': 'application/json' } })
            console.log(response);

            setMemories(prevMemories => prevMemories.map(memory => memory._id === id ?
                { ...memory, favorite: favStatus } : memory
                
            ))
        } catch (error) {
            console.log(error);
        }
    }
    const deleteMemory = async (id) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete/${id}`);
            console.log(response.data);
            setMemories(memory.filter((memoryItem) => memoryItem._id !== id));
            onMemoriesUpdate(memory.filter((memoryItem) => memoryItem._id !== id));
        } catch (error) {
            console.log(error);
        }
    }
    const fuse = new Fuse(memory, { keys: ['title'], threshold: 0.4 });
    const filteredMemories=searchTerm?fuse.search(searchTerm).map(result=>result.item):memory;
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


        {filteredMemories.length > 0 ? (<div>
            <ul className="Memory">
                {filteredMemories.map(memoryItem => (<div className="MemoryCard">
                    <h2>{memoryItem.title}</h2>

                    {renderMultimedia(memoryItem.multimedia)}
                    <div className="btnCSS">
                        <button className="deleteBtn"
                            onClick={() => handleEdit(memoryItem._id)}><MdEdit /></button>
                        <button className="deleteBtn"
                            onClick={() => toggleFav(memoryItem._id, !memoryItem.favorite)}>
                            {memoryItem.favorite === false ? <MdFavoriteBorder /> : <MdOutlineFavorite />}</button>
                        <button className="deleteBtn"
                            onClick={() => deleteMemory(memoryItem._id)}><ImCross /></button>
                    </div>


                </div>))}

            </ul>

        </div>) : (<div className="Banner">
            <div>
                <h1>Welcome to the Memory App!</h1>
                <b>This app allows you to store your precious memories.
                    Start by uploading your first memory!</b>
            </div>
            <div className="BannerImgDiv">
                <img className="bannerimg" src="https://i.pinimg.com/enabled_hi/474x/f5/93/d7/f593d7a9b3dacb227c5eeacf6088c7f5.jpg" />
                <img className="bannerimg" src="https://i.pinimg.com/474x/5e/1b/a3/5e1ba34c8c6c313d68f0b81cb1231b01.jpg" />
                <img className="bannerimg" src="https://i.pinimg.com/474x/a1/2b/be/a12bbee0ad3d85325f20950d22468b28.jpg" />
                <img className="bannerimg" src="https://i.pinimg.com/enabled_hi/474x/85/0b/1e/850b1e21ea026ea163ead4bca3e6955a.jpg" />
            </div>

        </div>)}

    </div>)
}