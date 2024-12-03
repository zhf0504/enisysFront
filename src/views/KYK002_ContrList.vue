<template>
  <VContainer>
    <!-- タイトル -->
    <BaseTitle :title="screen.label.title" />
    <!-- エラーメッセージ -->
    <div class="errorMess">
      <NotificationError v-if="screen.errorCode" :errorCode="screen.errorCode" />
    </div>
    <!-- 戻るーコピー登録ボタン -->
    <VRow class="form-row-btn">
      <VBtn class="custom-btn" color="primary" @click="handleBackBtn">{{ screen.label.button.backBtn }}</VBtn>
      <VBtn class="custom-btn" v-if="!screen.isVisible" color="primary" @click="handleCopyRegisterBtn">
        {{ screen.label.button.copyRegisterBtn }}
      </VBtn>
    </VRow>

    <!-- 契約一覧PC -->
    <div v-if="screen.isOpenTable" class="isPC">
      <VTable class="form-table">
        <thead>
          <tr>
            <th class="form-table-title" v-for="(header, index) in screen.label.table" :key="index">
              {{ header.title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, rowIndex) in requestDataList"
            :key="rowIndex"
            :class="{ 'selected-row': screen.selectedRows.includes(rowIndex) }"
            @click="selectRow(rowIndex)"
          >
            <td class="form-table-row">
              <!-- TODO 契約参照モード処理 -->
              <v-tooltip :text="row.full_nm">
                <template v-slot:activator="{ props }">
                  <router-link :to="{ name: 'ContrRegister' }" v-bind="props" class="text-ellipsis">
                    {{ row.full_nm }}
                  </router-link>
                </template>
              </v-tooltip>
            </td>
            <td class="form-table-row">{{ row.effective_period }}</td>
            <td class="form-table-row">{{ row.billingMethod }}</td>
            <td class="form-table-row">
              <VIcon>{{ row.shibo ? 'mdi-circle' : '' }}</VIcon>
            </td>
            <td class="form-table-row">
              <VIcon>{{ row.gyotei ? 'mdi-circle' : '' }}</VIcon>
            </td>
            <td class="form-table-row">
              <VIcon>{{ row.manichi ? 'mdi-circle' : '' }}</VIcon>
            </td>
            <td class="form-table-row">
              <VIcon>{{ row.sougi ? 'mdi-circle' : '' }}</VIcon>
            </td>
            <td class="form-table-row">
              <VIcon>{{ row.nokotsu ? 'mdi-circle' : '' }}</VIcon>
            </td>
            <td class="form-table-row">
              <VIcon>{{ row.relics ? 'mdi-circle' : '' }}</VIcon>
            </td>
            <td class="form-table-row">
              <VIcon>{{ row.kinsen ? 'mdi-circle' : '' }}</VIcon>
            </td>
          </tr>
        </tbody>
      </VTable>
    </div>

    <!-- 会員一覧のSP版 -->
    <div v-if="screen.isOpenTable" class="form-table-sub isSP">
      <div class="form-table-header">
        <div class="form-table-header-sub">
          <!-- 氏名 -->
          <div class="form-table-title-sub-1">
            <h2>{{ screen.label.table[0].title }}</h2>
          </div>
          <!-- 請求方法 -->
          <div class="form-table-title-sub-1">
            <h2>{{ screen.label.table[2].title }}</h2>
          </div>
        </div>
        <div class="form-table-header-sub">
          <!-- 適用期間 -->
          <div class="form-table-title-sub-3">
            <h2>{{ screen.label.table[1].title }}</h2>
          </div>
        </div>
      </div>
      <div
        v-for="(row, indexRow) in requestDataList"
        :key="indexRow"
        :class="{ 'selected-row': screen.selectedRows.includes(indexRow) }"
        class="form-table-data"
        @click="selectRow(indexRow)"
      >
        <div class="form-table-data-sub">
          <div class="form-table-row-sub-1">
            <v-tooltip v-model="row.showTooltipName" :text="row.full_nm">
              <template v-slot:activator="{ props }">
                <span v-bind="props" @click="row.showTooltipName = !row.showTooltipName">{{ row.full_nm }}</span>
              </template>
            </v-tooltip>
          </div>

          <div class="form-table-row-sub-2">{{ row.billingMethod }}</div>
        </div>

        <div class="form-table-data-sub">
          <div class="form-table-row-sub-3">{{ row.effective_period }}</div>
        </div>
      </div>
    </div>

    <VRow class="form-row-btn-sub isSP">
      <VBtn @click="screen.isExpanded = !screen.isExpanded" class="footer-button-sub">
        <VIcon>{{ screen.isExpanded ? 'mdi-chevron-down' : 'mdi-chevron-up' }}</VIcon>
      </VBtn>
      <VExpandTransition>
        <div v-if="screen.isExpanded" class="footer-button-sub">
          <VBtn class="custom-btn" color="primary" @click="handleBackBtn">{{ screen.label.button.backBtn }}</VBtn>
          <VBtn class="custom-btn" color="primary" v-if="!screen.isVisible" @click="handleCopyRegisterBtn">
            {{ screen.label.button.copyRegisterBtn }}
          </VBtn>
          <VBtn class="custom-btn" color="primary" @click="handleKeiyakuSanShouBtn">
            {{ screen.label.button.keiyakuSanShouBtn }}
          </VBtn>
        </div>
      </VExpandTransition>
    </VRow>
  </VContainer>
</template>

<script>
  import BaseTitle from '@/components/BaseTitle.vue';
  import NotificationError from '@/components/error/NotificationError.vue';
  import router from '@/router';
  import store from '@/store';
  import { onMounted, reactive, ref } from 'vue';
  import contractList from '@/assets/JsonData/contract/contractList.json';

  export default {
    components: { BaseTitle, NotificationError },
    setup() {
      const screen = reactive({
        label: {
          title: '契約一覧',
          button: {
            backBtn: '戻る',
            copyRegisterBtn: 'コピー登録',
            keiyakuSanShouBtn: '契約参照'
          },
          table: [
            { title: '会員氏名', key: 'full_nm' },
            { title: '適用期間', key: 'effective_period' },
            { title: '請求方法', key: 'billingMethod' },
            { title: '身保', key: '' }, //TODO 今後追加
            { title: '業提', key: '' }, //TODO 今後追加
            { title: '万一', key: '' }, //TODO 今後追加
            { title: '葬儀', key: '' }, //TODO 今後追加
            { title: '納骨', key: '' }, //TODO 今後追加
            { title: '遺品', key: '' }, //TODO 今後追加
            { title: '金銭', key: '' } //TODO 今後追加
          ]
        },
        isOpenTable: true,
        selectedRows: [],
        isVisible: false
      });
      //TODO 契約一覧リスト取得
      const requestDataList = ref(contractList);

      //行単位の処理
      const selectRow = (indexRow) => {
        const selectedIndex = screen.selectedRows.indexOf(indexRow);
        if (selectedIndex === -1) {
          //選択した行をリスト追加
          screen.selectedRows.push(indexRow);
        } else {
          // 存在すれば、リストから破棄
          screen.selectedRows.splice(selectedIndex, 1);
        }
      };
      //初期表示
      onMounted(() => {
        const mode = sessionStorage.getItem('mode');

        if (mode == '1') {
          screen.isVisible = true;
          screen.label.title = screen.label.title + '(履歴)';
        } else {
          screen.isVisible = false;
        }
      });

      //戻るボタン処理
      const handleBackBtn = () => {
        store.dispatch('auth/updatePermission', { flag: 'ContrSearch', values: false });
        router.push({ name: 'ContrSearch' });
      };
      //TODO コピー登録処理
      const handleCopyRegisterBtn = () => {
        console.log('コピー登録処理');
      };
      //TODO 契約参照モード処理
      const handleKeiyakuSanShouBtn = () => {
        console.log('契約参照モード処理');
      };
      return {
        screen,
        handleBackBtn,
        requestDataList,
        selectRow,
        handleCopyRegisterBtn,
        handleKeiyakuSanShouBtn
      };
    }
  };
</script>

<style scoped>
  .form-row-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 30px 0;
  }

  .form-row-btn .custom-btn {
    width: 130px;
  }

  .form-table {
    margin: 30px 0;
    max-height: 550px;
    overflow-y: auto;
  }

  .form-table thead {
    position: sticky;
    top: 0;
    z-index: 1;
  }

  .form-table,
  .form-table th,
  .form-table thead {
    border: 1px solid #ddd;
  }

  .form-table td {
    border: 1px solid #f0f0f0;
    cursor: pointer;
  }

  .form-table th {
    font-size: 18px;
    background-color: #97d885;
    color: white;
    font-weight: bolder;
    text-align: center !important;
  }

  .selected-row {
    background-color: #e2efda !important;
  }
  .text-ellipsis {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .form-table-row:nth-child(4),
  .form-table-row:nth-child(5),
  .form-table-row:nth-child(6),
  .form-table-row:nth-child(7),
  .form-table-row:nth-child(8),
  .form-table-row:nth-child(9),
  .form-table-row:nth-child(10) {
    text-align: center;
  }

  /* SP版のCSS */
  @media (max-width: 850px) {
    .form-row-btn {
      display: none;
    }
    .form-row-btn-sub {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: white;
      margin: 0 auto;
      padding: 38px 0 0 0;
      display: block;
      z-index: 102;
    }

    .footer-button-sub:nth-child(1) {
      position: absolute;
      top: 0;
      left: 0;
      font-size: 24px;
      z-index: 103;
      border: none;
      box-shadow: none;
    }
    .footer-button-sub:nth-child(2) {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-left: 1.5em;
      margin-right: 1.5em;
    }
    .form-row-btn-sub .custom-btn {
      font-size: 16px;
      border-radius: 17px;
      width: 30%;
      margin-bottom: 1em;
    }

    /* SP版テーブル */
    .form-table-sub {
      max-height: 570px;
      width: 100%;
      overflow-y: auto;
      border-collapse: collapse;
      margin-bottom: 1em;
    }
    .form-table-sub .form-table-header {
      position: sticky;
      top: 0;
      z-index: 1;
      color: white;
      font-size: 12px;
      background-color: #97d885;
      border: 1px solid black !important;
    }
    .form-table-sub .form-table-data {
      background-color: white;
      cursor: pointer;
      border: 1px solid black !important;
    }

    .form-table-header-sub,
    .form-table-data-sub {
      display: flex;
      width: 100%;
    }
    .form-table-header-sub div,
    .form-table-data-sub div {
      padding: 10px;
      text-align: left;
      border: 1px solid #ddd;
    }

    .form-table-title-sub-1,
    .form-table-row-sub-1,
    .form-table-title-sub-2,
    .form-table-row-sub-2,
    .form-table-title-sub-3,
    .form-table-row-sub-3 {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .form-table-title-sub-1,
    .form-table-row-sub-1,
    .form-table-title-sub-2,
    .form-table-row-sub-2 {
      width: 50%;
      text-align: center !important;
    }

    .form-table-title-sub-3,
    .form-table-row-sub-3 {
      width: 100%;
      text-align: center !important;
    }
  }
</style>
