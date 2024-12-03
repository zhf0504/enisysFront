<template>
  <VContainer>
    <!-- タイトル -->
    <BaseTitle :title="screen.label.title"></BaseTitle>
    <!-- 履歴検索チェックボックス -->
    <VForm @submit.prevent="handleSubmit" class="form-group">
      <VRow class="custom-checkbox">
        <VCheckbox
          v-model="screen.historySearch"
          :label="screen.label.historySearch"
          color="primary"
          hide-details
        ></VCheckbox>
      </VRow>
      <!-- 事業所と支援担当者 -->
      <VRow class="custom-input form-row1 mt-0 pt-0">
        <VCol cols="auto" class="form-row1-sub1">
          <h3 class="custom-label">{{ screen.label.jigyosyo }}</h3>
          <VSelect v-model="screen.selectedOption" :items="screen.jigyoshoLists" hide-details></VSelect>
        </VCol>
        <VCol cols="auto" class="form-row1-sub2">
          <h3 class="custom-label-sub">{{ screen.label.shientanto }}</h3>
          <VCol class="form-row1-sub2-1" @click="openModalShien">
            <VTextField :readonly="true" v-model="screen.selectedShientanto" clearable hide-details></VTextField>
            <VBtn color="primary" class="custom-btn">
              {{ screen.label.select }}
            </VBtn>
            <CMN005_EmpSearch
              :isVisible="screen.openModalShienFlag"
              @update:isVisible="screen.openModalShienFlag = $event"
              @selectedShientanto="handleSelectedShientanto"
            />
          </VCol>
        </VCol>
      </VRow>
      <!-- 会員氏名 -->
      <VRow class="custom-input form-name">
        <h3 class="custom-label">{{ screen.label.memberName.tag }}</h3>
        <VCol class="name-col">
          <h6>{{ screen.label.memberName.lastNm }}</h6>
          <VTextField v-model="screen.lastNm" hide-details></VTextField>
        </VCol>
        <VCol class="name-col">
          <h6>{{ screen.label.memberName.firstNm }}</h6>
          <VTextField v-model="screen.firstNm" hide-details></VTextField>
        </VCol>
        <VCol class="name-col">
          <h6>{{ screen.label.memberName.middleName }}</h6>
          <VTextField v-model="screen.middleName" hide-details></VTextField>
        </VCol>
      </VRow>
      <!-- 会員指名フリガナ -->
      <VRow class="custom-input form-name">
        <h3 class="custom-label">{{ screen.label.memberNameKana.tag }}</h3>
        <VCol class="name-col">
          <h6>{{ screen.label.memberNameKana.lastNmKana }}</h6>
          <VTextField v-model="screen.lastNmKana" hide-details></VTextField>
        </VCol>
        <VCol class="name-col">
          <h6>{{ screen.label.memberNameKana.firstNmKana }}</h6>
          <VTextField v-model="screen.firstNmKana" hide-details></VTextField>
        </VCol>
        <VCol class="name-col">
          <h6>{{ screen.label.memberNameKana.middleNameKana }}</h6>
          <VTextField v-model="screen.middleNameKana" hide-details></VTextField>
        </VCol>
      </VRow>
      <!-- テキストフリー検索 -->
      <VRow class="custom-input form-remarks">
        <h3 class="custom-label">{{ screen.label.remarks }}</h3>
        <VCol>
          <VTextField hide-details></VTextField>
          <p>{{ screen.label.remarksNote }}</p>
        </VCol>
      </VRow>
      <!-- 誕生月と転居届年月 -->
      <VRow class="custom-input form-birtday">
        <VCol cols="5" class="form-birtday-sub1">
          <h3 class="custom-label">{{ screen.label.birthday }}</h3>
          <VSelect v-model="screen.selectedBirtday" :items="screen.tenkyoDateList" hide-details></VSelect>
        </VCol>
        <VCol cols="5" class="form-birtday-sub2">
          <h3 class="custom-label-sub">{{ screen.label.tenkyoDate }}</h3>
          <VCol class="form-row1-sub3-2">
            <VRow>
              <MonthPicker v-model="screen.selectedTenkyoDate" />
            </VRow>
            <VRow>
              <p>{{ screen.label.tenkyoDateNote }}</p>
            </VRow>
          </VCol>
        </VCol>
      </VRow>
      <!-- 各チェックボックスに関する情報を表示 -->
      <VRow class="custom-checkbox form-row3">
        <VCol class="checkbox-col">
          <VCheckbox :label="screen.label.eolInstructionNotRegFlag" color="primary" hide-details></VCheckbox>
        </VCol>
        <VCol class="checkbox-col">
          <VCheckbox :label="screen.label.deceasedOnlyFlag" color="primary" hide-details></VCheckbox>
        </VCol>
        <VCol class="checkbox-col">
          <VCheckbox :label="screen.label.postDeathTasksFlag" color="primary" hide-details disabled></VCheckbox>
        </VCol>
        <VCol class="checkbox-col">
          <VCheckbox :label="screen.label.cremationNotDoneFlag" color="primary" hide-details></VCheckbox>
        </VCol>
        <VCol class="checkbox-col">
          <VCheckbox :label="screen.label.includesContractEndFlag" color="primary" hide-details></VCheckbox>
        </VCol>
      </VRow>
      <!-- PC版で表示する「検索」「戻る」ボタン -->
      <VRow class="form-row4">
        <VBtn @click="onBackClick" class="custom-btn" color="primary">{{ screen.label.BackBtn }}</VBtn>
        <VBtn class="custom-btn" color="primary" type="submit">
          <template v-if="screen.isLoading">
            <VProgressCircular indeterminate size="20" color="white" class="mr-2" />
          </template>
          <template v-else>
            <VIcon>{{ screen.label.SearchIcon }}</VIcon>
          </template>
          {{ screen.label.SearchBtn }}
        </VBtn>
      </VRow>
    </VForm>
  </VContainer>
  <!-- SP版で表示する「検索」「戻る」ボタン -->
  <VRow class="footer-btn">
    <VBtn @click="onBackClick" class="custom-btn" color="primary">{{ screen.label.BackBtn }}</VBtn>
    <VBtn class="custom-btn" color="primary" type="submit" @click="handleSubmit">
      <template v-if="screen.isLoading">
        <VProgressCircular indeterminate size="20" color="white" class="mr-2" />
      </template>
      <template v-else>
        <VIcon>{{ screen.label.SearchIcon }}</VIcon>
      </template>
      {{ screen.label.SearchBtn }}
    </VBtn>
  </VRow>
