const createListing = async (listingData) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(listingData)
      });
  
      if (!response.ok) {
        throw new Error('Failed to create listing');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
  
  // Usage
  const listingData = {
    title: 'New Listing',
    description: 'This is a new listing'
  };
  
  createListing(listingData)
    .then((data) => {
      console.log('Listing created successfully:', data);
    })
    .catch((error) => {
      console.error('Error creating listing:', error);
    });