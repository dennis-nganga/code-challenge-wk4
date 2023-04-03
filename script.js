// Select the movie details elements
const poster = document.querySelector('#poster');
const title = document.querySelector('#title');
const runtime = document.querySelector('#runtime');
const showtime = document.querySelector('#showtime');
const availableTickets = document.querySelector('#available-tickets');
const buyButton = document.querySelector('#buy-ticket');

// Fetch film data for all movies
fetch('http://localhost:3000/movies')
  .then(response => response.json())
  .then(data => {
    // Populate film menu with movie titles
    const filmsList = document.querySelector('#films');
    data.forEach(movie => {
      const listItem = document.createElement('li');
      listItem.classList.add('film', 'item');
      listItem.textContent = movie.title;
      filmsList.appendChild(listItem);
  
      // Add click event listener to each movie in menu
      listItem.addEventListener('click', () => {
        // Display selected movie details
        poster.style.backgroundImage = `url(${movie.poster})`;
        title.textContent = movie.title;
        runtime.textContent = movie.runtime;
        showtime.textContent = movie.showtime;

        // Calculate and display number of available tickets
        const ticketsAvailable = movie.capacity - movie.tickets_sold;
        availableTickets.textContent = ticketsAvailable;
  
        // Disable button and mark movie as sold out if tickets are sold out
        if (ticketsAvailable === 0) {
          buyButton.disabled = true;
          buyButton.textContent = 'Sold Out';
          listItem.classList.add('sold-out');
        } else {
          buyButton.disabled = false;
          buyButton.textContent = 'Buy Ticket';
          listItem.classList.remove('sold-out');
        }
      });
    });
  })
  .catch(error => console.error(error));

// Add click event listener to buy ticket button
buyButton.addEventListener('click', () => {
  // Reduce available tickets and update display
  const currentTicketsAvailable = parseInt(availableTickets.textContent);
  const newTicketsAvailable = currentTicketsAvailable - 1;
  availableTickets.textContent = newTicketsAvailable;
  
  // Update button text and disable if sold out
  if (newTicketsAvailable === 0) {
    buyButton.disabled = true;
    buyButton.textContent = 'Sold Out';
    const selectedItem = document.querySelector('.selected');
    selectedItem.classList.add('sold-out');
  } else {
    buyButton.textContent = 'Buy Ticket';
  }
});
