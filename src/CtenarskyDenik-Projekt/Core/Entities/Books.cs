namespace CtenarskyDenik.Core.Entities;

    public class Books
    {
        public int BookId { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public ICollection<Notes> Notes { get; set; } = new List<Notes>();
        
    }

