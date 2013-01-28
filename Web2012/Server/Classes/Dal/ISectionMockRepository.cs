using System;
namespace Guardian.Advertisment.Dal
{
    interface ISectionRepository
    {
        System.Collections.Generic.List<Guardian.Advertisment.DataModel.Section> Sections { get; }
    }
}
