using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using Guardian.Advertisment.DataModel;
using Guardian.Advertisments.Common;

namespace Web2012.Helper
{
    public class Mock
    {
        private string _urlTemplate = "/imgs/A4-SHISHI48-title.png";
        //private string _urlTemplate = "/imgs/A4.png";
        //private string _urlTemplate = "/imgs/BiggThenA4.png";

        String ConvertImageURLToBase64(String url)
        {
            StringBuilder _sb = new StringBuilder();

            Byte[] _byte = this.GetImage(url);

            _sb.Append(Convert.ToBase64String(_byte, 0, _byte.Length));

            return _sb.ToString();
        }

        private byte[] GetImage(string url)
        {
            //Stream stream = null;
            //byte[] buf;

            //try
            //{
            //    WebProxy myProxy = new WebProxy();
            //    HttpWebRequest req = (HttpWebRequest)WebRequest.Create(url);

            //    HttpWebResponse response = (HttpWebResponse)req.GetResponse();
            //    stream = response.GetResponseStream();

            //    using (BinaryReader br = new BinaryReader(stream))
            //    {
            //        int len = (int)(response.ContentLength);
            //        buf = br.ReadBytes(len);
            //        br.Close();
            //    }

            //    stream.Close();
            //    response.Close();
            //}
            //catch 
            //{
            //    buf = null;
            //}
            byte[] buf;
            buf = File.ReadAllBytes(HttpContext.Current.Server.MapPath(url));
            return (buf);
        }

        public AdvertismentArea Data
        {
            get
            {
                return GetDataMock();
            }
        }

