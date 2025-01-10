using Application.Acivities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API;

public class ActivityController : BaseApiController
{

    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return Handlresult(await Mediator.Send(new List.Query()));
    }


 
    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivity(Guid id)
    {
        return Handlresult(await Mediator.Send(new Details.Query { Id = id }));
      
    }

    [HttpPost]
    public async Task<ActionResult<Activity>> CreateActivity(Activity activity)
    {
        return Handlresult(await Mediator.Send(new Create.Command { Activity = activity }));
       
    }

    [Authorize(Policy = "IsActivityHost")]
    [HttpPut("{id}")]
    public async Task<ActionResult<Activity>> EditActivity(Guid id, Activity activity)
    {
        activity.Id = id;
        return Handlresult(await Mediator.Send(new Edit.Command { Activity = activity }));
        
    }

    [Authorize(Policy = "IsActivityHost")]
    [HttpDelete("{id}")]
    public async Task<ActionResult<Activity>> DeleteActivity(Guid id)
    {
       
       return(Handlresult(await Mediator.Send(new Delete.Command { Id = id })));
     
    }

    [HttpPost("{id}/attend")]
    public async Task<ActionResult<Activity>> Attend(Guid id)
    {

        return Handlresult(await Mediator.Send(new UpdateActivity.Command { id = id }));

    }
}
