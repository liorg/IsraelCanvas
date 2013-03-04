using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Guardian.Advertisment.DataModel
{
    public class Result
    {
        public bool IsSuccess { get; set; }
        public string Desc { get; set; }
        public bool IsUnandleException { get; set; }
    }

    public class Result<T> : Result
    {
        public T Obj { get; set; }
    }
}
