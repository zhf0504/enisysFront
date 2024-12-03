<template>
  <div v-if="errorMessage" class="notification-error">
    <p>{{ errorMessage }}</p>
  </div>
</template>

<script>
  export default {
    name: 'NotificationError',
    props: {
      errorCode: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        errorMessage: ''
      };
    },
    created() {
      this.setErrorMessage();
    },
    methods: {
      setErrorMessage() {
        switch (this.errorCode) {
          case 'E001':
            this.errorMessage = 'システムエラーが発生しました。再度ログインして試してください。';
            break;
          case 'E002':
            this.errorMessage = 'ご利用の端末が登録されていないため、支給されている社用端末でログインしてください。';
            break;
          case 'E003':
            this.errorMessage = 'ユーザー名またはパスワードに誤りがあります。';
            break;
          case 'E006':
            this.errorMessage =
              '入力された新しいパスワードが基準を満たしていないです。別のパスワードを入力してください。';
            break;
          case 'E007':
            this.errorMessage =
              '入力された新しいパスワードと新しいパスワード（確認）が一致しません。もう一度入力してください。';
            break;
          case 'E008':
            this.errorMessage = '変更前のパスワードと同じです。新しいパスワードを設定してください。';
            break;
          case 'E020':
            this.errorMessage = '会員データが一つも選択されてません。選択しなおしてください。';
            break;
          case 'E021':
            this.errorMessage = '会員データが二つ以上選択されています。一つだけ選択してください。';
            break;
          default:
            this.errorMessage = '予期せぬエラーを発生しました。';
        }
      }
    }
  };
</script>

<style scoped>
  .notification-error {
    background-color: #ffdddd;
    color: #d8000c;
    border: 1px solid #d8000c;
    padding: 10px;
    margin: 10px 0;
  }
</style>
