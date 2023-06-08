import React, { useEffect, useState } from "react";
import Card from './Components/Card';
import './Styles/App.css';

const API_KEY = "94a5773a859c9bd7339e63a717ceabad";
const API_URL = `https://ws.audioscrobbler.com/2.0/?api_key=${API_KEY}&format=json`;
const MAX_RESULTS = 11; // Maximum number of results to show initially

const App = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [albumResults, setAlbumResults] = useState([]);
    const [showAllAlbums, setShowAllAlbums] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let timeoutId;

        if (searchTerm) {
            setIsLoading(true);
            setAlbumResults([]);

            // Set a timeout to simulate loading
            timeoutId = setTimeout(() => {
                fetch(`${API_URL}&method=album.search&album=${searchTerm}`)
                    .then(response => response.json())
                    .then(data => {
                        const albums = data.results.albummatches.album;
                        setAlbumResults(albums);
                        setIsLoading(false);
                    })
                    .catch(error => {
                        console.error(error);
                        setIsLoading(false);
                    });
            }, 500);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [searchTerm]);

    const handleSearch = e => {
        setSearchTerm(e.target.value);
        setShowAllAlbums(false);
    };

    const handleSeeAllAlbums = () => {
        setShowAllAlbums(true);
    };

    const handleShowLess = () => {
        setShowAllAlbums(false);
    };

    const filteredAlbumResults = showAllAlbums
        ? albumResults
        : albumResults.slice(0, MAX_RESULTS);

    return (
        <div className="app">
            <input
                type="text"
                name="search"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
            />
            <div className="section">
                <br />
                <div className="card-container">
                    {filteredAlbumResults.map(item => (
                        <Card key={item.name} item={item} type="album" />
                    ))}
                    {!showAllAlbums && albumResults.length > MAX_RESULTS && (
                        <button onClick={handleSeeAllAlbums}>See All</button>
                    )}
                    {showAllAlbums && (
                        <button onClick={handleShowLess}>Show Less</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
