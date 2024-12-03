<template>
  <VApp id="app">
    <HeaderLayout />
    <VContainer v-if="$route.meta.requiresMenu" class="menu-navi">
      <VNavigationDrawer
        class="menu-navi-drawer"
        :style="{
          width: screen.isExpand ? screen.openPCMenuNaviBar.width : screen.closePCMenuNaviBar.width
        }"
        :value="screen.drawer"
        app
        :expand-on-hover="screen.isExpand"
        :rail="!screen.isExpand"
        :permanent="true"
      >
        <div class="arrow" @click="toggleExpand">
          <VIcon class="arrow-icon">
            {{ screen.isExpand ? screen.openPCMenuNaviBar.icon : screen.closePCMenuNaviBar.icon }}
          </VIcon>
        </div>
        <CMN002_Menu v-if="screen.isExpand" />
      </VNavigationDrawer>
    </VContainer>

    <CMN002_MenuSP
      v-if="$route.meta.requiresMenu"
      layout="menu"
      :isOpenMenuSP="isOpenMenuSP"
      @update:isOpenMenuSP="isOpenMenuSP = $event"
    />

    <CMN002_MenuProfile
      v-if="$route.meta.requiresMenu"
      :isOpenProfileMenu="isOpenProfileMenu"
      @update:isOpenProfileMenu="toggleProfileMenu"
      @click.self="closeProfileMenu"
    />
    <VMain
      class="main-isSP"
      :class="[
        $route.meta.requiresMenu ? '' : 'login-adjustment',
        screen.isExpand ? screen.openPCMenuNaviBar.style : screen.closePCMenuNaviBar.style
      ]"
    >
      <router-view></router-view>
    </VMain>
  </VApp>
</template>

<script>
  import { onBeforeUnmount, onMounted, reactive } from 'vue';
  import { useAuth } from './composables/userAuth';
  import { useMenuisSp } from './composables/useMenuisSp';
  import { profileMenu } from './composables/profileMenu';
  import HeaderLayout from './components/HeaderLayout.vue';
  import CMN002_Menu from './components/CMN002_Menu.vue';
  import CMN002_MenuSP from './components/CMN002_MenuSP.vue';
  import CMN002_MenuProfile from './components/CMN002_MenuProfile.vue';
  import store from './store';

  export default {
    name: 'App',
    components: { HeaderLayout, CMN002_Menu, CMN002_MenuSP, CMN002_MenuProfile },
    setup() {
      // 画面属性の設定: 画面で使用するラベルやテキストを設定するオブジェクト
      const screen = reactive({
        drawer: true, // メニューの開閉フラグ
        isExpand: store.state.auth.menuisOpen, // メニューが展開フラグ
        openPCMenuNaviBar: {
          // 展開状態のメニュー幅とアイコン
          style: 'open-navi-adjustment',
          width: '220px',
          icon: 'mdi-chevron-left'
        },
        closePCMenuNaviBar: {
          // 縮小状態のメニュー幅とアイコン
          style: 'close-navi-adjustment',
          width: '56px',
          icon: 'mdi-chevron-right'
        }
      });
      const { isOpenMenuSP } = useMenuisSp(); // サブメニューの状態
      const { isOpenProfileMenu, toggleProfileMenu, closeProfileMenu } = profileMenu(); // プロフィールメニューの処理
      const { initializeUser } = useAuth(); // ユーザー初期化
      initializeUser(); // 初期化を実行

      const handleClickOutside = (event) => {
        const profileMenuElement = document.querySelector('.profileMenu'); // プロフィールメニュー要素
        const headerElement = document.querySelector('.actImage'); // ヘッダー要素
        // メニューとヘッダーの外でクリックされた場合
        if (
          profileMenuElement &&
          !profileMenuElement.contains(event.target) &&
          headerElement &&
          !headerElement.contains(event.target)
        ) {
          closeProfileMenu(); // メニューを閉じる
        }
      };

      // メニュー開閉フラグが更新処理
      const toggleExpand = () => {
        screen.isExpand = !screen.isExpand;
        //ストアのメニュー開閉フラグが更新
        store.dispatch('auth/updateMenuisOpen', screen.isExpand);
      };

      // コンポーネントがマウントされたときにクリックイベントを設定
      onMounted(() => {
        document.addEventListener('click', handleClickOutside);
        screen.isExpand = store.state.auth.menuisOpen;
      });

      // コンポーネントがアンマウントされる前にクリックイベントを削除
      onBeforeUnmount(() => {
        document.removeEventListener('click', handleClickOutside);
      });

      return {
        screen,
        isOpenMenuSP,
        isOpenProfileMenu,
        initializeUser,
        toggleProfileMenu,
        closeProfileMenu,
        toggleExpand
      };
    }
  };
