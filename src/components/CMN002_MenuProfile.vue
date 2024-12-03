<template>
  <VContainer class="profileMenu" v-if="isOpenProfileMenu">
    <router-link to="/PassChange" class="profileMenu-sub" @click="closeProfileMenu">
      <VIcon>mdi-lock-reset</VIcon>
      パスワード変更
    </router-link>
    <router-link to="/" class="profileMenu-sub" style="color: #d8000c" @click="closeProfileMenu">
      <VIcon>mdi-logout</VIcon>
      ログアウト
    </router-link>
  </VContainer>
</template>

<script>
  export default {
    props: {
      isOpenProfileMenu: {
        type: Boolean,
        default: false
      }
    },
    setup(props, { emit }) {
      const toggleProfileMenu = () => {
        emit('update:isOpenProfileMenu', !props.isOpenProfileMenu);
      };
      const closeProfileMenu = () => {
        emit('update:isOpenProfileMenu', false);
      };
      return {
        toggleProfileMenu,
        closeProfileMenu
      };
    }
  };
</script>

<style scoped>
  /* ドロップダウンボックスのスタイル */
  .profileMenu {
    position: fixed;
    top: 78px;
    right: 0;
    z-index: 1000;
    width: 200px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin: 5px 0 0 0;
  }

  /* リンクのスタイル */
  .profileMenu-sub {
    display: block;
    padding: 10px;
    text-decoration: none;
    color: black;
    font-size: 0.85rem;
  }

  /* ホバー時のリンクの背景色 */
  .profileMenu-sub:hover {
    background-color: #f0f0f0;
  }

  /* SP版の場合、 */
  @media (max-width: 850px) {
    .profileMenu {
      left: 0;
    }
  }
</style>
