const fetchListings = async () => {
    try {
      const response = await axios.get('http://localhost:6001/listings');
      setListings(response.data);
    } catch (error) {
      console.error(error);
    }
  };