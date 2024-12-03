<template>
  <VContainer class="container-login">
    <BaseTitle :title="screen.title" class="title"></BaseTitle>
    <div class="errorMess">
      <NotificationError v-if="screen.errorCode" :errorCode="screen.errorCode" />
    </div>
    <VForm v-if="!(screen.errorCode == 'E001' && screen.errorCode)" class="form-row" @submit.prevent="handleSubmit">
      <VRow>
        <VCol class="form-group1 mb-3">
          <h2>{{ screen.label.ID }}</h2>
          <span>{{ screen.label.colon }}</span>
          <p class="isPC">{{ screen.uuidDisplayisPC }}</p>
          <p class="isSP">{{ screen.uuidDisplayisSP }}</p>
        </VCol>
      </VRow>
      <VRow>
        <VCol class="mb-3">
          <h2>{{ screen.label.user }}</h2>
          <VTextField v-model="screen.employeeCode" class="custom-input" outlined hide-details />
        </VCol>
      </VRow>
      <VRow>
        <VCol class="form-pass mb-3">
          <h2>{{ screen.label.password }}</h2>
          <VTextField
            v-model="screen.password"
            :type="screen.showPassword ? 'text' : 'password'"
            class="custom-input"
            outlined
            @focus="screen.isFocused = true"
            @blur="screen.isFocused = false"
          >
            <template v-if="screen.isFocused" v-slot:append-inner>
              <VIcon @click="screen.showPassword = !screen.showPassword" class="cursor-pointer">
                {{ screen.showPassword ? 'mdi-eye-off' : 'mdi-eye' }}
              </VIcon>
            </template>
          </VTextField>
        </VCol>
      </VRow>

      <div class="form-btn">
        <VBtn type="submit" color="primary" class="custom-btn">{{ screen.label.loginBtn }}</VBtn>
      </div>
    </VForm>
  </VContainer>
</template>

<script>
  import { reactive } from 'vue';
  import NotificationError from '@/components/error/NotificationError.vue';
  import { useAuth } from '@/composables/userAuth';
  import BaseTitle from '@/components/BaseTitle.vue';
  import store from '@/store';
  import router from '@/router';
  // import Cookies from "js-cookie";

  export default {
    components: { BaseTitle, NotificationError },
    setup() {
      // リアクティブな変数を定義
      const screen = reactive({
        label: {
          title: 'ログイン',
          ID: '端末ID',
          colon: ':',
          user: '従業員コード',
          password: 'パスワード',
          loginBtn: 'ログイン'
        },
        title: 'ログイン',
        uuidDisplayisPC: '71551E9F-FA01-6947-AFEA-11B73F1DF273',
        uuidDisplayisSP: '71551E9F-FA01-6947',
        employeeCode: '9999:enisitaro',
        password: 'admin@11',
        showPassword: false,
        isFocused: false,
        errorCode: ''
      });

      const { login } = useAuth();
      const generateFakeToken = (username) => {
        return btoa(`${username}-fakeToken-${Date.now()}`);
      };

      // const uuidFromCookies = Cookies.get("uuid");
      //クッキーからUUID(デバイス)をチェック
      // if (uuidFromCookies) {
      //   uuidDisplay.value = uuidFromCookies.value;
      //   // errorCode.value = "E001";
      // } else {
      //   // router.push("/ErrorPage");
      // }

      // ボタンがクリックされたときの処理
      const handleSubmit = () => {
        if (screen.password.length < 4) {
          screen.errorCode = 'E003'; // パスワードが4文字未満の場合、エラーコードを設定
        } else {
          screen.errorCode = ''; // エラーコードをクリア
        }
        //TODO 削除START
        if (screen.password == 'admin@11') {
          const token = generateFakeToken(screen.employeeCode);
          const user = {
            username: screen.employeeCode,
            role: 'admin'
          };
          store.dispatch('auth/login', { user, token });
          const userData = { username: 'えにし太郎' };
          login(userData);
          router.push('/BlankPage');
        } else {
          screen.errorCode = 'E003'; // パスワードが4文字未満の場合、エラーコードを設定
        }
        //TODO 削除END
        console.log(`Code: ${screen.employeeCode}, Password: ${screen.password}`); // コードとパスワードをコンソールに表示
      };

      // テンプレートで使用する変数と関数を返す
      return {
        screen,
        handleSubmit,
        generateFakeToken
      };
    }
  };
</script>

<style scoped>
  .container-login {
    display: block;
    width: 80%;
    margin: 0 auto;
    margin-top: 30px;
  }
  .title {
    padding: 0;
  }
  .errorMess {
    width: auto;
    height: 70px;
  }
  .form-row {
    width: 500px;
    margin: 0 auto;
    margin-top: 30px;
  }
  .form-group1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .form-group1 h2,
  .form-group2 h2,
  .form-group3 h2 {
    flex-shrink: 0;
  }
  .form-group1 span {
    font-size: 24px;
    font-weight: bolder;
    margin: 0 20px;
    flex-shrink: 0;
  }
  .form-group1 p {
    flex-grow: 1;
    margin: 0;
  }
  .form-group1,
  .form-group2,
  .form-group3 {
    margin-bottom: 20px;
  }
  :deep(.custom-input .v-input__control) {
    background-color: #ffffff;
  }

  :deep(.custom-input .v-field__message) {
    color: red;
  }

  :deep(.custom-input .v-input__underlay .v-field__outline__notch) {
    border-color: transparent;
  }

  :deep(.custom-input .v-input__control .v-field__outline__notch) {
    border-bottom: 1px solid #ccc;
  }
  .form-pass {
    position: relative;
  }
  :deep(.form-pass .v-field) {
    padding-right: 25px;
  }

  .eye-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-15%);
    right: 22px;
    cursor: pointer;
    opacity: 0.7;
  }
  .form-btn {
    width: 100%;
    text-align: center;
  }
  .custom-btn {
    width: 100%;
    max-width: 300px;
    font-size: 16px;
  }

  @media (max-width: 850px) {
    .container-login {
      margin-top: 5px;
      padding: 10px;
    }
    .form-row {
      width: 100%;
      padding: 0 10px;
    }
  }
</style>
