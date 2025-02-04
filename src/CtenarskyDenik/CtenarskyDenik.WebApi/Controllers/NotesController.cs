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
        //Get note by id
        [HttpPost]
        public IActionResult AddNote([FromBody] Note note)
        {
       //Check if the specified BookId exists
            var book = _context.Books.FirstOrDefault(b => b.BookId == note.BookId);
            if (book == null)
            {
                return BadRequest("The specified BookId does not exist.");
            }

           
            note.Book = book;
            //Add the note to the database
            _context.Notes.Add(note);
            _context.SaveChanges();

            return Ok(note);
        }
    }
}
