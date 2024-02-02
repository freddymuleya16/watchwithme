using Microsoft.AspNetCore.Mvc;
using WatchWithMeAPI.Data;
using WatchWithMeAPI.Models;

namespace WatchWithMeAPI.Controllers
{
    // Controllers/MovieController.cs
    [ApiController]
    [Route("api/[controller]")]
    public class MovieController : ControllerBase
    {
        private readonly AppDbContext _dbContext;
        private readonly string omdbApiKey = "f1beb719";  

        public MovieController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchMovie(string title)
        {
            if (string.IsNullOrWhiteSpace(title))
            {
                return BadRequest("Title cannot be empty");
            }

            // Implement OMDB API integration to search movies by title
            string omdbApiUrl = $"http://www.omdbapi.com/?s={title}&apikey={omdbApiKey}";

            using (HttpClient httpClient = new HttpClient())
            {
                try
                {
                    HttpResponseMessage response = await httpClient.GetAsync(omdbApiUrl);

                    if (response.IsSuccessStatusCode)
                    {
                        string responseData = await response.Content.ReadAsStringAsync();
                        // Save search history
                        var searchHistory = new SearchHistory { Query = title, SearchTime = DateTime.Now };
                        _dbContext.SearchHistory.Add(searchHistory);
                        await _dbContext.SaveChangesAsync();

                        return Ok(responseData); // You may want to parse and return specific data here
                    }
                    else
                    {
                        return BadRequest($"Error: {response.StatusCode} - {response.ReasonPhrase}");
                    }
                }
                catch (HttpRequestException ex)
                {
                    return BadRequest($"Request error: {ex.Message}");
                }
            }
        }
        [HttpGet("{imdbId}")]
        public async Task<IActionResult> GetMovieDetails(string imdbId)
        {
            if (string.IsNullOrWhiteSpace(imdbId))
            {
                return BadRequest("IMDB ID cannot be empty");
            }

            // Implement OMDB API integration to get details for a single movie by IMDB ID
            string omdbApiUrl = $"http://www.omdbapi.com/?i={imdbId}&apikey={omdbApiKey}";

            using (HttpClient httpClient = new HttpClient())
            {
                try
                {
                    HttpResponseMessage response = await httpClient.GetAsync(omdbApiUrl);

                    if (response.IsSuccessStatusCode)
                    {
                        string responseData = await response.Content.ReadAsStringAsync();
                        return Ok(responseData); 
                    }
                    else
                    {
                        return BadRequest($"Error: {response.StatusCode} - {response.ReasonPhrase}");
                    }
                }
                catch (HttpRequestException ex)
                {
                    return BadRequest($"Request error: {ex.Message}");
                }
            }
        }

        [HttpGet("history")]
        public IActionResult GetSearchHistory()
        {
            var history = _dbContext.SearchHistory.OrderByDescending(h => h.SearchTime).Take(5);
            return Ok(history);
        }
    }
}