</template>

<script>
  import BaseTitle from '@/components/BaseTitle.vue';
  import { reactive } from 'vue';
  import CMN005_EmpSearch from './modal/CMN005_EmpSearch.vue';
  import MonthPicker from '@/components/calendar/monthPicker.vue';
  import store from '@/store';
  import router from '@/router';
  import memberList from '@/assets/JsonData/member/MemberList.json';

  export default {
    components: { BaseTitle, MonthPicker, CMN005_EmpSearch },
    setup() {
      // 画面属性の設定: 画面で使用するラベルやテキストを設定するオブジェクト
      const screen = reactive({
        label: {
          title: '会員検索',
          historySearch: '履歴検索',
          jigyosyo: '事業所',
          shientanto: '支援担当者',
          select: '選択',
          memberName: {
            tag: '会員氏名',
            lastNm: '(姓)',
            firstNm: '(名)',
            middleName: '(ミドルネーム)'
          },
          memberNameKana: {
            tag: '会員氏名フリガナ',
            lastNmKana: '(姓)',
            firstNmKana: '(名)',
            middleNameKana: '(ミドルネーム)'
          },
          remarks: 'テキストフリー検索',
          remarksNote: '※既往歴、備考、葬儀予定、納骨予定から入力された文字と一致するテキストから検索します',
          birthday: '誕生月',
          tenkyoDate: '転居届年月',
          tenkyoDateNote: '※転居届が必要な月を指定してください',
          eolInstructionNotRegFlag: '終末期指示書未登録',
          deceasedOnlyFlag: '亡くなった方のみ',
          postDeathTasksFlag: '死後事務残あり',
          cremationNotDoneFlag: '納骨未',
          includesContractEndFlag: '契約終了を含む',
          BackBtn: '戻る',
          SearchIcon: 'mdi-magnify',
          SearchBtn: '検索'
        },
        historySearch: false,
        jigyoshoLists: ['', '東京事業所', '大阪事業所', '沖縄事業所', '福岡事業所', '札幌事業所', '九州事業所'],
        tenkyoDateList: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        //入力した値の取得
        selectedShientanto: null,
        lastNm: null,
        firstNm: null,
        middleName: null,
        lastNmKana: null,
        firstNmKana: null,
        middleNameKana: null,
        selectedBirtday: null,
        selectedTenkyoDate: null,
        openModalShienFlag: false,
        isLoading: false
      });
      // モーダル開き処理
      const openModalShien = () => {
        screen.openModalShienFlag = true;
      };
      // モーダルから値の取得
      const handleSelectedShientanto = (value) => {
        screen.selectedShientanto = value;
      };
      //「戻る」ボタン処理
      const onBackClick = () => {
        router.push({ name: 'BlankPage' });
      };
      //「検索」ボタン処理
      const handleSubmit = () => {
        screen.isLoading = true;
        //TODO 削除  仮でデータ取得する期間は3秒
        setTimeout(() => {
          screen.isLoading = false;
          //親画面 'MemSearch' の権限を設定
          store.dispatch('auth/updatePermission', { flag: 'MemSearch', value: true });
          //会員一覧画面に遷移
          sessionStorage.setItem('MEM001_MemList', JSON.stringify(memberList));
          router.push({ name: 'MemList' });
        }, 1000);
      };
      return {
        screen,
        openModalShien,
        handleSelectedShientanto,
        onBackClick,
        handleSubmit
      };
    }
  };
</script>

