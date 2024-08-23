import type { NavigationGuardNext, RouteLocationNormalized, Router } from "vue-router";
import NProgress from "nprogress";

NProgress.configure({
  showSpinner: false,
  easing: 'ease',
  speed: 500,
  minimum: 0.1,
})

export class useAuthGuard {
  constructor(private router: Router) {
    this.canActivate();
    this.afterEach();
  }

  canActivate() {
    this.router.beforeEach(async (to, from, next) => {
      document.title = to.meta.title as string;
      NProgress.start();
    });
    return this.router;
  }

  afterEach() {
    this.router.afterEach(() => {
      NProgress.done();
    });
  }
}
