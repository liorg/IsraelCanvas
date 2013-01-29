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
            SetIsDeletedAdvertisements(crm, advertisements);

            crm.Advertisements = advertisements.ToList();
            crm.Sections = sections.ToList();
            return crm;
        }

        static void SetIsDeletedAdvertisements(AdvertismentArea crm, ICollection<Advertisement> advertisements)
        {
            if (advertisements!=null && advertisements.Any() && crm.Current != null && crm.Current.Advertisements != null &&   crm.Current.Advertisements.Any())
            {
                (from currAdv in crm.Current.Advertisements
                 where !(from adv in advertisements select adv.Id).Contains(currAdv.Id)
                 select currAdv).ToList().ForEach(e =>
                                            {
                                                e.IsDeleted = true;
                                                advertisements.Add(e);
                                            });

            }
        }
    }

    
}