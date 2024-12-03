<template>
  <VAppBar class="container" fluid>
    <VRow class="actArea align-center">
      <VCol class="text-title" cols="auto">
        <v-img src="@/assets/img/logo.png" style="width: 100px"></v-img>
      </VCol>
      <VCol v-if="userName" class="actImage" cols="auto" @click="toggleProfileMenu">
        <VRow class="align-center">
          <VCol class="image-col" cols="auto">
            <v-img src="@/assets/img/userAvatar.png" alt="Avatar" class="avatar-image"></v-img>
          </VCol>
          <VCol class="name-col" cols="auto">
            <h3>{{ userName }}</h3>
          </VCol>
        </VRow>
      </VCol>
      <VCol cols="auto" class="menu-btn" v-if="$route.meta.requiresMenu">
        <CMN002_MenuSP layout="button" :isOpenMenuSP="isOpenMenuSP" @update:isOpenMenuSP="toggleMenu" />
      </VCol>
    </VRow>
  </VAppBar>
</template>

<script>
  import { useAuth } from '@/composables/userAuth';
  import { computed } from 'vue';
  import { useMenuisSp } from '@/composables/useMenuisSp';
  import { profileMenu } from '@/composables/profileMenu';
  import CMN002_MenuSP from './CMN002_MenuSP.vue';

  export default {
    components: { CMN002_MenuSP },
    setup() {
      //共通ユーザー処理
      const { user } = useAuth();
      //共通プロファイルメニュー処理
      const { isOpenProfileMenu, toggleProfileMenu, closeProfileMenu } = profileMenu();
      //共通メニューSP版用処理
      const { isOpenMenuSP, toggleMenu } = useMenuisSp();
      //ログイン中のユーザー名の取得
      const userName = computed(() => user.value?.username || null);

      return {
        userName,
        isOpenMenuSP,
        isOpenProfileMenu,
        toggleMenu,
        toggleProfileMenu,
        closeProfileMenu
      };
    }
  };
</script>

<style scoped>
  .container {
    background-color: #70b55c !important;
    width: 100%;
    white-space: nowrap;
    color: white !important;
    padding: 10px;
    margin: 0 !important;
    position: relative;
  }

  .text-title {
    margin: 0;
  }

  .avatar-image {
    height: 100%;
    min-width: 45px;
    padding: 0;
  }

  .actImage {
    margin-right: 22px;
    cursor: pointer;
  }

  .hover-content {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: white;
    padding: 10px;
    border: 1px solid #ddd;
    z-index: 10;
  }

  .image-col {
    display: flex;
    align-items: center;
  }

  .name-col {
    display: flex;
    align-items: center;
    margin-left: 8px;
  }

  .menu-btn {
    font-size: 20px;
  }

  .actArea {
    justify-content: space-between;
  }

  /* ドロップダウンボックスのスタイル */
  .dropdown-box {
    position: absolute;
    top: 80%;
    right: 0;
    z-index: 10;
    width: 200px;
    margin-top: 5px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    z-index: 10001 !important;
  }

  /* リンクのスタイル */
  .dropdown-link {
    display: block;
    padding: 10px;
    text-decoration: none;
    color: black;
  }

  /* ホバー時のリンクの背景色 */
  .dropdown-link:hover {
    background-color: #f0f0f0;
  }

  .menu-btn {
    display: none;
  }

  /* SP版の場合、 */
  @media (max-width: 850px) {
    .actArea {
      display: flex;
      justify-content: flex-start;
    }

    .menu-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
      padding-right: 0;
      display: block;
    }

    .name-col {
      margin-left: 0;
      padding-left: 0;
    }
  }
</style>
