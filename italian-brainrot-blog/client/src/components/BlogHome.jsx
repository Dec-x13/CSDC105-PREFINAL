import React, { useState } from 'react';
import './BlogHome.css';

const BlogHome = () => {
  const [characters, setCharacters] = useState({
    tralalero: {
      name: "Tralalero Tralala",
      description: "A three-legged shark wearing Nike sneakers who loves playing Fortnite. Known for being the original character that sparked the Italian Brainrot phenomenon. Despite his unusual appearance, he's quite skilled at gaming and has become a symbol of the quirky Italian internet culture.",
      image: "/images/tralalero.jpg"
    },
    bombardiro: {
      name: "Bombardiro Crocodilo",
      description: "A peaceful crocodile with bomber wings who never wanted war. Known for his poetic nature and his famous piece 'Minds Heavier Than Missiles.' He represents the contrast between his military appearance and his pacifist philosophy.",
      image: "/images/bombardiro.jpg"
    },
    cappuccino: {
      name: "Capuccino Assassino",
      description: "A mysterious character from the Italian Brainrot universe. Despite his ominous title, he's actually a coffee-loving character who brings a unique blend of Italian café culture and surreal storytelling to the mix.",
      image: "/images/cappuccino.jpg"
    },
    boneca: {
      name: "Boneca Ambalabu",
      description: "A whimsical character that embodies the more playful side of the Italian Brainrot universe. Known for unexpected appearances and adding an element of surprise to the narrative.",
      image: "/images/boneca.jpg"
    }
  });
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({ name: '', description: '' });

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    setEditMode(false);
  };

  const closePopup = () => {
    setSelectedCharacter(null);
    setEditMode(false);
  };

  const handleEditClick = () => {
    setEditData({
      name: selectedCharacter.name,
      description: selectedCharacter.description
    });
    setEditMode(true);
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSave = () => {
    // Find the key of the selected character
    const key = Object.keys(characters).find(
      k => characters[k].name === selectedCharacter.name
    );
    if (key) {
      setCharacters({
        ...characters,
        [key]: {
          ...characters[key],
          name: editData.name,
          description: editData.description
        }
      });
      setSelectedCharacter({
        ...selectedCharacter,
        name: editData.name,
        description: editData.description
      });
    }
    setEditMode(false);
  };

  const handleDelete = () => {
    // Find the key of the selected character
    const key = Object.keys(characters).find(
      k => characters[k].name === selectedCharacter.name
    );
    if (key) {
      const newChars = { ...characters };
      delete newChars[key];
      setCharacters(newChars);
    }
    setSelectedCharacter(null);
    setEditMode(false);
  };

  return (
    <>
      <nav className="nav-bar">
        <div className="nav-container">
          <a href="/" className="nav-logo">Ced's Brainrot BLOG</a>
          <div className="nav-buttons">
            <a href="/blogs" className="nav-button">Blogs</a>
            <a href="#about" className="nav-button">About</a>
            <a href="/add" className="nav-button add">+</a>
          </div>
        </div>
      </nav>
      
      <div className="blog-container">
        <header className="blog-header">
          <div className="header-overlay">
            <h1>Italian Brainrot Universe</h1>
            <p className="subtitle">Exploring the Whimsical World of Italian Meme Characters</p>
          </div>
        </header>

        <main className="blog-content">
          <section className="featured-post">
            <div className="featured-image">
              <img src="/images/tralalero.jpg" alt="Tralalero Tralala" />
            </div>
            <div className="featured-text">
              <h2>Meet Tralalero Tralala</h2>
              <p>The iconic three-legged shark wearing Nike sneakers who started it all. Known for his Fortnite gaming sessions and being the original character that sparked the Italian Brainrot phenomenon.</p>
            </div>
          </section>

          <section className="blog-grid">
            {Object.entries(characters).map(([key, character]) => (
              <article 
                key={key} 
                className="blog-card"
                onClick={() => handleCharacterClick(character)}
              >
                {/* Removed the card-image div */}
                <div className="card-content">
                  <h3>{character.name}</h3>
                  <p className="blog-date">4/27/2024</p>
                  <p>{character.description.substring(0, 100)}...</p>
                  <button
                    className="read-more-btn"
                    onClick={e => {
                      e.stopPropagation();
                      handleCharacterClick(character);
                    }}
                  >
                    Read more
                  </button>
                </div>
              </article>
            ))}
          </section>

          {selectedCharacter && (
            <div className="popup-overlay" onClick={closePopup}>
              <div className="popup-content large" onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={closePopup}>&times;</button>
                <div className="popup-image">
                  <img src={selectedCharacter.image} alt={selectedCharacter.name} />
                </div>
                <div className="popup-text">
                  {editMode ? (
                    <>
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleEditChange}
                        style={{ width: '100%', fontSize: '1.2em', marginBottom: 10 }}
                      />
                      <textarea
                        name="description"
                        value={editData.description}
                        onChange={handleEditChange}
                        style={{ width: '100%', minHeight: 100, fontSize: '1em' }}
                      />
                    </>
                  ) : (
                    <>
                      <h2>{selectedCharacter.name}</h2>
                      <p>{selectedCharacter.description}</p>
                    </>
                  )}
                </div>
                <div className="popup-actions">
                  {editMode ? (
                    <button className="popup-btn edit-btn" onClick={handleEditSave}>Save</button>
                  ) : (
                    <button className="popup-btn edit-btn" onClick={handleEditClick}>Edit</button>
                  )}
                  <button className="popup-btn delete-btn" onClick={handleDelete}>Delete</button>
                </div>
              </div>
            </div>
          )}

          <section className="about-section" id="about">
            <h2>About Italian Brainrot</h2>
            <p>Italian Brainrot is a unique internet phenomenon featuring AI-generated characters that blend Italian culture with surreal storytelling. From peaceful crocodiles to shark gamers, these characters have captured the imagination of social media users worldwide.</p>
          </section>
        </main>

        <footer className="blog-footer">
          <p>© 2024 Italian Brainrot Blog | Tralalero Tralala™</p>
        </footer>
      </div>
    </>
  );
};

export default BlogHome;