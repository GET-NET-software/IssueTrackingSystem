using Microsoft.EntityFrameworkCore;

namespace Kanban.Models
{
    public class BusinessLogic
    {
        public virtual IEnumerable<Card> GetAllCards()
        {
            using (var context = new DashboardContext(new DbContextOptions<DashboardContext>()))
            {
                var dashboardContext = context.Cards.Include(c => c.Id);
                return dashboardContext.ToList();
            }
        }

        public virtual void AddCard(Card card)
        {
            using (var context = new DashboardContext(new DbContextOptions<DashboardContext>()))
            {
                card.Id = Guid.NewGuid();
                //card.Id = context.Status.FirstOrDefault(s => s.Name == "ToDo");
                context.Add(card);
                context.SaveChanges();
            }
        }
        public virtual IEnumerable<Card> GetCard(Card card)
        {
            using (var context = new DashboardContext(new DbContextOptions<DashboardContext>()))
            {
                 //card.Id = Guid.NewGuid();
                 //card.State = context.States.FirstOrDefault(s => s.Name == "ToDo");
                 //context.Add(card);
                 //context.SaveChanges();
                 return null;
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

                var dashboardContext = context.Cards.Include(c => c.Id);
                return dashboardContext.FirstOrDefault(c => c.Id == uCard.Id);
            }
        }

        public virtual Card ChangeStatusCard(Guid id)
        {
            using (var context = new DashboardContext(new DbContextOptions<DashboardContext>()))
            {
                var card = context.Cards.Include(c => c.Id).SingleOrDefault(m => m.Id == id);
                if (card == null)
                    return null;

                //card.State = context.States.FirstOrDefault(s => s.ID == card.State.ID + 1);
                context.SaveChanges();

                var dashboardContext = context.Cards.Include(c => c.Id);
                return dashboardContext.FirstOrDefault(c => c.Id == card.Id);
            }
        }

        public virtual Card DeleteCard(Guid id)
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

        internal object GetCard(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}