</script>

<style>
  /*フォント参照*/
  @font-face {
    font-family: 'Noto Sans JP';
    src: url('@/assets/fonts/NotoSansJP-VariableFont_wght.ttf') format('truetype');
    font-weight: 100 900;
    font-style: normal;
  }

  /*全体共通css定義*/
  #app {
    background-color: #fafae0;
    height: auto;
    margin: 0 auto;
    padding: 0;
    font-family: '「」', sans-serif;
    position: relative;
  }

  #modal {
    background-color: #fafae0;
    height: auto;
    margin: 0 auto;
    padding: 18px 30px;
    font-family: '「」', sans-serif;
    position: relative;
  }
  /* ヘッダーの水平線*/
  hr {
    width: 100%;
    height: 2px;
    border: solid #70b55c;
  }

  .v-container {
    width: 100%;
  }

  /* PCメニューバーの*/
  .menu-navi-drawer {
    position: relative;
  }

  /* PCメニューバー開閉ボタン */
  .arrow {
    position: absolute;
    top: 20px;
    right: 0;
    transform: translateX(50%);
    z-index: 1000;
    padding: 10px;
  }

  .arrow-icon {
    font-size: 40px !important;
    color: #ffff;
    border: solid #70b55c;
    background-color: #70b55c;
    border-radius: 50%;
    transition: transform 0.3s ease;
    cursor: pointer;
  }

  .arrow-icon:hover {
    transform: scale(1.2);
  }

  /* ログイン調整 */
  .login-adjustment {
    --v-layout-left: 0 !important;
    --v-layout-top: 84px !important;
  }

  /* メインの調整 */
  .main-isSP .v-container {
    padding: 32px;
    margin: auto;
  }
  .open-navi-adjustment {
    --v-layout-left: 220px;
  }
  .close-navi-adjustment {
    --v-layout-left: 75px !important;
    padding-right: 56px !important;
  }
  .v-container {
    max-width: 100% !important;
  }
  .v-picker-title {
    display: none;
  }

  .custom-label {
    width: 150px;
    display: flex;
    align-items: center;
  }

  .custom-label-child {
    width: 120px;
    display: flex;
    align-items: center;
  }

  .form-row-btn .custom-btn {
    font-size: 18px;
    border-radius: 17px;
  }

  /* 必須項目の場合、クラスを追加 */
  .has-asterisk::after {
    content: '*';
    font-size: 18px;
    color: red;
    font-weight: bold;
    margin-left: 5px;
  }

  .custom-btn {
    width: 100px;
    height: 50px !important;
    padding: 0;
    margin: 0;
  }

  .isSP {
    display: none !important;
  }
  /* スマートフォンのCSS */
  @media (max-width: 850px) {
    /* PC用のメニューが非表示 */
    .menu-navi {
      display: none;
    }

    /* PC用のメニューの幅が非表示 */
    .main-isSP {
      --v-layout-top: 83px !important;
      --v-layout-left: 0 !important;
      --v-layout-right: 0 !important;
      padding-left: 0 !important;
      padding-right: 0 !important;
      position: relative;
    }

    .isSP {
      display: block !important;
    }
    .isPC {
      display: none !important;
    }
  }
</style>