        AdvertismentArea GetDataMock()
        {
            var data = new AdvertismentArea();
            data.Title = "test";
            data.Current = null;
            data.Advertisements = new List<Advertisement>();
            data.Advertisements.Add(new Advertisement
            {
                Color = ConstVar.ColorDefaultAdvertisemen,
                Height = ConstVar.HeightDefaultAdvertisement,
                Width = ConstVar.WidthDefaultAdvertisement,
                IsDeleted = false,
                Id = Guid.NewGuid(),
                Name = "הליכוד ביתנו"
            });
            data.Advertisements.Add(new Advertisement
            {
                Color = ConstVar.ColorDefaultAdvertisemen,
                Height = ConstVar.HeightDefaultAdvertisement,
                Width = ConstVar.WidthDefaultAdvertisement,
                IsDeleted = false,
                Id = Guid.NewGuid(),
                Name = "אגיס",

            });
            data.Advertisements.Add(new Advertisement
            {
                Color = ConstVar.ColorDefaultAdvertisemen,
                Height = ConstVar.HeightDefaultAdvertisement,
                Width = ConstVar.WidthDefaultAdvertisement,
                IsDeleted = false,
                Id = Guid.NewGuid(),
                Name = "ציפי   ליבני     התקווה",Size="12x12",IsDroped=false
            });
            data.Advertisements.Add(new Advertisement
            {
                Color = ConstVar.ColorDefaultAdvertisemen,
                Height = ConstVar.HeightDefaultAdvertisement,
                Width = ConstVar.WidthDefaultAdvertisement,
                IsDeleted = false,
                Id = Guid.NewGuid(),
                Name = "טויטה קורולה",
                Size = "12x12",
                IsDroped = false
            });
            data.Advertisements.Add(new Advertisement
            {
                Color = ConstVar.ColorDefaultAdvertisemen,
                Height = ConstVar.HeightDefaultAdvertisement,
                Width = ConstVar.WidthDefaultAdvertisement,
                IsDeleted = false,
                Id = Guid.NewGuid(),
                Name = "מודעה חדשה",Size="12x12",IsDroped=false
            });

            data.IsLandscape = true;

            data.UriTemplate = ConvertImageURLToBase64(_urlTemplate);

            data.Sections = new List<Section>();
            data.Sections.Add(new Section
            {
                Color = ConstVar.ColorDefaultAdvertisemen,
                Height = ConstVar.HeightDefaultAdvertisement,
                Width = ConstVar.WidthDefaultAdvertisement,
                Id = Guid.NewGuid(),
                Name = "ספורט"
            });
            data.Sections.Add(new Section
            {
                Color = ConstVar.ColorDefaultAdvertisemen,
                Height = ConstVar.HeightDefaultAdvertisement,
                Width = ConstVar.WidthDefaultAdvertisement,
                Id = Guid.NewGuid(),
                Name = "רכילות",
               
            });
            data.Sections.Add(new Section
            {
                Color = ConstVar.ColorDefaultAdvertisemen,
                Height = ConstVar.HeightDefaultAdvertisement,
                Width = ConstVar.WidthDefaultAdvertisement,
                Id = Guid.NewGuid(),
                Name = "פוליטי/מדיני",
              
            });

            data.Advertisements.Add(new Advertisement
            {
                Color = ConstVar.ColorDefaultAdvertisemen,
                Height = ConstVar.HeightDefaultAdvertisement,
                Width = ConstVar.WidthDefaultAdvertisement,
                IsDeleted = false,
                Id = Guid.NewGuid(),
                Name = "the voice 2",
                Size = "4x4",
                IsDroped = false

            });
            data.Advertisements.Add(new Advertisement
            {
                Color = ConstVar.ColorDefaultAdvertisemen,
                Height = ConstVar.HeightDefaultAdvertisement,
                Width = ConstVar.WidthDefaultAdvertisement,
                IsDeleted = false,
                Id = Guid.NewGuid(),
                Name = "שלי יחמוביץ -עבודה",
                Size = "4x4",
                IsDroped = false

            });
            data.Advertisements.Add(new Advertisement
            {
                Color = ConstVar.ColorDefaultAdvertisemen,
                Height = ConstVar.HeightDefaultAdvertisement,
                Width = ConstVar.WidthDefaultAdvertisement,
                IsDeleted = false,
                Id = Guid.NewGuid(),
                Name = "בנט הבית היהודי",
                Size = "4x4",
                IsDroped = false

            });
            data.Advertisements.Add(new Advertisement
            {
                Color = ConstVar.ColorDefaultAdvertisemen,
                Height = ConstVar.HeightDefaultAdvertisement,
                Width = ConstVar.WidthDefaultAdvertisement,
                IsDeleted = false,
                Id = Guid.NewGuid(),
                Name = "פלא-פון",
                Size = "4x4",
                IsDroped = false

            });
            data.Advertisements.Add(new Advertisement
            {
                Color = ConstVar.ColorDefaultAdvertisemen,
                Height = ConstVar.HeightDefaultAdvertisement,
                Width = ConstVar.WidthDefaultAdvertisement,
                IsDeleted = false,
                Id = Guid.NewGuid(),
                Name = "סלקום",
                Size = "4x4",
                IsDroped = false

            });
            data.Advertisements.Add(new Advertisement
            {
                Color = ConstVar.ColorDefaultAdvertisemen,
                Height = ConstVar.HeightDefaultAdvertisement,
                Width = ConstVar.WidthDefaultAdvertisement,
                IsDeleted = false,
                Id = Guid.NewGuid(),
                Name = "מטרנה",
                Size = "4x4",
                IsDroped = false

            });
            data.Advertisements.Add(new Advertisement
            {
                Color = ConstVar.ColorDefaultAdvertisemen,
                Height = ConstVar.HeightDefaultAdvertisement,
                Width = ConstVar.WidthDefaultAdvertisement,
                IsDeleted = false,
                Id = Guid.NewGuid(),
                Name = "אגיס",
                Size = "4x4",
                IsDroped = false

            });
            data.Advertisements.Add(new Advertisement
            {
                Color = ConstVar.ColorDefaultAdvertisemen,
                Height = ConstVar.HeightDefaultAdvertisement,
                Width = ConstVar.WidthDefaultAdvertisement,
                IsDeleted = false,
                Id = Guid.NewGuid(),
                Name = "Nike",
                Size = "4x4",
                IsDroped = false

            });
            data.Advertisements.Add(new Advertisement
            {
                Color = ConstVar.ColorDefaultAdvertisemen,
                Height = ConstVar.HeightDefaultAdvertisement,
                Width = ConstVar.WidthDefaultAdvertisement,
                IsDeleted = false,
                Id = Guid.NewGuid(),
                Name = "מוצר ישראלי",
                Size = "4x4",
                IsDroped = false

            }); data.Advertisements.Add(new Advertisement
            {
                Color = ConstVar.ColorDefaultAdvertisemen,
                Height = ConstVar.HeightDefaultAdvertisement,
                Width = ConstVar.WidthDefaultAdvertisement,
                IsDeleted = false,
                Id = Guid.NewGuid(),
                Name = "ש''ס לחלשים",
                Size = "4x4",
                IsDroped = false

            }); data.Advertisements.Add(new Advertisement
            {
                Color = ConstVar.ColorDefaultAdvertisemen,
                Height = ConstVar.HeightDefaultAdvertisement,
                Width = ConstVar.WidthDefaultAdvertisement,
                IsDeleted = false,
                Id = Guid.NewGuid(),
                Name = "אונג'",
                Size = "4x4",
                IsDroped = false

            }); data.Advertisements.Add(new Advertisement
            {
                Color = ConstVar.ColorDefaultAdvertisemen,
                Height = ConstVar.HeightDefaultAdvertisement,
                Width = ConstVar.WidthDefaultAdvertisement,
                IsDeleted = false,
                Id = Guid.NewGuid(),
                Name = "רמי לוי שקמה",
                Size = "4x4",
                IsDroped = false

            });  
           data.Advertisements.Add(new Advertisement
            {
                Color = ConstVar.ColorDefaultAdvertisemen,
                Height = ConstVar.HeightDefaultAdvertisement,
                Width = ConstVar.WidthDefaultAdvertisement,
                IsDeleted = false,
                Id = Guid.NewGuid(),
                Name = "אושר עד",
                Size = "4x4",
                IsDroped = false

            }); data.Advertisements.Add(new Advertisement
            {
                Color = ConstVar.ColorDefaultAdvertisemen,
                Height = ConstVar.HeightDefaultAdvertisement,
                Width = ConstVar.WidthDefaultAdvertisement,
                IsDeleted = false,
                Id = Guid.NewGuid(),
                Name = "אגיס",

            }); data.Advertisements.Add(new Advertisement
            {
                Color = ConstVar.ColorDefaultAdvertisemen,
                Height = ConstVar.HeightDefaultAdvertisement,
                Width = ConstVar.WidthDefaultAdvertisement,
                IsDeleted = false,
                Id = Guid.NewGuid(),
                Name = "עלית",
                Size = "4x4",
                IsDroped = false

            }); data.Advertisements.Add(new Advertisement
            {
                Color = ConstVar.ColorDefaultAdvertisemen,
                Height = ConstVar.HeightDefaultAdvertisement,
                Width = ConstVar.WidthDefaultAdvertisement,
                IsDeleted = false,
                Id = Guid.NewGuid(),
                Name = "על כיפק",Size="4x4",IsDroped=false

            }); data.Advertisements.Add(new Advertisement
            {
                Color = ConstVar.ColorDefaultAdvertisemen,
                Height = ConstVar.HeightDefaultAdvertisement,
                Width = ConstVar.WidthDefaultAdvertisement,
                IsDeleted = false,
                Id = Guid.NewGuid(),
                Name = "מי ברק",
                Size = "4x4",
                IsDroped = false
            }); data.Advertisements.Add(new Advertisement
            {
                Color = ConstVar.ColorDefaultAdvertisemen,
                Height = ConstVar.HeightDefaultAdvertisement,
                Width = ConstVar.WidthDefaultAdvertisement,
                IsDeleted = false,
                Id = Guid.NewGuid(),
                Name = "בר אילן",
                Size = "4x4",
                IsDroped = false

            }); data.Advertisements.Add(new Advertisement
            {
                Color = ConstVar.ColorDefaultAdvertisemen,
                Height = ConstVar.HeightDefaultAdvertisement,
                Width = ConstVar.WidthDefaultAdvertisement,
                IsDeleted = false,
                Id = Guid.NewGuid(),
                Name = "שלום עכשיו",
                Size = "4x4",
                IsDroped = false

            }); data.Advertisements.Add(new Advertisement
            {
                Color = ConstVar.ColorDefaultAdvertisemen,
                Height = ConstVar.HeightDefaultAdvertisement,
                Width = ConstVar.WidthDefaultAdvertisement,
                IsDeleted = false,
                Id = Guid.NewGuid(),
                Name = "תקומה",
                Size = "4x4",
                IsDroped = false

            });
            data.Advertisements.Add(new Advertisement
            {
                Color = ConstVar.ColorDefaultAdvertisemen,
                Height = ConstVar.HeightDefaultAdvertisement,
                Width = ConstVar.WidthDefaultAdvertisement,
                IsDeleted = false,
                Id = Guid.NewGuid(),
                Name = "סוף הדרך",
                Size = "4x4",
                IsDroped = false


            });
            return data;
        }

    }
}