using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Xml.Serialization;
using Guardian.Advertisment.Dal;
using Guardian.Advertisment.DataModel;

namespace Web2012.Helper.RepositoryMock
{
    public class IssueMockRepository
    {
        string path = "/Helper/PathCurrent/";
        public AdvertismentAreaContext Find(Guid id)
        {
            try
            {
                var xmlCurrent = HttpContext.Current.Server.MapPath(path + "" + id.ToString() + ".xml");
                // Create a new XmlSerializer instance with the type of the test class
                // Create a new file stream for reading the XML file
                FileStream ReadFileStream = new FileStream(xmlCurrent, FileMode.Open, FileAccess.Read, FileShare.Read);
                // Create a new XmlSerializer instance with the type of the test class
                XmlSerializer SerializerObj = new XmlSerializer(typeof(AdvertismentAreaContext));
                // Load the object saved abAdvertismentAreaContextove by using the Deserialize function
                AdvertismentAreaContext LoadedObj = (AdvertismentAreaContext)SerializerObj.Deserialize(ReadFileStream);

                // Cleanup
                ReadFileStream.Close();
                return LoadedObj;
            }
            catch (Exception)
            {

                return null;
            }
           
        }
        public IEnumerable<AdvertismentArea> AdvertisementAreas
        {
            get
            {
                return GetDataMock();
            }
        }
        private byte[] GetImage(string url)
        {

            byte[] buf;
            buf = File.ReadAllBytes(HttpContext.Current.Server.MapPath(url));
            return (buf);
        }


        String ConvertImageURLToBase64(String url)
        {
            StringBuilder _sb = new StringBuilder();

            Byte[] _byte = this.GetImage(url);

            _sb.Append(Convert.ToBase64String(_byte, 0, _byte.Length));

            return _sb.ToString();
        }

        List<AdvertismentArea> GetDataMock()
        {
            List<AdvertismentArea> data = new List<AdvertismentArea>();
            List<string> urlsTemplate = new List<string>();
            urlsTemplate.Add("/imgs/A4-SHISHI48-title.png");//0
            urlsTemplate.Add("/imgs/1081x687.png");//1//290x202.png 288x199.png
            urlsTemplate.Add("/imgs/687x1068.png");//2  276x195.png 199x288.png
            //urlsTemplate.Add("/imgs/a4204x292.png");
            //urlsTemplate.Add("/imgs/a4292x204.png");
            data.Add(new AdvertismentArea
            {
                IssueId = new Guid("2b841240-eef8-43ec-ad0b-ef812238c8af"),
                Title = "test1",
                Current = Find(new Guid("2b841240-eef8-43ec-ad0b-ef812238c8af")),
                IsLandscape = true,
                UriTemplate = ConvertImageURLToBase64(urlsTemplate[0])
            });

            data.Add(new AdvertismentArea
            {                   
                IssueId=new Guid("00000000-0000-0000-0000-000000000001"),
                Title = "test1",
                Current = Find(new Guid("00000000-0000-0000-0000-000000000001")),
                IsLandscape = false,
                UriTemplate = ConvertImageURLToBase64(urlsTemplate[2])
            });
            data.Add(new AdvertismentArea
            {
                IssueId = new Guid("00000000-0000-0000-0000-000000000002"),
                Title = "test2",
                Current = Find(new Guid("00000000-0000-0000-0000-000000000002")),
                IsLandscape = true,
                UriTemplate = ConvertImageURLToBase64(urlsTemplate[1])
            });
            data.Add(new AdvertismentArea
            {
                IssueId = new Guid("00000000-0000-0000-0000-000000000003"),
                Title = "test3",
                Current = Find(new Guid("00000000-0000-0000-0000-000000000003")),
                IsLandscape = false,
                UriTemplate = ConvertImageURLToBase64(urlsTemplate[0])
            });

            return data;
        }
    }
}