<template>
  <VDialog v-model="screen.openModalShienFlag" @click:outside="closeDialog">
    <VContainer id="modal">
      <!-- タイトルコンポーネント -->
      <BaseTitle :title="screen.label.title" />
      <VForm class="form-group">
        <VRow class="custom-input form-row" justify-content="center">
          <!-- 事業所選択フィールド -->
          <VCol cols="4" class="form-row-sub1">
            <h3 class="custom-label has-asterisk">{{ screen.label.jigyosyo }}</h3>
            <VSelect :items="screen.label.jigyoshoLists" v-model="screen.selectedJigyosho" hide-details></VSelect>
          </VCol>
          <!-- 従業員氏名入力フィールド -->
          <VCol cols="4" class="form-row-sub2">
            <h3 class="custom-label">{{ screen.label.jugyoin_nm }}</h3>
            <VTextField v-model="screen.inputJugyoinNm" hide-details></VTextField>
          </VCol>
        </VRow>
        <!-- ボタン -->
        <VRow class="form-row-btn">
          <VBtn class="custom-btn" color="primary" @click="closeDialog">{{ screen.label.button.backBtn }}</VBtn>
          <VBtn class="custom-btn" color="primary" @click="screen.isOpenTable = true">
            <VIcon>{{ screen.label.button.searchIcon }}</VIcon>
            {{ screen.label.button.searchBtn }}
          </VBtn>
        </VRow>
        <!-- 検索結果テーブル -->
        <div v-if="screen.isOpenTable" class="form-table">
          <VTable class="form-table-sub">
            <thead>
              <tr>
                <th class="form-table-title" v-for="(header, index) in screen.label.table" :key="index">
                  {{ header.title }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in requestDataList"
                :key="index"
                :class="{ 'selected-row': screen.selectedRow === index }"
                @click="selectRow(index)"
              >
                <td>{{ item.jugyoin_nm }}</td>
                <td>{{ item.jigyosyo_nm }}</td>
                <td>{{ item.syokusyu }}</td>
                <td>{{ item.social_give_phone }}</td>
              </tr>
            </tbody>
          </VTable>
          <!-- 選択ボタン -->
          <VBtn class="custom-btn" color="primary" @click="handleSubmit">
            {{ screen.label.button.selectBtn }}
          </VBtn>
        </div>
      </VForm>
    </VContainer>
  </VDialog>
</template>

<script>
  import BaseTitle from '@/components/BaseTitle.vue';
  import { ref, reactive } from 'vue';
  import employeeList from '@/assets/JsonData/member/EmployeeList.json';
  import { watch } from 'vue';

  export default {
    components: { BaseTitle },
    props: {
      isVisible: {
        type: Boolean,
        default: false
      }
    },
    setup(props, { emit }) {
      // 画面のラベルや設定項目
      const screen = reactive({
        label: {
          title: '従業員検索',
          jigyosyo: '事業所',
          jugyoin_nm: '従業員氏名',
          button: {
            backBtn: '閉じる',
            searchIcon: 'mdi-magnify',
            searchBtn: '検索',
            selectBtn: '選択'
          },
          table: [
            { title: '従業員氏名', key: 'jugyoin_nm' },
            { title: '事業所', key: 'jigyosyo_nm' },
            { title: '職種', key: 'syokusyu' },
            { title: '社給携帯番号', key: 'social_give_phone' }
          ],
          jigyoshoLists: ['', '東京事業所', '大阪事業所', '沖縄事業所', '福岡事業所', '札幌事業所', '九州事業所']
        },
        selectedJigyosho: '',
        inputJugyoinNm: '',
        isOpenTable: false,
        selectedRow: '',
        openModalShienFlag: props.isVisible,
        selectedShientanto: props.selectedData
      });

      const requestDataList = ref(employeeList);

      // モーダル表示の監視
      watch(
        () => props.isVisible,
        (newVal) => {
          screen.openModalShienFlag = newVal;
        }
      );

      // モーダルを閉じる関数
      const closeDialog = () => {
        screen.openModalShienFlag = false;
        screen.isOpenTable = false;
        screen.selectedJigyosho = '';
        screen.inputJugyoinNm = '';
        screen.selectedRow = '';
        emit('update:isVisible', false);
      };

      // 行を選択する関数
      const selectRow = (index) => {
        screen.selectedRow = index;
      };

      // フォームを送信する関数
      const handleSubmit = () => {
        if (screen.selectedRow || screen.selectedRow === 0) {
          const selected = requestDataList.value[screen.selectedRow];
          const selectedShientanto = selected.idCode + selected.jugyoin_nm;
          emit('selectedShientanto', selectedShientanto);
          emit('selectedTanto', requestDataList.value[screen.selectedRow]);
          closeDialog();
        }
      };

      return {
        screen,
        requestDataList,
        closeDialog,
        selectRow,
        handleSubmit
      };
    }
  };
</script>

<style scoped>
  #modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1000px;
    z-index: 1001;
  }

  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }

  :deep(.custom-input .v-input__control) {
    background-color: #ffffff;
    width: 100%;
    height: 50px;
  }

  .custom-label {
    width: 120px;
  }

  .form-group {
    padding: 0 15px 10px;
  }
  .form-row {
    display: flex;
    padding-bottom: 40px;
    justify-content: center;
  }

  .form-table .custom-btn {
    float: right;
    margin-right: 3%;
    font-size: 18px;
    border-radius: 17px;
  }

  .form-table-sub {
    margin: 30px 0;
    max-height: 300px;
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
    color: white;
    font-weight: bolder !important;
    text-align: center !important;
  }

  .selected-row {
    background-color: #e2efda;
    border: 1px solid black !important;
  }

  .form-row-sub1 {
    display: flex;
    margin-right: 12.5%;
  }
  .form-row-sub2 {
    display: flex;
    margin-left: 12.5%;
  }

  .form-row-btn {
    display: flex;
    justify-content: space-between;
    margin: 1% 3.5%;
  }

  /* SP版のCSS */
  @media (max-width: 850px) {
    #modal {
      padding: 18px 12px;
      max-height: 600px;
      overflow-y: auto;
    }
    .form-group {
      padding: 0;
    }
    .form-row {
      width: 93%;
      margin: 0 auto;
      padding: 0 auto;
      display: block;
    }
    .form-row h3 {
      width: 115px;
    }
    .form-row-sub1,
    .form-row-sub2 {
      margin: 0;
      min-width: 100%;
    }
    .form-table-title:nth-child(4),
    .form-table-sub tbody tr td:nth-child(4) {
      display: none;
    }
  }
</style>
