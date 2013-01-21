using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Guardian.Advertisment.DataModel
{
    public class Advertisement:ElementAreaBase
    {
        public bool IsDeleted { get; set; }
        public string Size { get; set; }
        public bool IsDrop { get; set; }
       
    }

}