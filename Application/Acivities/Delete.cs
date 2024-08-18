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
        public class Command : IRequest
        {
            public Guid Id { get; set; }

        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _dbContext;
            public Handler(DataContext dbContext)
            {
                _dbContext= dbContext;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var model = await _dbContext.Activities.FindAsync(request.Id);
                _dbContext.Activities.Remove(model);
                _dbContext.SaveChanges();
            }
        }
    }
}
