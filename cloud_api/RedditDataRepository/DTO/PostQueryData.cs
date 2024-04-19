namespace RedditDataRepository.DTO
{
    public class PostQueryData
    {
        public int Page { get; set; } = 1;

        public int PageSize { get; set; } = 5;

        public string Sort { get; set; } = "";

        public string SearchQuery { get; set; } = "";

        public string UserId { get; set; } = "";
    }
}
