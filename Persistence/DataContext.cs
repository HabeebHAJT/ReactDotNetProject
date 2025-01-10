using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Activity> Activities {get;set;}
        public DbSet<ActivityAtendees> ActivityAtendees {get;set;}


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ActivityAtendees>(x=>x.HasKey(e => new { e.ActivityId, e.AttendeeId }));

            builder.Entity<ActivityAtendees>()
                .HasOne(e => e.Attendee)
                .WithMany(e => e.Activities)
                .HasForeignKey(e => e.AttendeeId);

            builder.Entity<ActivityAtendees>()
              .HasOne(e => e.Activity)
              .WithMany(e => e.Attendees)
              .HasForeignKey(e => e.ActivityId);
        }
    }
}