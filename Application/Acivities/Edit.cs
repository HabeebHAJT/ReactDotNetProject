using AutoMapper;
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
    public class Edit
    {
        public class Command : IRequest
        {
            
            public Activity Activity { get; set; }

        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _dbContext;
            private readonly IMapper _mapper;
            public Handler(DataContext dbContext,IMapper mapper)
            {
                _dbContext= dbContext;
                _mapper=mapper;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var model = await _dbContext.Activities.FindAsync(request.Activity.Id);

                _mapper.Map(request.Activity,model);

                _dbContext.Activities.Update(model);

               _dbContext.SaveChanges();
            }
        }
    }
}
