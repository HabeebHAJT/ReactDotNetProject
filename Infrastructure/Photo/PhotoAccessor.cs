using Application.Interfaces;
using Application.Photo;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Photo
{
    public class PhotoAccessor : IPhotoAccesor
    {
        private readonly Cloudinary cloudinary;
        public PhotoAccessor(IOptions<CloudinarySettings> config)
        {
            var accpunt = new Account(
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
                );

            cloudinary = new Cloudinary(accpunt);
        }
        public async Task<PhotoUploadResult> AddPhoto(IFormFile File)
        {
            if (File.Length>0)
            {
                await using var stream= File.OpenReadStream();
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(File.FileName, stream),
                    Transformation=new Transformation().Height(500).Width(500).Crop("fill")
                   
                };

                var uploadresult= await cloudinary.UploadAsync(uploadParams);

                if(uploadresult.Error !=null)
                {
                    throw new Exception(uploadresult.Error.Message);
                }

                return new PhotoUploadResult
                {
                    PublicID = uploadresult.PublicId,
                    Url = uploadresult.SecureUri.ToString(),
                };
            }

            return null;
        }

        public async Task<string> DeletePhoto(string PublicID)
        {
            var deleteparam=new DeletionParams(PublicID);
            var result=await cloudinary.DestroyAsync(deleteparam);

            return result.Result=="ok"?result.Result:null;
        }
    }
}
