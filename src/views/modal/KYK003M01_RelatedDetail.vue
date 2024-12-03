<template>
  <VDialog
    v-model="screen.openModalKankeiFlag"
    :selected-member="screen.selectedMember"
    max-width="1200px"
    max-height="600px"
    scrollable
    @click:outside="closeDialog"
  >
    <VContainer id="modal">
      <!-- タイトルコンポーネント -->
      <BaseTitle :title="screen.label.title" />

      <!-- 関係者氏名 -->
      <VRow class="custom-input form-name">
        <h4 class="custom-label">{{ screen.label.memberName.tag }}</h4>
        <VCol class="name-col">
          <h6>{{ screen.label.memberName.lastNm }}</h6>
          <VTextField v-model="screen.lastNm" :placeholder="screen.label.placeholder.lastNm" hide-details></VTextField>
        </VCol>
        <VCol class="name-col">
          <h6>{{ screen.label.memberName.firstNm }}</h6>
          <VTextField
            v-model="screen.firstNm"
            :placeholder="screen.label.placeholder.firstNm"
            hide-details
          ></VTextField>
        </VCol>
        <VCol class="name-col">
          <h6>{{ screen.label.memberName.middleName }}</h6>
          <VTextField
            v-model="screen.middleName"
            :placeholder="screen.label.placeholder.middleName"
            hide-details
          ></VTextField>
        </VCol>
      </VRow>
      <!-- 会員指名フリガナ -->
      <VRow class="custom-input form-name">
        <h4 class="custom-label">{{ screen.label.memberNameKana.tag }}</h4>
        <VCol class="name-col">
          <h6>{{ screen.label.memberNameKana.lastNmKana }}</h6>
          <VTextField
            v-model="screen.lastNmKana"
            :placeholder="screen.label.placeholder.lastNmKana"
            hide-details
          ></VTextField>
        </VCol>
        <VCol class="name-col">
          <h6>{{ screen.label.memberNameKana.firstNmKana }}</h6>
          <VTextField
            v-model="screen.firstNmKana"
            :placeholder="screen.label.placeholder.firstNmKana"
            hide-details
          ></VTextField>
        </VCol>
        <VCol class="name-col">
          <h6>{{ screen.label.memberNameKana.middleNameKana }}</h6>
          <VTextField
            v-model="screen.middleNameKana"
            :placeholder="screen.label.placeholder.middleNameKana"
            hide-details
          ></VTextField>
        </VCol>
      </VRow>
      <!-- 全員と関係 -->
      <VRow class="custom-input form-remarks">
        <h4 class="custom-label">{{ screen.label.remarks }}</h4>
        <VCol>
          <VTextField
            v-model="editableMemberData.memberRelationship"
            :placeholder="screen.label.placeholder.memberRelationship"
            hide-details
          />
        </VCol>
      </VRow>

      <!-- 住所 -->
      <VRow class="yuubinNumber">
        <h4 class="custom-label">{{ screen.label.yuubinNumber }}</h4>
        <VCol class="custom-yuubinNumber">
          <p class="custom-warning">{{ screen.label.haifunWarning }}</p>
          <VTextField
            class="custom-input yubin-input"
            v-model="screen.current_post_cd"
            :placeholder="screen.label.placeholder.addressCode"
            hide-details
            @input="screen.current_post_cd = screen.current_post_cd.replace(/[^0-9-]/g, '')"
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
        <p class="only">{{ screen.label.PostalCodeFieldOnly }}</p>
        <VRow class="custom-input">
          <VTextField
            v-model="editableMemberData.address"
            :placeholder="screen.label.placeholder.address1"
            hide-details
          />
        </VRow>
        <VRow class="custom-input">
          <VTextField :placeholder="screen.label.placeholder.address2" hide-details></VTextField>
        </VRow>
      </VRow>

      <!-- 電話PC -->
      <VRow class="phoneNumber">
        <VCol class="landlinePhone">
          <h4 class="custom-label">{{ screen.label.landlinePhone }}</h4>
          <VCol class="landlinePhoneText">
            <p class="custom-warning">{{ screen.label.haifunWarning }}</p>
            <VTextField
              class="custom-input PhoneNumInput"
              v-if="editableMemberData.telephoneNumber && editableMemberData.telephoneNumber[0] !== undefined"
              v-model="tempPhoneData.landlinePhone"
              :placeholder="screen.label.placeholder.telephoneNumber"
              hide-details
              @input="tempPhoneData.landlinePhone = tempPhoneData.landlinePhone.replace(/[^0-9-]/g, '')"
            />
          </VCol>
        </VCol>
        <VCol class="mobilePhone">
          <h4 class="custom-label">{{ screen.label.mobilePhone }}</h4>
          <VCol class="mobilePhoneText">
            <p class="custom-warning">{{ screen.label.haifunWarning }}</p>
            <VTextField
              class="custom-input PhoneNumInput"
              v-if="editableMemberData.telephoneNumber && editableMemberData.telephoneNumber[1] !== undefined"
              v-model="tempPhoneData.mobilePhone"
              :placeholder="screen.label.placeholder.mobileNumber"
              hide-details
              @input="tempPhoneData.landlinePhone = tempPhoneData.landlinePhone.replace(/[^0-9-]/g, '')"
            />
          </VCol>
        </VCol>
      </VRow>

      <!-- メールアドレス -->
      <VRow class="custom-input form-remarks">
        <h4 class="custom-label">{{ screen.label.email }}</h4>
        <VCol>
          <VTextField :placeholder="screen.label.placeholder.mailAddress" hide-details></VTextField>
        </VCol>
      </VRow>

      <!-- 備考 -->
      <VRow class="form-textarea">
        <h4 class="custom-label">{{ screen.label.notes }}</h4>
        <VCol>
          <VTextarea
            class="custom-textarea"
            v-model="editableMemberData.note"
            :placeholder="screen.label.placeholder.text"
            hide-details
          />
        </VCol>
      </VRow>
      <!-- 「閉じる」「決定」ボタン -->
      <VRow class="form-row4">
        <VBtn @click="closeDialog" class="custom-btn" color="primary">{{ screen.label.BackBtn }}</VBtn>
        <VBtn class="custom-btn" color="primary" type="submit" @click="updateMemberData">
          <template v-if="screen.isLoading">
            <VProgressCircular indeterminate size="20" color="white" class="mr-2" />
          </template>
          {{ screen.label.confirmBtn }}
        </VBtn>
      </VRow>
    </VContainer>
  </VDialog>
