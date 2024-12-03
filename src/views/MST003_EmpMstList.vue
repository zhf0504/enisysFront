<template>
  <VContainer>
    <!-- タイトル -->
    <BaseTitle :title="screen.label.title"></BaseTitle>
    <VForm @submit.prevent="handleSubmit">
      <!-- 事業所（select） -->
      <VRow class="custom-select">
        <VCol cols="auto" class="jigyosyocdselect">
          <h3 class="custom-label">{{ screen.label.jigyosyoCd }}</h3>
          <VSelect v-model="screen.jigyosyoCdSelect" :items="screen.items" hide-details></VSelect>
        </VCol>
      </VRow>
      <!-- 従業員氏名（input）-->
      <VRow class="custom-gap">
        <VCol class="jugyoinnmselect custom-input">
          <h3 class="custom-label">{{ screen.label.jugyoinNm }}</h3>
          <VTextField v-model="screen.jugyoinNmSelect" :items="screen.items" hide-details></VTextField>
        </VCol>
        <!-- 緊急連絡先（input） -->
        <VCol class="emergencycontactselect custom-input">
          <h3 class="custom-label">{{ screen.label.emergencyContact }}</h3>
          <VTextField v-model="screen.emergencyContactSelect" :items="screen.items" hide-details></VTextField>
        </VCol>
        <!-- 退職者含む（チェックボックス） -->
        <VCol class="retirementflg custom-checkbox">
          <VCheckbox v-model="screen.retirementFlg" label="退職者含む" hide-details></VCheckbox>
        </VCol>
      </VRow>
      <!-- 戻るボタン、検索ボタン -->
      <VRow class="btnprimary">
        <VBtn size="x-large" color="primary" class="custom_returnbtn" @click="returnbtn">戻る</VBtn>
        <VBtn size="x-large" color="primary" class="custom_search" @click="screen.isOpenTable = true" type="submit">
          <VIcon>mdi-magnify</VIcon>
          検索
        </VBtn>
      </VRow>
      <div v-if="screen.isOpenTable" class="from-teble">
        <VTable class="form-table-sub">
          <thead>
            <tr>
              <th class="form-table-title" v-for="(header, index) in screen.table" :key="index">{{ header.title }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in DataList" class="List" :key="index">
              <!-- 一覧エリア項目 -->
              <td>
                <router-link to="/EmpMstRegister">{{ item.EmployeeCode }}</router-link>
              </td>
              <td>
                <v-tooltip :text="item.name">
                <template v-slot:activator="{ props }">
                  <span v-bind="props" class="text-ellipsis">{{ item.name }}</span>
                </template>
              </v-tooltip>
              </td>
              <td>{{ item.BusinessName }}</td>
              <td>{{ item.Position }}</td>
              <td>{{ item.EmergencyContact }}</td>
            </tr>
          </tbody>
        </VTable>
      </div>
    </VForm>
  </VContainer>
</template>

<script>
  import BaseTitle from '@/components/BaseTitle.vue';
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';

  // 項目名
  export default {
    components: { BaseTitle },
    setup() {
      const screen = reactive({
        label: {
          title: '従業員マスタ一覧',
          jigyosyoCd: '事業所',
          jugyoinNm: '従業員氏名',
          emergencyContact: '緊急連絡先'
        },
        table: [
          { title: '従業員コード', key: 'EmployeeCode' },
          { title: '氏名', key: 'name' },
          { title: '事業所名', key: 'BusinessName' },
          { title: '職制', key: 'Position' },
          { title: '緊急連絡先', key: 'EmergencyContact' }
        ],
        retirementFlg: false,
        isOpenTable: false,
        selectedRow: '',
        items: ['', '東京事業所', '大阪事業所', '沖縄事業所', '福岡事業所', '札幌事業所', '沖縄事業所']
      });
      const router = useRouter();

      const DataList = ref([
        {
          idCode: '001',
          EmployeeCode: '0001',
          name: '従業員ABCDEFGHIJKLMNOPQRSTUABCDEFGHIGKLMN',
          BusinessName: '東京事業所',
          Position: '支援員',
          EmergencyContact: '090-1111-1111'
        },
        {
          idCode: '002',
          EmployeeCode: '0002',
          name: '従業員B',
          BusinessName: '大阪事業所',
          Position: '支援員',
          EmergencyContact: '090-1111-1111'
        },
        {
          idCode: '003',
          EmployeeCode: '0003',
          name: '従業員C',
          BusinessName: '福岡事業所',
          Position: '支援員',
          EmergencyContact: '090-1111-1111'
        },
        {
          idCode: '004',
          EmployeeCode: '0004',
          name: '従業員D',
          BusinessName: '名古屋事業所',
          Position: '支援員',
          EmergencyContact: '090-1111-1111'
        },
        {
          idCode: '005',
          EmployeeCode: '0005',
          name: '従業員E',
          BusinessName: '立川事業所',
          Position: '支援員',
          EmergencyContact: '090-1111-1111'
        },
        {
          idCode: '006',
          EmployeeCode: '0006',
          name: '従業員F',
          BusinessName: '横浜事業所',
          Position: '支援員',
          EmergencyContact: '090-1111-1111'
        },
        {
          idCode: '007',
          EmployeeCode: '0007',
          name: '従業員G',
          BusinessName: '中間事業所',
          Position: '支援員',
          EmergencyContact: '090-1111-1111'
        },
        {
          idCode: '008',
          EmployeeCode: '0008',
          name: '従業員H',
          BusinessName: '熊本事業所',
          Position: '支援員',
          EmergencyContact: '090-1111-1111'
        },
        {
          idCode: '008',
          EmployeeCode: '0009',
          name: '従業員I',
          BusinessName: '川口事業所',
          Position: '支援員',
          EmergencyContact: '090-1111-1111'
        },
        {
          idCode: '009',
          EmployeeCode: '0010',
          name: '従業員J',
          BusinessName: '柏事業所',
          Position: '支援員',
          EmergencyContact: '090-1111-1111'
        },
        {
          idCode: '010',
          EmployeeCode: '0011',
          name: '従業員K',
          BusinessName: '相模原事業所',
          Position: '支援員',
          EmergencyContact: '090-1111-1111'
        },
        {
          idCode: '011',
          EmployeeCode: '0012',
          name: '従業員L',
          BusinessName: '東京事業所',
          Position: '支援員',
          EmergencyContact: '090-1111-1111'
        }
      ]);
      const handleSubmit = () => {};
      const selectRow = (index) => {
        screen.selectedRow = index;
      };
      const returnbtn = () => {
        screen.isOpenTable = false;
        screen.selectedRow = '';
        router.push('/BlankPage');
      };
      return {
        screen,
        DataList,
        selectRow,
        returnbtn,
        handleSubmit
      };
    }
  };
</script>

<style scoped>
  :deep(.custom-select .v-input__control) {
    background-color: #ffffff;
    height: 50px;
  }
  .jigyosyocdselect {
    display: flex;
    width: 400px;
  }
  .custom-label {
    width: 150px;
    line-height: 60px;
  }
  :deep(.custom-input .v-input__control) {
    background-color: #ffffff;
    height: 50px;
  }
  .custom-gap {
    gap: 100px;
  }
  .custom_returnbtn {
    border-radius: 17px;
  }
  .custom_search {
    border-radius: 17px;
  }
  .jugyoinnmselect {
    display: flex;
    width: 500px;
  }
  .emergencycontactselect {
    display: flex;
    width: 500px;
  }
  :deep(.custom-checkbox .v-label) {
    font-weight: bolder;
    font-size: 18.8px;
    color: black;
    opacity: 1;
  }
  .btnprimary {
    display: flex;
    justify-content: space-between;
    padding-right: 2%;
    padding-left: 1%;
  }
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
    overflow-y: auto;
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

  .List:hover {
    background-color: #e7ffe1 !important;
  }
  .form-table-sub tbody tr:nth-child(even) {
    background-color: #f5f5f5;
  }
</style>
