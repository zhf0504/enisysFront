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
      <!-- 事業所と契約当者 -->
      <VRow class="custom-input form-row1 mt-0 pt-0">
        <VCol cols="auto" class="form-row1-sub1">
          <h3 class="custom-label">{{ screen.label.jigyosyo }}</h3>
          <VSelect
            v-model="screen.selectedjigyousho"
            :items="screen.jigyoshoLists"
            @update:model-value="handleDropdownChange"
            @focus="handleDropdownOpen"
            hide-details
          ></VSelect>
        </VCol>
        <VCol cols="auto" class="form-row1-sub2">
          <h3 class="custom-label-sub">{{ screen.label.shientanto }}</h3>
          <VCol class="form-row1-sub2-1" @click="openModalShien">
            <VTextField :readonly="true" v-model="screen.selectedShientanto" hide-details></VTextField>
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
      <VRow class="custom-input form-row2">
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
      <VRow class="custom-input form-row2">
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

      <!-- 請求方法と契約内容 -->
      <VRow class="custom-input form-row5">
        <VCol cols="auto" class="form-row5-sub1">
          <h3 class="custom-label">{{ screen.label.blingMethod }}</h3>
          <VSelect
            v-model="screen.selectedBling"
            :items="screen.blingMethodList"
            hide-details
            @update:model-value="handleDropdownChange"
            @focus="handleDropdownOpen"
          ></VSelect>
        </VCol>

        <VCol cols="auto" class="form-row5-sub2">
          <h3 class="custom-label">{{ screen.label.contractDetails }}</h3>
          <VSelect
            v-model="screen.selectedDetails"
            :items="screen.contractDetailsList"
            hide-details
            @update:model-value="handleDropdownChange"
            @focus="handleDropdownOpen"
          ></VSelect>
        </VCol>
      </VRow>

      <!-- 各チェックボックスに関する情報を表示 -->
      <VRow class="custom-checkbox form-row3">
        <VCol cols="auto" class="checkbox-col">
          <VCheckbox :label="screen.label.deceasedOnlyFlag" color="primary" hide-details></VCheckbox>
        </VCol>
        <VCol cols="auto" class="checkbox-col">
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
  import store from '@/store';
  import router from '@/router';
  import contractList from '@/assets/JsonData/contract/contractList.json';
  // import { useInteractionLogger } from '@/composables/useInteractionLogger';

  export default {
    components: { BaseTitle, CMN005_EmpSearch },
    setup() {
      //TODO モダールのログ
      // const {logModalOpen, logModalClose, logValueOnly} = useInteractionLogger();

      // 画面属性の設定: 画面で使用するラベルやテキストを設定するオブジェクト
      const screen = reactive({
        label: {
          title: '契約検索',
          historySearch: '履歴検索',
          jigyosyo: '事業所',
          shientanto: '契約担当者',
          blingMethod: '請求方法',
          contractDetails: '契約内容',
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
          deceasedOnlyFlag: '亡くなった方のみ',
          includesContractEndFlag: '契約終了を含む',
          BackBtn: '戻る',
          SearchIcon: 'mdi-magnify',
          SearchBtn: '検索',
          modalName: 'CMN005_EmpSearch',
          dropdownName: 'ドロップダウン開ける'
        },
        jigyoshoLists: ['', '東京事業所', '大阪事業所', '沖縄事業所', '福岡事業所', '札幌事業所', '九州事業所'],
        blingMethodList: ['', '口座振替', '振込', '集金', '予備費'],
        contractDetailsList: [
          '',
          'K001, 入会金',
          'K002, 身元保証支援',
          'K011, 月会費',
          'K003, 身元保証支援(三菱UFJ信託)',
          'K012, 年会費',
          'K202, 信託入会金',
          'K203, 信託管理費'
        ],
        //入力した値の取得
        historySearch: false,
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

      // ドロップダウン開ける
      const handleDropdownOpen = () => {
        // logValueOnly(screen.label.dropdownName);
      };
      //ドロップダウン値
      const handleDropdownChange = (value) => {
        console.log(value);
        // logValueOnly(value);
      };
      // モーダル開き処理
      const openModalShien = () => {
        screen.openModalShienFlag = true;
        // logModalOpen(screen.label.modalName);
      };
      // モーダル閉め処理
      const closeModal = (value) => {
        screen.openModalShienFlag = value;
        // logModalClose(screen.label.modalName)
      };
      // モーダルから値の取得
      const handleSelectedShientanto = (value) => {
        screen.selectedShientanto = value;
        // logValueOnly(value);
      };
      //「戻る」ボタン処理
      const onBackClick = () => {
        router.push({ name: 'BlankPage' });
      };
      //「検索」ボタン処理 //
      const handleSubmit = () => {
        screen.isLoading = true;
        //TODO 削除  仮でデータ取得する期間は3秒
        setTimeout(() => {
          screen.isLoading = false;
          //TODO  親画面 'ContractList' の権限を設定
          store.dispatch('auth/updatePermission', { flag: 'ContrSearch', value: true });
          //会員一覧画面に遷移
          sessionStorage.setItem('KYK001_ContrSearch', JSON.stringify(contractList));
          // 履歴フラグに変換する     モード： 1:履歴モード    2:通常モード
          if (screen.historySearch) {
            sessionStorage.setItem('mode', '1');
          } else {
            sessionStorage.setItem('mode', '2');
          }

          router.push({ name: 'ContrList' });
        }, 1000);
      };
      return {
        screen,
        openModalShien,
        handleSelectedShientanto,
        closeModal,
        onBackClick,
        handleSubmit,
        handleDropdownChange,
        handleDropdownOpen
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

  :deep(.custom-input .v-field__input) {
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
    width: 30%;
    margin-right: 8%;
  }

  .form-row1-sub2 {
    display: flex;
    width: calc(28.5% + 100px);
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

  .form-row2 {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    padding-right: 128px;
  }

  .form-row2 h3 {
    padding: 12px;
  }

  .form-row2-sub {
    display: flex;
    gap: 24px;
  }

  .form-row2-sub .v-col {
    padding: 0;
  }

  .name-col {
    flex: 1;
    padding: 0 18px 0 0;
  }

  .form-row2 h6 {
    font-weight: normal;
    opacity: 0.5;
  }

  .form-row3 {
    display: flex;
    justify-content: flex-start;
    gap: 2.5em;
  }

  .form-row4 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px 15px 15px 0px;
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
    width: 180px;
  }

  .custom-label-sub {
    width: 150px;
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

  .form-row5-sub1 {
    display: flex;
    width: 30%;
    margin-right: 8%;
  }

  .form-row5-sub2 {
    display: flex;
    width: 28.5%;
  }

  @media (max-width: 1555px) {
    .custom-label-sub {
      width: 230px;
    }
    .form-row5-sub1 {
      width: 34em;
    }
  }

  @media (max-width: 850px) {
    .form-row2 {
      padding-right: 12px;
    }
    .form-row3 {
      display: block;
    }

    .checkbox-col:nth-child(1) {
      min-width: 50%;
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
    .form-row2 {
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
    .form-row2 {
      padding: 10px 12px 12px;
    }
    .form-row2 h3 {
      padding-left: 0;
      padding-right: 0;
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
      width: 49%;
      margin-top: 8px;
    }
    .name-col:nth-child(2) {
      padding-right: 12px;
    }
    .name-col:nth-child(3) {
      padding-left: 12px;
      padding-right: 0;
    }
    .name-col:nth-child(4) {
      width: 100%;
      padding-right: 0;
    }
    .form-row1-sub1 {
      padding-right: 1em;
    }
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

    .form-row5 {
      display: block;
    }
    .form-row5-sub1,
    .form-row5-sub2 {
      display: block;
      width: 100%;
    }

    .footer-btn {
      position: fixed;
      display: flex;
      justify-content: space-between;
      bottom: 0;
      left: 0;
      width: 103%;
      background-color: #f5f5f5;
      padding: 15px 0px 25px 15px;
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
