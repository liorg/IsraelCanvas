﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Guardian.Advertisment.DataModel
{
    public class Advertisement:ElementAreaBase
    {
        public string Size { get; set; }
        public bool IsDroped { get; set; }
    }

}