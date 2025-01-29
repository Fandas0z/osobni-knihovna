using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
namespace CtenarskyDenik.Core.Entities
{
    public class Note
    {
        public int NoteId { get; set; }
        public string Content { get; set; }
        public int BookId { get; set; }

        [ForeignKey("BookId")]
        public Book? Book { get; set; }
        



    }
}
