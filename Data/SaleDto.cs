using Microsoft.EntityFrameworkCore;
using OnBoardingDemo.Models;

namespace OnBoardingDemo.Data
{
    public class SaleDto
    {
        public string? ProductName { get; set; }
        public string? CustomerName { get; set; }
        public string? StoreName { get; set; }
        public int ProductId { get; set; }
        public int CustomerId { get; set; }
        public int StoreId { get; set; }
        public int SaleId { get; set; }
        public string? DateSold { get; set; }

        public string? AllProductName { get; set; }
        public string? AllCustomerName { get; set; }
        public string? AllStoreName { get; set; }
        public int? AllProductId { get; set; }
        public int? AllCustomerId { get; set; }
        public int? AllStoreId { get; set; }




    }
}
