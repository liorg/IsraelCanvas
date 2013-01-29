using System;
namespace Guardian.Advertisment.Dal
{
    interface IAdvertisementRepository
    {
        System.Collections.Generic.ICollection<Guardian.Advertisment.DataModel.Advertisement> Advertisements { get; }
    }
}
