const button = document.getElementById("fetchUserBtn");
const userCard = document.getElementById("userCard");

button.addEventListener("click", async () => {
  userCard.style.display = "block";
  userCard.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch("/api/random-user");
    const data = await res.json();

    const newsHTML = data.news.length
      ? data.news.map(article => `
          <div class="news-card">
            ${article.image ? `<img src="${article.image}">` : ""}
            <h5>${article.title}</h5>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read full article</a>
          </div>
        `).join("")
      : "<p>No news available</p>";

    userCard.innerHTML = `
      <img src="${data.user.profilePicture}">
      <p><strong>Name:</strong> ${data.user.firstName} ${data.user.lastName}</p>
      <p><strong>Gender:</strong> ${data.user.gender}</p>
      <p><strong>Age:</strong> ${data.user.age}</p>
      <p><strong>City:</strong> ${data.user.city}</p>
      <p><strong>Address:</strong> ${data.user.address}</p>

      <hr>

      <h3>Country Information</h3>
      <p><strong>Country:</strong> ${data.countryInfo.name}</p>
      <p><strong>Capital:</strong> ${data.countryInfo.capital}</p>
      <p><strong>Languages:</strong> ${data.countryInfo.languages}</p>
      <p><strong>Currency:</strong> ${data.countryInfo.currency}</p>

      <h4>Exchange Rates</h4>
      <p>1 ${data.exchangeRates.base} = ${data.exchangeRates.USD} USD</p>
      <p>1 ${data.exchangeRates.base} = ${data.exchangeRates.KZT} KZT</p>

      <hr>

      <h3>Latest News</h3>
      ${newsHTML}
    `;
  } catch {
    userCard.innerHTML = "<p style='color:red'>Failed to load data</p>";
  }
});




