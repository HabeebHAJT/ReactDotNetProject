using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Profiles
{
    public class Details
    {

        public class Query: IRequest<Result<AttendeeProfile>>
        {
            public string username { get; set; }

            public Query(string username)
            {
                this.username = username;
            }
        }


        public class Handler : IRequestHandler<Query, Result<AttendeeProfile>>
        {
            private readonly DataContext _dataContext;
            private readonly IMapper _mapper;

            public Handler(DataContext dataContext,IMapper mapper)
            {
                _dataContext = dataContext;
                _mapper = mapper;
                
            }
            async Task<Result<AttendeeProfile>> IRequestHandler<Query, Result<AttendeeProfile>>.Handle(Query request, CancellationToken cancellationToken)
            {
                var user=_dataContext.Users
                    .ProjectTo<AttendeeProfile>(_mapper.ConfigurationProvider)
                    .FirstOrDefault(m=>m.Username==request.username);

                if (user == null) return null;

               
                return Result<AttendeeProfile>.Success(user);

            }
        }

    }
}
