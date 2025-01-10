using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Security
{
    public class IHostRequirments : IAuthorizationRequirement
    {
    }

    public class IsHostRequirmentHandler : AuthorizationHandler<IHostRequirments>
    {
        private readonly DataContext dbContext;
        private readonly IHttpContextAccessor httpContextAccessor;

        public IsHostRequirmentHandler(DataContext dbContext,IHttpContextAccessor httpContextAccessor )
        {
            this.dbContext = dbContext;
            this.httpContextAccessor = httpContextAccessor;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IHostRequirments requirement)
        {
           var userid=context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userid == null) return Task.CompletedTask;

            var activityid = Guid.Parse(
                httpContextAccessor.HttpContext?.Request.RouteValues.SingleOrDefault(m => m.Key == "id").Value?.ToString()
                );
            if (activityid == null) return Task.CompletedTask;

            var attendees = dbContext.ActivityAtendees
                .AsNoTracking()
                .FirstOrDefault(m => m.ActivityId == activityid && m.AttendeeId == userid);

            if (attendees == null) return Task.CompletedTask;
            if (attendees.IsHost)
            {
                context.Succeed(requirement);
            }
            return Task.CompletedTask;
        }
    }
}
