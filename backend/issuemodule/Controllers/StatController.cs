using Microsoft.AspNetCore.Mvc;
using issuemodule.Models;

namespace issuemodule.Controllers
{
    [Route("api/[controller]")]
    public class StatController : ControllerBase // Inherit from ControllerBase instead of Controller
    {
        private BusinessLogic businessLogic;
      public  StatController() {
        // Create a new instance of the BusinessLogic object
        businessLogic = new BusinessLogic();
    }
[HttpGet]
[Route("getnocards")]
public IActionResult Getcount()
{
    int numberOfCards = businessLogic.GetNumberOfCards();
    return Ok(numberOfCards);
}
[HttpGet]
[Route("getsolvedcards")]
public IActionResult Getcountsolved()
{
    int numberOfCards = businessLogic.GetNumberOfCardssolved();
    return Ok(numberOfCards);
}

[HttpGet]
[Route("getunsolvedcards")]
public IActionResult Getcountunsolved()
{
    int numberOfCards = businessLogic.GetNumberOfUnsolvedIssues();
    return Ok(numberOfCards);
}
}}