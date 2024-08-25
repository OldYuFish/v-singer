import type { Router } from "vue-router";
import NProgress from "nprogress";
import {VID2VName} from "@/utils/DataSets";

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
      NProgress.start();
      if (to.path === '/' || to.path === '/v-singer') {
        document.title = '雪一Yuki|歌单';
        next('/v-singer/3546679848470903');
      } else if (to.path.split('/')[1] === 'v-singer') {
        const VID = to.path.split('/')[2];
        if (VID2VName[VID]) {
          document.title = `${VID2VName[VID]}|歌单`;
          next();
        }
      } else {
        next('/exception/404');
      }
    });
    return this.router;
  }

  afterEach() {
    this.router.afterEach(() => {
      NProgress.done();
    });
  }
}
