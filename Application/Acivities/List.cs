using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
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
    public class List
    {
        public class Query : IRequest<Result<List<ActivityDTO>>>
        { }

        public class Handler : IRequestHandler<Query, Result<List<ActivityDTO>>>
        {
            private readonly DataContext _dbContext;
            public IMapper _mapper { get; }
            public Handler(DataContext dbContext,IMapper mapper)
            {
                _dbContext= dbContext;
                _mapper = mapper;
            }

            

            public async Task<Result<List<ActivityDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var list = await _dbContext.Activities
                    .ProjectTo<ActivityDTO>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

               

                return Result<List<ActivityDTO>>.Success(list);
            }
        }
    }
}
