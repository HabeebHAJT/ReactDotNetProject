using Application.Core;
using Application.Interfaces;
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

namespace Application.Photo
{
    public class Add
    {

        public class Command: IRequest<Result<Domain.Photo>>
        {
            public IFormFile File { get; set; }
        }


        public class Handler : IRequestHandler<Command, Result<Domain.Photo>>
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
            async Task<Result<Domain.Photo>> IRequestHandler<Command, Result<Domain.Photo>>.Handle(Command request, CancellationToken cancellationToken)
            {
                var user=_dataContext.Users
                    .Include(m=>m.Photos)
                    .FirstOrDefault(m=>m.UserName==_userAccessor.GetUsername());

                if (user == null) return null;

                var photoUploadResult = await _photoAccesor.AddPhoto(request.File);

                var photo = new Domain.Photo
                {
                    Id = photoUploadResult.PublicID,
                    Url = photoUploadResult.Url,
                };

                photo.IsMain = user.Photos.Any(m=>m.IsMain==true)?false:true;

                user.Photos.Add(photo);

                var result=await _dataContext.SaveChangesAsync()>0;
                if (result) return Result<Domain.Photo>.Success(photo);

                return Result<Domain.Photo>.Failure("Unable to add file");

            }
        }

    }
}
