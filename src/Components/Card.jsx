import React from "react";

const Card = ({ item }) => {
    let image = item.image.find(image => image.size === "large")["#text"];
    console.log("Image URL:", image);

    // Check if image exists, otherwise set a random placeholder image
    if (!image) {
        const randomImageNumber = Math.floor(Math.random() * 10) + 1; // Generate a random number between 1 and 10
        image = `https://via.placeholder.com/300x300?text=Placeholder+Image+${randomImageNumber}`;
    }

    return (
        <div className="card">
            <img src={image} alt={item.name} />
            <a className="name" href={`https://www.youtube.com/results?search_query=${item.name} ${item.artist}`} target="_blank">{item.name}</a>
            <a className="artist" href={`https://www.youtube.com/results?search_query=${item.artist}`} target="_blank">{item.artist}</a>
        </div>
    );
};

export default Card;
