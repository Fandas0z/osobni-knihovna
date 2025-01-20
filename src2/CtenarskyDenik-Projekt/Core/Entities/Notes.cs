namespace CtenarskyDenik.Core.Entities;

public class Notes
{
    public int NoteId { get; set; }
    public string Content { get; set; }
    public int BookId { get; set; }
    public Books Books { get; set; }


}
