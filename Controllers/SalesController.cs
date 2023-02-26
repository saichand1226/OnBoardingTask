using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnBoardingDemo.Data;
using OnBoardingDemo.Models;
namespace OnBoardingDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly OnboardingDbContext _context;
        public SalesController(OnboardingDbContext context)
        {
            _context = context;
        }
        // GET: api/Sales
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SaleDto>>> GetSales()
        {
            List<Sale> SalesList = await _context.Sales.ToListAsync();
            List<SaleDto> salesDtoList = new List<SaleDto>();
            foreach (Sale sale in SalesList)
            {
                SaleDto saleDto = new SaleDto();
                var customer = await _context.Customers.FindAsync(sale.CustomerId);
                var store = await _context.Stores.FindAsync(sale.StoreId);
                var product = await _context.Products.FindAsync(sale.ProductId);
                saleDto.SaleId = sale.Id;
                saleDto.CustomerName = customer.Name;
                saleDto.StoreName = store.Name;
                saleDto.ProductName = product.Name;
                DateTime DateSold = (DateTime)sale.DateSold;
                saleDto.DateSold = DateSold.ToString("MM/dd/yyyy");
                salesDtoList.Add(saleDto);
            }
            return salesDtoList;
        }
        // GET: api/Sales/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SaleDto>> GetSale(int id)
        {
            var sale = await _context.Sales.FindAsync(id);
            var customer = await _context.Customers.FindAsync(sale.CustomerId);
            var store = await _context.Stores.FindAsync(sale.StoreId);
            var product = await _context.Products.FindAsync(sale.ProductId);
            SaleDto saleDto = new SaleDto
            {
                CustomerName = customer.Name,
                StoreName = store.Name,
                ProductName = product.Name,
                // DateSold = sale.DateSold,
            };
            if (sale == null)
            {
                return NotFound();
            }
            return saleDto;
        }
        // PUT: api/Sales/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSale(int id, SaleDto saleDto)
        {
            DateTime date = DateTime.Parse(saleDto.DateSold);
            var sale = new Sale
            {
                Id = id,
                ProductId = saleDto.ProductId,
                CustomerId = saleDto.CustomerId,
                StoreId = saleDto.StoreId,
                DateSold = date
            };
            if (id != sale.Id)
            {
                return BadRequest();
            }
            _context.Entry(sale).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SaleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }
        // POST: api/Sales
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Sale>> PostSale(SaleDto saleDto)
        {
            DateTime date = DateTime.Parse(saleDto.DateSold);
            var sale = new Sale
            {
                ProductId = saleDto.ProductId,
                CustomerId = saleDto.CustomerId,
                StoreId = saleDto.StoreId,
                DateSold = date
            };
            _context.Sales.Add(sale);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetSale", new { id = sale.Id }, sale);
        }
        // DELETE: api/Sales/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSale(int id)
        {
            var sale = await _context.Sales.FindAsync(id);
            if (sale == null)
            {
                return NotFound();
            }
            _context.Sales.Remove(sale);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        private bool SaleExists(int id)
        {
            return _context.Sales.Any(e => e.Id == id);
        }
    }
}