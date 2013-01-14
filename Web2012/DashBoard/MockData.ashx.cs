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
            if (context.Request.Params["Current"] == null)
            {
                var mockService = new AdvertismentAreaServiceMock(Guid.NewGuid());

                JavaScriptSerializer serializer = new JavaScriptSerializer();
                string d = serializer.Serialize(mockService.Get());
                context.Response.Write(d);
            }
            else
            context.Response.Redirect("fin.html");
            //context.Server.MapPath
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