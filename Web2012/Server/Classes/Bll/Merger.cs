using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using Guardian.Advertisment.DataModel;
using Web2012.Helper.RepositoryMock;

namespace Web2012.Server.Classes.Bll
{
    public static class Merger
    {
        public static AdvertismentArea Merge(AdvertismentArea crm, ICollection<Section> sections, ICollection<Advertisement> advertisements)
        {
            SetIsDeletedAdvertisements(crm,ref advertisements);

            crm.Advertisements = advertisements.ToList();
            crm.Sections = sections.ToList();
            return crm;
        }

        static void SetIsDeletedAdvertisements(AdvertismentArea crm,ref ICollection<Advertisement> advertisements)
        {
            if (!(advertisements != null && advertisements.Any()))
            {
                advertisements = new List<Advertisement>();
            }
            var advertisementsTemp = advertisements;
            if (crm.Current != null && crm.Current.Advertisements != null &&   crm.Current.Advertisements.Any())
            {
                (from currAdv in crm.Current.Advertisements
                 where !(from adv in advertisementsTemp select adv.Id).Contains(currAdv.Id)
                 select currAdv).ToList().ForEach(e =>
                                            {
                                                e.IsDeleted = true;
                                                advertisementsTemp.Add(e);
                                            });

            }
        }
    }

    
}