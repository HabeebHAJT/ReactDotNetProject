using Application.Acivities;
using Application.Profiles;
using AutoMapper;
using Domain;


namespace Application.Core
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Activity, Activity>().ReverseMap();
            CreateMap<Activity, ActivityDTO>()
                .ForMember(d => d.HostUsername,
                  o => o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsHost).Attendee.UserName));
                
            CreateMap<ActivityAtendees,AttendeeDTO>()
                .ForMember(d=>d.DisplayName,o=>o.MapFrom(s=>s.Attendee.DisplayName))
                .ForMember(d=>d.Username,o=>o.MapFrom(s=>s.Attendee.UserName))
                .ForMember(d=>d.Bio,o=>o.MapFrom(s=>s.Attendee.Bio))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Attendee.Photos.FirstOrDefault(m => m.IsMain == true).Url));

            CreateMap<AppUser,AttendeeProfile >()
                .ForMember(d=>d.Image,o=>o.MapFrom(s=>s.Photos.FirstOrDefault(m=>m.IsMain==true).Url));
           
        }
    }
}
