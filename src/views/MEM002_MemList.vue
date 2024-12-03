<template>
  <VContainer>
    <BaseTitle :title="screen.label.title" />
    <div class="errorMess">
      <NotificationError v-if="screen.errorCode" :errorCode="screen.errorCode" />
    </div>
    <VRow class="form-row-btn">
      <VBtn class="custom-btn" color="primary" @click="handleBackBtn">{{ screen.label.button.backBtn }}</VBtn>
      <VBtn class="custom-btn" color="primary" @click="handleRegisterSupportBtn">
        {{ screen.label.button.registerSupportBtn }}
      </VBtn>
      <VBtn class="custom-btn" color="primary" @click="handleChangeOfficeBtn">
        {{ screen.label.button.changeOfficeBtn }}
      </VBtn>
      <VBtn class="custom-btn" color="primary" @click="handleRegisterMoveNoticeBtn">
        {{ screen.label.button.registerMoveNoticeBtn }}
      </VBtn>
      <VBtn class="custom-btn" color="primary" @click="handleOutputReportBtn">
        {{ screen.label.button.outputReportBtn }}
      </VBtn>
    </VRow>

    <!-- 会員一覧のPC版 -->
    <div v-if="screen.isOpenTable" class="isPC">
      <VTable class="form-table">
        <thead>
          <tr class="custom-checkbox">
            <th class="form-table-title">
              <VCheckbox v-model="screen.selectAll" @change="toggleSelectAll" color="primary" hide-details></VCheckbox>
            </th>
            <th class="form-table-title" v-for="(header, index) in screen.label.table" :key="index">
              {{ header.title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in requestDataList"
            :key="index"
            :class="{ 'selected-row': screen.selectedRows.includes(index) }"
            @click="selectRow(index)"
          >
            <td @click.stop class="custom-checkbox form-table-row">
              <VCheckbox v-model="screen.selectedRows" :value="index" color="primary" hide-details />
            </td>
            <td class="form-table-row">
              <v-tooltip :text="item.full_nm">
                <template v-slot:activator="{ props }">
                  <router-link :to="{ name: 'MemRegister' }" v-bind="props" class="text-ellipsis">
                    {{ item.full_nm }}
                  </router-link>
                </template>
              </v-tooltip>
            </td>
            <td class="form-table-row">
              <v-tooltip :text="item.current_address">
                <template v-slot:activator="{ props }">
                  <span v-bind="props" class="text-ellipsis">{{ item.current_address }}</span>
                </template>
              </v-tooltip>
            </td>
            <td class="form-table-row">{{ item.support_grade }}</td>
            <td class="form-table-row">{{ item.effective_period }}</td>
            <td class="form-table-row">
              <VIcon>{{ item.shibo ? 'mdi-circle' : '' }}</VIcon>
            </td>
            <td class="form-table-row">
              <VIcon>{{ item.gyotei ? 'mdi-circle' : '' }}</VIcon>
            </td>
            <td class="form-table-row">
              <VIcon>{{ item.manichi ? 'mdi-circle' : '' }}</VIcon>
            </td>
            <td class="form-table-row">
              <VIcon>{{ item.sougi ? 'mdi-circle' : '' }}</VIcon>
            </td>
            <td class="form-table-row">
              <VIcon>{{ item.nokotsu ? 'mdi-circle' : '' }}</VIcon>
            </td>
            <td class="form-table-row">
              <VIcon>{{ item.relics ? 'mdi-circle' : '' }}</VIcon>
            </td>
            <td class="form-table-row">
              <VIcon>{{ item.kinsen ? 'mdi-circle' : '' }}</VIcon>
            </td>
            <td class="form-table-row">{{ item.member_post_death_procedures }}</td>
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
          <!-- 適用期間 -->
          <div class="form-table-title-sub-2">
            <h2>{{ screen.label.table[3].title }}</h2>
          </div>
        </div>
        <div class="form-table-header-sub">
          <!-- 住所 -->
          <div class="form-table-title-sub-3">
            <h2>{{ screen.label.table[1].title }}</h2>
          </div>
          <!-- 死後事務 -->
          <div class="form-table-title-sub-4">
            <h2>{{ screen.label.table[11].title }}</h2>
          </div>
        </div>
      </div>
      <div
        v-for="(item, index) in requestDataList"
        :key="index"
        :class="{ 'selected-row': screen.selectedRows.includes(index) }"
        class="form-table-data"
        @click="selectRow(index)"
      >
        <div class="form-table-data-sub">
          <div class="form-table-row-sub-1">
            <v-tooltip v-model="item.showTooltipName" :text="item.full_nm">
              <template v-slot:activator="{ props }">
                <span v-bind="props" @click="item.showTooltipName = !item.showTooltipName">{{ item.full_nm }}</span>
              </template>
            </v-tooltip>
          </div>
          <div class="form-table-row-sub-2">{{ item.effective_period }}</div>
        </div>

        <div class="form-table-data-sub">
          <div class="form-table-row-sub-3">
            <v-tooltip v-model="item.showTooltipAddress" :text="item.current_address">
              <template v-slot:activator="{ props }">
                <span v-bind="props" @click="item.showTooltipAddress = !item.showTooltipAddress">
                  {{ item.current_address }}
                </span>
              </template>
            </v-tooltip>
          </div>
          <div class="form-table-row-sub-4">{{ item.member_post_death_procedures }}</div>
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
          <VBtn class="custom-btn" color="primary" @click="handleMemberInformationBtn">
            {{ screen.label.button.memberInformationBtn }}
          </VBtn>
          <VBtn class="custom-btn" color="primary" @click="handleRegisterSupportBtn">
            {{ screen.label.button.registerSupportBtn }}
          </VBtn>
          <VBtn class="custom-btn" color="primary" @click="handleChangeOfficeBtn">
            {{ screen.label.button.changeOfficeBtn }}
          </VBtn>
          <VBtn class="custom-btn" color="primary" @click="handleRegisterMoveNoticeBtn">
            {{ screen.label.button.registerMoveNoticeBtn }}
          </VBtn>
          <VBtn class="custom-btn" style="visibility: hidden"></VBtn>
        </div>
      </VExpandTransition>
    </VRow>
  </VContainer>
</template>

<script>
  import BaseTitle from '@/components/BaseTitle.vue';
  import router from '@/router';
  import store from '@/store';
  import { ref, onMounted, reactive, onBeforeUnmount } from 'vue';
  import memberList from '@/assets/JsonData/member/MemberList.json';
  import NotificationError from '@/components/error/NotificationError.vue';

  export default {
    components: { BaseTitle, NotificationError },
    setup() {
      // 画面属性の設定: 画面で使用するラベルやテキストを設定するオブジェクト
      const screen = reactive({
        label: {
          title: '会員一覧',
          button: {
            backBtn: '戻る',
            registerSupportBtn: '支援実績登録',
            changeOfficeBtn: '事業所変更',
            registerMoveNoticeBtn: '転居届登録',
            outputReportBtn: '帳票出力',
            memberInformationBtn: '会員情報参照'
          },
          table: [
            { title: '氏名', key: 'full_nm' },
            { title: '住所', key: 'current_address' },
            { title: '支援担当者', key: 'support_grade' },
            { title: '適用期間', key: 'effective_period' },
            { title: '身保', key: '' }, //TODO 今後追加
            { title: '業提', key: '' }, //TODO 今後追加
            { title: '万一', key: '' }, //TODO 今後追加
            { title: '葬儀', key: '' }, //TODO 今後追加
            { title: '納骨', key: '' }, //TODO 今後追加
            { title: '遺品', key: '' }, //TODO 今後追加
            { title: '金銭', key: '' }, //TODO 今後追加
            { title: '死後事務', key: 'member_post_death_procedures' }
          ]
        },
        isOpenTable: true,
        selectedRows: [],
        selectAll: false,
        isExpanded: true,
        errorCode: ''
      });
      const requestDataList = ref();

      //初期表示
      onMounted(() => {
        const requestData = JSON.parse(sessionStorage.getItem('MEM001_MemList'));
        if (requestData) {
          requestDataList.value = createTooltips(requestData);
        } else {
          requestDataList.value = createTooltips(memberList); //TODO削除
          //データが存在しなければ、遷移元に戻す。
          // store.dispatch('auth/updatePermission', { flag: 'MemSearch', value: false });
          // router.push({ name: 'MemSearch' });
        }
      });

      //会員一覧画面を離れるとき、セッションのデータをクリアする。
      onBeforeUnmount(() => {
        // sessionStorage.removeItem('MEM001_MemList');
      });

      // SP版のツールチップの調整
      const createTooltips = (requestDataList) => {
        const currentList = [];
        requestDataList.forEach((element) => {
          currentList.push({
            ...element,
            showTooltipName: false,
            showTooltipAddress: false
          });
        });
        return currentList;
      };

      //TODO会員一覧の高さ調整

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

      // 全体的にチェックボックスの選択
      const toggleSelectAll = () => {
        if (screen.selectAll) {
          // 全選択
          screen.selectedRows = requestDataList.value.map((_, index) => index);
        } else {
          // 全クリア
          screen.selectedRows = [];
        }
      };

      //「戻る」処理
      const handleBackBtn = () => {
        store.dispatch('auth/updatePermission', { flag: 'MemSearch', value: false });
        router.push({ name: 'MemSearch' });
      };
      //「支援実績登録」処理
      const handleRegisterSupportBtn = () => {
        console.log('「支援実績登録」処理');
      };
      //「事業所変更」処理
      const handleChangeOfficeBtn = () => {
        const checkboxNum = 1;
        if (screen.selectedRows.length < checkboxNum) {
          screen.errorCode = 'E020';
        } else if (screen.selectedRows.length > checkboxNum) {
          screen.errorCode = 'E021';
        } else {
          const selectedData = screen.selectedRows.map((index) => requestDataList.value[index]);
          store.commit('memberInfo/setMemberList', selectedData);
          router.push({ name: 'AffOfficeChange' });
        }
      };
      //「転居届登録」処理
      const handleRegisterMoveNoticeBtn = () => {
        console.log('「転居届登録」処理');
      };
      //「帳票出力」処理
      const handleOutputReportBtn = () => {
        const checkboxNum = 1;
        if (screen.selectedRows.length < checkboxNum) {
          screen.errorCode = 'E020';
        } else if (screen.selectedRows.length > checkboxNum) {
          screen.errorCode = 'E021';
        } else {
          const selectedData = screen.selectedRows.map((index) => requestDataList.value[index]);
          store.commit('memberInfo/setMemberList', selectedData);
          router.push({ name: 'MemReportPrintSetting' });
        }
      };
      //「会員情報参照」処理
      const handleMemberInformationBtn = () => {
        console.log('「会員情報参照」処理');
      };
      return {
        screen,
        requestDataList,
        toggleSelectAll,
        selectRow,
        handleBackBtn,
        handleRegisterSupportBtn,
        handleChangeOfficeBtn,
        handleRegisterMoveNoticeBtn,
        handleOutputReportBtn,
        handleMemberInformationBtn
      };
    }
  };
</script>

<style scoped>
  .form-row-btn {
    display: flex;
    justify-content: space-evenly;
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

  .custom-checkbox {
    padding: 0;
    margin: 0;
  }

  .text-ellipsis {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .form-table-title:nth-child(1),
  .form-table-row:nth-child(1) {
    min-width: 70px;
    padding: 0 auto;
    margin: 0 auto;
    color: black;
  }

  .form-table-title:nth-child(2),
  .form-table-row:nth-child(2) {
    width: 120px;
  }

  .form-table-row:nth-child(2) .text-ellipsis {
    width: 120px;
  }

  .form-table-title:nth-child(3),
  .form-table-row:nth-child(3) {
    width: 150px;
  }

  .form-table-title:nth-child(4),
  .form-table-row:nth-child(4),
  .form-table-title:nth-child(13),
  .form-table-row:nth-child(13) {
    min-width: 100px;
  }

  .form-table-title:nth-child(5),
  .form-table-row:nth-child(5) {
    min-width: 220px;
  }

  .form-table-row:nth-child(6),
  .form-table-row:nth-child(7),
  .form-table-row:nth-child(8),
  .form-table-row:nth-child(9),
  .form-table-row:nth-child(10),
  .form-table-row:nth-child(11),
  .form-table-row:nth-child(12) {
    text-align: center;
  }

  .form-row-btn-sub {
    display: none;
  }
  /* スマートフォンのCSS */
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
      font-size: 20px;
      z-index: 103;
      border: none;
      box-shadow: none;
    }
    .footer-button-sub:nth-child(2) {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      flex-wrap: wrap;
      gap: 5px;
    }

    .form-row-btn-sub .custom-btn {
      font-size: 14px;
      border-radius: 17px;
      width: 110px;
    }

    /* SP版テーブル */
    .form-table-sub {
      max-height: 500px;
      width: 100%;
      overflow-y: auto;
      border-collapse: collapse;
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
    .form-table-row-sub-3,
    .form-table-title-sub-4,
    .form-table-row-sub-4 {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .form-table-title-sub-1,
    .form-table-row-sub-1 {
      width: 35%;
    }

    .form-table-title-sub-2,
    .form-table-row-sub-2 {
      width: 65%;
    }

    .form-table-title-sub-3,
    .form-table-row-sub-3 {
      width: 70%;
    }

    .form-table-title-sub-4,
    .form-table-row-sub-4 {
      width: 30%;
      text-align: center !important;
    }
  }
</style>
