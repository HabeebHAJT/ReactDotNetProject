using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace Application.Acivities
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }

        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator() { 
            
               RuleFor(c => c.Activity).SetValidator(new ActivityValidator());
            }
        }

        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
            private readonly DataContext _dbContext;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext dbContext,IUserAccessor userAccessor)
            {
                _dbContext= dbContext;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {

                var user = _dbContext.Users.FirstOrDefault(m => m.UserName == _userAccessor.GetUsername());

                var attendee = new ActivityAtendees
                {
                    Activity = request.Activity,
                    Attendee = user,
                    IsHost = true
                };

                request.Activity.Attendees.Add(attendee);

                await _dbContext.Activities.AddAsync(request.Activity);

               var changes=_dbContext.SaveChanges();

                if(changes<=0)
                {
                    return Result<Unit>.Failure("failed to create activity");
                }
                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}
