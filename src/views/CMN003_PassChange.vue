<template>
  <VContainer>
    <!-- タイトル -->
    <BaseTitle :title="screen.label.title" class="title"></BaseTitle>
    <div class="errorMess">
      <NotificationError v-if="screen.errorCode" :errorCode="screen.errorCode" />
    </div>
    <VForm @submit.prevent="handleSubmit" class="password-change">
      <!-- 現在のパスワード -->
      <VRow v-if="showCurrentPasswordRow" class="current-password">
        <VCol class="current-pass-input">
          <h3>{{ screen.password.currentPassword }}</h3>
          <VTextField
            v-model="screen.currentPassword"
            :type="screen.showCurrentPassword ? 'text' : 'password'"
            class="custom-input"
            outlined
            @focus="screen.isFocusedCurrentPass = true"
            @blur="screen.isFocusedCurrentPass = false"
            v-bind="passwordConstraints"
            hide-details
          >
            <template v-if="screen.isFocusedCurrentPass" v-slot:append-inner>
              <VIcon @click="screen.showCurrentPassword = !screen.showCurrentPassword" class="cursor-pointer">
                {{ screen.showCurrentPassword ? 'mdi-eye-off' : 'mdi-eye' }}
              </VIcon>
            </template>
          </VTextField>
        </VCol>
      </VRow>

      <!-- 新しいパスワード -->
      <VRow class="new-password">
        <VCol class="new-pass-input">
          <h3>{{ screen.password.newPassword }}</h3>
          <VTextField
            v-model="screen.newPassword"
            :type="screen.showNewPassword ? 'text' : 'password'"
            class="custom-input"
            outlined
            @focus="screen.isFocusedNewPass = true"
            @blur="screen.isFocusedNewPass = false"
            v-bind="passwordConstraints"
            hide-details
          >
            <template v-if="screen.isFocusedNewPass" v-slot:append-inner>
              <VIcon @click="screen.showNewPassword = !screen.showNewPassword" class="cursor-pointer">
                {{ screen.showNewPassword ? 'mdi-eye-off' : 'mdi-eye' }}
              </VIcon>
            </template>
          </VTextField>
        </VCol>
      </VRow>

      <!-- パスワード確認 -->
      <VRow class="confirm-password">
        <VCol class="confirm-pass-input">
          <h3>{{ screen.password.confirmPassword }}</h3>
          <VTextField
            v-model="screen.confirmPassword"
            :type="screen.showConfirmPassword ? 'text' : 'password'"
            class="custom-input"
            outlined
            @focus="screen.isFocusedConfirmPass = true"
            @blur="screen.isFocusedConfirmPass = false"
            v-bind="passwordConstraints"
            hide-details
          >
            <template v-if="screen.isFocusedConfirmPass" v-slot:append-inner>
              <VIcon @click="screen.showConfirmPassword = !screen.showConfirmPassword" class="cursor-pointer">
                {{ screen.showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye' }}
              </VIcon>
            </template>
          </VTextField>
        </VCol>
      </VRow>

      <div class="form-btn">
        <VBtn type="submit" color="primary" class="custom-btn">{{ screen.label.passwordChangeBtn }}</VBtn>
      </div>
    </VForm>
  </VContainer>
</template>

<script>
  import BaseTitle from '@/components/BaseTitle.vue';
  import NotificationError from '@/components/error/NotificationError.vue';
  import { onMounted, reactive, ref } from 'vue';

  export default {
    components: { BaseTitle, NotificationError },
    setup() {
      const section = 1;
      const passwordConstraints = { minlength: 8, maxlength: 30 };
      const showCurrentPasswordRow = ref(true);
      const screen = reactive({
        label: {
          title: 'パスワード変更',
          title2: 'パスワード変更 (再設定)',
          passwordChangeBtn: 'パスワード変更'
        },
        password: {
          currentPassword: '現在のパスワード',
          newPassword: '新しいパスワード',
          confirmPassword: '新しいパスワード（確認）'
        },
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        showCurrentPassword: false,
        showNewPassword: false,
        showConfirmPassword: false,
        isFocusedCurrentPass: false,
        isFocusedNewPass: false,
        isFocusedConfirmPass: false,
        showPasswordHint: false,
        errorCode: ''
      });

      const validatePasswords = () => {
        const passwordPattern = /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,30}$/i;

        //パスワード基準を満たさない
        if (!passwordPattern.test(screen.newPassword)) {
          screen.errorCode = 'E006';
          return false;
        }

        //入力した新しいパスワードが一致しない
        if (screen.newPassword !== screen.confirmPassword) {
          screen.errorCode = 'E007';
          return false;
        }

        //新しいパスワードと既存パスワードが同じ
        if (screen.currentPassword === screen.newPassword) {
          screen.errorCode = 'E008';
          return false;
        }

        //直近3回のパスワードが使われている。	E009 エラー
        //バックエンドの方先にやります
        //TODO 追加エラー表示
        screen.errorCode = '';
        return true;
      };

      // Form submission
      const handleSubmit = () => {
        if (validatePasswords()) {
          return true;
        }
      };

      //初期表示
      onMounted(() => {
        if (section != 1) {
          screen.label.title = screen.label.title2;
          showCurrentPasswordRow.value = false;
        }
      });

      return {
        screen,
        section,
        showCurrentPasswordRow,
        validatePasswords,
        handleSubmit,
        passwordConstraints
      };
    }
  };
</script>

<style scoped>
  .password-change {
    width: 35%;
    margin-left: 20%;
    margin-top: 1em;
  }

  .password-change h3 {
    letter-spacing: 2px;
  }

  :deep(.custom-input .v-input__control) {
    background-color: #ffffff;
    width: 100%;
    height: 50px;
  }

  :deep(.custom-input .v-field__input) {
    height: 50px;
  }

  .form-btn {
    text-align: center;
    margin-top: 3em;
  }

  .custom-btn {
    text-align: center;
    width: 50%;
    height: 50px;
  }

  @media (max-width: 794px) {
    .password-change {
      width: 85%;
      margin: auto;
      margin-top: 2em;
    }

    .custom-btn {
      width: 55%;
      margin-right: 10%;
    }
    :deep(.custom-input .v-input__control) {
      width: 100%;
    }
  }
</style>
