﻿using System;
namespace Guardian.Advertisment.Contract
{
    interface IAdvertismentAreaService
    {
        //global::Guardian.Advertisment.DataModel.AdvertismentArea Get(Guid? id = null);
        //  global::Guardian.Advertisment.DataModel.AdvertismentArea Get(Guid? id = null);
        global::Guardian.Advertisment.DataModel.Result<Guardian.Advertisment.DataModel.AdvertismentArea> Get(Guid? id = null);
      
        void Set(global::Guardian.Advertisment.DataModel.AdvertismentAreaContext item);
    }
}
