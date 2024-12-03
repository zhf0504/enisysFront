<template>
  <VContainer>
    <VList>
      <VExpansionPanels>
        <!-- 「BlankPage」の固定 -->
        <VExpansionPanel>
          <VListItem @click="navigateTo(screen.menuHome.route)" class="custom-expansion">
            <VListItemAction>
              <VIcon color="#70b55c" class="custom-icon">
                {{ screen.menuHome.icon }}
              </VIcon>
              <VListItemTitle class="custom-list-item">
                {{ screen.menuHome.title }}
              </VListItemTitle>
            </VListItemAction>
          </VListItem>
        </VExpansionPanel>
        <!-- リクエストからMenuListのループ -->
        <VExpansionPanel v-for="(item, index) in screen.menuItems" :key="index">
          <VExpansionPanelTitle>
            <VListItem class="custom-expansion">
              <VListItemAction>
                <VIcon color="#70b55c" class="custom-icon">
                  {{ screen.noteIcon }}
                </VIcon>
                <VListItemTitle class="custom-list-item">
                  {{ item.oyaMenuName }}
                </VListItemTitle>
              </VListItemAction>
            </VListItem>
          </VExpansionPanelTitle>
          <VExpansionPanelText>
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
  </VContainer>
</template>

<script>
  import { reactive } from 'vue';
  import menuData from '@/assets/JsonData/MenuAdmin.json';
  import router from '@/router';
  export default {
    setup() {
      const screen = reactive({
        menuHome: {
          //BlankPage固定の設定
          title: 'Home',
          icon: 'mdi-home-variant-outline',
          route: '/BlankPage'
        },
        menuItems: menuData, //jsonデータ参照
        noteIcon: 'mdi-book-open-blank-variant-outline' //ノートIcon
      });
      //画面遷移用メソッド
      const navigateTo = (route) => {
        router.push(route);
      };
      return {
        screen,
        navigateTo
      };
    }
  };
</script>

<style scoped>
  .v-container {
    justify-content: center;
  }

  .menu-subitem {
    cursor: pointer;
    border-top: solid 1px #70b55c;
    padding: 0 !important;
  }

  .v-expansion-panel-title {
    padding: 0;
  }

  .v-expansion-panel {
    border-bottom: solid 1px #70b55c;
  }

  .custom-expansion {
    padding: 0 !important;
  }

  .custom-icon {
    font-size: 24px;
  }

  .v-expansion-panel-text {
    padding-left: 0;
    padding-right: 0;
    font-size: 5rem !important;
  }

  .custom-list-item {
    padding-left: 10px;
    font-weight: bold;
    font-size: 1rem;
  }

  .custom-list-item-sub {
    padding-left: 20px;
    font-size: 0.8rem;
  }
</style>
