/// <reference path="IPoint.ts" />
/// <reference path="TouchEvent.ts" />
/// <reference path="HasCallbacks.ts" />
/// <reference path="Globals.ts" />
/// <reference path="SpinnerModel.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Main;
(function (Main) {
    var SvgSpinner = (function (_super) {
        __extends(SvgSpinner, _super);
        function SvgSpinner(document) {
            _super.call(this);
            this.document = document;
            this.mousePosQueue = [];
            this.selectedIcon = null;
        }
        SvgSpinner.prototype.RegisterEventHandlers = function () {
            var svgs = this.document.getElementsByTagName('svg');
            for (var i = 0; i < svgs.length; i++) {
                (svgs[i]).onclick = this.cb_onIconClicked;
            }

            var canvas = document.getElementById('canvas');
            canvas.onmousemove = this.cb_onMouseMove;
            canvas.onmousedown = this.cb_onMouseDown;
            canvas.onmouseup = this.cb_onMouseUp;
            canvas.onmouseout = this.cb_onMouseLeave;
            canvas.addEventListener('touchstart', this.cb_onTouchStart, false);
            canvas.addEventListener('touchmove', this.cb_onTouchMove, false);
        };

        SvgSpinner.prototype.SetupCanvas = function () {
            // Configure canvas
            var canvas = document.getElementById('canvas');
            this.ctx = canvas.getContext('2d');
            this.ctx.fillRect(0, 0, Globals.width, Globals.height);
            this.ctx.translate(Globals.width / 2, Globals.height / 2);

            // Load initial SVG
            this.spinnerModel = new SvgCommand.SpinnerModel();
            var svgSpinnerSvg = document.getElementById('SvgSpinner');
            this.LoadSvg(svgSpinnerSvg);

            // Start timer
            this.intervalId = setInterval(this.cb_tick, Globals.frame_time);
        };

        SvgSpinner.prototype.cb_tick = function () {
            this.ctx.clearRect(Globals.width / -2, Globals.height / -2, Globals.width, Globals.height);
            this.spinnerModel.Draw(this.ctx);
        };

        SvgSpinner.prototype.cb_onIconClicked = function (e) {
            if (this.selectedIcon) {
                this.selectedIcon.className.baseVal = '';
            }

            this.selectedIcon = e.currentTarget;
            this.selectedIcon.className.baseVal += ' selected';

            this.LoadSvg(this.selectedIcon);
        };

        SvgSpinner.prototype.LoadSvg = function (svgElement) {
            this.spinnerModel.Clear();

            var node = svgElement.firstElementChild;

            while (node) {
                if (node.nodeName != "path") {
                    node = node.nextElementSibling;
                    continue;
                }

                var fillColor = node.attributes['fill'].value;
                var strokeColor = node.attributes['stroke'].value;

                this.spinnerModel.LoadSvgPath(node.attributes['d'].value, fillColor, strokeColor);

                node = node.nextElementSibling;
            }

            this.spinnerModel.CenterAndScale();
        };

        SvgSpinner.prototype.cb_onTouchStart = function (ev) {
            // Prevent event bubbling
            ev.preventDefault();
            return false;
        };

        SvgSpinner.prototype.cb_onTouchMove = function (ev) {
            this.HandleMovement(ev.targetTouches.item(0).pageX, ev.targetTouches.item(0).pageY);
        };

        SvgSpinner.prototype.cb_onMouseMove = function (ev) {
            this.HandleMovement(ev.layerX - this.ctx.canvas.offsetLeft - Globals.width / 2, ev.layerY - this.ctx.canvas.offsetTop - Globals.height / 2);
        };

        SvgSpinner.prototype.HandleMovement = function (x, y) {
            if (this.mousePosQueue.length != 0 && Math.abs(this.mousePosQueue[this.mousePosQueue.length - 1].X - x) < 3 && Math.abs(this.mousePosQueue[this.mousePosQueue.length - 1].Y - y) < 3) {
                return;
            }

            this.mousePosQueue.push({ X: x, Y: y });
            if (this.mousePosQueue.length < 2) {
                return;
            }

            var previousYawSpeed = Globals.yawSpeed;
            var previousPitchSpeed = Globals.pitchSpeed;

            // Update speed
            Globals.yawSpeed = 0.0003 * (this.mousePosQueue[this.mousePosQueue.length - 1].X - this.mousePosQueue[0].X);
            Globals.pitchSpeed = 0.0003 * (this.mousePosQueue[0].Y - this.mousePosQueue[this.mousePosQueue.length - 1].Y);

            if (Globals.yawSpeed > 0.08)
                Globals.yawSpeed = 0.08 + (Globals.yawSpeed - 0.08) / 2;
            if (Globals.yawSpeed < -0.08)
                Globals.yawSpeed = -0.08 + (Globals.yawSpeed + 0.08) / 2;
            if (Globals.pitchSpeed > 0.08)
                Globals.pitchSpeed = 0.08 + (Globals.pitchSpeed - 0.08) / 3;
            if (Globals.pitchSpeed < -0.08)
                Globals.pitchSpeed = -0.08 + (Globals.pitchSpeed + 0.08) / 3;

            Globals.yawSpeed = (Globals.yawSpeed + previousYawSpeed) / 2;
            Globals.pitchSpeed = (Globals.pitchSpeed + previousPitchSpeed) / 2;

            if (this.mousePosQueue.length > 8) {
                this.mousePosQueue.shift();
            }
        };

        SvgSpinner.prototype.cb_onMouseDown = function (ev) {
            // Pause
            clearInterval(this.intervalId);
        };

        SvgSpinner.prototype.cb_onMouseUp = function (ev) {
            // Continue
            this.intervalId = setInterval(this.cb_tick, Globals.frame_time);
        };

        SvgSpinner.prototype.cb_onMouseLeave = function (ev) {
            this.mousePosQueue = [];
        };
        return SvgSpinner;
    })(Main.HasCallbacks);
    Main.SvgSpinner = SvgSpinner;
})(Main || (Main = {}));

window.onload = function () {
    var svgSpinner = new Main.SvgSpinner(document);
    svgSpinner.RegisterEventHandlers();
    svgSpinner.SetupCanvas();
};
//# sourceMappingURL=main.js.map
