using Microsoft.AspNetCore.Mvc;
using CtenarskyDenik.Persistence;
using CtenarskyDenik.Core.Entities;

namespace CtenarskyDenik.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController:ControllerBase
    {
        private readonly AppDbContext _context;

        public BooksController(AppDbContext context)
        {
            _context = context;
        }
        //Get all books
        [HttpGet]
        public IActionResult GetBooks()
        {
            var books = _context.Books.ToList();
            return Ok(books);
        }
        //Get book by id
        [HttpPost]
        public IActionResult AddBook([FromBody] Book book)
        {
            _context.Books.Add(book);
            _context.SaveChanges();
            return Ok(book);
        }
        //Delete book by id
        [HttpDelete("{id}")]
        public IActionResult DeleteBook(int id)
        {
            var book = _context.Books.Find(id);
            if (book == null)
            {
                return NotFound(new { Message = "Kniha nebyla nalezena." });
            }

            _context.Books.Remove(book);
            _context.SaveChanges();
            return Ok(new { Message = "Kniha byla úspěšně smazána." });
        }
        //Update book by id
        [HttpPut("{id}")]
        public IActionResult UpdateBook(int id, [FromBody] Book updatedBook)
        {
            var book = _context.Books.Find(id);
            if (book == null)
            {
                return NotFound(new { Message = "Kniha nebyla nalezena." });
            }

            // Aktualizace hodnot knihy
            book.Title = updatedBook.Title;
            book.Author = updatedBook.Author;
            book.Year = updatedBook.Year;

            _context.Books.Update(book);
            _context.SaveChanges();
            return Ok(new { Message = "Kniha byla úspěšně aktualizována.", Book = book });
        }
    }
}
