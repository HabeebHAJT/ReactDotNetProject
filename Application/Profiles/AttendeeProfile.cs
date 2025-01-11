﻿using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Profiles
{
    public class AttendeeProfile
    {
        public string DisplayName { get; set; }
        public string? Bio { get; set; }
        public string Username { get; set; }
        public string Image { get; set; }

        public ICollection<Domain.Photo> Photos { get; set; }   

    }
}
