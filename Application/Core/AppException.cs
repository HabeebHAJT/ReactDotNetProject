using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Core
{
    public class AppException
    {
        public int StatuCode { get; set; }
        public string Message { get; set; }
        public string Details { get; set; }

        public AppException(int StatusCode, string Message,string Details=null)
        {
            this.Details = Details;
            this.StatuCode = StatusCode;
            this.Message = Message; 
        }
    }
}
