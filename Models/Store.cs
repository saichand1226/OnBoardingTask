using System;
using System.Collections.Generic;

namespace OnBoardingDemo.Models
{
    public partial class Store
    {
        public Store()
        {
            Sales = new HashSet<Sale>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Address { get; set; }

        public virtual ICollection<Sale> Sales { get; set; }
    }
}
