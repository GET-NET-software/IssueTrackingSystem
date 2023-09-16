using Microsoft.EntityFrameworkCore;

namespace issuemodule.Models
{
    public class BusinessLogic
    {
        
        public virtual IEnumerable<Card> GetAllCards()
        {
            using (var context = new DashboardContext(new DbContextOptions<DashboardContext>()))
            {
                var dashboardContext = context.Cards;
                return dashboardContext.ToList();
            }
        }

       
       public virtual void AddCard(Card card)
{
    using (var context = new DashboardContext(new DbContextOptions<DashboardContext>()))
    {
        var state = context.States.FirstOrDefault(s => s.Name == "TODO");
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

        context.Add(card);
        context.SaveChanges();
    }
}


     
        public virtual Card GetCard(int id)
{
    using (var context = new DashboardContext(new DbContextOptions<DashboardContext>()))
    {
        var card = context.Cards.FirstOrDefault(c => c.Id == id);
        return card;
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

       
    }

}