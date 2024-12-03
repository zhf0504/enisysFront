<template>
  <VContainer>
    <!-- タイトル -->
    <BaseTitle :title="screen.label.title" />

    <VForm @submit.prevent="showDialog" class="form-group">
      <!-- 会員番号ー会員氏名 -->
      <VRow class="memNumAndName">
        <VCol class="memNum">
          <h4 class="custom-label">{{ screen.label.memberNumber }}</h4>
          <p class="custom-p">{{ memberData.number }}</p>
        </VCol>
        <VCol class="memName">
          <h4 class="custom-label">{{ screen.label.memberName }}</h4>
          <p class="custom-p">{{ memberData.name }}</p>
        </VCol>
      </VRow>

      <!-- 事業所と支援担当者（変更前） -->
      <VRow class="jigyoushoAndShientatouBefore">
        <VCol class="jigyoushoBefore">
          <h4 class="custom-label">{{ screen.label.jigyoushoBefore }}</h4>
          <p class="custom-p">{{ memberData.office }}</p>
        </VCol>
        <VCol class="shientantouBefore">
          <h4 class="custom-label">{{ screen.label.shientantouBefore }}</h4>
          <p class="custom-p">{{ memberData.supporter }}</p>
        </VCol>
      </VRow>

      <!-- 事業所と支援担当者 -->
      <VRow class="custom-input form-row1 mt-0 pt-0">
        <VCol cols="auto" class="form-row1-sub1">
          <h4 class="custom-label">{{ screen.label.jigyosyo }}</h4>
          <VSelect
            v-model="screen.selectedOption"
            :items="screen.jigyoshoLists"
            hide-details
            class="custom-select"
          ></VSelect>
        </VCol>
        <VCol cols="auto" class="form-row1-sub2">
          <h4 class="custom-label-sub">{{ screen.label.shientanto }}</h4>
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

      <!-- 住所 -->
      <VRow class="yuubinNumber">
        <h4 class="custom-label">{{ screen.label.yuubinNumber }}</h4>
        <VCol class="custom-yuubinNumber">
          <p class="custom-warning">{{ screen.label.haifunWarning }}</p>
          <VTextField
            class="custom-input"
            :placeholder="screen.placeholder.addressCode"
            v-model="screen.current_post_cd"
            hide-details
          >
            <template #prepend-inner>
              <span class="custom-address-icon">〒</span>
            </template>
          </VTextField>
        </VCol>
      </VRow>

      <VRow class="PostNumAndAddressChangeBtn">
        <!-- TODO ボタン処理 -->
        <VBtn class="yuubin-button" color="primary">{{ screen.label.yuubinToAddressBtn }}</VBtn>
        <VBtn class="yuubin-button" color="primary">{{ screen.label.AddressToYuubinBtn }}</VBtn>
      </VRow>
      <VRow class="changeBtnWarning">{{ screen.label.changeBtnWarning }}</VRow>
      <VRow class="addressTextfield">
        <VRow class="custom-input">
          <VTextField :placeholder="screen.placeholder.addressLine1" hide-details=""></VTextField>
        </VRow>
        <VRow class="custom-input">
          <VTextField :placeholder="screen.placeholder.addressLine2" hide-details=""></VTextField>
        </VRow>
      </VRow>

      <!-- 電話PC -->
      <VRow class="phoneNumberPC">
        <VCol class="landlinePhone">
          <h4 class="custom-label">{{ screen.label.landlinePhone }}</h4>
          <VCol class="landlinePhoneText">
            <p class="custom-warning">{{ screen.label.haifunWarning }}</p>
            <VTextField class="custom-input landPhoneNum" :placeholder="screen.placeholder.landlinePhone"></VTextField>
          </VCol>
        </VCol>
        <VCol class="mobilePhone">
          <h4>{{ screen.label.mobilePhone }}</h4>
          <VCol class="mobilePhoneText">
            <p class="custom-warning">{{ screen.label.haifunWarning }}</p>
            <VTextField class="custom-input mobiPhoneNum" :placeholder="screen.placeholder.mobilePhone"></VTextField>
          </VCol>
        </VCol>
      </VRow>

      <!-- 電話SP -->
      <VRow class="phoneNumberSP">
        <VRow class="phoneNumber-label">
          <h4 class="custom-label">{{ screen.label.landlinePhone }}</h4>
          <p class="custom-warning">{{ screen.label.haifunWarning }}</p>
        </VRow>
        <VRow class="phoneNumber-input">
          <VTextField class="custom-input" :placeholder="screen.placeholder.landlinePhone" hide-details=""></VTextField>
        </VRow>

        <VRow class="phoneNumber-label">
          <h4 class="custom-label">{{ screen.label.mobilePhone }}</h4>
          <p class="custom-warning">{{ screen.label.haifunWarning }}</p>
        </VRow>
        <VRow class="phoneNumber-input">
          <VTextField class="custom-input" :placeholder="screen.placeholder.mobilePhone" />
        </VRow>
      </VRow>
      <!-- カレンダー -->
      <VRow class="custom-input calendar">
        <h4 class="custom-label">{{ screen.label.startDate }}</h4>
        <VDateInput
            v-model="screen.selectedDate"
            :value="screen.selectedDateValue"
            :hide-header="false"
            :header="screen.label.dateHeader"
            :title="''"
            color="#70b55c"
            :placeholder="screen.label.datePlaceholder"
            prepend-icon=""
            :prepend-inner-icon="screen.label.dateIcon"
            clearable
            show-adjacent-months
            hide-details
            hide-title
            @keydown.prevent
            @click:clear="clearSelectedDate"
            :input-props="{ readonly: true }"
            @focus="openDatePicker"   
            ok-text="はい"
            cancel-text="キャンセル"
          />
      </VRow>
      <!-- 戻る登録ボタンPC -->
      <VRow class="form-row4">
        <VBtn @click="onBackClick" class="custom-btn" color="primary">
          {{ screen.label.BackBtn }}
        </VBtn>
        <VBtn class="custom-btn" color="primary" type="submit">
          <template v-if="screen.isLoading">
            <VProgressCircular indeterminate size="20" color="white" class="mr-2" />
          </template>
          <template v-else>
            {{ screen.label.SearchBtn }}
          </template>
        </VBtn>
      </VRow>
    </VForm>

    <!-- TODO 共通から修正-->
    <VDialog v-model="dialog.show" max-width="400">
      <VCard>
        <VCardTitle class="text-h6">{{ screen.label.dialogTitle }}</VCardTitle>
        <VCardText>会員の事業所を変更します。よろしいですか？</VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn color="primary" @click="confirmDialog">はい</VBtn>
          <VBtn color="secondary" @click="cancelDialog">いいえ</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </VContainer>
  <VRow class="footer">
    <VBtn @click="onBackClick" class="custom-btn" color="primary">
      {{ screen.label.BackBtn }}
    </VBtn>
    <VBtn class="custom-btn" @click="showDialog" color="primary" type="submit">
      <template v-if="screen.isLoading">
        <VProgressCircular indeterminate size="20" color="white" class="mr-2" />
      </template>
      <template v-else>
        {{ screen.label.SearchBtn }}
      </template>
    </VBtn>
  </VRow>
