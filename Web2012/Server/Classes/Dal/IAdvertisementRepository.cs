using System;
namespace Guardian.Advertisment.Dal
{
    interface IAdvertisementRepository
    {
        System.Collections.Generic.IEnumerable<Guardian.Advertisment.DataModel.Advertisement> Advertisements { get; }
    }
}
