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
    public class Details
    {
        public class Query : IRequest<Activity>
        {
            public Guid Id { get; set; }

        }

        public class Handler : IRequestHandler<Query, Activity>
        {
            private readonly DataContext _dbContext;
            public Handler(DataContext dbContext)
            {
                _dbContext= dbContext;
            }

            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _dbContext.Activities.FindAsync(request.Id);
            }
        }
    }
}