</template>

<script>
  import { reactive, ref, onMounted, watch } from 'vue';
  import BaseTitle from '@/components/BaseTitle.vue';
  import { useStore } from 'vuex';
  import router from '@/router';
  import CMN005_EmpSearch from './modal/CMN005_EmpSearch.vue';

  import { VSpacer } from 'vuetify/lib/components/index.mjs';

  export default {
    components: { BaseTitle, CMN005_EmpSearch, VSpacer },
    setup() {
      const memberData = ref({
        number: null, // 会員番号
        name: null, // 会員氏名
        office: null, // 事業所（変更前）
        supporter: null // 支援担当者（変更前）
      });

      const store = useStore();

      const screen = reactive({
        label: {
          title: '事業所変更',
          dialogTitle: '確認ダイアログ',
          jigyosyo: '事業所',
          shientanto: '支援担当者',
          select: '選択',
          BackBtn: '戻る',
          SearchBtn: '登録',
          memberNumber: '会員番号：',
          memberName: '会員氏名：',
          yuubinNumber: '現住所（居所）',
          haifunWarning: '※ハイフン付けで入力してください',
          yuubinToAddressBtn: '郵便番号➝住所',
          AddressToYuubinBtn: '住所➝郵便番号',
          jigyoushoBefore: '事業所（変更前）:',
          shientantouBefore: '支援担当者（変更前）:',
          landlinePhone: '電話番号',
          mobilePhone: '携帯電話',
          startDate: '適用開始日',
          errorZipCode: '有効な郵便番号を入力してください。'
        },
        placeholder: {
          addressCode: '000-0000',
          addressLine1: '東京都品川区五反田1-2-3',
          addressLine2: '△△△マンションOOO番号',
          landlinePhone: '03-1234-5678',
          mobilePhone: '080-1234-5678',
          dateInput: 'yyyy/mm/dd',
        },
        dateIcon: 'mdi-calendar-month',
        selectedOption: null,
        selectedShientanto: null, 
        selectedTenkyoDate: null,
        openModalShienFlag: false,
        isLoading: false,
        inheritAttrs: false,
        current_post_cd: '',
        address: '',
        selectedDate: null,
        selectedDateValue: null,
        
        jigyoshoLists: ['', '東京事業所', '大阪事業所', '沖縄事業所', '福岡事業所', '札幌事業所', '九州事業所']
      });

      const dialog = reactive({
        show: false
      });

      const openModalShien = () => {
        screen.openModalShienFlag = true;
      };

      const handleSelectedShientanto = (value) => {
        screen.selectedShientanto = value;
      };

      const onBackClick = () => {
        router.push({ name: 'MemList' });
      };

      const showDialog = () => {
        dialog.show = true;
      };

      const confirmDialog = () => {
        dialog.show = false;
        screen.isLoading = true;

        //TODO 本物のAPI変える
        setTimeout(() => {
          screen.isLoading = false;
          store.dispatch('auth/updatePermission', {
            flag: 'MemSearch',
            value: true
          });
          router.push({ name: 'MemList' });
        }, 1000);
      };

      const cancelDialog = () => {
        dialog.show = false;
      };


      const fetchMemberData = () => {
        setTimeout(() => {
          // モックデータの割り当て (バックエンドからのデータをシミュレート)
          memberData.value = {
            number: '1300001', // 会員番号
            name: '従業員B', // 会員氏名
            office: '東京事業所', // 事業所
            supporter: '002従業員B' // 支援担当者
          };
        }, 2000);
      };

      onMounted(() => {
        fetchMemberData();
      });

      //日付の日本語化
      watch(
        () => screen.selectedDate,
        (dateValue) => {
          const year = dateValue ? dateValue.getFullYear() : ''; 
          const month = dateValue ? String(dateValue.getMonth() + 1).padStart(2, '0') : '';
          const day = dateValue ? String(dateValue.getDate()).padStart(2, '0') : '';
          
          screen.selectedDateValue = year && month && day ? `${year}年${month}月${day}日` : '';
        }
      );
      //カレンダーを削除
      const clearSelectedDate = () => {
        screen.selectedDate = null;
        screen.selectedDateValue = '';
      };
      //SP版DateInputキーボード表示させない
      const openDatePicker = (event) => {
        event.target.blur();
      };

      return {
        screen,
        dialog,
        openModalShien,
        handleSelectedShientanto,
        onBackClick,
        showDialog,
        confirmDialog,
        cancelDialog,
        memberData,
        fetchMemberData,
        clearSelectedDate,
        openDatePicker
      };
    }
  };
