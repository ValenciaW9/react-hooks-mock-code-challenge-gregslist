// Inside the Listings component

const handleNewListingSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:6001/listings', newListing, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const createdListing = response.data;
      setListings((prevListings) => [...prevListings, createdListing]);
  
      // Reset the form inputs
      setNewListing({
        description: '',
        image: '',
        location: ''
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  // JSX code
  
  <form onSubmit={handleNewListingSubmit}>
    <input
      type="text"
      name="description"
      placeholder="Description"
      value={newListing.description}
      onChange={(e) => setNewListing({ ...newListing, description: e.target.value })}
    />
    <input
      type="text"
      name="image"
      placeholder="Image URL"
      value={newListing.image}
      onChange={(e) => setNewListing({ ...newListing, image: e.target.value })}
    />
    <input
      type="text"
      name="location"
      placeholder="Location"
      value={newListing.location}
      onChange={(e) => setNewListing({ ...newListing, location: e.target.value })}
    />
    <button type="submit">Add Listing</button>
  </form>