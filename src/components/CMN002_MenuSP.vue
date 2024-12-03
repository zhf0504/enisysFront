<template>
  <template v-if="layout === 'button'">
    <VBtn @click.stop="toggleMenu" class="menu-btn">
      <VIcon>{{ isOpenMenuSP ? 'mdi-close' : 'mdi-menu' }}</VIcon>
    </VBtn>
  </template>

  <template v-if="layout === 'menu'">
    <div v-if="isOpenMenuSP" class="menu-overlay" @click="closeMenu"></div>
    <transition name="dropdown">
      <VList v-if="isOpenMenuSP" class="menu-dropdown">
        <VExpansionPanels>
          <!-- 「BlankPage」の固定 -->
          <VExpansionPanel class="custom-homeMenu">
            <VListItem @click="navigateTo(menuHome.route)" class="custom-expansion">
              <VListItemAction>
                <VIcon color="#70b55c" class="custom-icon">
                  {{ menuHome.icon }}
                </VIcon>
                <VListItemTitle class="custom-list-item">
                  {{ menuHome.title }}
                </VListItemTitle>
              </VListItemAction>
            </VListItem>
          </VExpansionPanel>
          <!-- リクエストからMenuListのループ -->
          <VExpansionPanel v-for="(item, index) in menuItems" :key="index">
            <VExpansionPanelTitle v-if="item.deviceFlag">
              <VListItem class="custom-expansion">
                <VListItemAction>
                  <VIcon color="#70b55c" class="custom-icon">
                    {{ noteIcon }}
                  </VIcon>
                  <VListItemTitle class="custom-list-item">
                    {{ item.oyaMenuName }}
                  </VListItemTitle>
                </VListItemAction>
              </VListItem>
            </VExpansionPanelTitle>
            <VExpansionPanelText v-if="item.deviceFlag">
              <VListItem
                v-for="(child, childIndex) in item.subMenuList"
                :key="childIndex"
                @click="navigateTo(child.router)"
                class="menu-subitem"
              >
                <VListItemAction>
                  <VListItemTitle class="custom-list-item-sub">
                    {{ child.subMenuName }}
                  </VListItemTitle>
                </VListItemAction>
              </VListItem>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </VList>
    </transition>
  </template>
</template>

<script>
  import menuData from '@/assets/JsonData/MenuAdmin.json';
  import router from '@/router';
  import { ref } from 'vue';
  export default {
    props: {
      layout: {
        type: String,
        required: true
      },
      isOpenMenuSP: {
        type: Boolean,
        default: false
      }
    },
    setup(props, { emit }) {
      const menuHome = {
        title: 'Home',
        icon: 'mdi-home-variant-outline',
        route: '/BlankPage'
      };
      //jsonデータ参照
      const menuItems = ref(menuData);
      //ノートIcon
      const noteIcon = 'mdi-book-open-blank-variant-outline';
      //画面遷移用メソッド
      const navigateTo = (route) => {
        router.push(route);
        emit('update:isOpenMenuSP', false);
      };
      //メニューの開閉状態
      const toggleMenu = () => {
        emit('update:isOpenMenuSP', !props.isOpenMenuSP);
      };
      //黒バックグランド押下する時、メニューを閉じる
      const closeMenu = () => {
        emit('update:isOpenMenuSP', false);
      };
      return {
        menuHome,
        menuItems,
        noteIcon,
        navigateTo,
        toggleMenu,
        closeMenu
      };
    }
  };
</script>

<style scoped>
  .menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }

  .menu-dropdown {
    position: fixed;
    width: 100%;
    top: 72px;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    z-index: 1001;
    padding: 0;
    overflow-y: auto;
  }

  .dropdown-enter-active,
  .dropdown-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  .dropdown-leave-active {
    opacity: 1;
  }

  .dropdown-enter {
    opacity: 0;
    transform: translateY(-20px);
  }

  .dropdown-enter-to {
    opacity: 1;
    transform: translateY(0);
  }

  .dropdown-leave-to {
    opacity: 0;
    transform: translateY(-20px);
  }

  .dropdown-list {
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .v-expansion-panel {
    border-bottom: solid 1px #70b55c;
  }

  .menu-subitem {
    cursor: pointer;
    border-top: solid 1px #cff0c5;
    padding: 0 !important;
  }

  .custom-homeMenu {
    padding: 16px;
    padding-left: 22px;
  }
  .custom-list-item {
    padding-left: 10px;
    font-weight: bold;
    font-size: 1.25rem;
  }
  .custom-list-item-sub {
    padding-left: 45px;
    font-size: 1rem;
  }
  .menu-btn {
    font-size: 30px;
  }

  @media (min-width: 850px) {
    .menu-overlay,
    .menu-dropdown {
      display: none;
    }
  }
</style>
