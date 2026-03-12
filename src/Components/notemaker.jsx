import React, { useState, useEffect } from "react";
import "./notemaker.css";

const NoteMaker = () => {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  const [inputValue, setInputValue] = useState("");
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (inputValue.trim() === "") return;
    if (editId) {
      setNotes(notes.map(n => n.id === editId ? { ...n, text: inputValue } : n));
      setEditId(null);
    } else {
      setNotes([...notes, { id: Date.now(), text: inputValue }]);
    }
    setInputValue("");
  };

  const deleteNote = (id) => setNotes(notes.filter(n => n.id !== id));
  
  const editNote = (note) => {
    setInputValue(note.text);
    setEditId(note.id);
  };

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Note Maker</h1>
      <p className="subtitle">Capture and organize your thoughts instantly</p>

      <div className="input-section">
        <textarea 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="Capture your thoughts..."
        />
        <button className="primary-btn" onClick={addNote}>
          {editId ? "Update Note" : "Save Note"}
        </button>
      </div>

      <div className="toolbar">
        <div className="search-wrapper">
          <input 
            className="search-input"
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <span className="stats">
          <strong>{notes.length}</strong> Total
        </span>
      </div>

      <ul className="notes-grid">
        {filteredNotes.map(note => (
          <li key={note.id} className="note-card">
            <p className="note-text">{note.text}</p>
            <div className="card-footer">
              <button className="icon-btn edit-btn" onClick={() => editNote(note)} aria-label="Edit">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                <span>Edit</span>
              </button>
              <button className="icon-btn delete-btn" onClick={() => deleteNote(note.id)} aria-label="Delete">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
                <span>Delete</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
      
      {filteredNotes.length === 0 && searchTerm && (
        <p className="empty-state">No notes match your search.</p>
      )}
    </div>
  );
};

export default NoteMaker;
