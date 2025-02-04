using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

using CtenarskyDenik.Core.Entities;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;

namespace CtenarskyDenik.Persistence
{
    public class AppDbContext:DbContext
    {
        public AppDbContext (DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Book> Books { get; set; }
        public DbSet<Note> Notes { get; set; }
      

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Note>()
                .HasOne(x => x.Book)
                .WithMany(x => x.Notes)
                .HasForeignKey(x => x.BookId);


         
           
            base.OnModelCreating(modelBuilder);
        }
    }
}
