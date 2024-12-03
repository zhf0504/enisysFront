// src/store/modules/auth.js
/**
 * note: メモ
 *
 * user                           // ログイン中のユーザー名
 * token                          // バックエンドからもらったトークン
 * menuisOpen                     // PC版のメニュー開閉フラグ   true:開     false:閉     default:開
 * MemSearch                      // 会員検索画面で検索後に表示できる権限「true」を設定します。
 *
 */
const state = {
  user: null, // 現在のユーザー名
  token: null, // 認証用のトークン
  menuisOpen: true, //PC版のメニュー開閉フラグ
  MemSearch: true // 「true」の場合、会員一覧が表示できます。
};

const mutations = {
  setUser(state, user) {
    // ユーザー情報を設定する
    state.user = user;
  },
  setToken(state, token) {
    // トークン情報を設定する
    state.token = token;
  },
  setPermission(state, { flag, value }) {
    // 権限フラグを設定する
    state[flag] = value;
  },
  setMenuisOpen(state, menuisOpen) {
    // PC版のメニュー開閉フラグ
    state.menuisOpen = menuisOpen;
  },
  logout(state) {
    // ログアウト処理
    state.user = null;
    state.token = null;
    state.MemSearch = false;
    state.menuisOpen = true;
    sessionStorage.removeItem('token'); // トークンをセッションから削除
    sessionStorage.removeItem('user'); // ユーザー情報をセッションから削除
  }
};

const actions = {
  login({ commit }, { user, token }) {
    // ログイン時の処理
    commit('setUser', user);
    commit('setToken', token);
    sessionStorage.setItem('token', token); // セッションにトークンを保存
    sessionStorage.setItem('user', JSON.stringify(user)); // セッションにユーザー情報を保存
  },
  initializeStore({ commit }) {
    // ストアの初期化
    const token = sessionStorage.getItem('token');
    const user = sessionStorage.getItem('user');

    if (token) {
      commit('setToken', token); // トークンをコミット
      commit('setUser', JSON.parse(user)); // ユーザー情報をコミット
    }
  },
  logout({ commit }) {
    // ログアウト処理
    commit('setUser', null);
    commit('setToken', null);
    sessionStorage.removeItem('token'); // セッションからトークンを削除
    sessionStorage.removeItem('user'); // セッションからユーザー情報を削除
  },
  updatePermission({ commit }, { flag, value }) {
    // フラグを更新する
    commit('setPermission', { flag, value });
  },
  updateMenuisOpen({ commit }, menuisOpen) {
    // メニュー開閉フラグを更新する
    commit('setMenuisOpen', menuisOpen); // 'setMenuisOpen' mutationを呼び出す
  }
};

const getters = {
  isAuthenticated: (state) => !!state.token, // ユーザーが認証されているかどうか
  getUser: (state) => state.user, // 現在のユーザー情報を取得
  hasMemSearchAccess: (state) => state.MemSearch, // 会員一覧アクセスの権限を取得
  getMenuisOpen: (state) => state.menuisOpen //PC版のメニュー開閉フラグを取得
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
