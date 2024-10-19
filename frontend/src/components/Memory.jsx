import axios from 'axios'
import { useState } from 'react'
import './Memory.css'
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
export default function Memories() {
  const navigate = useNavigate();
  const [memoryData, setMemoryData] = useState({
    userId: "",
    title: "",
    description: "",
    multimedia: null,
    category: "Family",
    emotions: "happy",
  })
  function handleChange(e) {
    e.preventDefault();
    setMemoryData({ ...memoryData, [e.target.name]: e.target.value })
  }
  function handleMultimedia(e) {
    e.preventDefault();
    setMemoryData({ ...memoryData, multimedia: e.target.files[0] })
  }
  const handleClick = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const id = await localStorage.getItem('id');
    console.log(id);
    formData.append('userId', id);
    formData.append('title', memoryData.title);
    formData.append('description', memoryData.description);
    formData.append('category', memoryData.category);
    formData.append('emotions', memoryData.emotions);
    if (memoryData.multimedia) {
      formData.append('multimedia', memoryData.multimedia);
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/memories`,
        formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Memory created:', response.data.message);
      navigate('/');
    } catch (error) {
      console.error('Failed to create memory:', error);
    }
  };
  return (
    <div>

      <form className='MemoryCSS' onSubmit={(e) => handleClick(e)}>
        <b>Title</b>
        <input
          type='text'
          name="title"
          value={memoryData.title}
          onChange={(e) => handleChange(e)}
        />


        <b>Add Memory</b>
        <input
          type='file'
          name='multimedia'
          onChange={(e) => handleMultimedia(e)}
        />
        <b>Category</b>
        <select value={memoryData.category} name='category'
          onChange={(e) => handleChange(e)}>
          <option value="Family">Family</option>
          <option value="Achievements">Achievements</option>
          <option value="Travel">Travel</option>
          <option value="Milestones">Milestones</option>
          <option value="Others">Others</option>
        </select>
        <b>Emotions</b>
        <select value={memoryData.emotions} name='emotions'
          onChange={(e) => handleChange(e)}>
          <option value="happy">Happy</option>
          <option value="sad">Sad</option>
          <option value="nostalgic">Nostalgic</option>
          <option value="proud">Proud</option>
        </select>

        <button type='submit'
          className='MemorySubmitBTN'><b>Submit</b></button>
      </form>
    </div>
  )
}