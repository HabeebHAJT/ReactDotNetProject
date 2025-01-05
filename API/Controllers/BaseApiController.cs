

using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API;

[ApiController]
[Route("api/[controller]")]
public class BaseApiController:ControllerBase
{
    private IMediator mediator;

    protected IMediator Mediator=>mediator??HttpContext.RequestServices.GetService<IMediator>();

    protected ActionResult Handlresult<T>(Result<T> result)
    {
        if (result == null)
            return NotFound();
            if (result.IsSuccess && result.Value != null)
            return Ok(result.Value);
        if (result.IsSuccess && result.Value == null)
            return NotFound();
       
            return BadRequest(result.Errorr);
    }
}
