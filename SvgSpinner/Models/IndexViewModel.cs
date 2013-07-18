using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SvgSpinner.Models
{
	public class IndexViewModel
	{
		public List<String> Icons { get; set; }

		public IndexViewModel()
		{
			this.Icons = new List<string>();
		}
	}
}