</template>

<script>
  import BaseTitle from '@/components/BaseTitle.vue';
  import { reactive, watch } from 'vue';

  export default {
    components: { BaseTitle },
    props: {
      isVisible: {
        type: Boolean,
        default: false
      },
      memberData: {
        type: Object,
        default: () => ({})
      }
    },
    setup(props, { emit }) {
      const screen = reactive({
        label: {
          title: '関係者詳細',
          landlinePhone: '電話番号',
          mobilePhone: '携帯電話',
          email: 'アドレス',
          notes: '備考',
          BackBtn: '閉じる',
          confirmBtn: '決定',
          PostalCodeFieldOnly: '※住所⇔郵便番号の変換対象項目は住所1のみ',
          memberName: {
            tag: '関係者氏名',
            lastNm: '(姓)',
            firstNm: '(名)',
            middleName: '(ミドルネーム)'
          },
          memberNameKana: {
            tag: '関係者氏名フリガナ',
            lastNmKana: '(姓)',
            firstNmKana: '(名)',
            middleNameKana: '(ミドルネーム)'
          },
          placeholder: {
            lastNm: 'えにし',
            firstNm: '太郎',
            middleName: 'Michael',
            lastNmKana: 'エニシ',
            firstNmKana: 'タロウ',
            middleNameKana: 'マイケル',
            memberRelationship: '息子',
            membershipNameFirst: 'えにし 太郎一段目',
            membershipNameLast: 'えにし 太郎ニ段目',
            membershipNameKanaFirst: 'エニシ タロウ一ダンメ',
            membershipNameKanaLast: 'エニシ タロウ二ダンメ',
            addressCode: '000-0000',
            address1: '都道府県市町村番地',
            address2: '△△△マンション○○○号室',
            honseki: '東京都大田区大町',
            hittosya: 'えにし太郎',
            telephoneNumber: '03-1234-5678',
            mobileNumber: '080-1234-5678',
            mailAddress: 'abc@gmail.com',
            text: 'テキストを入力してください'
          },
          remarks: '会員との関係',
          yuubinNumber: '現住所（居所）',
          haifunWarning: '※ハイフン付けで入力してください',
          yuubinToAddressBtn: '郵便番号➝住所',
          AddressToYuubinBtn: '住所➝郵便番号',
          

        },

        openModalKankeiFlag: false,
        remarks: null
      });

      // モーダル表示の監視
      watch(
        () => props.isVisible,
        (newVal) => {
          if (screen.openModalKankeiFlag !== newVal) {
            screen.openModalKankeiFlag = newVal;
            Object.assign(editableMemberData, props.memberData || {});
            tempPhoneData.landlinePhone = props.memberData.telephoneNumber?.[0] || '';
            tempPhoneData.mobilePhone = props.memberData.telephoneNumber?.[1] || '';
          }
        }
      );
      // モーダルを閉じる関数
      const closeDialog = () => {
        screen.openModalKankeiFlag = false;
        emit('update:isVisible', false);
      };
      const tempPhoneData = reactive({
        landlinePhone: '',
        mobilePhone: ''
      });
      const editableMemberData = reactive({ ...props.memberData });

      const updateMemberData = () => {
        editableMemberData.telephoneNumber = [tempPhoneData.landlinePhone, tempPhoneData.mobilePhone];
        emit('update:memberData', { ...editableMemberData, index: props.memberData.index });
        closeDialog();
      };
      return {
        screen,
        closeDialog,
        updateMemberData,
        editableMemberData,
        tempPhoneData
      };
    }
  };
