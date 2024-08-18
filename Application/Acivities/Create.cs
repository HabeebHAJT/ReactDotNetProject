using Domain;
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
    public class Create
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }

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
               await _dbContext.Activities.AddAsync(request.Activity);

               _dbContext.SaveChanges();
            }
        }
    }
}
