﻿using CtenarskyDenik.Core.Entities;
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
            var notes = _context.Notes
                .Include(n => n.Book)
                .Select(n => new
                {
                    NoteId = n.NoteId,
                    BookId = n.BookId, 
                    Content = n.Content
                })
                .ToList();

            return Ok(notes);
        }
        // Add note
        [HttpPost]
        public IActionResult AddNote([FromBody] Note note)
        {
            if (note == null || string.IsNullOrWhiteSpace(note.Content))
            {
                return BadRequest(new { message = "Invalid note data." });
            }

            var book = _context.Books.FirstOrDefault(b => b.BookId == note.BookId);
            if (book == null)
            {
                return BadRequest(new { message = "The specified BookId does not exist." });
            }

            note.Book = book;
            _context.Notes.Add(note);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetNotes), new { id = note.NoteId }, note);
        }
        // Get notes for a specific book
        [HttpGet("{bookId}")]
        public IActionResult GetNotesForBook(int bookId)
        {
            var notes = _context.Notes
                .Where(n => n.BookId == bookId) // Filter notes by bookId
                .Select(n => new
                {
                    NoteId = n.NoteId,
                    BookId = n.BookId,
                    Content = n.Content
                })
                .ToList();

            if (!notes.Any())
            {
                return NotFound(new { message = "No notes found for this book." });
            }

            return Ok(notes);
        }
        // Update note
        [HttpPut("{noteId}")]
        public IActionResult UpdateNote(int noteId, [FromBody] Note updatedNote)
        {
            var note = _context.Notes.Find(noteId);
            if (note == null)
            {
                return NotFound(new { message = "Poznámka nebyla nalezena." });
            }

            if (string.IsNullOrWhiteSpace(updatedNote.Content))
            {
                return BadRequest(new { message = "Obsah poznámky nemůže být prázdný." });
            }

            note.Content = updatedNote.Content;
            _context.Notes.Update(note);
            _context.SaveChanges();

            return Ok(new
            {
                note.NoteId,
                note.BookId, // Přidáno, aby Vuex měl správná data
                note.Content
            });
        }
        // Delete note
        [HttpDelete("{noteId}")]
        
        public IActionResult DeleteNote(int noteId)
        {
            // Find the note by its ID
            var note = _context.Notes.FirstOrDefault(n => n.NoteId == noteId);
            if (note == null)
            {
                return NotFound(new { message = "Poznámka nenalezena." });
            }
            
            _context.Notes.Remove(note);
            _context.SaveChanges();

            return Ok(new { message = "Poznámka byla úspěšně smazána." });
        }

    }
}
