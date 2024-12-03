<template>
  <VRow>
    <div class="title">
      <h1>{{ title }}</h1>
      <hr />
      <p v-if="titleNote">{{ titleNote }}</p>
    </div>
  </VRow>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      titleNote: {
        type: String,
        default: ''
      }
    }
  };
</script>

<style scoped>
  /* ヘッダーの水平線*/
  hr {
    height: 2px;
    border: solid #70b55c;
  }

  /* タイトルの範囲調整 */
  .title {
    padding-bottom: 24px;
    width: 100%;
  }
  .title p {
    font-size: 11px;
  }
</style>
