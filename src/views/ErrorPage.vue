<template>
  <VContainer>
    <NotificationError class="mb-5" :errorCode="errorCode" />
    <router-link to="/">ログインへ</router-link>
  </VContainer>
</template>

<script>
  import NotificationError from '@/components/error/NotificationError.vue';
  import { useAuth } from '@/composables/userAuth';

  export default {
    components: { NotificationError },
    setup() {
      const errorCode = 'E001';
      const { logout } = useAuth();
      logout();
      return {
        errorCode
      };
    }
  };
</script>

<style></style>
