using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
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
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            
            public Activity Activity { get; set; }

        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {

                RuleFor(c => c.Activity).SetValidator(new ActivityValidator());
            }
        }

        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
            private readonly DataContext _dbContext;
            private readonly IMapper _mapper;
            public Handler(DataContext dbContext,IMapper mapper)
            {
                _dbContext= dbContext;
                _mapper=mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var model = await _dbContext.Activities.FindAsync(request.Activity.Id);
                if (model == null) { return null; }

                _mapper.Map(request.Activity,model);

                _dbContext.Activities.Update(model);

               var change= await _dbContext.SaveChangesAsync()>0;
                if (!change)
                   return Result<Unit>.Failure("Failed to update");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
