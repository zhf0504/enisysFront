// src/composables/useAuth.js
import { ref } from 'vue';
import { useMenuisSp } from './useMenuisSp';

// ユーザーをnullで初期化する
const user = ref(null); // ユーザーをnullで初期化
const useMenu = useMenuisSp();
// ログイン関数を定義する
const login = (userData) => {
  // ユーザー情報を更新する
  user.value = userData; // ユーザー情報を更新
  // ユーザー情報をsessionStorageに保存する
  sessionStorage.setItem('user', JSON.stringify(userData)); // sessionStorageに保存
};

// ログアウト関数を定義する
const logout = () => {
  // ユーザー情報を削除する
  user.value = null; // ユーザー情報をnullに設定
  // sessionStorageからユーザー情報を削除する
  sessionStorage.removeItem('user'); // sessionStorageから削除
  //メニュー表示フラグを初期化
  useMenu.isOpenMenuSP.value = false;
  useMenu.isOpenProfileMenu.value = false;
};

// ユーザー情報を初期化する関数を定義する
const initializeUser = () => {
  const storedUser = sessionStorage.getItem('user'); // sessionStorageからユーザー情報を取得
  if (storedUser) {
    user.value = JSON.parse(storedUser); // 取得したユーザー情報をオブジェクトに変換して設定
  }
};

// useAuth関数をエクスポートする
export function useAuth() {
  return {
    user, // ユーザー情報を返す
    login, // ログイン関数を返す
    logout, // ログアウト関数を返す
    initializeUser // ユーザー情報を初期化する関数を返す
  };
}
