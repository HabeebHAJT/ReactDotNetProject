using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Acivities
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }

        }

        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
            private readonly DataContext _dbContext;
            public Handler(DataContext dbContext)
            {
                _dbContext= dbContext;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var model = await _dbContext.Activities.FindAsync(request.Id);
                if (model == null)
                    return null;
                _dbContext.Activities.Remove(model);
                var isChange=await _dbContext.SaveChangesAsync()>0;
                if (!isChange)
                    return Result<Unit>.Failure("Failed to delete");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
