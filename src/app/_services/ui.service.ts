import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  activeProject: number = 0;
  activePage: number = 0;
  activeScreenSource: string = '';
  activeScreenAltText: string = '';
  pageMax: number = 0;
  projectCount: number = 11;
  isAnim: Boolean = false;
  isMenuActive: Boolean = false;
  isModalActive: Boolean = false;
  isScreenActive: Boolean = false;
  isSwipeEnabled: Boolean = true;

  openModal(project: number) {
    this.activeProject = project;
    this.isModalActive = true;
  }

  closeModal() {
    this.isScreenActive
      ? this.isScreenActive = false
      : this.isModalActive = false;
  }

  navModalLeft() {
    if (this.activeProject !== 0) {
      this.activeProject = this.activeProject - 1;
    } else {
      this.activeProject = this.projectCount - 1;
    }
  }

  navModalRight() {
    if (this.activeProject !== this.projectCount - 1) {
      this.activeProject = this.activeProject + 1;
    } else {
      this.activeProject = 0;
    }
  }

  openScreen(source: string, title: string) {
    this.activeScreenSource = source;
    this.activeScreenAltText = title;
    this.isScreenActive = true;
  }

  closeScreen() {
    this.isScreenActive = false;
    this.activeScreenSource = '';
    this.activeScreenAltText = '';
  }

  updatePage(page: number) {
    if (this.activePage !== page) {
      this.isAnim = true;
      setTimeout(() => { this.activePage = page; }, 300);
      setTimeout(() => { this.isAnim = false; }, 600);
    }
  }

  updatePageMax(max: number) { this.pageMax = max; }

  resetPage() { this.activePage = 0; }

  swipePageLeft() {
    if (this.isSwipeEnabled && this.activePage !== this.pageMax) {
      this.updatePage(this.activePage + 1);
    }
  }

  swipePageRight() {
    if (this.isSwipeEnabled && this.activePage !== 0) {
      this.updatePage(this.activePage - 1);
    }
  }

  enableSwipe() { this.isSwipeEnabled = true; }

  disableSwipe() { this.isSwipeEnabled = false; }

  closeMenu() { this.isMenuActive = false; }

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
