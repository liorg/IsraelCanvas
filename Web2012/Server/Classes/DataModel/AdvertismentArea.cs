using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Guardian.Advertisment.DataModel
{
    public class AdvertismentBase
    {
        public string Title { get; set; }
        public List<Advertisement> Advertisements { get; set; }
        public List<Section> Sections { get; set; }
    }
    public class AdvertismentArea : AdvertismentBase
    {
        public string UriTemplate { get; set; }
        public bool IsLandscape { get; set; }
        public AdvertismentAreaContext Current { get; set; }
    }
    public class AdvertismentAreaContext : AdvertismentBase
    {
        public Guid IssueId { get; set; }
    }
}