using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Http;
 using System.Web;
using issuemodule.Controllers;
using issuemodule.RabbitMQ;


namespace issuemodule.Models
{
    public class BusinessLogic
    {
       
public List<String> ListUserNames()
{
    using (var context = new DashboardContext(new DbContextOptions<DashboardContext>()))
    {
        var usernames = (from c in context.Cards
                         select c.UserName).ToList();


        return usernames;

        
    }
}
public virtual IEnumerable<CardDTO> GetAllCards()
{
    using (var context = new DashboardContext(new DbContextOptions<DashboardContext>()))
    {
        var cardDTOs = from c in context.Cards
                       join s in context.States on c.StatePriority equals s.Priority into stateGroup
                       from state in stateGroup.DefaultIfEmpty()
                       select new CardDTO
                       {
                           Id = c.Id,
                           Title = c.Title,
                           Description = c.Description,
                           Category = c.Category,
                           StatePriority = c.StatePriority,
                           UserName= c.UserName,
                           StateName = state != null ? state.Name : string.Empty
                       };
    


        return cardDTOs.ToList();
    }
}


     
   public virtual void AddCard(Card card,HttpContext httpContext)
{
    using (var context = new DashboardContext(new DbContextOptions<DashboardContext>()))
    {
        var state = context.States.FirstOrDefault(s => s.Name == "Backlog");
        if (state != null)
        {
            card.StatePriority = state.Priority;
        }
        else
        {
            // Handle the case when the state is not found
            // Set default state priority to 1
            card.StatePriority = 1;
        }
        
        // Upload the file as binary into the database
       

         card.UserName=GetUserNameFromToken(httpContext);
        context.Add(card);
        context.SaveChanges();
    }
}

 
        public virtual Card GetCard(int id)
{
    using (var context = new DashboardContext(new DbContextOptions<DashboardContext>()))
    {
        var card = context.Cards.FirstOrDefault(c => c.Id == id);

        if (card == null)
        {
            // Throw an exception or handle the case when the card is not found
            throw new Exception($"Card with ID {id} not found");
            // Alternatively, return null if desired
            // return null;
        }

        return card;
    }
}
public List<Card> GetAllForUser(HttpContext httpContext)
{
    var userName = GetUserNameFromToken(httpContext); // Call the GetUserNameFromToken method
    Console.WriteLine(userName);
    using (var context = new DashboardContext(new DbContextOptions<DashboardContext>()))
    {
        var cards = context.Cards.Where(c => c.UserName == userName).ToList();
        return cards;
    }
}
private string GetUserNameFromToken(HttpContext httpContext)
{
    var tokenHandler = new JwtSecurityTokenHandler();
    var key = Encoding.ASCII.GetBytes("qwertyuiopASDFGHJKLzxcvbnmqwertyuiopASDFGHJKLzxcvbnm"); // Replace with your JWT secret key
var tokenString = httpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", string.Empty);
  
    var tokenValidationParameters = new TokenValidationParameters
  {
    ValidateIssuerSigningKey = true,
    IssuerSigningKey = new SymmetricSecurityKey(key),
    ValidateIssuer = false,
    ValidateAudience = false
  };

  SecurityToken validatedToken;

  var claimsPrincipal = tokenHandler.ValidateToken(tokenString, tokenValidationParameters, out validatedToken);

  var usernameClaim = claimsPrincipal.FindFirst(JwtRegisteredClaimNames.Name);
  if (usernameClaim != null)
  {
    return usernameClaim.Value;
  }
  else
  {
    return null; // Username claim not found in the token
  }
}







        public virtual Card UpdateCard(Card uCard)
{
    using (var context = new DashboardContext(new DbContextOptions<DashboardContext>()))
    {
        var card = context.Cards.FirstOrDefault(c => c.Id == uCard.Id);
        if (card == null)
            return null;

        card.Title = uCard.Title;
        card.Description = uCard.Description;
         card.Category = uCard.Category;
         card.File= uCard.File;
        card.StatePriority = uCard.StatePriority; // Update the statePriority property
        card.assignee = uCard.assignee;
        context.SaveChanges();

        var updatedCard = context.Cards.FirstOrDefault(c => c.Id == uCard.Id);
        return updatedCard;
    }
}


     public virtual Card ChangeStatusCard(int id)
{
    using (var context = new DashboardContext(new DbContextOptions<DashboardContext>()))
    {
        var card = context.Cards.SingleOrDefault(c => c.Id == id);
        if (card == null)
            return null;

        var nextStatePriority = card.StatePriority + 1;
        var nextState = context.States.FirstOrDefault(s => s.Priority == nextStatePriority);

        if (nextState != null)
        {
            card.StatePriority = nextState.Priority;
            context.SaveChanges();
        }

        // Return the modified 'card' object directly
        return card;
    }
}




        public virtual Card DeleteCard(int id)
        {
            using (var context = new DashboardContext(new DbContextOptions<DashboardContext>()))
            {
                var card = context.Cards.SingleOrDefault(m => m.Id == id);
                if (card == null)
                    return null;

                context.Cards.Remove(card);
                context.SaveChanges();
                return card;
            }
        }
               public virtual int GetNumberOfCards()
{
    using (var context = new DashboardContext(new DbContextOptions<DashboardContext>()))
    {
        int numberOfCards = context.Cards.Count();

        return numberOfCards;
    }
}
public virtual int GetNumberOfCardssolved()
{
    using (var context = new DashboardContext(new DbContextOptions<DashboardContext>()))
    {
        int numberOfCards = context.Cards.Count(c => c.StatePriority == 4);

        return numberOfCards;
    }
}

public virtual int GetNumberOfUnsolvedIssues()
{
    using (var context = new DashboardContext(new DbContextOptions<DashboardContext>()))
    {
        int numberOfIssues = context.Cards.Count(c => c.StatePriority < 4);

        return numberOfIssues;
    }
}

       
    }

}