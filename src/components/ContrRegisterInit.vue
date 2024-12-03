<template>
  <div class="sticky-header">
    <BaseTitle class="mx-4 my-4" :title="screen.label.title" :titleNote="screen.label.titleNote" />
    <VTabs v-model="currentTab" grow>
      <VTab
        class="tab-btn"
        :value="screen.MemberRegister"
        :class="{ 'active-tab': currentTab === screen.MemberRegister }"
        tabindex="1"
      >
        <h3>{{ screen.label.MemberRegister }}</h3>
      </VTab>
      <VTab
        class="tab-btn"
        :value="screen.ContractRegister"
        :class="{ 'active-tab': currentTab === screen.ContractRegister }"
        tabindex="2"
      >
        <h3>{{ screen.label.ContractRegister }}</h3>
      </VTab>
    </VTabs>
  </div>

  <transition name="slide-fade">
    <div class="tab-contents" v-if="currentTab === screen.MemberRegister">
      <MEM003_MemRegister />
    </div>
    <div class="tab-contents" v-else>
      <KYK003_ContrRegister />
    </div>
  </transition>

  <footer class="sticky-footerBtn">
    <VBtn @click="screen.isExpanded = !screen.isExpanded" class="footer-button-sub isPC" :class="menuisOpen? 'custom-menuisOpen' : 'custom-menuisClose'">
      <VIcon class="custom-icon">{{ screen.isExpanded ? 'mdi-chevron-down' : 'mdi-chevron-up' }}</VIcon>
    </VBtn>
    <VBtn @click="screen.isExpanded = !screen.isExpanded" class="footer-button-sub isSP">
      <VIcon class="custom-icon">{{ screen.isExpanded ? 'mdi-chevron-down' : 'mdi-chevron-up' }}</VIcon>
    </VBtn>
    <VExpandTransition>
      <div v-if="screen.isExpanded" class="sticky-footerBtn-sub" :class="menuisOpen? 'custom-stickyBtnOpen' : 'custom-stickyBtnClose'">
        <VSpacer />
        <VBtn class="custom-btn" @click="handleBackBtn" color="primary" :text="screen.button.back" />
        <VSpacer />
        <VSpacer class="isPC" />
        <VSpacer class="isPC" />
        <VSpacer class="isPC" />
        <VSpacer />
        <VBtn class="custom-btn" @click="handleRegisterBtn" color="primary" :text="screen.button.register" />
        <VSpacer />
      </div>
    </VExpandTransition>
  </footer>
</template>

<script>
  import KYK003_ContrRegister from '@/views/KYK003_ContrRegister.vue';
  import MEM003_MemRegister from '@/views/MEM003_MemRegister.vue';
  import { computed, reactive, ref } from 'vue';
  import BaseTitle from './BaseTitle.vue';
  import router from '@/router';
import store from '@/store';
  // import store from '@/store';

  export default {
    components: { BaseTitle, KYK003_ContrRegister, MEM003_MemRegister },
    setup() {
      const screen = reactive({
        label: {
          title: '契約登録',
          titleNote:
            '※入力タイムアウトを防止するため、この画面のみセッションを維持しています。入力が完了したら、速やかに契約登録を行ってください。',
          MemberRegister: '会員情報',
          ContractRegister: '契約情報'
        },
        button: {
          register: '登録',
          back: '戻る'
        },
        MemberRegister: 'MemberRegistration',
        ContractRegister: 'ContractRegistration',
        isExpanded: true
      });
      const currentTab = ref(screen.MemberRegister);

      const handleBackBtn = () => {
        router.push({ name: 'BlankPage' });
      };

      const handleRegisterBtn = () => {
        console.log('「登録」の処理');
      };

      const menuisOpen = computed(() => store.state.auth.menuisOpen);

      return {
        screen,
        currentTab,
        handleBackBtn,
        handleRegisterBtn,
        menuisOpen
      };
    }
  };
</script>

<style scoped>
  :deep(.v-tab--selected .v-tab__slider) {
    opacity: 0 !important;
  }
  .sticky-header {
    position: sticky;
    top: 82px;
    z-index: 500;
    background-color: #fafae0;
    padding: 10px 0;
  }

  .sticky-footerBtn-sub {
    position: sticky;
    bottom: 0;
    padding: 10px 0;
    transform: translateX(-70px);
    background-color: white;
    width: calc(100% + 70px);
    display: flex;
    justify-content: space-around;
  }

  .sticky-footerBtn {
    position: sticky;
    bottom: 0;
    z-index: 10;
  }

  .tab-btn {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
    text-transform: none;
    background-color: #ddd;
  }

  .tab-btn:nth-child(1) {
    border-top-left-radius: 20px !important;
    border-bottom-left-radius: 20px !important;
  }

  .tab-btn:nth-child(2) {
    border-top-right-radius: 20px !important;
    border-bottom-right-radius: 20px !important;
  }

  .active-tab {
    background-color: #70b55c;
  }

  .v-tabs-slider {
    height: 2px;
    border-radius: 10px;
    margin: 0 8px;
    background-color: #70b55c;
  }

  .active-tab h3 {
    color: white;
  }

  .tab-contents {
    padding: 20px;
  }

  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.5s ease;
  }

  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateX(-10px);
    opacity: 0;
  }

  .tab-shadow {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .custom-btn {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    font-size: 20px;
    border-radius: 15px;
  }

  .footer-button-sub {
    border-bottom: none;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }

  .custom-icon {
    font-size: 24px;
  }

  .custom-menuisOpen {
    transform: translateX(-37px)
  }

  .custom-menuisClose {
    transform: translateX(-20px)
  }
  
  .custom-stickyBtnOpen {
    width: calc(100% + 70px);
    transition: all 0.5s ease;
  }

  .custom-stickyBtnClose {
    width: calc(100% + 125px);
    transition: all 0.5s ease;
  }

  /* Responsive */
  @media (max-width: 850px) {
    .tab-btn {
      font-size: 1.2rem;
    }

    .custom-tab {
      background-color: #fafae0;
      height: 80px;
      display: flex;
      align-items: center;
      top: 80px;
    }

    .sticky-header {
      box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    }

    .sticky-footerBtn-sub {
      transform: translateX(0);
      width: 100% ;
      max-width: 100% ;
    }
  }
</style>
