import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  isMenuActive: Boolean = false;

  closeMenu() {
    this.isMenuActive = false;
  }

  toggleMenu(e: Event) {
    e.stopPropagation();
    this.isMenuActive = !this.isMenuActive;
  }

  scrollToElement(id: string) {
    const el = document.getElementById(id);
    let start: any = null;
    let target = el && el ? el.getBoundingClientRect().top : 0;
    let firstPos = window.pageYOffset || document.documentElement.scrollTop;
    let pos = 0;

    (function () {
      var browser = ['ms', 'moz', 'webkit', 'o'];
      for (var x = 0, length = browser.length; x < length && !window.requestAnimationFrame; x++) {
        window.requestAnimationFrame = window[browser[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[browser[x] + 'CancelAnimationFrame'] || window[browser[x] + 'CancelRequestAnimationFrame'];
      }
    })();

    function showAnimation(timestamp: any) {
      if (!start) {
        start = timestamp || new Date().getTime();
      }

      var elapsed = timestamp - start;
      var progress = elapsed / 600;
      var outQuad = function outQuad(n: any) {
        return n * (2 - n);
      };
      var easeInPercentage = +outQuad(progress).toFixed(2);

      pos = target === 0 ? firstPos - firstPos * easeInPercentage : firstPos + target * easeInPercentage;
      window.scrollTo(0, pos);

      if (target !== 0 && pos >= firstPos + target || target === 0 && pos <= 0) {
        cancelAnimationFrame(start);
        pos = 0;
      } else {
        window.requestAnimationFrame(showAnimation);
      }
    }
    window.requestAnimationFrame(showAnimation);
  }

}
