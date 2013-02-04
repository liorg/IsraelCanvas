using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using System.Xml;
using Guardian.Advertisment;
using Guardian.Advertisment.Contract;
using Guardian.Advertisment.DataModel;
using Guardian.Advertisment.Service;

namespace Web2012.DashBoard
{
    /// <summary>
    /// Summary description for upload
    /// </summary>
    public class MockUpload : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            JavaScriptSerializer jsonSerializer = new JavaScriptSerializer();
            string jsonString = String.Empty;

            HttpContext.Current.Request.InputStream.Position = 0;
            using (StreamReader inputStream = new StreamReader(HttpContext.Current.Request.InputStream))
            {
                jsonString = inputStream.ReadToEnd();
            }

            var upload = jsonSerializer.Deserialize<AdvertismentAreaContext>(jsonString);

            IAdvertismentAreaService mockService = new AdvertismentAreaServiceMock();
            
            mockService.Set(upload);

            context.Response.Write("File Save");
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