🐾 Pet Choice

WEB700 Project Part 2

Team Members
Devkumar Manishkumar Patel 
Ebuka Precious Akaegbusi
Project Description

Pet Choice is a web application developed using Node.js, Express.js, and EJS. The application allows users to browse, search, and view detailed information about different cat breeds.

Unlike Project Part 1, which consumed data directly from The Cat API, Project Part 2 uses a local JSON dataset (breeds.json). The application dynamically renders web pages using Express routes and EJS templates while also exposing REST API endpoints.

Features
🐱 Browse all cat breeds
🔍 Search breeds by name, origin, temperament, coat type, and tags
📖 View detailed information for each breed
🌍 Display breed origin, lifespan, weight, coat type, grooming level, temperament, description, and tags
📄 Dynamic web pages using EJS templates
📦 REST API endpoints returning JSON
⚠️ Custom 404 error page
🎨 Responsive user interface
Technologies Used
Node.js
Express.js
EJS
HTML5
CSS3
JavaScript (ES6)
JSON
Project Structure
PetChoice-Part2
│
├── server.js
├── package.json
├── README.md
│
├── data
│   └── breeds.json
│
├── public
│   ├── css
│   │   └── style.css
│   └── images
│       └── banner-image.png
│
├── views
│   ├── index.ejs
│   ├── about.ejs
│   ├── breeds.ejs
│   ├── breed.ejs
│   ├── search.ejs
│   ├── error.ejs
│   └── partials
│       ├── header.ejs
│       ├── navbar.ejs
│       └── footer.ejs
Application Routes
Route	Description
/	Home page
/about	About page
/breeds	Display all cat breeds
/breeds/:id	Display a single breed
/search	Search page
POST /search	Search cat breeds
/api/breeds	Return all breeds in JSON format
/api/breeds/:id	Return one breed in JSON format
Installation

Clone the repository:

git clone <repository-url>

Navigate to the project folder:

cd PetChoice-Part2

Install dependencies:

npm install

Run the application:

npm start

Open your browser:

http://localhost:5500
Dataset

This project uses a local JSON dataset named breeds.json.

Each record contains:

Breed ID
Breed Name
Origin
Temperament
Description
Image URL
Lifespan
Weight
Coat Type
Grooming Level
Tags
API Endpoints
Get all breeds
GET /api/breeds

Returns every cat breed in JSON format.

Get a single breed
GET /api/breeds/:id

Returns one breed based on its unique ID.

Search Functionality

The application allows users to search by:

Breed Name
Origin
Temperament
Coat Type
Tags

The search is implemented using Express, EJS, and JavaScript's filter() method.

Project Highlights
Local JSON dataset
Express.js routing
EJS template rendering
Dynamic pages
Search functionality
REST API
Responsive design
Custom 404 error page
Reusable partial templates
Future Improvements
User authentication
Favorite breeds
MongoDB database integration
Advanced filtering and sorting
User reviews and ratings
Multiple pet categories
Author


Seneca Polytechnic

WEB700 – Web Programming

License

This project was developed for educational purposes as part of the WEB700 course at Seneca Polytechnic.
