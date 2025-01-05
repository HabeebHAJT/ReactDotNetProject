using Application.Acivities;
using Domain;
using MediatR;
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

    [HttpPut]
    public async Task<ActionResult<Activity>> EditActivity(Activity activity)
    {

        return Handlresult(await Mediator.Send(new Edit.Command { Activity = activity }));
        
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Activity>> DeleteActivity(Guid id)
    {
       
       return(Handlresult(await Mediator.Send(new Delete.Command { Id = id })));
     
    }
}
