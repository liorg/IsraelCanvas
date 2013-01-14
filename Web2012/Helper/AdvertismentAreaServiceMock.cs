using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Guardian.Advertisment.Contract;
using Guardian.Advertisment.DataModel;
using Web2012.Helper;

namespace Guardian.Advertisment.Service
{
    public class AdvertismentAreaServiceMock : IAdvertismentAreaService
    {
        public AdvertismentAreaServiceMock(Guid id)
        {

        }
        public AdvertismentArea Get(){
            Mock mockData = new Mock();
            return mockData.Data;

        }
        public void Set(AdvertismentArea item)
        {

        }

    }
}