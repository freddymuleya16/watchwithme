using System.Collections.Generic;
using WatchWithMeAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace WatchWithMeAPI.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<SearchHistory> SearchHistory { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
    }
}