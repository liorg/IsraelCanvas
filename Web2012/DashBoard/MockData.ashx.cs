using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using Guardian.Advertisment.Service;
using Web2012.Helper;

namespace Web2012.Server
{
    /// <summary>
    /// Summary description for MockData
    /// </summary>
    public class MockData : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
                var id = context.Request.QueryString["id"];

                var mockService = new AdvertismentAreaServiceMock();

                JavaScriptSerializer serializer = new JavaScriptSerializer();
                string d = serializer.Serialize(mockService.Get(Guid.Parse(id)));
                context.Response.Write(d);
          
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}

 
        