</script>

<style scoped>
  /* 全体モダール */
  #modal {
    overflow-y: auto;
    :deep(.v-col) {
      padding-top: 0;
    }
    :deep(.custom-textarea .v-input__control) {
      background-color: white;
    }
    .custom-textarea {
      width: 100%;
      height: 150px;
      resize: none;
      overflow-y: auto;
      white-space: pre-wrap;
      word-wrap: break-word;
      box-sizing: border-box;
    }
    .only {
      margin-bottom: 1em;
      font-size: 12px;
    }
  }
  :deep(.custom-input .v-input__control) {
    background-color: #ffffff;
    width: 100%;
    height: 50px;
  }

  :deep(.custom-input .v-field__input) {
    height: 50px;
  }

  .form-remarks {
    width: 482px;
  }

  .custom-warning {
    font-size: 12px;
  }

  .PostNumAndAddressChangeBtn {
    margin-left: 150px;
    margin-bottom: 1em;
    display: flex;
    justify-content: space-between;
    width: 310px;
  }

  .yubin-input {
    width: 160px;
  }

  .yuubin-button {
    border-radius: 10px;
  }
  .addressTextfield {
    display: block;
    margin: 10px 10px 0px 160px;
  }

  .phoneNumber {
    display: flex;
    justify-content: space-between;
    margin-top: 1.5em;
  }
  .landlinePhone,
  .mobilePhone {
    display: flex;
    align-items: center;
    padding-left: 0;
  }
  .PhoneNumInput {
    width: 310px;
  }

  .form-row4 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px 0px 15px 0px;
  }

  .form-row4 .custom-btn {
    width: 130px;
    border-radius: 17px;
    font-size: 24px;
  }

  @media (max-width: 850px) {
    .form-name,
    .form-remarks,
    .yuubinNumber,
    .phoneNumber,
    .landlinePhone,
    .mobilePhone,
    .form-textarea {
      display: block;
    }
    .PostNumAndAddressChangeBtn,
    .addressTextfield {
      margin-left: 0;
    }
    .form-remarks {
      width: auto;
    }
    .form-textarea {
      margin-bottom: 4em;
    }
    .custom-warning {
      font-size: 10px;
    }
    .only {
      font-size: 10px;
    }
    .form-row4 {
      position: fixed;
      display: flex;
      justify-content: space-between;
      align-items: center;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: #f5f5f5;
      height: 80px;
      margin: 0;
    }
    .form-row4 .custom-btn {
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
