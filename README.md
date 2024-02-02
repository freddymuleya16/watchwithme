# Watch With Me

Watch With Me is a web application that allows users to search for movies and view details about them. It is built using ASP.NET Core for the backend and Next.js for the frontend.

## Features

- Movie search by title
- Saving 5 latest search queries
- Showing search results
- Show extended movie information when a particular movie is selected (poster, description, IMDB score, etc.)

## Technologies Used

- **Backend:**
  - ASP.NET Core
  - Entity Framework Core (InMemory Database)
  - OMDB API for movie data

- **Frontend:**
  - Next.js
  - Tailwind CSS

## Getting Started

### Prerequisites

- .NET Core SDK
- Node.js and npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/freddymuleya16/WatchWithMe.git
   cd WatchWithMe
   ```

2. Set up the backend:

   ```bash
   cd WatchWithMeAPI
   dotnet restore
   dotnet run
   ```

   The backend will be running on `https://localhost:7098`.

3. Set up the frontend:

   ```bash
   cd watchwithme
   npm install
   npm run dev
   ```

   The frontend will be running on `http://localhost:3000`.

4. Open your web browser and navigate to `http://localhost:3000` to access the application.

## Project Structure

- **WatchWithMeAPI:** Contains the ASP.NET Core backend.
- **WatchWithMeFrontend:** Contains the Next.js frontend.

## API Endpoints

- `GET /api/movie/search?title={title}`: Search for movies by title.
- `GET /api/movie/{imdbId}`: Get details for a specific movie by IMDB ID.
- `GET /api/movie/history`: Get the 5 latest search queries.

## Additional Notes

- Ensure that CORS is configured on the backend to allow requests from the frontend.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
 