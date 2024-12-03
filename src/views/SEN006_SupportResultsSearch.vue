<template>
  <VContainer>
     <!-- タイトル -->
     <BaseTitle :title="screen.label.title"></BaseTitle>
     <VForm @submit.prevent="handleSubmit">
        <!-- 履歴検索チェックボックス -->
        <VRow class="custom-checkbox">
          <VCheckbox
            v-model="screen.historySearch"
            :label="screen.label.historySearch"
            color="primary"
            hide-details
          ></VCheckbox>
        </VRow>
        <!-- 事業所と支援担当者 -->
        <VRow class="custom-input form-row1 custom-gap">
        <VCol cols="auto" class="form-row1-sub1">
          <h3 class="custom-label">{{ screen.label.jigyosyo }}</h3>
          <VSelect v-model="screen.selectJigyosyo" :items="screen.jigyoshoLists" hide-details></VSelect>
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
      <!-- 支援業務 -->
      <VRow class="custom-input form-row1 ">
        <VCol cols="6" class="form-row1-sub1">
          <h3 class="custom-label">{{ screen.label.SupportWork }}</h3>
          <VSelect v-model="screen.selectedOption" :items="screen.SupportWorkLists" hide-details></VSelect>
        </VCol>
      </VRow>
      <!-- 実施日 -->
      <VRow class="custom-input">
      <h3 class="custom-label custom-label-sub1">{{ screen.label.ImplementationDate }}</h3>
          <VCol cols="auto" class="custom-dateInput">
            <h6>{{ screen.label.MonthDate.StartDate }}</h6>
            <VDateInput
                v-model="screen.ImplementationDate1"
                :value="screen.ImplementationDateValue1"
                :hide-header="false"
                :header="screen.label.dateHeader"
                :title="''"
                color="#70B55C"
                :placeholder="screen.label.datePlaceholder"
                :prepend-inner-icon="screen.label.dateIcon"
                clearable
                show-adjacent-months
                hide-details
                hide-title
                @keydown.prevent
                ok-text="はい"
                cancel-text="キャンセル"
            />
          </VCol>
          <p class="custom-text">{{ screen.label.Text }}</p>
          <VCol cols="auto" class="custom-dateInput">
            <h6>{{ screen.label.MonthDate.EndDate }}</h6>
            <VDateInput
                v-model="screen.ImplementationDate2"
                :value="screen.ImplementationDateValue2"
                :hide-header="false"
                :header="screen.label.dateHeader"
                :title="''"
                color="#70B55C"
                :placeholder="screen.label.datePlaceholder"
                :prepend-inner-icon="screen.label.dateIcon"
                clearable
                show-adjacent-months
                hide-details
                hide-title
                @keydown.prevent
                ok-text="はい"
                cancel-text="キャンセル"
            />
          </VCol>
      </VRow>
      <!-- 「戻る」「検索」ボタン -->
      <VRow class="form-row1 form-row4" >
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
</template>

<script>
import BaseTitle from '@/components/BaseTitle.vue';
import { reactive, watch } from 'vue';
import router from '@/router';
import CMN005_EmpSearch from './modal/CMN005_EmpSearch.vue';


  export default {
    components: { BaseTitle, CMN005_EmpSearch },
    setup() {
      // 画面属性の設定: 画面で使用するラベルやテキストを設定するオブジェクト
      const screen = reactive({
        label: {
          title: '支援実績検索',
          historySearch: '履歴検索',
          jigyosyo: '事業所',
          shientanto: '支援担当者',
          select: '選択',
          SupportWork: '支援業務',
          ImplementationDate: '実施日',
          dateHeader: '日付の選択',
          datePlaceholder: '年/月/日',
          dateIcon: 'mdi-calendar-month',
          Text: '～',
            memberName: {
              tag: '会員氏名',
              lastNm: '(姓)',
              firstNm: '(名)',
              middleName: '(ミドルネーム)'
            },
            memberNameKana: {
              tag: '会員フリガナ',
              lastNmKana: '(姓)',
              firstNmKana: '(名)',
              middleNameKana: '(ミドルネーム)'
            },
            MonthDate: {
              StartDate: '(開始日)',
              EndDate: '(終了日)'
            },
            BackBtn: '戻る',
            SearchIcon: 'mdi-magnify',
            SearchBtn: '検索',
        },
        ImplementationDate1: null,
        ImplementationDateValue1: null,
        ImplementationDate2: null,
        ImplementationDateValue2: null,
        historySearch: false,
        jigyoshoLists: ['', '東京事業所', '大阪事業所', '沖縄事業所', '福岡事業所', '札幌事業所', '九州事業所'],
        // 入力した値の取得
        selectedShientanto: null,
        openModalShienFlag: false,
        selectJigyosyo: null,
      });
      //日付の日本語化(開始日)
      watch(
        () => screen.ImplementationDate1,
        (dateValue) => {
          const year = dateValue.getFullYear();
          const month = String(dateValue.getMonth() + 1).padStart(2, '0');
          const day = String(dateValue.getDate()).padStart(2, '0');
          screen.ImplementationDateValue1 = `${year}/${month}/${day}`;
      });
      //日付の日本語化(終了日)
      watch(
        () => screen.ImplementationDate2,
        (dateValue) => {
          const year = dateValue.getFullYear();
          const month = String(dateValue.getMonth() + 1).padStart(2, '0');
          const day = String(dateValue.getDate()).padStart(2, '0');
          screen.ImplementationDateValue2 = `${year}/${month}/${day}`;
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
        if(screen.historySearch){
          // 参照モード
          sessionStorage.setItem("mode", '1');
        }
        else{
          // 通常モード
          sessionStorage.setItem("mode", '2');
        }
        router.push({ name: 'SupportResultsList' });
      };
      return {
        screen,
        handleSubmit,
        openModalShien,
        handleSelectedShientanto,
        onBackClick,
      };
    }
  };
</script>

<style scoped>
  .custom-gap {
    gap: 0px;
  }
/* 履歴検索チェックボックス */
::deep(.custom-checkbox .v-label) {
    font-weight: bolder;
    font-size: 18.72px;
    color: black;
    opacity: 1;
  }
/* input */::deep(.custom-input .v-input__control) {
    background-color: #ffffff;
    width: 100%;
    height: 50px;
  }

::deep(.custom-input .v-field__input) {
    height: 50px;
  }
  .form-row1 {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 25px;
  }

  .form-row1-sub2-1 {
    padding: 0;
    display: flex;
  }

  .form-row1-sub3-2 {
    padding: 0;
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

  .custom-label {
    width: 190px;
  }

  .custom-label-sub {
    width: 150px;
    display: flex;
    align-items: center;
  }

  .custom-label-sub1{
     padding-left: 12px;
  }
  .form-row1-sub2-1 .custom-btn {
    width: 100px;
    font-size: 18px;
  }

  .form-row2 {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    padding-right: 128px;
    margin-bottom: 25px;
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
  :deep( .custom-dateInput .v-input__prepend) {
    display: none !important;
  }
  :deep( .custom-dateInput .v-field__input){
    width: 250px !important;
  }
  :deep( .custom-dateInput .v-input__control){
    width: 250px !important;
  }
  .form-row4 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px;
    padding-top: 50px;
  }
  .form-row4 .custom-btn {
    width: 130px;
    border-radius: 17px;
    font-size: 24px;
  }
  .custom-text{
    margin-top: 39px;
    font-size: 25px;
    padding: 0 20px;
  }

</style>
