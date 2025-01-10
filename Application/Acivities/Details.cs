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
    public class Details
    {
        public class Query : IRequest<Result<ActivityDTO>>
        {
            public Guid Id { get; set; }

        }

        public class Handler : IRequestHandler<Query, Result<ActivityDTO>>
        {
            private readonly DataContext _dbContext;
            private readonly IMapper _mapper;

            public Handler(DataContext dbContext,IMapper mapper)
            {
                _dbContext= dbContext;
                _mapper = mapper;
            }

            public async Task<Result<ActivityDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var obj = await _dbContext.Activities
                    .ProjectTo<ActivityDTO>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(m => m.Id.Equals(request.Id));
                return Result<ActivityDTO>.Success(obj);
               
            }
        }
    }
}
