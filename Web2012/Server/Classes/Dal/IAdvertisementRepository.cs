using System;
namespace Guardian.Advertisment.Dal
{
    interface IAdvertisementRepository
    {
        System.Collections.Generic.List<Guardian.Advertisment.DataModel.Advertisement> Advertisements { get; }
    }
}
