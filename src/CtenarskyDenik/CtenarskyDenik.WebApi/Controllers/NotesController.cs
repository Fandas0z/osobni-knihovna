using CtenarskyDenik.Core.Entities;
using CtenarskyDenik.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CtenarskyDenik.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotesController : ControllerBase
    {
        private readonly AppDbContext _context;
        
        public NotesController(AppDbContext context)
        {
            _context = context;
        }
        //Get all notes
        [HttpGet]
        public IActionResult GetNotes()
        {
            var notes = _context.Notes.Include(n => n.Book).ToList(); 
            return Ok(notes);
        }
        [HttpPost]
        public IActionResult AddNote([FromBody] Note note)
        {
            // Zkontrolujeme, zda je model platný (např. validace anotací na modelu)
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Zkontrolujeme, zda existuje kniha s daným BookId
            var book = _context.Books.FirstOrDefault(b => b.BookId == note.BookId);
            if (book == null)
            {
                return BadRequest(new { message = "The specified BookId does not exist." });
            }

            // Přidáme poznámku ke knize
            note.Book = book;
            _context.Notes.Add(note);
            _context.SaveChanges();

            // Vrátíme úspěšnou odpověď s přidanou poznámkou
            return CreatedAtAction(nameof(AddNote), new { id = note.NoteId }, note);
        }
    }
}
