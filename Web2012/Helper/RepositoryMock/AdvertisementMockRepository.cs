using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Guardian.Advertisment.Dal;
using Guardian.Advertisment.DataModel;
namespace Web2012.Helper.RepositoryMock
{
    public class AdvertisementMockRepository : IAdvertisementRepository
    {
        public ICollection<Advertisement> Advertisements
        { 
            get {
                return GetDataMock();
        } }
        List<Advertisement> GetDataMockNULL()
        {
            return new List<Advertisement>();
        }
        List<Advertisement> GetDataMock()
        {
         
            var advertisements = new List<Advertisement>();
            advertisements.Add(new Advertisement
            {
                
                IsDeleted = false,
                Id = new Guid("e5fbbc06-8f81-0000-0000-f56bb52ed361"),
                Name = "הליכוד ביתנו",
                  Size = "1233x1233",
            });
            advertisements.Add(new Advertisement
            {
            
                IsDeleted = false,
                Id = new Guid("e5fbbc06-8f81-0000-0001-f56bb52ed361"),
                Name = "אגיס",
                Size = "12x12",
            });
            advertisements.Add(new Advertisement
            {
                IsDeleted = false,
                Id = new Guid("e5fbbc06-8f81-0000-0002-f56bb52ed361"),
                Name = "ציפי   ליבני     התקווה",
                Size = "12x12"
            });
            advertisements.Add(new Advertisement
            {
                IsDeleted = false,
                Id = new Guid("e5fbbc06-8f81-0000-0003-f56bb52ed361"),
                Name = "טויטה קורולה",
                Size = "12x12",
            });
            advertisements.Add(new Advertisement
            {
                IsDeleted = false,
                Id = new Guid("e5fbbc06-8f81-0000-0004-f56bb52ed361"),
                Name = "מודעה חדשה",
                Size = "12x12",
                IsDroped = false
            });

            
            //advertisements.Add(new Advertisement
            //{
            //    IsDeleted = false,
            //    Id = new Guid("e5fbbc06-8f81-0000-0005-f56bb52ed361"),
            //    Name = "the voice 2",
            //    Size = "4x4",
            //    IsDroped = false
            //});
            advertisements.Add(new Advertisement
            {
               
                IsDeleted = false,
                Id = new Guid("e5fbbc06-8f81-0000-0006-f56bb52ed361"),
                Name = "שלי יחמוביץ -עבודה",
                Size = "4x4",
                IsDroped = false

            });
            advertisements.Add(new Advertisement
            {
               
                IsDeleted = false,
                Id = new Guid("e5fbbc06-8f81-0000-0007-f56bb52ed361"),
                Name = "בנט הבית היהודי",
                Size = "4x4",
                IsDroped = false

            });
            //advertisements.Add(new Advertisement
            //{

            //    IsDeleted = false,
            //    Id = new Guid("e5fbbc06-8f81-0000-0008-f56bb52ed361"),
            //    Name = "פלא-פון",
            //    Size = "4x4",
            //    IsDroped = false

            //});
            advertisements.Add(new Advertisement
            {
           
                IsDeleted = false,
                Id = new Guid("e5fbbc06-8f81-0000-0009-f56bb52ed361"),
                Name = "סלקום",
                Size = "4x4",
                IsDroped = false

            });
            advertisements.Add(new Advertisement
            {
               
                IsDeleted = false,
                Id = new Guid("e5fbbc06-8f81-0000-0010-f56bb52ed361"),
                Name = "מטרנה",
                Size = "4x4",
                IsDroped = false

            });
            advertisements.Add(new Advertisement
            {
               
                IsDeleted = false,
                Id = new Guid("e5fbbc06-8f81-0000-0011-f56bb52ed361"),
                Name = "אגיס",
                Size = "4x4",
                IsDroped = false

            });
            advertisements.Add(new Advertisement
            {
          
                IsDeleted = false,
                Id = new Guid("e5fbbc06-8f81-0000-0012-f56bb52ed361"),
                Name = "Nike",
                Size = "4x4",
                IsDroped = false

            });
            advertisements.Add(new Advertisement
            {
               
                IsDeleted = false,
                Id = new Guid("e5fbbc06-8f81-0000-0013-f56bb52ed361"),
                Name = "מוצר ישראלי",
                Size = "4x4",
                IsDroped = false

            });
            //advertisements.Add(new Advertisement
            //{
             
            //    IsDeleted = false,
            //    Id = Guid.NewGuid(),
            //    Name = "ש''ס לחלשים",
            //    Size = "4x4",
            //    IsDroped = false

            //}); advertisements.Add(new Advertisement
            //{
        
            //    IsDeleted = false,
            //    Id = Guid.NewGuid(),
            //    Name = "אונג'",
            //    Size = "4x4",
            //    IsDroped = false

            //}); advertisements.Add(new Advertisement
            //{
            
            //    IsDeleted = false,
            //    Id = Guid.NewGuid(),
            //    Name = "רמי לוי שקמה",
            //    Size = "4x4",
            //    IsDroped = false

            //});
            //advertisements.Add(new Advertisement
            //{
              
            //    IsDeleted = false,
            //    Id = Guid.NewGuid(),
            //    Name = "אושר עד",
            //    Size = "4x4",
            //    IsDroped = false

            //}); advertisements.Add(new Advertisement
            //{
            
            //    IsDeleted = false,
            //    Id = Guid.NewGuid(),
            //    Name = "אגיס",

            //}); advertisements.Add(new Advertisement
            //{
               
            //    IsDeleted = false,
            //    Id = Guid.NewGuid(),
            //    Name = "עלית",
            //    Size = "4x4",
            //    IsDroped = false

            //}); advertisements.Add(new Advertisement
            //{
            
            //    IsDeleted = false,
            //    Id = Guid.NewGuid(),
            //    Name = "על כיפק",
            //    Size = "4x4",
            //    IsDroped = false

            //}); advertisements.Add(new Advertisement
            //{
               
            //    IsDeleted = false,
            //    Id = Guid.NewGuid(),
            //    Name = "מי ברק",
            //    Size = "4x4",
            //    IsDroped = false
            //}); advertisements.Add(new Advertisement
            //{
           
            //    IsDeleted = false,
            //    Id = Guid.NewGuid(),
            //    Name = "בר אילן",
            //    Size = "4x4",
            //    IsDroped = false

            //}); advertisements.Add(new Advertisement
            //{
           
            //    IsDeleted = false,
            //    Id = Guid.NewGuid(),
            //    Name = "שלום עכשיו",
            //    Size = "4x4",
            //    IsDroped = false

            //}); advertisements.Add(new Advertisement
            //{
              
            //    IsDeleted = false,
            //    Id = Guid.NewGuid(),
            //    Name = "תקומה",
            //    Size = "4x4",
            //    IsDroped = false

            //});
            //advertisements.Add(new Advertisement
            //{
             
            //    IsDeleted = false,
            //    Id = Guid.NewGuid(),
            //    Name = "סוף הדרך",
            //    Size = "4x4",
            //    IsDroped = false


            //});
            return advertisements;
        }
    }
}