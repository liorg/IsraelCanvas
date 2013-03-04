using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml;
using Guardian.Advertisment.Contract;
using Guardian.Advertisment.DataModel;
using Web2012.Helper;
using Web2012.Helper.RepositoryMock;
using Web2012.Server.Classes.Bll;

namespace Guardian.Advertisment.Service
{
    public class AdvertismentAreaServiceMock : IAdvertismentAreaService
    {
        public AdvertismentAreaServiceMock()
        {

        }
        public Result<AdvertismentArea> Get(Guid? id = null)
        {
            //Mock mockData = new Mock();
            //return mockData.Data;
            Result<AdvertismentArea> result=new Result<AdvertismentArea>();
            result.IsSuccess=true;
            IssueMockRepository rep = new IssueMockRepository();
            if (id.HasValue)
            {
                var r = rep.AdvertisementAreas.Where(p => p.IssueId == id.Value).FirstOrDefault();

                var data =Merger.Merge(r, new SectionMockRepository().Sections, new AdvertisementMockRepository().Advertisements);
                result.Obj = data;
            }
            else
            {
                Mock mockData = new Mock();
                result.Obj = mockData.Data;
                
            }
            return result;
        }
        //public AdvertismentArea Get(Guid? id=null){
        //    //Mock mockData = new Mock();
        //    //return mockData.Data;
        //    IssueMockRepository rep = new IssueMockRepository();
        //    if (id.HasValue)
        //    {
        //        var r= rep.AdvertisementAreas.Where(p => p.IssueId == id.Value).FirstOrDefault();

        //        return Merger.Merge(r,  new SectionMockRepository().Sections, new AdvertisementMockRepository().Advertisements);
            
        //    }
        //    else
        //    {
        //        Mock mockData = new Mock();
        //        return mockData.Data;
        //    }
        //}

        public void Set(AdvertismentAreaContext item)
        {
            string s = ContextHelper.SaveAdvertismentAreaToXml(item);
            string path = "/Helper/PathCurrent/";
            var xmlCurrent = HttpContext.Current.Server.MapPath(path);
            XmlDocument xdoc = new XmlDocument();
            xdoc.LoadXml(s);
            xdoc.Save(xmlCurrent + "/" + item.IssueId.ToString() + ".xml");
        }

    }
}