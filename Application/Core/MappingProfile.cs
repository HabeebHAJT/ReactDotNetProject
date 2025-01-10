using Application.Acivities;
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
                
            CreateMap<ActivityAtendees, Profiles.AttendeeProfile>()
                .ForMember(d=>d.DisplayName,o=>o.MapFrom(s=>s.Attendee.DisplayName))
                .ForMember(d=>d.Username,o=>o.MapFrom(s=>s.Attendee.UserName))
                .ForMember(d=>d.Bio,o=>o.MapFrom(s=>s.Attendee.Bio));
           
        }
    }
}
