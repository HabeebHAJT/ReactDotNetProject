using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photo
{
    public class Delete
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
            private readonly IPhotoAccesor _photoAccesor;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext dataContext,IPhotoAccesor photoAccesor, IUserAccessor userAccessor)
            {
                _dataContext = dataContext;
                _photoAccesor = photoAccesor;
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

                if(photo.IsMain) return Result<Unit>.Failure("Unble to delete the main photo");


                var photoUploadResult = await _photoAccesor.DeletePhoto(photo.Id);

                if(photoUploadResult==null) return Result<Unit>.Failure("Unble to delete the main photo from cloud");

                user.Photos.Remove(photo);

                var result=await _dataContext.SaveChangesAsync()>0;
                if (result) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Unable to delete file from API");

            }
        }

    }
}
