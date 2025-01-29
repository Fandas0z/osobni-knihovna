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

        [HttpGet]
        public IActionResult GetNotes()
        {
            var notes = _context.Notes.Include(n => n.Book).ToList(); // Načítání Notes s vazbou na Book.
            return Ok(notes);
        }

        [HttpPost]
        public IActionResult AddNote([FromBody] Note note)
        {
            // Ověř, zda existuje kniha s daným BookId.
            var book = _context.Books.FirstOrDefault(b => b.BookId == note.BookId);
            if (book == null)
            {
                return BadRequest("The specified BookId does not exist.");
            }

            // Přiděl knihu k poznámce.
            note.Book = book;

            // Ulož poznámku do databáze.
            _context.Notes.Add(note);
            _context.SaveChanges();

            return Ok(note);
        }
    }
}
