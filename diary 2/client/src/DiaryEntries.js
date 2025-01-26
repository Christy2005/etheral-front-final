import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DiaryEntries = () => {
  const [entries, setEntries] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = () => {
    axios.get('http://localhost:5000/entries')
      .then(response => setEntries(response.data))
      .catch(error => console.log(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/entries', { title, content })
      .then(response => {
        setEntries([...entries, response.data.entry]);
        setTitle('');
        setContent('');
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h1>Diary Entries</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
        <textarea 
          placeholder="Content" 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          required 
        />
        <button type="submit">Add Entry</button>
      </form>
      {entries.map(entry => (
        <div key={entry.id}>
          <h2>{entry.title}</h2>
          <p>{entry.content}</p>
          <small>{entry.created_at}</small>
        </div>
      ))}
    </div>
  );
};

export default DiaryEntries;