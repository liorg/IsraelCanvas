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

            UpdateTitle(crm, ref advertisements);
            SetIsDeletedAdvertisements(crm,ref advertisements);
           // SetIsDeletedSections(crm, ref sections);
           
            if (advertisements.Any())
            {
                crm.Advertisements = advertisements.ToList();
            }
            if (sections.Any())
            {
                crm.Sections = sections.ToList();
            }
            return crm;
        }
        //static void UpdateIsDroped(AdvertismentArea crm, ref ICollection<Advertisement> advertisements)
        //{
        //    if (!(advertisements != null && advertisements.Any()))
        //    {
        //        advertisements = new List<Advertisement>();
        //    }
        //}
        static void UpdateTitle(AdvertismentArea crm, ref ICollection<Advertisement> advertisements)
        {
            if (!(advertisements != null && advertisements.Any()))
            {
                advertisements = new List<Advertisement>();
            }
            var advertisementsTemp = advertisements;
            if (crm.Current != null && crm.Current.Advertisements != null && crm.Current.Advertisements.Any())
            {
                (from currAdv in crm.Current.Advertisements
                 where (from adv in advertisementsTemp select adv.Id).Contains(currAdv.Id)
                 select currAdv).ToList().ForEach(e =>
                 {
                     //e.Name = (from a in advertisementsTemp where a.Id == e.Id select a.Name).FirstOrDefault();
                    var advertisement= (from a in advertisementsTemp where a.Id == e.Id select a).FirstOrDefault();
                    if (advertisement != null)
                    {
                        e.Name = advertisement.Name;
                        advertisement.IsDroped = true;
                    }
                 });
              
            }
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

        static void SetIsDeletedSections(AdvertismentArea crm, ref ICollection<Section> sections)
        {
            if (!(sections != null && sections.Any()))
            {
                sections = new List<Section>();
            }
            var sectionsTemp = sections;
            if (crm.Current != null && crm.Current.Sections != null && crm.Current.Sections.Any())
            {
                (from currSct in crm.Current.Sections
                 where !(from sct in sectionsTemp select sct.Id).Contains(currSct.Id)
                              select currSct).ToList().ForEach(e =>
                 {
                     e.IsDeleted = true;
                     sectionsTemp.Add(e);
                 });

            }
        }
    }

    
}