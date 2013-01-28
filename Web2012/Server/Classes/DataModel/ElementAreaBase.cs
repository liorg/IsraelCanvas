using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web;
using System.Xml.Serialization;

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
       // public string Color { get; set; }

        public string MaxSizeName{
            get
            {
               
                if(!String.IsNullOrWhiteSpace(Name)){
                    string[] strings = Name.Trim().Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
                    if (strings != null && strings.Length > 0)
                    {
                        return strings.OrderByDescending(s => s.Length).First();
                    }
                    return Name;
                }

                return "";
            }
    }
    
        public string NameShortcut
        {
            get
            {
                if (!String.IsNullOrWhiteSpace(Name))
                {
                    string[] strings = Name.Trim().Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
                    if (strings != null && strings.Length > 0)
                    {
                        return strings.First();
                    }
                    return Name;
                }

                return "";
            }
        }

        [XmlIgnore]
        public Size MaxFontSizeUi { get; set; }

      //  public int ItemsCount { get; set; }
   
    }
}