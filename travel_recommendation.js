let travelData = {};

// Fetch the JSON data once
fetch('travel_recommendation_api.json')
  .then(response => {
    if (!response.ok) throw new Error("Failed to load data");
    return response.json();
  })
  .then(data => {
    travelData = data;
    showAll(); // optional: show all initially
  })
  .catch(err => console.error("Fetch Error:", err));

// SEARCH FUNCTION
function search() {
  const keyword = document.getElementById("searchInput").value.toLowerCase().trim();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = ""; // Clear old results

  if (!keyword) {
    alert("Please enter a keyword!");
    return;
  }

  let matches = [];

  if (keyword.includes("beach")) {
    matches = travelData.beaches.slice(0, 2); // at least 2
  } else if (keyword.includes("temple")) {
    matches = travelData.temples.slice(0, 2); // at least 2
  } else {
    // Assume it's a country
    const country = travelData.countries.find(c => c.name.toLowerCase().includes(keyword));
    if (country) {
      matches = country.cities.slice(0, 2); // first 2 cities
    }
  }

  if (matches.length > 0) {
    matches.forEach(place => {
      const card = document.createElement("div");
      card.className = "city-card";
      card.innerHTML = `
        <img src="${place.imageUrl}" alt="${place.name}">
        <h3>${place.name}</h3>
        <p>${place.description}</p>
      `;
      resultsDiv.appendChild(card);
    });
  } else {
    resultsDiv.innerHTML = `<p style="color:white;">No results found for "${keyword}".</p>`;
  }
}

// RESET FUNCTION
function reset() {
  document.getElementById("searchInput").value = "";
  showAll();
}

// Show everything (optional)
function showAll() {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  [...travelData.beaches, ...travelData.temples].forEach(place => {
    const card = document.createElement("div");
    card.className = "city-card";
    card.innerHTML = `
      <img src="${place.imageUrl}" alt="${place.name}">
      <h3>${place.name}</h3>
      <p>${place.description}</p>
    `;
    resultsDiv.appendChild(card);
  });

  travelData.countries.forEach(country => {
    country.cities.forEach(city => {
      const card = document.createElement("div");
      card.className = "city-card";
      card.innerHTML = `
        <img src="${city.imageUrl}" alt="${city.name}">
        <h3>${city.name}</h3>
        <p>${city.description}</p>
      `;
      resultsDiv.appendChild(card);
    });
  });
}
function reset() {
    // Clear the input field
    document.getElementById("searchInput").value = "";
  
    // Clear the result cards
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
  
    // Optional: show all default data again
    // Uncomment the line below if you want it to reload all destinations after reset:
    // showAll();
  }
  