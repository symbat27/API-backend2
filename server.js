import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const COUNTRY_API_KEY = process.env.COUNTRYLAYER_API_KEY;
const EXCHANGE_API_KEY = process.env.EXCHANGE_API_KEY;
const NEWS_API_KEY = process.env.NEWS_API_KEY;

app.use(express.static("public"));

app.get("/api/random-user", async (req, res) => {
  try {
    const userRes = await axios.get("https://randomuser.me/api/");
    const user = userRes.data.results[0];
    const countryName = user.location.country;

    let countryInfo = {};
    let currencyCode = "";

    try {
      const countryRes = await axios.get(
        `http://api.countrylayer.com/v2/name/${countryName}`,
        {
          params: {
            access_key: COUNTRY_API_KEY,
            fullText: true
          }
        }
      );

      const country = countryRes.data[0];
      currencyCode = country.currencies?.[0]?.code || "";

      countryInfo = {
        name: country.name,
        capital: country.capital,
        languages: country.languages?.map(l => l.name).join(", "),
        currency: country.currencies?.map(c => `${c.name} (${c.code})`).join(", "),
        flag: country.flag
      };
    } catch {
      countryInfo = {
        name: countryName,
        capital: "N/A",
        languages: "N/A",
        currency: "N/A",
        flag: ""
      };
    }

    let exchangeRates = {};
    if (currencyCode) {
      try {
        const exchangeRes = await axios.get(
          `https://v6.exchangerate-api.com/v6/${EXCHANGE_API_KEY}/latest/${currencyCode}`
        );

        exchangeRates = {
          base: currencyCode,
          USD: exchangeRes.data.conversion_rates.USD,
          KZT: exchangeRes.data.conversion_rates.KZT
        };
      } catch {
        exchangeRates = { base: currencyCode, USD: "N/A", KZT: "N/A" };
      }
    }

    let news = [];
    try {
      const newsRes = await axios.get(
        "https://newsapi.org/v2/everything",
        {
          params: {
            q: countryName,
            language: "en",
            pageSize: 5,
            apiKey: NEWS_API_KEY
          }
        }
      );

      news = newsRes.data.articles.map(article => ({
        title: article.title,
        description: article.description || "No description available",
        image: article.urlToImage,
        url: article.url
      }));
    } catch {
      news = [];
    }

    res.json({
      user: {
        firstName: user.name.first,
        lastName: user.name.last,
        gender: user.gender,
        age: user.dob.age,
        city: user.location.city,
        address: `${user.location.street.number} ${user.location.street.name}`,
        profilePicture: user.picture.large
      },
      countryInfo,
      exchangeRates,
      news
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

