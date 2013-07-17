using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace SvgSpinner
{
	public class BundleConfig
	{
		public static void RegisterBundles(BundleCollection bundles)
		{
			bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/SvgSpinner.css"));

			bundles.Add(new ScriptBundle("~/Scripts/bundle").Include(
						"~/Scripts/Globals.js",
						"~/Scripts/Coordinate.js",
						"~/Scripts/BezierCurve.js",
						"~/Scripts/MovePenTo.js",
						"~/Scripts/Path.js",
						"~/Scripts/SpinnerModel.js",
						"~/Scripts/HasCallbacks.js",
						"~/Scripts/main.js"));

			#if !DEBUG
			BundleTable.EnableOptimizations = true;
			#endif
		}
	}
}