import { createRouter, createWebHistory } from 'vue-router';
import routes from './router';
import { useAuth } from '../composables/userAuth';
import store from '@/store';

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 認証状態に基づいてナビゲーションを処理するミドルウェア
router.beforeEach((to, from, next) => {
  const { logout } = useAuth();
  const isAuthenticated = sessionStorage.getItem('user');

  // セッションが存在する場合
  if (isAuthenticated) {
    // ユーザーがログインしている場合、ルートが"/"である場合はログアウトする
    if (to.path == '/') {
      logout();
      next();
    }
    // // ユーザーが無効なページにアクセスしようとした場合、エラーページにリダイレクトする
    else if (!routes.find((route) => route.path === to.path)) {
      next({ name: 'ErrorPage' }); // 'ErrorPage'という名前のルートがあることを確認する
    } else {
      const requiredFlag = to.meta.requiredFlag;
      if (requiredFlag) {
        const hasAccess = store.state.auth[requiredFlag];
        if (!hasAccess) {
          return next({ name: requiredFlag });
        } else {
          next();
        }
      } else {
        next(); // 要求されたページに進む
      }
    }
  } else {
    // セッションが存在しない場合
    // ルートが"/"である場合はログアウトする
    logout();
    if (to.name != 'login') {
      next({ name: 'login' });
    } else {
      next();
    }
    // セッションが存在しない場合、ログインページにリダイレクトする
    // ログインページのルートがあることを確認する
  }
});

export default router;
