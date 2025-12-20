Overview

This project integrates multiple APIs to create a dynamic web application that displays data related to a random user. It combines data from:

1. Random User API: Shows random user information(name, gender, age, and location)
2. Countrylayer API: Provides detailed information about the country of the user, like currency, capital, languages.
3. Exchange Rate API: Shows exchange rates to compare the user's local currency with USD and KZT.
4. News API: Retrieves the latest news headlines related to the user's country.

Setup Instructions

To initialize project and create json used: npm init -y
To install dependencies: npm install express axios dotenv

Then created files and packges: public (for files index.html, style.css and script.js), .env - Environment variables(API keys), 
server.js - Server-side code to handle API requests, package.json - Project metadata and dependencies. 

API Usage
1. Random User API:  https://randomuser.me/api/
Data Retrieved:
Name (first and last), gender, age, location (city, street, country), profile picture

2. Countrylayer API: https://manage.countrylayer.com/signup/free
Data Retrieved:
Country name, capital city, official languages, currency (name and code)

3. Exchange Rate API: https://www.exchangerate-api.com/
Data Retrieved:
Conversion rates for USD and KZT based on the user's local currency

4. News API: https://newsapi.org/
Data Retrieved:
News headlines containing the user's country name, article title, image, short description

Key Design Decisions
The user interface has been designed to be simple, clean, and responsive. It adapts to different screen sizes, ensuring a smooth experience on both desktop and mobile devices. This was achieved using media queries in CSS to adjust the layout based on the screen width.
The application includes robust error handling. If any external API fails to respond or returns incomplete data, the application gracefully handles these errors by providing fallback values or displaying a message to the user.

Conclusion

This project demonstrates how multiple APIs can be integrated into a single application to provide dynamic, real-time data for users. By leveraging APIs for random user generation, country information, exchange rates, and news, the project offers a rich set of features with a clean and responsive interface. The use of server-side data fetching ensures that API keys are securely handled, while clear design decisions make the application both functional and easy to use.
