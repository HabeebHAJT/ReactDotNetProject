﻿

using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API;

[ApiController]
[Route("api/[controller]")]
public class BaseApiController:ControllerBase
{
    private IMediator mediator;

    protected IMediator Mediator=>mediator??HttpContext.RequestServices.GetService<IMediator>();
}
