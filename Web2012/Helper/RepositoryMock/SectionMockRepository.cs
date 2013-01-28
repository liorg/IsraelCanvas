using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Guardian.Advertisment.Dal;
using Guardian.Advertisment.DataModel;
namespace Web2012.Helper.RepositoryMock
{
    public class SectionMockRepository : ISectionRepository
    {
        public List<Section> Sections
        { 
            get
            {
                return GetDataMock();
            }
        }

        public List<Section> GetDataMock()
        {
            var sections = new List<Section>();
            sections.Add(new Section
            {
                Id = new Guid("e5fbbc06-8f81-0001-0000-f56bb52ed361"),
                Name = "ספורט"
            });
            sections.Add(new Section
            {
                Id = new Guid("e5fbbc06-8f81-0002-0000-f56bb52ed361"),
                Name = "רכילות",

            });
            sections.Add(new Section
            {
                Id = new Guid("e5fbbc06-8f81-0003-0000-f56bb52ed361"),
                Name = "פוליטי/מדיני",

            });
            return sections;
        }
    }
}