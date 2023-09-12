using System;
using System.ComponentModel.DataAnnotations;

namespace issuemodule.Models
{
    public class Card
    {
        public int Id { get; set; }
        [Required]
        public string? Title { get; set; }
        public string Description { get; set; }

        public int StatePriority { get; set; }
        public virtual State? State { get; set; }
    }
}
