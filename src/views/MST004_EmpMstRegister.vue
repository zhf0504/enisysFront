<template>
  <VContainer>
    <!-- タイトル -->
    <BaseTitle :title="screen.label.title"></BaseTitle>
    <VForm @submit.prevent="handleSubmit">
      <!-- 従業員コード*（input） -->
      <VRow class="custom-gap">
        <h3 class="custom-label has-asterisk">{{ screen.label.jugyoinCd }}</h3>
        <VCol class="jugyoincdselect custom-input"  >
          <VTextField
            v-model="screen.jugyoinCdSelect"
            :items="screen.items"
            hide-details
            class="custom-text-field"
          ></VTextField>
        </VCol>
        <!-- 従業員氏名（input）-->
        <h3 class="custom-label-child">{{ screen.label.jugyoinNm }}</h3>
        <VCol class="jugyoinnmselect custom-input"  >
          <VTextField v-model="screen.jugyoinNmSelect" :items="screen.items" hide-details></VTextField>
        </VCol>
      </VRow>
      <!-- 社給携帯番号（input） -->
      <VRow class="custom-gap">
        <h3 class="custom-label">{{ screen.label.socialGivePhone }}</h3>
        <VCol class="socialgivephoneselect custom-input"  >
          <p>{{ screen.label.Note }}</p>
          <VTextField v-model="screen.socialGivePhoneSelect" :item="screen.items" hide-details></VTextField>
        </VCol>
        <!-- 緊急連絡先（input） -->
        <h3 class="custom-label-child">{{ screen.label.emergencyContact }}</h3>
        <VCol class="emergencycontactselect custom-input"  >
          <p>{{ screen.label.Note }}</p>
          <VTextField v-model="screen.emergencyContactSelect" :items="screen.items" hide-details></VTextField>
        </VCol>
      </VRow>
      <!-- AndroidId（input） -->
      <VRow class="custom-gap">
        <h3 class="custom-label">{{ screen.label.androidId }}</h3>
        <VCol class="androidIdSelect custom-input" cols="4" >
          <VTextField v-model="screen.androidIdSelect" :items="screen.items" hide-details></VTextField>
        </VCol>
      </VRow>
      <!-- パスワード最終変更日 -->
      <VRow class="custom-gap custom-input">
        <h3 class="custom-label">{{ screen.label.passChangeDate }}</h3>
        <VCol class="passChangeDate "  >
          {{ screen.passChangeDate }}
        </VCol>
        <!-- 退職日 -->
        <h3 class="custom-label-child">{{ screen.label.retirementDate }}</h3>
          <VCol class="custom-dateInput">
            <VDateInput
                v-model="screen.retirementDate"
                :value="screen.retirementDateValue"
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
                :disabled="true"
              />
          </VCol>
      </VRow>
      <VRow class="custom-gap">
          <h3 class="custom-label">{{ screen.label.affiliatedoffice }}</h3>
  
     <VCol>
      <!-- 「行追加」「行削除」ボタン -->
    <div class="custom-table-btn">
      <div class="custom-table-btn-sub">
        <VBtn @click="insertRow" color="primary">{{ screen.label.button.insertRow }}</VBtn>
      </div>
      <div class="custom-table-btn-sub">
        <VBtn @click="deleteRow" color="primary">{{ screen.label.button.deleteRow }}</VBtn>
      </div>
    </div>
      <!-- 所属事業所一覧エリア -->
      <VTable class="form-table-sub">
          <thead>
            <tr>
              <th class="form-table-title"></th>
              <th class="form-table-title" v-for="(header, index) in screen.table" :key="index">{{ header.title }}</th>
            </tr>
          </thead>
          <tbody>
  
            <tr class="List" v-for="(item, index) in screen.officeTable" :key="index"
                :class="{ 'selected-row': screen.selectedRow.includes(index) }"
                @click="selectRow(index)">
                <td class="form-table-row">
                  <VCheckbox 
                      v-model="screen.selectedRow" 
                      :value="index" 
                      color="primary" 
                       hide-details>
                  </VCheckbox>
                </td>
                <td class="form-table-row"><VSelect v-model="item.BusinessName" :items="screen.items" hide-details></VSelect></td>
                <td class="form-table-row"><VSelect v-model="item.Position" :JobSystem="screen.JobSystem" hide-details></VSelect></td>
                <td class="form-table-row"><VCheckbox v-model="item.MainBusiness" hide-details></VCheckbox></td>
            </tr>
          </tbody>
        </VTable>
      </VCol>
      </VRow>
    </VForm>
  </VContainer>
  <VRow class="form-row-btn-sub">
    <VBtn @click="screen.isExpanded = !screen.isExpanded" class="footer-button-sub">
      <VIcon>{{ screen.isExpanded ? 'mdi-chevron-down' : 'mdi-chevron-up' }}</VIcon>
    </VBtn>
    <VExpandTransition class="form-btn-transition">
      <div v-if="screen.isExpanded" class="footer-button-sub">
        <VBtn class="custom-btn" color="primary" @click="handleBackBtn">{{ screen.label.button.backBtn }}</VBtn>
        <VBtn class="custom-btn" color="primary" @click="handleRegisterBtn">
          {{ screen.label.button.register }}
        </VBtn>
      </div>
    </VExpandTransition>
  </VRow>