<style scoped>
  :deep(.custom-input .v-input__control) {
    background-color: #ffffff;
    width: 100%;
    height: 50px;
  }

  :deep(.custom-input .v-field__field) {
    height: 50px;
  }

  :deep(.custom-checkbox .v-label) {
    font-weight: bolder;
    font-size: 18.72px;
    color: black;
    opacity: 1;
  }

  :deep(.form-birtday-sub2 .v-input__prepend) {
    display: none !important;
  }

  :deep(.v-picker-title) {
    display: none !important;
  }
  .v-row {
    padding-top: 10px;
  }

  .form-row1-sub1 {
    display: flex;
    width: 500px;
    padding-right: 80px;
  }

  .form-row1-sub2 {
    display: flex;
    width: 600px;
  }

  .form-birtday {
    display: flex;
    width: 100%;
  }

  .form-birtday-sub1 {
    display: flex;
    max-width: 500px;
    padding-right: 80px;
  }

  .form-birtday-sub2 {
    display: flex;
    width: 500px;
  }

  .form-birtday-sub2 .v-row:nth-child(1) {
    width: 200px;
  }

  .form-row1 {
    display: flex;
    justify-content: flex-start;
  }

  .form-row1-sub2-1 {
    padding: 0;
    display: flex;
  }

  .form-row1-sub3-2 {
    padding: 0;
  }

  .form-remarks h3 {
    padding-left: 12px;
  }

  .form-name {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    padding-right: 128px;
  }

  .form-name h3 {
    padding: 12px;
  }

  .form-name-sub {
    display: flex;
    gap: 24px;
  }

  .form-name-sub .v-col {
    padding: 0;
  }

  .name-col {
    flex: 1;
  }

  .form-name h6 {
    font-weight: normal;
    opacity: 0.5;
  }

  .form-row4 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px;
  }

  .form-row4 .custom-btn {
    width: 130px;
    border-radius: 17px;
    font-size: 24px;
  }

  .footer-btn {
    display: none;
  }

  .custom-label {
    width: 190px;
  }

  .custom-label-sub {
    width: 150px;
    display: flex;
    align-items: center;
  }

  .form-row1-sub2-1 .custom-btn {
    width: 100px;
    font-size: 18px;
  }

  .checkbox-col {
    padding: 0;
  }

  .custom-date {
    position: absolute;
  }
  .custom-icon-color .v-icon {
    font-size: 20px;
    color: #70b55c !important;
  }

  .custom-icon-size {
    font-size: 40px;
    color: #70b55c;
  }

  .custom-checkbox {
    padding: 0;
  }

  @media (max-width: 1455px) {
    .custom-label-sub {
      width: 190px;
    }
    .form-birtday-sub1 {
      padding-right: 0;
    }
  }

  @media (max-width: 1024px) {
    .form-name {
      padding-right: 12px;
    }
    .form-row3 {
      display: flex;
      flex-direction: row;
    }

    .checkbox-col:nth-child(1) {
      min-width: 100%;
    }
    .checkbox-col:nth-child(2),
    .checkbox-col:nth-child(3),
    .checkbox-col:nth-child(4),
    .checkbox-col:nth-child(5) {
      min-width: 50%;
    }
  }
  /* SP版のCSS */
  @media (max-width: 850px) {
    .form-group {
      padding-bottom: 80px;
    }

    .form-row1-sub1,
    .form-row1-sub2,
    .form-name {
      min-width: 100%;
      padding-top: 10px;
      display: block;
    }

    .form-birtday {
      width: auto;
    }
    .form-birtday-sub2 {
      padding-right: 0;
    }
    .form-row1-sub3-2 .v-row {
      min-width: 100%;
      max-width: 100%;
      padding-right: 0;
    }
    .form-name {
      padding: 10px 12px 12px;
    }
    .form-name h3 {
      padding-left: 0;
      padding-right: 0;
    }
    .form-name .v-col {
      padding: 0;
      margin-top: 12px;
    }
    .custom-label {
      width: 100%;
      padding-bottom: 12px;
    }
    .custom-label-sub {
      width: 100%;
      padding-bottom: 12px;
    }
    .name-col {
      display: inline-block;
      margin-top: 8px;
    }
    .name-col:nth-child(2) {
      width: 48%;
      float: left;
    }
    .name-col:nth-child(3) {
      width: 48%;
      float: right;
    }
    .name-col:nth-child(4) {
      width: 100%;
    }

    .form-row1-sub1,
    .form-birtday-sub1 {
      padding-right: 0px;
    }
    .form-birtday-sub1,
    .form-birtday-sub2 {
      min-width: 49%;
      display: block;
    }

    .form-birtday-sub1 {
      margin-right: 1%;
    }

    .form-birtday-sub2 {
      margin-left: 1%;
    }

    .form-row4 {
      display: none;
    }
    .footer-btn {
      position: fixed;
      display: flex;
      justify-content: space-between;
      bottom: 0;
      left: 0;
      width: 103%;
      background-color: #f5f5f5;
      padding: 15px 15px 25px 15px;
    }
    .footer-btn .custom-btn {
      width: 30%;
      border-radius: 24px;
      font-size: 24px;
    }
    .footer-btn .custom-btn:nth-child(1) {
      margin-left: 30px;
    }

    .footer-btn .custom-btn:nth-child(2) {
      margin-right: 30px;
    }
  }
</style>
