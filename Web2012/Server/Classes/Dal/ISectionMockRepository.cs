using System;
namespace Guardian.Advertisment.Dal
{
    interface ISectionRepository
    {
        System.Collections.Generic.IEnumerable<Guardian.Advertisment.DataModel.Section> Sections { get; }
    }
}
