using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Guardian.Advertisment.DataModel;
using Web2012.Helper.RepositoryMock;

namespace Web2012.Server.Classes.Bll
{
    public static class Merger
    {
        public static AdvertismentArea Merge(AdvertismentArea crm, IEnumerable<Section> sections, IEnumerable<Advertisement> advertisements)
        {

            //crm.Current = current;
            crm.Advertisements = advertisements.ToList();
            crm.Sections = sections.ToList();
            return crm;
        }
    }
}