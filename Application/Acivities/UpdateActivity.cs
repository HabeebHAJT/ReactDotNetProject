using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Acivities
{
    public class UpdateActivity
    {
        public class Command : IRequest<Result<Unit>>
        {

            public Guid  id { get; set; }

        }

        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

           async Task<Result<Unit>> IRequestHandler<Command, Result<Unit>>.Handle(Command request, CancellationToken cancellationToken)
           {
                var activity = await _context.Activities
                     .Include(m => m.Attendees)
                     .ThenInclude(m => m.Attendee)
                     .SingleOrDefaultAsync(m => m.Id == request.id);

                if (activity == null) return null;

                var user = await _context.Users
                   .FirstOrDefaultAsync(m => m.UserName == _userAccessor.GetUsername());

                if (user == null) return null;

                var HostUsername = activity.Attendees.FirstOrDefault(m => m.IsHost == true)?.Attendee.UserName;

                var Attendance = activity.Attendees.FirstOrDefault(m => m.Attendee.UserName == user.UserName);
                

                if (Attendance != null && HostUsername == user.UserName)
                {
                    activity.IsCancelled=!activity.IsCancelled;

                }
                if (Attendance != null && HostUsername != user.UserName)
                {
                    activity.Attendees.Remove(Attendance);

                }
                if (Attendance == null)
                {
                    activity.Attendees.Add(
                        new Domain.ActivityAtendees
                        {
                            Activity = activity,
                            Attendee=user,
                            IsHost=false
                        }
                        );

                }

                var changes=await _context.SaveChangesAsync()>0;

                return changes ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Unable to add attendance");

            }
        }
    }
}
