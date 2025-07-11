// main.js
fetch('travel_recommendation_api.json')
  .then(response => {
    if (!response.ok) {
      throw new Error("Could not load data");
    }
    return response.json();
  })
  .then(data => {
    console.log("Fetched Data ✅", data); // ✅ check in console first
    showRecommendations(data);
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });

// Function to display recommendations
function showRecommendations(data) {
  const resultsDiv = document.getElementById('results');
  
  data.countries.forEach(country => {
    country.cities.forEach(city => {
      const cityCard = document.createElement('div');
      cityCard.className = 'city-card';

      cityCard.innerHTML = `
        <img src="${city.imageUrl}" alt="${city.name}">
        <h3>${city.name}</h3>
        <p>${city.description}</p>
      `;

      resultsDiv.appendChild(cityCard);
    });
  });
}
