using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class ActivityAtendees
    {
        public Guid ActivityId { get; set; }
        public Activity Activity { get; set; }
        public string AttendeeId { get; set; }
        public AppUser Attendee { get; set; }
        public bool IsHost { get; set; }
    }
}
