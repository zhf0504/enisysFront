<template>
  <VContainer>
    <!-- タイトル -->
    <BaseTitle :title="screen.label.title"></BaseTitle>
    <VForm @submit.prevent="handleSubmit" :class="screen.isExpanded ? 'custom-form' : ''">
      <!-- 従業員 -->
      <VRow class="custom-gap custom-input">
        <h3 class="custom-label custom-jugyoinNm">{{ screen.label.jugyoinNm }}</h3>
        <VCol cols="2" class="jugyoinNmField">
          {{ screen.jugyoinNm }}
        </VCol>
        <!-- 精算月 -->
        <VCol class="form-SettlementMonth">
          <h3 class="custom-label-sub">{{ screen.label.SettlementMonth }}</h3>
          <VCol class="custom-color" cols="2">
            <MonthPicker v-model="screen.SettlementMonth" />
          </VCol>
        </VCol>
      </VRow>
      <VRow>
        <hr />
      </VRow>
      <!-- 立替金項目、一覧エリア項目 -->
      <VRow class="custom-AdvancePayment">
        <h2>{{ screen.label.AdvancePayment }}</h2>
      </VRow>
      <VRow class="custom-table">
        <div class="custom-totalAmount" :class="{ 'shift-right': screen.advancePaymentList.length >= 6 }">
          <div class="custom-totalAmount-sub1">
            {{ screen.label.total }}
          </div>
          <div class="custom-totalAmount-sub2">
            {{ totalAdvancePaymentAmount }}
          </div>
        </div>
        <VTable class="form-table-sub isPC" style="max-height: 319px">
          <thead>
            <tr>
              <th class="form-table-title" v-for="(header, index) in screen.paymentTable" :key="index">
                {{ header.title }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in screen.advancePaymentList" class="List" :key="index">
              <td>{{ index + 1 }}</td>
              <td class="form-table-row">{{ item.implementationDate }}</td>
              <td class="form-table-row">{{ item.jigyosyoCd }}</td>
              <td class="form-table-row">{{ item.memberName }}</td>
              <td class="form-table-row">{{ item.type }}</td>
              <td class="form-table-row">
                <v-tooltip :text="item.abstract">
                  <template v-slot:activator="{ props }">
                    <span v-bind="props" class="text-ellipsis">{{ item.abstract }}</span>
                  </template>
                </v-tooltip>
              </td>
              <!-- <td class="form-table-row">{{ item.abstract }}</td> -->
              <td class="form-table-row">{{ item.amount }}</td>
            </tr>
          </tbody>
        </VTable>
      </VRow>
      <VRow class="custom-line">
        <hr />
      </VRow>
      <!-- 経費一覧エリア項目 -->
      <VRow class="custom-AdvancePayment">
        <h2>{{ screen.label.Expenses }}</h2>
      </VRow>
      <VRow class="custom-table">
        <div class="custom-totalExpenses" :class="{ 'expensesShift-right': screen.expensesList.length >= 6 }">
          <div class="custom-table-btn">
            <div class="custom-table-btn-sub">
              <VBtn @click="insertRow" color="primary">{{ screen.button.insertRow }}</VBtn>
            </div>
            <div class="custom-table-btn-sub">
              <VBtn @click="deleteRow" color="primary">{{ screen.button.deleteRow }}</VBtn>
            </div>
          </div>
          <div class="custom-totalExpenses-sub1">
            {{ screen.label.total }}
          </div>
          <div class="custom-totalExpenses-sub2">
            {{ expensesTotalAmount }}
          </div>
        </div>
        <VTable class="form-table-sub custom-input isPC" style="max-height: 348px">
          <thead>
            <tr>
              <th class="form-table-title-sub" v-for="(header, index) in screen.expensesTable" :key="index">
                {{ header.title }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in screen.expensesList"
              class="List"
              :key="index"
              :class="{ 'selected-row': screen.selectedRows.includes(index) }"
              @click="selectRow(index)"
            >
              <td class="form-table-row-sub">{{ index + 1 }}</td>
              <td class="form-table-row-sub">
                <VDateInput
                  v-model="item.implementationDate"
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
                  class="custom-dateInput"
                />
              </td>
              <td class="form-table-row-sub"><VSelect v-model="item.jigyosyoCd" hide-details></VSelect></td>
              <td class="form-table-row-sub"><VSelect v-model="item.nominalExpense" hide-details></VSelect></td>
              <td class="form-table-row-sub"><VTextField v-model="item.payee" hide-details></VTextField></td>
              <td class="form-table-row-sub"><VTextField v-model="item.amount" hide-details></VTextField></td>
              <td class="form-table-row-sub"><VSelect v-model="item.taxRate" hide-details></VSelect></td>
              <td class="form-table-row-sub">
                <VCheckbox v-model="item.invoice" hide-details color="primary"></VCheckbox>
              </td>
            </tr>
          </tbody>
        </VTable>
      </VRow>
    </VForm>
  </VContainer>
  <VRow class="form-row-btn-sub">
    <VBtn @click="screen.isExpanded = !screen.isExpanded" class="footer-button-sub">
      <VIcon>{{ screen.isExpanded ? 'mdi-chevron-down' : 'mdi-chevron-up' }}</VIcon>
    </VBtn>
    <VExpandTransition class="form-btn-transition">
      <div v-if="screen.isExpanded" class="footer-button-sub">
        <VBtn class="custom-btn" color="primary" @click="handleBackBtn">{{ screen.button.backBtn }}</VBtn>
        <VBtn class="custom-btn" color="primary" @click="handleRegisterBtn">
          {{ screen.button.register }}
        </VBtn>
      </div>
    </VExpandTransition>
  </VRow>
</template>

<script>
  import BaseTitle from '@/components/BaseTitle.vue';
  import { reactive, watch, computed } from 'vue';
  import MonthPicker from '@/components/calendar/monthPicker.vue';
  import keihiList from '@/assets/JsonData/keihiList/keihi.json';
  import router from '@/router';
  export default {
    components: { BaseTitle, MonthPicker },
    setup() {
      const screen = reactive({
        label: {
          title: '経費登録',
          jugyoinNm: '従業員',
          SettlementMonth: '精算月',
          AdvancePayment: '立替金',
          Expenses: '経費',
          dateHeader: '日付の選択',
          datePlaceholder: '年/月/日',
          dateIcon: 'mdi-calendar-month',
          // 立替金
          total: '合計金額(税込)'
        },
        paymentTable: [
          { title: 'No', key: 'no' },
          { title: '実施日', key: 'implementationDate' },
          { title: '事業所', key: 'jigyosyoCd' },
          { title: '会員氏名', key: 'memberName' },
          { title: '種別', key: 'type' },
          { title: '摘要', key: 'abstract' },
          { title: '金額(税込)', key: 'amount' }
        ],
        expensesTable: [
          { title: 'No', key: 'no' },
          { title: '実施日', key: 'implementationDate' },
          { title: '事業所', key: 'jigyosyoCd' },
          { title: '経費名目', key: 'nominalExpense' },
          { title: '支払先', key: 'payee' },
          { title: '金額(税込)', key: 'amount' },
          { title: '税率', key: 'taxRate' },
          { title: 'インボイス', key: 'invoice' }
        ],
        button: {
          insertRow: '行追加',
          deleteRow: '行削除',
          backBtn: '戻る',
          register: '登録'
        },
        selectedRows: [],
        jugyoinNm: '経費申請太郎',
        expensesList: [
          {
            implementationDate: null,
            jigyosyoCd: null,
            nominalExpense: null,
            payee: null,
            amount: null,
            taxRate: null,
            invoice: null
          }
        ],
        advancePaymentList: keihiList,
        isExpanded: true
      });
      const handleSubmit = () => {};
      //行単位の処理
      const selectRow = (index) => {
        const selectedIndex = screen.selectedRows.indexOf(index);
        if (selectedIndex === -1) {
          // 選択した行をリストに追加
          screen.selectedRows.push(index);
        } else {
          // 存在すれば、リストから破棄
          screen.selectedRows.splice(selectedIndex, 1);
        }
      };
      const insertRow = () => {
        if (Array.isArray(screen.selectedRows) && screen.selectedRows.length > 1) return;
        const newRow = {
          implementationDate: null,
          jigyosyoCd: null,
          nominalExpense: null,
          payee: null,
          amount: null,
          taxRate: null,
          invoice: null
        };
        if (Array.isArray(screen.selectedRows) && screen.selectedRows.length === 1) {
          const index = screen.selectedRows[0];
          screen.expensesList.splice(index, 0, newRow);
          screen.selectedRows = [index + 1];
        } else {
          screen.expensesList.push(newRow);
          screen.selectedRows = [];
        }
      };
      const deleteRow = () => {
        if (screen.selectedRows && screen.selectedRows.length > 0) {
          screen.selectedRows.sort((a, b) => b - a).forEach((index) => screen.expensesList.splice(index, 1));
          screen.selectedRows = [];
        }
      };

      //日付の日本語化
      watch(
        () => screen.SettlementDate,
        (dateValue) => {
          const year = dateValue.getFullYear();
          const month = String(dateValue.getMonth() + 1).padStart(2, '0');
          const day = String(dateValue.getDate()).padStart(2, '0');
          screen.SettlementDateValue = `${year}年${month}月${day}日`;
        }
      );
      // 立替金の合計金額（税込）
      const totalAdvancePaymentAmount = computed(() => {
        return screen.advancePaymentList.reduce((total, item) => {
          // amountがnullまたはundefinedの場合は0にする
          const amount = item.amount ? parseFloat(item.amount.replace(/,/g, '')) : 0;
          return total + (isNaN(amount) ? 0 : amount); // NaNの場合は0を加算
        }, 0);
      });
      // 経費の合計金額（税込）
      const expensesTotalAmount = computed(() => {
        return screen.expensesList.reduce((total, item) => {
          // amountがnullまたはundefinedの場合は0にする
          const amount = item.amount ? parseFloat(item.amount.replace(/,/g, '')) : 0;
          return total + (isNaN(amount) ? 0 : amount); // NaNの場合は0を加算
        }, 0);
      });

      // 「戻る」処理
      const handleBackBtn = () => {
        router.push({ name: 'BlankPage' });
      };
      //「登録」処理
      const handleRegisterBtn = () => {
        console.log('「登録」処理');
      };

      return {
        screen,
        handleSubmit,
        selectRow,
        insertRow,
        deleteRow,
        handleBackBtn,
        handleRegisterBtn,
        totalAdvancePaymentAmount,
        expensesTotalAmount
      };
    }
  };
</script>

<style scoped>
  /* 従業員 */
  .jugyoinNmField {
    display: flex;
    align-items: center;
  }
  .custom-gap {
    padding: 10px 0;
  }
  .custom-jugyoinNm {
    width: 90px;
  }
  /* 精算月 */
  :deep(.form-SettlementMonth .v-input__prepend) {
    display: none !important;
  }
  .custom-label-sub {
    width: 90px;
    display: flex;
    align-items: center;
  }
  :deep(.custom-color .v-input__control) {
    background-color: white;
  }
  .form-row1-sub3-2 {
    padding: 0;
  }
  .form-SettlementMonth {
    display: flex;
  }
  .custom-Month {
    width: 200px;
  }
  /* 立替金、経費、項目一覧エリア */
  .custom-AdvancePayment {
    padding-top: 30px;
  }
  .custom-table {
    padding-left: 25px;
  }
  .form-table-sub {
    width: 100%;
  }
  :deep(.form-table-sub .v-field__overlay) {
    background-color: white;
  }
  .form-table-sub thead {
    position: sticky;
    top: 0;
    z-index: 1;
  }

  .form-table-sub,
  .form-table-sub th,
  .form-table-sub thead,
  .form-table-sub tbody,
  .form-table-sub tr {
    border: 1px solid #777777;
  }

  .form-table-sub td {
    border: 1px solid #f0f0f0;
    font-size: 14px;
  }

  .form-table-sub th {
    font-size: 18px;
    background-color: #97d885;
    color: rgb(255, 255, 255);
    font-weight: bolder !important;
    text-align: center !important;
  }
  .form-table-title:nth-child(1) {
    width: 50px;
  }
  .form-table-title:nth-child(2),
  .form-table-title:nth-child(3),
  .form-table-title:nth-child(4),
  .form-table-title:nth-child(5) {
    width: 200px;
  }
  .form-table-sub td:nth-child(2) {
    text-align: center;
  }
  .form-table-title:nth-child(6) {
    width: 650px;
  }
  .form-table-title:nth-child(7) {
    max-width: 150px;
    min-width: 150px;
  }
  .form-table-sub td:nth-child(7) {
    text-align: right;
  }
  .custom-line {
    margin-top: 80px;
  }
  .form-table-title-sub:nth-child(1) {
    width: 50px;
  }
  .form-table-title-sub:nth-child(2) {
    width: 250px;
  }
  .form-table-title-sub:nth-child(3) {
    width: 250px;
  }
  .form-table-title-sub:nth-child(4) {
    width: 250px;
  }
  .form-table-title-sub:nth-child(5) {
    width: calc(100% -50px -250px -250px -250px -150px -100px -130px);
  }
  .form-table-title-sub:nth-child(6) {
    width: 150px;
    background-color: #97d885;
  }
  .form-table-title-sub:nth-child(7) {
    width: 100px;
  }
  .form-table-title-sub:nth-child(8) {
    width: 130px;
  }
  .List .form-table-row-sub {
    padding: 0;
    text-align: center;
  }
  .form-table-row-sub:nth-child(8) {
    justify-content: center;
    display: flex;
    height: 58px;
  }

  /* セル間に縦の境界線を追加 */
  .form-table-sub td,
  .form-table-sub th {
    border-right: 1px solid #888888;
  }
  .form-table-sub td:last-child,
  .form-table-sub th:last-child {
    border-right: none;
  }
  :deep(.custom-dateInput .v-input__prepend) {
    display: none !important;
  }
  :deep(.v-picker-title) {
    display: none !important;
  }
  /* 行追加、行削除ボタン */
  .custom-table-btn {
    height: auto;
    width: 100%;
    display: flex;
    gap: 20px;
    margin-top: 50px;
  }
  .selected-row {
    background-color: #e2efda;
  }
  /* 戻る、登録ボタン */
  .form-row-btn-sub {
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 100;
    left: 225px; /* TODO メニューの展開調整後 */
  }
  .form-btn-transition {
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
  .custom-form {
    padding-bottom: 50px;
  }
  /* 立替金の合計金額(税込) */
  .custom-totalAmount {
    background-color: #fafae0;
    width: 100%;
    height: 112px;
    position: relative;
  }
  .custom-totalAmount .custom-totalAmount-sub1 {
    position: absolute;
    top: 0;
    right: 0;
    background-color: #97d885;
    height: 56px;
    border-bottom: 1px solid #777777;
    border-top: 2px solid #777777;
    border-spacing: 0;
    border-left: 2px solid #777777;
    border-right: 2px solid #777777;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 152px;
    font-size: 17px;
    font-weight: bold;
    color: white;
  }

  .custom-totalAmount .custom-totalAmount-sub2 {
    position: absolute;
    top: 56px;
    right: 0;
    background-color: white;
    border-left: 2px solid #777777;
    border-right: 2px solid #777777;
    border-spacing: 0;
    color: black;
    font-weight: normal;
    height: 56px;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    padding-right: 15px;
    font-size: 14px;
    width: 152px;
  }
  /* 経費の合計金額 */
  .custom-totalExpenses {
    background-color: #fafae0;
    width: 100%;
    height: 112px;
    position: relative;
  }
  .custom-totalExpenses .custom-totalExpenses-sub1 {
    position: absolute;
    top: 0;
    right: 230px;
    background-color: #97d885;
    height: 56px;
    border-bottom: 1px solid #777777;
    border-top: 2px solid #777777;
    border-spacing: 0;
    border-left: 2px solid #777777;
    border-right: 2px solid #777777;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 152px;
    font-size: 17px;
    font-weight: bold;
    color: white;
  }
  .custom-totalExpenses .custom-totalExpenses-sub2 {
    position: absolute;
    top: 56px;
    right: 230px;
    background-color: white;
    border-left: 2px solid #777777;
    border-right: 2px solid #777777;
    border-spacing: 0;
    color: black;
    font-weight: normal;
    height: 56px;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    padding-right: 15px;
    font-size: 14px;
    width: 152px;
  }
  .custom-table-sub-sub {
    width: 100%;
  }
  /* 立替金のリストが6行以上の場合に呼ばれるCSS */
  .shift-right .custom-totalAmount-sub1 {
    position: absolute;
    top: 0;
    right: 15px;
  }

  .shift-right .custom-totalAmount-sub2 {
    position: absolute;
    top: 56px;
    right: 15px;
  }
  /* 経費のリストが6行以上の場合に呼ばれるCSS */
  .expensesShift-right .custom-totalExpenses-sub1 {
    position: absolute;
    top: 0;
    right: 245px;
  }
  .expensesShift-right .custom-totalExpenses-sub2 {
    position: absolute;
    top: 56px;
    right: 245px;
  }
</style>
