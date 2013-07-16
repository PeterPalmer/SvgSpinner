using SvgSpinner.Models;
using System;
using System.Diagnostics;
using System.IO;
using System.Web.Mvc;

namespace SvgSpinner.Controllers
{
	public class HomeController : Controller
	{

		public ActionResult Index()
		{
			var viewModel = new IndexViewModel();

			foreach (var file in Directory.EnumerateFiles(Server.MapPath("~/Content/SVG/"), "*.svg"))
			{
				try
				{
					var svgContent = System.IO.File.ReadAllText(file);
					viewModel.Icons.Add(svgContent);
				}
				catch(Exception ex)
				{
					Debug.Write(ex.Message);
				}
			}

			return View(viewModel);
		}

	}
}
