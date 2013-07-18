/// <reference path="IPoint.ts" />
/// <reference path="TouchEvent.ts" />
/// <reference path="HasCallbacks.ts" />
/// <reference path="Globals.ts" />
/// <reference path="SpinnerModel.ts" />

module Main {

    export class SvgSpinner extends HasCallbacks {

        private selectedIcon: SVGSVGElement;
        private ctx: CanvasRenderingContext2D;
        private intervalId: number;
        private spinnerModel: SvgCommand.SpinnerModel;
        private mousePosQueue: Main.IPoint[] = [];

        constructor(private document: Document) {
            super();
            this.selectedIcon = null;
        }

        public RegisterEventHandlers(): void {
            var svgs = this.document.getElementsByTagName('svg');
            for (var i = 0; i < svgs.length; i++) {
                (<HTMLElement>svgs[i]).onclick = this.cb_onIconClicked;
            }

            var canvas = <HTMLCanvasElement>document.getElementById('canvas');
            canvas.onmousemove = this.cb_onMouseMove;
            canvas.onmousedown = this.cb_onMouseDown;
            canvas.onmouseup = this.cb_onMouseUp;
            canvas.onmouseout = this.cb_onMouseLeave;
            canvas.addEventListener('touchstart', this.cb_onTouchStart, false);
            canvas.addEventListener('touchmove', this.cb_onTouchMove, false);
        }

        public SetupCanvas(): void {
            // Configure canvas
            var canvas = <HTMLCanvasElement>document.getElementById('canvas');
            this.ctx = canvas.getContext('2d');
            this.ctx.fillRect(0, 0, Globals.width, Globals.height);
            this.ctx.translate(Globals.width / 2, Globals.height / 2);

            // Load initial SVG
            this.spinnerModel = new SvgCommand.SpinnerModel();
            var svgSpinnerSvg:any = document.getElementById('SvgSpinner');
            this.LoadSvg(<SVGSVGElement>svgSpinnerSvg);

            // Start timer
            this.intervalId = setInterval(this.cb_tick, Globals.frame_time);
        }

        private cb_tick(): void {
            this.ctx.clearRect(Globals.width / -2, Globals.height / -2, Globals.width, Globals.height);
            this.spinnerModel.Draw(this.ctx);
        }

        private cb_onIconClicked(e: MouseEvent): void {
            // Clear css of previously selected icon
            if (this.selectedIcon) {
                this.selectedIcon.className.baseVal = '';
            }

            this.selectedIcon = <SVGSVGElement>e.currentTarget;
            this.selectedIcon.className.baseVal += ' selected';

            this.LoadSvg(this.selectedIcon);
        }

        private LoadSvg(svgElement: SVGSVGElement): void {
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
        }

        private cb_onTouchStart(ev: TouchEvent): boolean {
            // Prevent event bubbling
            ev.preventDefault();
            return false;
        }

        private cb_onTouchMove(ev: TouchEvent): void {
            this.HandleMovement(ev.targetTouches.item(0).pageX, ev.targetTouches.item(0).pageY);
        }

        private cb_onMouseMove(ev: MouseEvent): void {
            this.HandleMovement(ev.layerX - this.ctx.canvas.offsetLeft - Globals.width / 2, ev.layerY - this.ctx.canvas.offsetTop - Globals.height / 2);
        }

        private HandleMovement(x: number, y: number): void {
            // Ignore small movements
            if (this.mousePosQueue.length != 0 &&
                Math.abs(this.mousePosQueue[this.mousePosQueue.length - 1].X - x) < 3 &&
                Math.abs(this.mousePosQueue[this.mousePosQueue.length - 1].Y - y) < 3) {
                return;
            }

            this.mousePosQueue.push({ X: x, Y: y });
            if (this.mousePosQueue.length < 2) { return; }
            
            var previousYawSpeed = Globals.yawSpeed;
            var previousPitchSpeed = Globals.pitchSpeed;

            // Update speed
            Globals.yawSpeed = 0.0003 * (this.mousePosQueue[this.mousePosQueue.length - 1].X - this.mousePosQueue[0].X);
            Globals.pitchSpeed = 0.0003 * (this.mousePosQueue[0].Y - this.mousePosQueue[this.mousePosQueue.length - 1].Y);

            // Limit speed
            if (Globals.yawSpeed > 0.08) Globals.yawSpeed = 0.08 + (Globals.yawSpeed - 0.08) / 2;
            if (Globals.yawSpeed < -0.08) Globals.yawSpeed = -0.08 + (Globals.yawSpeed + 0.08) / 2;
            if (Globals.pitchSpeed > 0.08) Globals.pitchSpeed = 0.08 + (Globals.pitchSpeed - 0.08) / 3;
            if (Globals.pitchSpeed < -0.08) Globals.pitchSpeed = -0.08 + (Globals.pitchSpeed + 0.08) / 3;

            Globals.yawSpeed = (Globals.yawSpeed + previousYawSpeed) / 2;
            Globals.pitchSpeed = (Globals.pitchSpeed + previousPitchSpeed) / 2;

            // Limit queue length
            if (this.mousePosQueue.length > 8) {
                this.mousePosQueue.shift();
            }
        }

        private cb_onMouseDown(ev: MouseEvent): void {
            // Pause
            clearInterval(this.intervalId);
        }

        private cb_onMouseUp(ev: MouseEvent): void {
            // Continue
            this.intervalId = setInterval(this.cb_tick, Globals.frame_time);
        }

        private cb_onMouseLeave(ev: MouseEvent): void {
            this.mousePosQueue = [];
        }

    }
}

window.onload = () => {
    var svgSpinner = new Main.SvgSpinner(document);
    svgSpinner.RegisterEventHandlers();
    svgSpinner.SetupCanvas();
};
