using Microsoft.EntityFrameworkCore;
using CtenarskyDenik.Core.Entities;
namespace CtenarskyDenik.Persistence
{
    public class AppDbContext:DbContext
    {
        public AppDbContext (DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Books> Books { get; set; }
        public DbSet<Notes> Notes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Notes>()
                .HasOne(n => n.Books)
                .WithMany(b => b.Notes)
                .HasForeignKey(n => n.BookId);
        }
    }
}