</script>

<style scoped>
.custom-input :deep(.v-input__control) {
  background-color: #ffffff;
  width: 100%;
  height: 50px;
}

.custom-input :deep(.v-field__input) {
  height: 50px;
}

.custom-input :deep(.v-input__prepend) {
  display: none !important;
}


  .v-row {
    padding-top: 10px;
  }

  .footer {
    display: none;
  }

  .custom-warning {
    font-size: 12px;
  }

  .form-row1-sub1 {
    display: flex;
    width: 35%;
    margin-right: 15%;
  }

  .form-row1-sub2 {
    display: flex;
    width: calc(30% + 100px);
  }

  .form-row1-sub2 h4 {
    width: 190px;
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

  .name-col {
    flex: 1;
    padding: 0 18px 0 0;
  }

  .v-row.form-row4 {
    margin-left: 0;
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
    font-size: 1em;
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

  /* 会員番号と会員氏名 */
  .memNumAndName {
    display: flex;
    align-items: center;
  }

  .memNum,
  .memName {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  /* 事業所と支援担当（変更前） */
  .jigyoushoAndShientatouBefore {
    display: flex;
    align-items: center;
  }

  .jigyoushoBefore,
  .shientantouBefore {
    display: flex;
    align-items: center;
  }

  /* 現住所 */
  .yuubinNumber {
    display: flex;
    align-items: center;
    width: 50%;
    padding: 0;
    margin-left: 0em;
  }

  .yuubinNumber .custom-input {
    width: 50%;
  }

  .yuubinBangou {
    display: flex;
    align-items: center;
  }

  .custom-yuubinNumber .custom-input {
    width: 8em;
  }

  .yuubinNumber .custom-label {
    width: 170px;
    padding-top: 0.5em;
    margin-right: 0.5em;
  }

  .PostNumAndAddressChangeBtn {
    display: flex;
    gap: 10px;
    margin-left: 12em;
    
  }

  .PostNumAndAddressChangeBtn .yuubin-button {
    width: auto;
    font-size: 12px;
    border-radius: 10px;
  }

  .changeBtnWarning {
    margin-left: 12em;
  }

  .addressTextfield {
    display: block;
    width: 60%;
    margin-left: 12.75em;
  }

  /* 電話 */
  .phoneNumberSP {
    display: none;
  }

  .landlinePhone,
  .mobilePhone {
    display: flex;
    align-items: center;
    width: auto;
  }

  .landlinePhone h4,
  .mobilePhone h4 {
    width: 11.5em;
  }

  .landPhoneNum,
  .mobiPhoneNum {
    width: 50%;
  }

  /* カレンダー */
  .calendar {
    padding-left: 1em;
    width: 25em;
    margin-top: -2em;
    margin-bottom: 1em;
  }



  @media (max-width: 1455px) {
    .custom-label-sub {
      width: 190px;
    }
  }

  @media (max-width: 1024px) {
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
      padding: 0;
      width: 96%;
    }

    .form-group h4 {
      font-size: 1em;
    }

    .form-group .custom-p {
      font-size: 1em;
    }

    .form-row1-sub1 {
      display: block;
      width: 80%;
    }

    .form-row1-sub2 {
      display: block;
      width: calc(80% + 100px);
    }

    .form-row1-sub3-2 .v-row {
      min-width: 100%;
      max-width: 100%;
      padding-right: 0;
      margin: 0;
    }

    .custom-warning {
      font-size: 12px;
    }
    .custom-label {
      width: auto;
      margin-right: 5px;
    }
    .custom-label-sub {
      width: 100%;
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

    /* 会員番号と会員氏名氏名 */
    .memNumAndName {
      display: block;
      width: 100%;
    }

    .memNum,
    .memName {
      display: flex;
    }

    /* 事業所と支援担当者（変更前） */
    .jigyoushoAndShientatouBefore {
      display: block;
      width: 100%;
    }

    .jigyoushoBefore,
    .shientantouBefore {
      display: flex;
      align-items: flex-start;
    }

    /* 住所 */
    .yuubinNumber {
      display: block;
      width: auto;
    }

    .PostNumAndAddressChangeBtn {
      margin-left: 0;
    }

    .addressTextfield {
      width: auto;
      margin-left: 0.75em;
    }

    .custom-yuubinNumber {
      padding-left: 0;
    }

    /* 電話 */
    .phoneNumberSP {
      display: block;
      margin-left: 0.75em;
      width: auto;
    }

    .phoneNumberSP .custom-label {
      width: 100%;
    }

    .phoneNumberPC {
      display: none;
    }

    /* カレンダー */
    .calendar {
      display: block;
      width: auto;
      margin-left: 0;
      padding-left: 0;
      margin-bottom: 5em;
      margin-top: 0em;
    }


    /* SP戻ると登録ボタン */ /* SP戻ると登録ボタン */

    .form-row4 {
      display: none;
    }
    .v-row.footer {
      margin-left: 0;
    }

    .footer {
      position: fixed;
      display: flex;
      justify-content: space-between;
      align-items: center;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 15px 15px 25px 15px;
      background-color: #f5f5f5;
    }

    .footer .custom-btn {
      width: 30%;
      border-radius: 24px;
      font-size: 24px;
      color: #ffffff;
      text-align: center;
      border: none;
      cursor: pointer;
      margin: 0 30px 0 30px;
    }
  }
</style>
