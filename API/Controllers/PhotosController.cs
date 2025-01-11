using Application.Photo;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace API;

public class PhotosController : BaseApiController
{


    [HttpPost]
    public async Task<ActionResult<Photo>> Add([FromForm] Add.Command command)
    {
        return Handlresult(await Mediator.Send(command));
       
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Photo>> Delete(string Id)
    {
        return Handlresult(await Mediator.Send(new Delete.Command(Id)));

    }

    [HttpPost("{id}/setmain")]
    public async Task<ActionResult<Photo>> SetMain(string Id)
    {
        return Handlresult(await Mediator.Send(new SetMain.Command(Id)));

    }

}
