using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Guardian.Advertisment.DataModel
{
    public class ElementAreaBase
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Top { get; set; }
        public string Left { get; set; }
        public string Width { get; set; }
        public string Height { get; set; }
        public string Color { get; set; }
    }
}