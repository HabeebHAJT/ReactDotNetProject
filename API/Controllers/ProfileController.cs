using Application.Photo;
using Application.Profiles;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace API;

public class ProfileController : BaseApiController
{

    [HttpGet("{username}")]
    public async Task<ActionResult<AttendeeProfile>> Details(string username)
    {
        return Handlresult(await Mediator.Send(new Details.Query(username)));

    }

}
