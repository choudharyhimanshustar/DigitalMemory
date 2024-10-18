import { useState } from "react";
import axios from 'axios'
import { useNavigate, useLocation, useParams } from "react-router-dom";
import './UpdateMemory.css'
export default function UpdateMemory() {
    const { id } = useParams()
    const navigate = useNavigate();
    const [editedTitle, setEditedTitle] = useState();
    
    const [multimedia, setMultimedia] = useState();
    const [category, setCategory] = useState();
    const [emotions, setEmotions] = useState();
    function handleMultimedia(e) {
        e.preventDefault();
        setMultimedia(e.target.files[0]);
    }
    const handleUpdate = async () => {
        const formData = new FormData();
        formData.append('title', editedTitle);
        
        formData.append('category', category);
        formData.append('emotions', emotions);

        if (multimedia) {
            formData.append('multimedia', multimedia);
        }
        try {
            const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/update/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log(response.data);

            // Update the memory in the state


            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };
    return (<div className="editModal">
        <h2>Edit Memory</h2>
        <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Title"
        />
        <input
            type='file'
            name='multimedia'
            onChange={(e) => handleMultimedia(e)}
        />
        <b>Category</b>
        <select  name='category'
            onChange={(e) => setCategory(e.target.value)}>
            <option value="Family">Family</option>
            <option value="Achievements">Achievements</option>
            <option value="Travel">Travel</option>
            <option value="Milestones">Milestones</option>
            <option value="Others">Others</option>
        </select>
        <b>Emotions</b>
        <select  name='emotions'
            onChange={(e) => setEmotions(e.target.value)}>
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="nostalgic">Nostalgic</option>
            <option value="proud">Proud</option>
        </select>
        <button onClick={() => handleUpdate()}>Update</button>

    </div>)
}