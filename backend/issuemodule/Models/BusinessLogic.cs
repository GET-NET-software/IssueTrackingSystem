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
            card.State = state;
            card.StatePriority = state.Priority;
        }
        else
        {
            // Handle the case when the state is not found
            // You can throw an exception or set a default state here
            // throw new Exception("Default state 'TODO' not found.");
            // Or set a default state
            var defaultState = new State { Priority = 1, Name = "Default State" };
            card.State = defaultState;
            card.StatePriority = defaultState.Priority;
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
                context.SaveChanges();

                var dashboardContext = context.Cards.Include(c => c.State);
                return dashboardContext.FirstOrDefault(c => c.Id == uCard.Id);
            }
        }

      public virtual Card ChangeStatusCard(int id)
{
    using (var context = new DashboardContext(new DbContextOptions<DashboardContext>()))
    {
        var card = context.Cards.Include(c => c.State).SingleOrDefault(m => m.Id == id);
        if (card == null)
            return null;

        card.State = context.States.FirstOrDefault(s => s.Priority == card.State.Priority + 1);
        context.SaveChanges();

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