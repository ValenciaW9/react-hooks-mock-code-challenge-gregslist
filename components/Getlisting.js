import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Listings() {
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newListing, setNew] = useState({
    description: '',
    image: '',
    location: ''
  });

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await axios.get('http://localhost:6001/listings');
      setListings(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFavorite = (id) => {
    setListings((prevListings) =>
      prevListings.map((listing) =>
        listing.id === id
          ? { ...listing, favorite: !listing.favorite }
          : listing
      )
    );
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:6001/listings/${id}`);
      setListings((prevListings) =>
        prevListings.filter((listing) => listing.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleNewListingChange = (event) => {
    setNewListing((prevListing) => ({
      ...prevListing,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:6001/listings',
        newListing
      );
      setListings((prevListings) => [...prevListings, response.data]);
      setNewListing({
        description: '',
        image: '',
        location: ''
      });
    } catch (error) {
      console.error(error);
    }
  };

  const sortedListings = [...listings].sort((a, b) =>
    a.location.localeCompare(b.location)
  );

  const filteredListings = sortedListings.filter((listing) =>
    listing.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Greg's List</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newListing.description}
          onChange={handleNewListingChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={newListing.image}
          onChange={handleNewListingChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newListing.location}
          onChange={handleNewListingChange}
        />
        <button type="submit">Add Listing</button>
      </form>

      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
      />

      {filteredListings.map((listing) => (
        <div key={listing.id}>
          <h3>{listing.description}</h3>
          <img src={listing.image} alt={listing.description} />
          <p>{listing.location}</p>
          <button onClick={() => handleFavorite(listing.id)}>
            {listing.favorite ? 'Unfavorite' : 'Favorite'}
          </button>
          <button onClick={() => handleDelete(listing.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Listings;