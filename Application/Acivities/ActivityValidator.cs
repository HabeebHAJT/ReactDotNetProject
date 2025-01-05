using Domain;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Acivities
{
    public class ActivityValidator:AbstractValidator<Activity>
    {
        public ActivityValidator()
        {
            RuleFor(m=>m.City).NotEmpty();
            RuleFor(m=>m.Venue).NotEmpty();
            RuleFor(m=>m.Title).NotEmpty();
            RuleFor(m=>m.Category).NotEmpty();
            RuleFor(m=>m.Date).NotEmpty();
            RuleFor(m=>m.Description).NotEmpty();
          
        }
    }
}
