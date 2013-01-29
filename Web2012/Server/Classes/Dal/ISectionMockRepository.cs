using System;
namespace Guardian.Advertisment.Dal
{
    interface ISectionRepository
    {
        System.Collections.Generic.ICollection<Guardian.Advertisment.DataModel.Section> Sections { get; }
    }
}