</template>

<script>
  import BaseTitle from '@/components/BaseTitle.vue';
  import router from '@/router';
  import { reactive, ref, watch } from 'vue';

  export default {
    components: { BaseTitle },
    setup() {
      const screen = reactive({
        label: {
          title: '従業員マスタ登録',
          jugyoinCd: '従業員コード',
          jugyoinNm: '従業員氏名',
          socialGivePhone: '社給携帯番号',
          emergencyContact: '緊急連絡先',
          androidId: 'AndroidID',
          Note: '※ハイフン付きで入力してください',
          passChangeDate: 'パスワード最終変更日',
          retirementDate: '退職日',
          affiliatedoffice: '所属事業所',
          dateHeader: '日付の選択',
          datePlaceholder: '年/月/日',
          dateIcon: 'mdi-calendar-month',
          button:{
            backBtn: '戻る',
            register: '登録',
            insertRow: '行追加',
            deleteRow: '行削除',
          }
        },
        table: [
          { title: '事業所名', key: 'BusinessName' },
          { title: '職制', key: 'Position' },
          { title: '主業務', key: 'MainBusiness' },
        ],
        items: ['', '東京事業所', '大阪事業所', '沖縄事業所', '福岡事業所', '札幌事業所', '沖縄事業所'],
        JobSystem: ['','責任者', '事務員', '相談員', '支援員' ],
        selectedRow: [],
        retirementDate: null,
        retirementDateValue: null,
        isExpanded: true,
        passChangeDate: "2024/12/31",
        officeTable: [
          {
            BusinessName: null,
            Position: null,
            MainBusiness: null,
          }
        ],
      });
      const DataList = ref([])
      //日付の日本語化
      watch(
        () => screen.retirementDate,
        (dateValue) => {
          const year = dateValue.getFullYear();
          const month = String(dateValue.getMonth() + 1).padStart(2, '0');
          const day = String(dateValue.getDate()).padStart(2, '0');
          screen.retirementDateValue = `${year}年${month}月${day}日`;
      });


      // 「戻る」処理
      const handleBackBtn = () => {
        router.push({ name: 'BlankPage' });
      };
      //「登録」処理
      const handleRegisterBtn = () => {
        console.log('「登録」処理');
      };
      const handleSubmit = () => {};

      //オプションの行選択の処理
      const selectRow = (index) => {
        const selectedIndex = screen.selectedRow.indexOf(index);
        if (selectedIndex === -1) {
          // 選択した行をリストに追加
          screen.selectedRow.push(index);
        } else {
          // 存在すれば、リストから破棄
          screen.selectedRow.splice(selectedIndex, 1);
        }
        console.log(890,screen.selectedRow)
      }
      //その他用の行追加の処理
      const insertRow = () => {
        if (Array.isArray(screen.selectedRow) && screen.selectedRow.length > 1) {
          screen.selectedRow = [];
          return;
        }
        const newRow ={
            BusinessName: null,
            Position: null,
            MainBusiness: null,
          }

        if (Array.isArray(screen.selectedRow) && screen.selectedRow.length === 1) {
          const index = screen.selectedRow[0];
          screen.officeTable.splice(index, 0, newRow);
          screen.selectedRow = [index + 1];
        } else {
          screen.officeTable.push(newRow);
          screen.selectedRow = [];
        }
      };

      //その他用の行削除の処理
      const deleteRow = () => {
        console.log(123,screen.selectedRow)
        if (screen.selectedRow && screen.selectedRow.length > 0) {
          screen.selectedRow.sort((a, b) => b - a).forEach((index) => screen.officeTable.splice(index, 1));
          screen.selectedRow = [];
        }
      };
      return {
        screen,
        handleSubmit,
        selectRow,
        DataList,
        handleBackBtn,
        handleRegisterBtn,
        insertRow,
        deleteRow,
      };
    }
  };
