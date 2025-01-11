using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photo
{
    public class SetMain
    {

        public class Command: IRequest<Result<Unit>>
        {
            public string Id { get; set; }

            public Command(string Id)
            {
                this.Id = Id;   
            }
        }


        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _dataContext;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext dataContext, IUserAccessor userAccessor)
            {
                _dataContext = dataContext;
                _userAccessor = userAccessor;
            }
            async Task<Result<Unit>> IRequestHandler<Command, Result<Unit>>.Handle(Command request, CancellationToken cancellationToken)
            {
                var user=_dataContext.Users
                    .Include(m=>m.Photos)
                    .FirstOrDefault(m=>m.UserName==_userAccessor.GetUsername());

                if (user == null) return null;

                var photo= user.Photos.FirstOrDefault(m=>m.Id==request.Id);
                if (photo == null) return null;

                user.Photos.FirstOrDefault(m => m.IsMain == true).IsMain=false;
                photo.IsMain=true;

                var result=await _dataContext.SaveChangesAsync()>0;
                if (result) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Unable to set main property of image from API");

            }
        }

    }
}
