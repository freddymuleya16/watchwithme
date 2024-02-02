namespace WatchWithMeAPI.Models
{
    public class SearchHistory
    {
        public int Id { get; set; }
        public string Query { get; set; }
        public DateTime SearchTime { get; set; }
    }
}