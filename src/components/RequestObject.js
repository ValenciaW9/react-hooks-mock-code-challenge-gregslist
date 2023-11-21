// Inside the Listings component

const handleNewListingSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post(
        'http://localhost:6001/listings',
        {
          description: newListing.description,
          image: newListing.image,
          location: newListing.location
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
  
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