</script>

<style scoped>
  :deep(.custom-input .v-input__control) {
    background-color: #ffffff;
    height: 50px;
  }
  :deep(.custom-input .v-field__input) {
    height: 50px;
  }

  .v-form .v-row {
    width: 80%;
  }
  /* 従業員コード */
  .jugyoincdselect {
    display: flex;
  }
  /* 従業員氏名 */
  .jugyoinnmselect {
    display: flex;
  }
  /* 社給携帯番号 */
  .socialgivephoneselect {
    display: flex;
    flex-direction: column;
  }
  /* note(※の部分) */
  .note {
    right: 10%;
  }
  /* 緊急連絡先 */
  .emergencycontactselect {
    display: flex;
    /* align-items: center; */
    flex-direction: column;
  }
  /* AndroidID */
  .androidIdSelect {
    display: flex;
  }
  /* パスワード最終変更日 */
  .passChangeDate {
    display: flex;
    align-items: center;
  }

  .custom-label {
    width: 200px;
    
  }
  .custom-label-child{
    margin-left: 100px;
  }
  /* 所属事業所テーブルエリア */
  .form-table .custom-btn {
    float: right;
    margin-right: 5%;
    font-size: 18px;
    border-radius: 17px;
  }
  .form-table .custom-btn {
    float: right;
    margin-right: 5%;
    font-size: 18px;
    border-radius: 17px;
  }

  .form-table-sub {
    margin: 30px 0;
    max-height: 600px;
    max-width: 700px;
    overflow-y: auto;
  }
  .form-table-title:nth-child(1),
  .form-table-row:nth-child(1) {
    width: 50px;
    padding: 0 ;
    margin: 0 auto;
    
  }
  .form-table-title:nth-child(4),
  .form-table-row:nth-child(4) {
    width: 90px;
    padding: 0 ;
    margin: 0 auto;
  }
.form-table-row:nth-child(1),
.form-table-row:nth-child(4){
    display: flex;
    justify-content: center;
    border: none;
  }

  .form-table-row:nth-child(2),
  .form-table-row:nth-child(3) {
    padding: 0;
  }
  .form-table-sub thead {
    position: sticky;
    top: 0;
    z-index: 1;
  }
  
  .form-table-sub,
  .form-table-sub th,
  .form-table-sub thead {
    border: 1px solid #777777 !important;
  }

  .form-table-sub td {
    border: 1px solid #f0f0f0;
    cursor: pointer;
  }

  .form-table-sub th {
    font-size: 18px;
    background-color: #97d885;
    color: rgb(255, 255, 255);
    font-weight: bolder !important;
    text-align: center !important;
  }
  /* 退職日 */
  :deep(.custom-dateInput .v-input__prepend) {
    display: none !important;
  }
  :deep(.v-picker-title) {
    display: none !important;
  }

  .form-row-btn-sub{
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 225px; /* TODO メニューの展開調整後 */
    
  }

  .form-btn-transition{
    width: 100%;
    background-color: white;
    display: flex;
    justify-content: space-around;
  }
  .form-btn-transition .custom-btn {
    margin: 15px;
    font-size: 23px;
    width: 150px;
    border-radius: 17px;
  }
  p{
    font-size: 12px ;
  }
  /* 「行追加」「行削除」ボタン */
  .custom-table-btn {
    height: auto;
    width: 100%;
    display: flex;
    gap: 20px;
    margin-bottom: 10px;
  }

</style>
