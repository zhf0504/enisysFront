<template>
    <VContainer>
      <!-- タイトル -->
     <BaseTitle :title="screen.label.title"></BaseTitle>
     <VForm @submit.prevent="handleSubmit">
      <!-- 「戻る」「コピー登録」ボタン -->
      <VRow class="form-row1 form-row4" >
        <VBtn @click="onBackClick" class="custom-btn" color="primary">{{ screen.label.BackBtn }}</VBtn>
        <VBtn v-if="!screen.isHistory" class="custom-btn" color="primary" type="submit">
          {{ screen.label.CopyRegistrationBtn }}
        </VBtn>
      </VRow>
      <!-- 支援料金合計 -->
      <VRow v-if="!screen.isHistory" class="custom-total">
        <h3 class="custom-label">{{ screen.label.Total }}</h3>
        <div>
            1
        </div>
        <div>
            2
        </div>
      </VRow>
      <!-- 一覧エリア -->
      <VTable class="form-table-sub">
          <thead>
            <tr>
              <th v-for="(header, index) in screen.table" :key="index">{{ header.title }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in DataList" class="List" :key="index">
              <!-- 一覧エリア項目 -->
              <td>
                <router-link to="/EmpMstRegister">{{ item.memberCardNm }}</router-link>
              </td>
              <td>{{ item.jigyosyoNm }}</td>
              <td v-if="screen.isHistory">{{ item.historyNo }}</td>
              <td>{{ item.TantoJugyoinCd }}</td>
              <td>{{ item.supportWorksCd }}</td>
              <td :style="{width: '180px'}">{{ item.implementDate }}</td>
              <td :style="{width: '180px'}">{{ item.money }}</td>
              <td :style="{width: '180px'}">{{ item.moneyTaxIncluded }}</td>
            </tr>
          </tbody>
        </VTable>
     </VForm>
    </VContainer>
  </template>
  
  <script>
  import BaseTitle from '@/components/BaseTitle.vue';
  import { onMounted, reactive, ref } from 'vue';
  import router from '@/router';


    export default {
        components: { BaseTitle },
      setup() {
        const screen = reactive({
        label: {
            title: '支援実績一覧',
            BackBtn: '戻る',
            CopyRegistrationBtn: 'コピー登録',
            Total: '支援料金合計:'
        },
        table: [
          { title: '会員氏名', key: 'memberCardNm' },
          { title: '事業所', key: 'jigyosyoNm' },
          { title: '支援担当者', key: 'TantoJugyoinCd' },
          { title: '支援業務', key: 'supportWorksCd' },
          { title: '支援実施日', key: 'implementDate' },
          { title: '料金', key: 'money' },
          { title: '料金(税込)', key: 'moneyTaxIncluded' },
        ],
        isHistory:false,

        });
        const DataList = ref([
            {
                memberCardNm: '田中 太郎',
                jigyosyoNm: '東京事業所',
                historyNo: '001',
                TantoJugyoinCd: '支援担当者A',
                supportWorksCd: '支援業務A',
                implementDate: '2024/11/20',
                money: '5000',
                moneyTaxIncluded: '5500'
            },
            {
                memberCardNm: '佐藤 花子',
                jigyosyoNm: '大阪事業所',
                historyNo: '002',
                TantoJugyoinCd: '支援担当者B',
                supportWorksCd: '支援業務B',
                implementDate: '2024/11/22',
                money: '6000',
                moneyTaxIncluded: '6600'
            },
            {
                memberCardNm: '鈴木 一郎',
                jigyosyoNm: '名古屋事業所',
                historyNo: '001',
                TantoJugyoinCd: '支援担当者C',
                supportWorksCd: '支援業務C',
                implementDate: '2024/11/25',
                money: '7000',
                moneyTaxIncluded: '7700'
            },
            {
                memberCardNm: '高橋 次郎',
                jigyosyoNm: '福岡事業所',
                historyNo: '001',
                TantoJugyoinCd: '支援担当者D',
                supportWorksCd: '支援業務D',
                implementDate: '2024/11/30',
                money: '8000',
                moneyTaxIncluded: '8800'
            },
            {
                memberCardNm: '伊藤 美咲',
                jigyosyoNm: '京都事業所',
                historyNo: '001',
                TantoJugyoinCd: '支援担当者E',
                supportWorksCd: '支援業務E',
                implementDate: '2024/12/02',
                money: '9000',
                moneyTaxIncluded: '9900'
            },
            {
                memberCardNm: '加藤 健太',
                jigyosyoNm: '横浜事業所',
                historyNo: '001',
                TantoJugyoinCd: '支援担当者F',
                supportWorksCd: '支援業務F',
                implementDate: '2024/12/05',
                money: '10000',
                moneyTaxIncluded: '11000'
            },
            {
                memberCardNm: '吉田 あかり',
                jigyosyoNm: '札幌事業所',
                historyNo: '001',
                TantoJugyoinCd: '支援担当者G',
                supportWorksCd: '支援業務G',
                implementDate: '2024/12/07',
                money: '11000',
                moneyTaxIncluded: '12100'
            },
            {
                memberCardNm: '山本 聡',
                jigyosyoNm: '広島事業所',
                historyNo: '001',
                TantoJugyoinCd: '支援担当者H',
                supportWorksCd: '支援業務H',
                implementDate: '2024/12/10',
                money: '12000',
                moneyTaxIncluded: '13200'
            },
            {
                memberCardNm: '中村 恵子',
                jigyosyoNm: '神戸事業所',
                historyNo: '001',
                TantoJugyoinCd: '支援担当者I',
                supportWorksCd: '支援業務I',
                implementDate: '2024/12/12',
                money: '13000',
                moneyTaxIncluded: '14300'
            },
            {
                memberCardNm: '松本 明',
                jigyosyoNm: '福岡事業所',
                historyNo: '001',
                TantoJugyoinCd: '支援担当者J',
                supportWorksCd: '支援業務J',
                implementDate: '2024/12/15',
                money: '14000',
                moneyTaxIncluded: '15400'
            },
            {
                memberCardNm: '石井 美沙子',
                jigyosyoNm: '北海道事業所',
                historyNo: '001',
                TantoJugyoinCd: '支援担当者K',
                supportWorksCd: '支援業務K',
                implementDate: '2024/12/18',
                money: '15000',
                moneyTaxIncluded: '16500'
            },
            {
                memberCardNm: '小林 薫',
                jigyosyoNm: '仙台事業所',
                historyNo: '001',
                TantoJugyoinCd: '支援担当者L',
                supportWorksCd: '支援業務L',
                implementDate: '2024/12/20',
                money: '16000',
                moneyTaxIncluded: '17600'
            },
            {
                memberCardNm: '長谷川 直人',
                jigyosyoNm: '静岡事業所',
                historyNo: '001',
                TantoJugyoinCd: '支援担当者M',
                supportWorksCd: '支援業務M',
                implementDate: '2024/12/23',
                money: '17000',
                moneyTaxIncluded: '18700'
            },
            {
                memberCardNm: '藤井 悠真',
                jigyosyoNm: '愛知事業所',
                historyNo: '001',
                TantoJugyoinCd: '支援担当者N',
                supportWorksCd: '支援業務N',
                implementDate: '2024/12/25',
                money: '18000',
                moneyTaxIncluded: '19800'
            },
            {
                memberCardNm: '中田 美咲',
                jigyosyoNm: '熊本事業所',
                historyNo: '001',
                TantoJugyoinCd: '支援担当者O',
                supportWorksCd: '支援業務O',
                implementDate: '2024/12/28',
                money: '19000',
                moneyTaxIncluded: '20900'
            }
        ]);

        onMounted(() => {
            const mode = sessionStorage.getItem("mode");
            if(mode === '1'){
                screen.label.title = screen.label.title + '(履歴)'
                screen.isHistory = true
                // 履歴番号を2番目に追加
                screen.table.splice(2, 0, { title: '履歴番号', key: 'historyNo' });
            }
            else{
                screen.isHistory = false
            }
        })
        //「戻る」ボタン処理
        const onBackClick = () => {
            router.push({ name: 'SupportResultsSearch' });
        };
        // 「コピー登録」ボタン処理
        const handleSubmit = () => {};
        return {
            screen,
            handleSubmit,
            onBackClick,
            DataList,
        };
      }
    };
  </script>
  
  <style scoped>
  /* 「戻る」「コピー登録」ボタン */
  .form-row1 {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 25px;
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
    font-size: 20px;
  }
  .form-row1-sub2-1 .custom-btn {
    width: 100px;
    font-size: 18px;
  }
  /* 一覧エリア */
  .form-table-sub {
    margin: 30px 0;
    max-height: 580px;
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
  .custom-label{
    padding: 10px;
  }
  .custom-total div{
    border: 1px solid black;
    width: 180px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 10px;
  }
  .custom-total{
    display: flex;
    justify-content: flex-end;
    padding-right: 30px;
  }
</style>
  