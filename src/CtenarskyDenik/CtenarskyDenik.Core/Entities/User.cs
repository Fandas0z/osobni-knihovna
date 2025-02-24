using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CtenarskyDenik.Core.Entities
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string PasswordHash { get; set; }

        public ICollection<Book> Books { get; set; } = new List<Book>();
        public ICollection<Note> Notes { get; set; } = new List<Note>();
    }
}
