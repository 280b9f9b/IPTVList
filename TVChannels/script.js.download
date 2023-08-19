const channelContainer = document.getElementById('channel-container');
const searchInput = document.getElementById('search-input');

let channels = [];

// Fetch channels from JSON file
fetch('data/ch.json')
  .then(response => response.json())
  .then(data => {
    channels = data;
    renderChannels(channels);
  })
  .catch(error => console.error('Error fetching channels:', error));

// Render channels based on current state
const renderChannels = (channels) => {
  channelContainer.innerHTML = '';

  channels.forEach((channel) => {
    const card = document.createElement('div');
    card.classList.add('channel-card');

    const link = document.createElement('a');
    link.href = channel.Link; // Update property name to match JSON file
    link.target = '_blank';
    link.rel = 'noopener noreferrer';

    const image = document.createElement('img');
    image.src = channel.ArtworkIcons; // Update property name to match JSON file

    // Check if m3u link is dead
    fetch(channel.M3U) // Update property name to match JSON file
      .then(response => {
        if (response.ok) {
          // If m3u link is OK, set full opacity for image and name
          image.style.opacity = 1;
          title.style.color = 'white';
        } else {
          // If m3u link is dead, set 50% opacity for image and red color for name
          image.style.opacity = 0.1;
          title.style.color = 'red';
        }
      })
      .catch(error => console.error('Error checking m3u link:', error));

    link.appendChild(image);
    card.appendChild(link);

    const title = document.createElement('h2');
    title.textContent = channel.Name; // Update property name to match JSON file
    card.appendChild(title);

    const categories = document.createElement('p');
    categories.textContent = `${channel.Category}`; // Update property name to match JSON file
    card.appendChild(categories);

    channelContainer.appendChild(card);

    image.addEventListener('click', () => {
      window.location.href = channel.Link; // Update property name to match JSON file
    });
  });
};

// Filter channels based on search keyword
const filterChannelsBySearch = (keyword) => {
  const filteredChannels = channels.filter((channel) => {
    const channelName = channel.Name.toLowerCase(); // Update property name to match JSON file
    const channelCategory = channel.Category.toLowerCase(); // Update property name to match JSON file
    const searchKeyword = keyword.toLowerCase();
    return channelName.includes(searchKeyword) || channelCategory.includes(searchKeyword);
  });
  renderChannels(filteredChannels);
};

// Handle search input events
searchInput.addEventListener('input', (event) => {
  const keyword = event.target.value;
  filterChannelsBySearch(keyword);
});

// Error handling
try {
  // Fetch channels from JSON file
  fetch('data/ch.json')
    .then(response => response.json())
    .then(data => {
      channels = data;
      renderChannels(channels);
    })
    .catch(error => console.error('Error fetching channels:', error));
} catch (error) {
  console.error('Error loading channels:', error);
}

// Comments
// This function fetches the channels from the JSON file and stores them in the `channels` variable.
// This function renders the channels on the page.
// This function filters the channels based on the search keyword.
// This function handles the search input events.
// This function handles errors that might occur when fetching the channels from the JSON file.