<template>
  <VContainer>
    <!-- TODO モードによる、タイトルが非表示 -->

    <!-- 「適用開始日」「適用終了日」「履歴番号」「最終更新者」 -->
    <VRow class="custom-input custom-flex-col isPC">
      <!-- 「適用開始日」 -->
      <VCol>
        <h3 class="custom-label">{{ screen.label.applyStartDate }}</h3>
        <VDateInput
          v-model="screen.selectedApplyStartDate"
          :value="service.formatDateToJapan(screen.selectedApplyStartDate)"
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
          @click:clear="screen.selectedApplyStartDate = null"
          @focus="service.hiddenKeyBoardSP"
          :input-props="{ readonly: true }"
          ok-text="はい"
          cancel-text="キャンセル"
        />
      </VCol>
      <!-- 「適用終了日」 -->
      <VCol>
        <h3 class="custom-label">{{ screen.label.applyEndDate }}</h3>
        <VDateInput
          v-model="screen.selectedApplyStartDate"
          :value="service.formatDateToJapan(screen.selectedApplyStartDate)"
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
          @click:clear="screen.selectedApplyStartDate = null"
          @focus="service.hiddenKeyBoardSP"
          :input-props="{ readonly: true }"
          ok-text="はい"
          cancel-text="キャンセル"
        />
      </VCol>
      <!-- 「履歴番号」 -->
      <VCol>
        <h3 class="custom-label">{{ screen.label.historyId }}</h3>
        <h4 class="custom-label-sub">{{ screen.historyId }}</h4>
      </VCol>
      <!-- 「最終更新者」 -->
      <VCol>
        <h3 class="custom-label">{{ screen.label.lastUpdater }}</h3>
        <h4 class="custom-label-sub">{{ screen.lastUpdater }}</h4>
      </VCol>
    </VRow>
  </VContainer>
  <!-- 契約者情報 -->
  <BaseTitle class="custom-baseTitle" :title="screen.label.contrInfoTitle" />
  <VContainer>
    <!-- 契約番号 -->
    <VRow class="custom-input custom-flex-col isPC">
      <VCol>
        <h3 class="custom-label">{{ screen.label.contrId }}</h3>
        <h4 class="custom-label-sub">{{ screen.contrId }}</h4>
      </VCol>
      <VCol>
        <h3 class="custom-label">{{ screen.label.memberId }}</h3>
        <h4 class="custom-label-sub">{{ screen.memberId }}</h4>
      </VCol>
      <VCol>
        <h3 class="custom-label">{{ screen.label.memberName }}</h3>
        <h4 class="custom-label-sub">{{ screen.memberName }}</h4>
      </VCol>
    </VRow>
    <!-- 契約担当所属事務所 -->
    <VRow class="custom-input form-shientanto custom-flex-col custom-label-sp">
      <VCol class="form-jigyosyo-sub">
        <h3 class="custom-label">{{ screen.label.contrOffice }}</h3>
        <VTextField v-model="screen.contract_jigyosyo_cd" :readonly="true" clearable hide-details />
      </VCol>
      <VCol class="form-jugyoin-sub custom-flex">
        <h3 class="custom-label-child">{{ screen.label.contrManager }}</h3>
        <VTextField
          @click="openModalShien"
          :readonly="true"
          v-model="screen.contract_jugyoin_cd"
          clearable
          hide-details
        />
        <VBtn @click="openModalShien" color="primary" class="custom-btn">
          {{ screen.label.button.select }}
        </VBtn>
        <CMN005_EmpSearch
          :isVisible="screen.openModalShienFlag"
          @update:isVisible="screen.openModalShienFlag = $event"
          @selectedTanto="handleSelectedTanto"
        />
      </VCol>
    </VRow>
    <!-- 「契約者＝会員本人」「契約日」 -->
    <VRow class="form-contr-holder">
      <VCol class="form-contr-holder-sub">
        <VCheckbox
          class="custom-checkbox"
          color="primary"
          v-model="screen.contr_holder_flg"
          :label="screen.label.contrHolder"
          hide-details
        />
      </VCol>
      <VCol class="form-contr-holder-sub custom-input custom-flex custom-label-sp">
        <h3 class="custom-label-child">{{ screen.label.contrDate }}</h3>
        <VDateInput
          v-model="screen.contrDate"
          :value="service.formatDateToJapan(screen.contrDate)"
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
          @click:clear="screen.contrDate = null"
          @focus="service.hiddenKeyBoardSP"
          :input-props="{ readonly: true }"
          ok-text="はい"
          cancel-text="キャンセル"
        />
      </VCol>
    </VRow>
    <!-- 氏名 -->
    <VRow class="custom-input form-name">
      <!-- 契約者氏名 -->
      <h3 class="custom-label">{{ screen.label.contrName.tag }}</h3>
      <VCol class="name-col">
        <h6>{{ screen.label.contrName.lastNm }}</h6>
        <VTextField v-model="screen.lastNm" :placeholder="screen.placeholder.lastNm" hide-details></VTextField>
      </VCol>
      <VCol class="name-col">
        <h6>{{ screen.label.contrName.firstNm }}</h6>
        <VTextField v-model="screen.firstNm" :placeholder="screen.placeholder.firstNm" hide-details></VTextField>
      </VCol>
      <VCol class="name-col">
        <h6>{{ screen.label.contrName.middleName }}</h6>
        <VTextField v-model="screen.middleName" :placeholder="screen.placeholder.middleName" hide-details></VTextField>
      </VCol>
      <!-- 氏名フリガナ -->
      <h3 class="custom-label">{{ screen.label.contrNameKana.tag }}</h3>
      <VCol class="name-col">
        <h6>{{ screen.label.contrNameKana.lastNm }}</h6>
        <VTextField v-model="screen.lastNm" :placeholder="screen.placeholder.lastNm" hide-details></VTextField>
      </VCol>
      <VCol class="name-col">
        <h6>{{ screen.label.contrNameKana.firstNm }}</h6>
        <VTextField v-model="screen.firstNm" :placeholder="screen.placeholder.firstNm" hide-details></VTextField>
      </VCol>
      <VCol class="name-col">
        <h6>{{ screen.label.contrNameKana.middleName }}</h6>
        <VTextField v-model="screen.middleName" :placeholder="screen.placeholder.middleName" hide-details></VTextField>
      </VCol>
    </VRow>

    <!-- 契約情報の住所 -->
    <VRow class="custom-input form-address">
      <h3 class="custom-label">{{ screen.label.contrAddress }}</h3>
      <VCol>
        <VRow>
          <p class="custom-notice">{{ screen.label.hyphenInputNotice }}</p>
        </VRow>
        <VRow class="custom-notice-input">
          <VTextField v-model="screen.current_post_cd" :placeholder="screen.placeholder.addressCode" hide-details>
            <template #prepend-inner>
              <span class="custom-address-icon">〒</span>
            </template>
          </VTextField>
        </VRow>
        <VRow class="form-address-btn">
          <VBtn color="primary" class="custom-btn" @click="handlePostToAdd">
            {{ screen.label.button.postalCodeToAddress }}
          </VBtn>
          <VBtn color="primary" class="custom-btn" @click="handleAddToPost">
            {{ screen.label.button.addressToPostalCode }}
          </VBtn>
        </VRow>
        <VRow class="form-addressPostal-input">
          <p>{{ screen.label.address1PostalCodeFieldOnly }}</p>
          <VTextField v-model="screen.contr_current_address1" :placeholder="screen.placeholder.address1" hide-details />
          <VTextField v-model="screen.contr_current_address2" :placeholder="screen.placeholder.address2" hide-details />
        </VRow>
      </VCol>
    </VRow>

    <!-- 電話番号と携帯番号 -->
    <VRow class="custom-input form-telephone">
      <h3 class="custom-label">{{ screen.label.telephoneNumber }}</h3>
      <VCol class="form-telephone-sub">
        <p class="custom-notice">{{ screen.label.hyphenInputNotice }}</p>
        <VTextField v-model="screen.phone" :placeholder="screen.placeholder.telephoneNumber" hide-details />
      </VCol>
      <h3 class="custom-label-child">{{ screen.label.mobileNumber }}</h3>
      <VCol class="form-telephone-sub">
        <p class="custom-notice">{{ screen.label.hyphenInputNotice }}</p>
        <VTextField v-model="screen.mobile_phone" :placeholder="screen.placeholder.mobileNumber" hide-details />
      </VCol>
    </VRow>
  </VContainer>

  <BaseTitle class="custom-baseTitle" :title="screen.label.billingInfoTitle" />

  <VContainer>
    <VRow class="custom-input form-billingName">
      <h3 class="custom-label has-asterisk">{{ screen.label.billingName }}</h3>
      <VCol>
        <div>
          <VTextField v-model="screen.billingName" :placeholder="screen.placeholder.billingName" hide-details />
        </div>
      </VCol>
    </VRow>

    <!-- 請求情報の住所 -->
    <VRow class="custom-input form-address">
      <h3 class="custom-label has-asterisk">{{ screen.label.billingAddress }}</h3>
      <VCol>
        <VRow>
          <p class="custom-notice">{{ screen.label.hyphenInputNotice }}</p>
        </VRow>
        <VRow class="custom-notice-input">
          <VTextField v-model="screen.current_post_cd" :placeholder="screen.placeholder.addressCode" hide-details>
            <template #prepend-inner>
              <span class="custom-address-icon">〒</span>
            </template>
          </VTextField>
          <VBtn color="primary" class="custom-btn" @click="handleMemInfoPull">
            {{ screen.label.button.memInfoPull }}
          </VBtn>
        </VRow>
        <VRow class="form-address-btn">
          <VBtn color="primary" class="custom-btn" @click="handlePostToAdd">
            {{ screen.label.button.postalCodeToAddress }}
          </VBtn>
          <VBtn color="primary" class="custom-btn" @click="handleAddToPost">
            {{ screen.label.button.addressToPostalCode }}
          </VBtn>
        </VRow>
        <VRow class="form-addressPostal-input">
          <p>{{ screen.label.address1PostalCodeFieldOnly }}</p>
          <VTextField
            v-model="screen.billing_current_address1"
            :placeholder="screen.placeholder.address1"
            hide-details
          />
          <VTextField
            v-model="screen.billing_current_address2"
            :placeholder="screen.placeholder.address2"
            hide-details
          />
        </VRow>
      </VCol>
    </VRow>

    <!-- 請求方法 -->
    <VRow class="form-billingMethod">
      <h3 class="custom-label">{{ screen.label.billingMethod }}</h3>
      <VCol class="custom-input form-billingMethod-sub">
        <VSelect v-model="screen.selectedBillingMethod" :items="screen.billingMethodList" hide-details />
      </VCol>
      <VCol>
        <VCheckbox
          class="custom-checkbox"
          color="primary"
          v-model="screen.billingTransferFee"
          :label="screen.label.billingTransferFee"
          hide-details
        />
      </VCol>
    </VRow>
    <!-- 金融機関コード -->
    <VRow class="form-bank">
      <VCol class="custom-input pl-0 form-bank-sub">
        <h3>{{ screen.label.bankCode }}</h3>
        <div class="custom-flex-col">
          <VTextField v-model="screen.bankCode" hide-details />
          <h4>{{ screen.bankCode }}</h4>
        </div>
      </VCol>
      <VCol class="custom-input form-bank-sub">
        <h3>{{ screen.label.bankBranchCode }}</h3>
        <div class="custom-flex-col">
          <VTextField v-model="screen.bankBranchCode" hide-details />
          <h4>{{ screen.bankBranchCode }}</h4>
        </div>
      </VCol>
      <VCol cols="2" class="custom-checkbox form-bank-sub">
        <h3>{{ screen.label.bankType.tag }}</h3>
        <div class="custom-flex-col">
          <VRadioGroup v-model="screen.bankType" hide-details>
            <VRadio
              :label="screen.label.bankType.savings"
              :value="screen.label.bankType.savings"
              color="primary"
              hide-details
            />
            <VRadio
              :label="screen.label.bankType.current"
              :value="screen.label.bankType.current"
              color="primary"
              hide-details
            />
          </VRadioGroup>
        </div>
      </VCol>
      <VCol class="custom-input form-bank-sub">
        <h3>{{ screen.label.bankNumber }}</h3>
        <VTextField v-model="screen.bankNumber" hide-details />
      </VCol>
    </VRow>
    <!-- 口座名義(半角カナ) -->
    <VRow class="custom-input form-bankHolder">
      <h3 class="custom-label">{{ screen.label.bankHolderNameKana }}</h3>
      <VCol>
        <p class="custom-notice">{{ screen.label.hyphenInputNotice }}</p>
        <VTextField v-model="screen.bankHolderNameKana" :placeholder="screen.placeholder.billingName" hide-details />
      </VCol>
    </VRow>
  </VContainer>

  <BaseTitle class="custom-baseTitle" :title="screen.label.contrDetailsTitle" />
  <VContainer>
    <!-- 基本契約 -->
    <VRow class="mb-7 form-contrBasic custom-area">
      <h3>{{ screen.label.contrBasic }}</h3>
    </VRow>
    <!-- 基本契約テーブルPC版 -->
    <VTable class="form-table isPC">
      <thead class="custom-multi-line">
        <tr>
          <th
            class="form-table-title"
            v-for="header in screen.label.contrBasicTable"
            :key="header.key"
            :colspan="header.colspan"
          >
            <div v-if="header.subTitle" class="form-taxType">
              <div class="form-taxType-sub">{{ header.title }}</div>
              <div class="form-taxType-sub">
                <div v-for="sub in header.subTitle" :key="sub">{{ sub }}</div>
              </div>
            </div>
            <div v-else>
              {{ header.title }}
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in screen.contrBasicTable"
          :key="index"
          :class="{ 'selected-row': screen.selectedContrBasic.includes(index) }"
          @click="selectContrBasicRow(index)"
        >
          <td class="form-table-row">
            <VCheckbox v-model="screen.selectedContrBasic" :value="index" color="primary" hide-details />
          </td>
          <td class="form-table-row">{{ item.contractContent }}</td>
          <td class="form-table-row">
            <div class="form-tax-row custom-table-input custom-table-input-num">
              <VTextField
                class="form-tax-row-sub"
                v-model="item.taxExcluded"
                @keydown="service.blockNonNumeric"
                @focus="() => (item.taxExcluded = service.formatMoneyFocusIn(item.taxExcluded))"
                @blur="() => (item.taxExcluded = service.formatMoneyFocusOut(item.taxExcluded))"
                @click.stop
                hide-details
              >
                <template #append-inner>
                  <span class="custom-address-icon">円</span>
                </template>
              </VTextField>
              <div class="form-tax-row-sub">{{ service.formatCurrency(item.taxIncluded) }}</div>
            </div>
          </td>
          <td class="form-table-row">{{ item.paymentMethod ? item.paymentMethod : screen.label.hyphen }}</td>
          <td class="form-table-row">{{ item.installmentMonths ? item.installmentMonths : screen.label.hyphen }}</td>
          <td class="form-table-row">
            {{ item.subscriptionStartBillingYearMonth }}
            {{ (item.subscriptionStartBillingYearMonth ?? '').split('/').slice(0, 2).join('/') }}
          </td>
          <td class="form-table-row">
            <VBtn
              class="custom-btn-billing"
              @click.stop="openModalDetails(index)"
              color="primary"
              :text="screen.label.button.billingSetting"
            />
          </td>
          <td class="form-table-row">
            <div class="notes-column">
              {{ item.remarks }}
            </div>
          </td>
        </tr>
      </tbody>
    </VTable>
    <!-- 基本契約テーブルSP版 -->
    <div class="form-table-contrBasic isSP">
      <div
        class="form-table-contrBasic-sub"
        v-for="(item, index) in screen.contrBasicTable"
        :key="index"
        :class="{ 'selected-row': screen.selectedContrBasic.includes(index) }"
        @click="selectContrBasicRow(index)"
      >
        <div class="form-table-contrBasic-row1">
          <div class="form-table-contrBasic-col">
            <div class="form-table-contrBasic-title1"></div>
            <div class="form-table-contrBasic-td1">
              <VCheckbox v-model="screen.selectedContrBasic" :value="index" color="primary" hide-details />
            </div>
          </div>
          <div class="form-table-contrBasic-col">
            <div class="form-table-contrBasic-title2">{{ screen.label.contrBasicTable[1].title }}</div>
            <div class="form-table-contrBasic-td2">{{ item.contractContent }}</div>
          </div>
        </div>
        <div class="form-table-contrBasic-row2">
          <div class="form-table-contrBasic-col form-table-contrBasic-title3">
            {{ screen.label.contrBasicTable[2].title }}
          </div>
          <div class="form-table-contrBasic-col">
            <div class="form-table-contrBasic-title4">{{ screen.label.contrBasicTable[2].subTitle[0] }}</div>
            <div class="form-table-contrBasic-title5">{{ screen.label.contrBasicTable[2].subTitle[1] }}</div>
          </div>
          <div class="form-table-contrBasic-col">
            <div class="form-table-contrBasic-td3 custom-table-input custom-table-input-num">
              <VTextField
                v-model="item.taxExcluded"
                @keydown="service.blockNonNumeric"
                @focus="() => (item.taxExcluded = service.formatMoneyFocusIn(item.taxExcluded))"
                @blur="() => (item.taxExcluded = service.formatMoneyFocusOut(item.taxExcluded))"
                @click.stop
                hide-details
              >
                <template #append-inner>
                  <span class="custom-address-icon">円</span>
                </template>
              </VTextField>
            </div>
            <div class="form-table-contrBasic-td4">{{ service.formatCurrency(item.taxIncluded) }}</div>
          </div>
        </div>
        <div class="form-table-contrBasic-row3">
          <div class="form-table-contrBasic-col">
            <div class="form-table-contrBasic-title6">{{ screen.label.contrBasicTable[3].title }}</div>
            <div class="form-table-contrBasic-td5">
              {{ item.paymentMethod ? item.paymentMethod : screen.label.hyphen }}
            </div>
          </div>
          <div class="form-table-contrBasic-col">
            <div class="form-table-contrBasic-title7">{{ screen.label.contrBasicTable[4].title }}</div>
            <div class="form-table-contrBasic-td6">
              {{ item.installmentMonths ? item.installmentMonths : screen.label.hyphen }}
            </div>
          </div>
          <div class="form-table-contrBasic-col">
            <div class="form-table-contrBasic-title8">{{ screen.label.contrBasicTable[5].title }}</div>
            <div class="form-table-contrBasic-td7">
              {{ item.subscriptionStartBillingYearMonth }}
              {{ (item.subscriptionStartBillingYearMonth ?? '').split('/').slice(0, 2).join('/') }}
            </div>
          </div>
        </div>
        <div class="form-table-contrBasic-row4">
          <div class="form-table-contrBasic-col">
            <VBtn
              class="custom-btn-billing"
              @click.stop="openModalDetails(index)"
              color="primary"
              :text="screen.label.button.billingSetting"
            />
          </div>
          <div class="form-table-contrBasic-col">
            <div class="form-table-contrBasic-title9">{{ screen.label.contrBasicTable[7].title }}</div>
            <div class="form-table-contrBasic-td8">
              <div class="notes-column">
                {{ item.remarks }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- オプション -->
    <VRow class="my-3 form-contrBasic custom-area">
      <h3>{{ screen.label.optionBasic }}</h3>
    </VRow>
    <!-- オプションのテーブルのPC版 -->
    <VTable class="form-table isPC" style="max-height: 550px">
      <thead class="custom-multi-line">
        <tr>
          <th
            class="form-table-title"
            v-for="header in screen.label.contrBasicTable"
            :key="header.key"
            :colspan="header.colspan"
          >
            <div v-if="header.subTitle" class="form-taxType">
              <div class="form-taxType-sub">{{ header.title }}</div>
              <div class="form-taxType-sub">
                <div v-for="sub in header.subTitle" :key="sub">{{ sub }}</div>
              </div>
            </div>
            <div v-else>
              {{ header.title }}
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in screen.contrBasicOptionTable"
          :key="index"
          :class="{ 'selected-row': screen.selectedOptionBasic.includes(index) }"
          @click="selectOptionRow(index)"
        >
          <td class="form-table-row">
            <VCheckbox v-model="screen.selectedOptionBasic" :value="index" color="primary" hide-details />
          </td>
          <td class="form-table-row">{{ item.contractContent }}</td>
          <td class="form-table-row">
            <div class="form-tax-row custom-table-input custom-table-input-num">
              <VTextField
                class="form-tax-row-sub"
                v-model="item.taxExcluded"
                @keydown="service.blockNonNumeric"
                @focus="() => (item.taxExcluded = service.formatMoneyFocusIn(item.taxExcluded))"
                @blur="() => (item.taxExcluded = service.formatMoneyFocusOut(item.taxExcluded))"
                @click.stop
                hide-details
              >
                <template #append-inner>
                  <span class="custom-address-icon">円</span>
                </template>
              </VTextField>
              <div class="form-tax-row-sub">{{ service.formatCurrency(item.taxIncluded) }}</div>
            </div>
          </td>
          <td class="form-table-row">{{ item.paymentMethod ? item.paymentMethod : screen.label.hyphen }}</td>
          <td class="form-table-row">{{ item.installmentMonths ? item.installmentMonths : screen.label.hyphen }}</td>
          <td class="form-table-row">
            {{ item.subscriptionStartBillingYearMonth }}
            {{ (item.subscriptionStartBillingYearMonth ?? '').split('/').slice(0, 2).join('/') }}
          </td>
          <td class="form-table-row">
            <VBtn
              class="custom-btn-billing"
              @click.stop="openModalDetails(index)"
              color="primary"
              :text="screen.label.button.billingSetting"
            />
          </td>
          <td class="form-table-row">
            <div class="notes-column">
              {{ item.remarks }}
            </div>
          </td>
        </tr>
      </tbody>
    </VTable>

    <!-- オプションのテーブルのSP版 -->
    <div class="form-table-contrBasic isSP">
      <div
        class="form-table-contrBasic-sub"
        v-for="(item, index) in screen.contrBasicOptionTable"
        :key="index"
        :class="{ 'selected-row': screen.selectedOptionBasic.includes(index) }"
        @click="selectOptionRow(index)"
      >
        <div class="form-table-contrBasic-row1">
          <div class="form-table-contrBasic-col">
            <div class="form-table-contrBasic-title1"></div>
            <div class="form-table-contrBasic-td1">
              <VCheckbox v-model="screen.selectedOptionBasic" :value="index" color="primary" hide-details />
            </div>
          </div>
          <div class="form-table-contrBasic-col">
            <div class="form-table-contrBasic-title2">{{ screen.label.contrBasicTable[1].title }}</div>
            <div class="form-table-contrBasic-td2">{{ item.contractContent }}</div>
          </div>
        </div>
        <div class="form-table-contrBasic-row2">
          <div class="form-table-contrBasic-col form-table-contrBasic-title3">
            {{ screen.label.contrBasicTable[2].title }}
          </div>
          <div class="form-table-contrBasic-col">
            <div class="form-table-contrBasic-title4">{{ screen.label.contrBasicTable[2].subTitle[0] }}</div>
            <div class="form-table-contrBasic-title5">{{ screen.label.contrBasicTable[2].subTitle[1] }}</div>
          </div>
          <div class="form-table-contrBasic-col">
            <div class="form-table-contrBasic-td3 custom-table-input custom-table-input-num">
              <VTextField
                v-model="item.taxExcluded"
                @keydown="service.blockNonNumeric"
                @focus="() => (item.taxExcluded = service.formatMoneyFocusIn(item.taxExcluded))"
                @blur="() => (item.taxExcluded = service.formatMoneyFocusOut(item.taxExcluded))"
                @click.stop
                hide-details
              >
                <template #append-inner>
                  <span class="custom-address-icon">円</span>
                </template>
              </VTextField>
            </div>
            <div class="form-table-contrBasic-td4">{{ service.formatCurrency(item.taxIncluded) }}</div>
          </div>
        </div>
        <div class="form-table-contrBasic-row3">
          <div class="form-table-contrBasic-col">
            <div class="form-table-contrBasic-title6">{{ screen.label.contrBasicTable[3].title }}</div>
            <div class="form-table-contrBasic-td5">
              {{ item.paymentMethod ? item.paymentMethod : screen.label.hyphen }}
            </div>
          </div>
          <div class="form-table-contrBasic-col">
            <div class="form-table-contrBasic-title7">{{ screen.label.contrBasicTable[4].title }}</div>
            <div class="form-table-contrBasic-td6">
              {{ item.installmentMonths ? item.installmentMonths : screen.label.hyphen }}
            </div>
          </div>
          <div class="form-table-contrBasic-col">
            <div class="form-table-contrBasic-title8">{{ screen.label.contrBasicTable[5].title }}</div>
            <div class="form-table-contrBasic-td7">
              {{ item.subscriptionStartBillingYearMonth }}
              {{ (item.subscriptionStartBillingYearMonth ?? '').split('/').slice(0, 2).join('/') }}
            </div>
          </div>
        </div>
        <div class="form-table-contrBasic-row4">
          <div class="form-table-contrBasic-col">
            <VBtn
              class="custom-btn-billing"
              @click.stop="openModalDetails(index)"
              color="primary"
              :text="screen.label.button.billingSetting"
            />
          </div>
          <div class="form-table-contrBasic-col">
            <div class="form-table-contrBasic-title9">{{ screen.label.contrBasicTable[7].title }}</div>
            <div class="form-table-contrBasic-td8">
              <div class="notes-column">
                {{ item.remarks }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- その他テーブル -->
    <VRow class="my-3 form-contrBasic custom-area">
      <h3>{{ screen.label.otherBasic }}</h3>
    </VRow>
    <div class="custom-table-btn">
      <div class="custom-table-btn-sub">
        <VBtn @click="insertRow" color="primary">{{ screen.label.button.insertRow }}</VBtn>
      </div>
      <div class="custom-table-btn-sub">
        <VBtn @click="deleteRow" color="primary">{{ screen.label.button.deleteRow }}</VBtn>
      </div>
    </div>
    <!-- その他テーブルPC版 -->
    <VTable class="form-table isPC">
      <thead class="custom-multi-line">
        <tr>
          <th
            class="form-other-title"
            v-for="header in screen.label.contrBasicOtherTable"
            :key="header.key"
            :colspan="header.colspan"
          >
            <div v-if="header.subTitle" class="form-taxType">
              <div class="form-taxType-sub">{{ header.title }}</div>
              <div class="form-taxType-sub">
                <div v-for="sub in header.subTitle" :key="sub">{{ sub }}</div>
              </div>
            </div>
            <div v-else>
              {{ header.title }}
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in screen.contrBasicOtherTable"
          :key="index"
          :class="{ 'selected-row': screen.selectedOtherBasic.includes(index) }"
          @click="selectOtherRow(index)"
        >
          <td class="form-other-row">
            <VCheckbox v-model="screen.selectedOtherBasic" :value="index" color="primary" hide-details />
          </td>
          <td class="form-other-row">{{ item.contractContent }}</td>
          <td class="form-other-row custom-table-input">
            <VTextField @click.stop v-model="item.contractAbstract" :value="item.contractAbstract" hide-details />
          </td>
          <td class="form-other-row">
            <div class="form-tax-row custom-table-input custom-table-input-num">
              <VTextField
                class="form-tax-row-sub"
                v-model="item.taxExcluded"
                @keydown="service.blockNonNumeric"
                @focus="() => (item.taxExcluded = service.formatMoneyFocusIn(item.taxExcluded))"
                @blur="() => (item.taxExcluded = service.formatMoneyFocusOut(item.taxExcluded))"
                @click.stop
                hide-details
              >
                <template #append-inner>
                  <span class="custom-address-icon">円</span>
                </template>
              </VTextField>
              <div class="form-tax-row-sub">{{ service.formatCurrency(item.taxIncluded) }}</div>
            </div>
          </td>
          <td class="form-other-row">{{ item.paymentMethod ? item.paymentMethod : screen.label.hyphen }}</td>
          <td class="form-other-row">{{ item.installmentMonths ? item.installmentMonths : screen.label.hyphen }}</td>
          <td class="form-other-row">
            {{ item.subscriptionStartBillingYearMonth }}
            {{ (item.subscriptionStartBillingYearMonth ?? '').split('/').slice(0, 2).join('/') }}
          </td>
          <td class="form-other-row">
            <VBtn
              class="custom-btn-billing"
              @click.stop="openModalDetails(index)"
              color="primary"
              :text="screen.label.button.billingSetting"
            />
          </td>
          <td class="form-other-row">
            <div class="notes-column">
              {{ item.remarks }}
            </div>
          </td>
        </tr>
      </tbody>
    </VTable>

    <!-- その他テーブルSP版 -->
    <div class="form-table-contrBasic isSP">
      <div
        class="form-table-contrBasic-sub"
        v-for="(item, index) in screen.contrBasicOtherTable"
        :key="index"
        :class="{ 'selected-row': screen.selectedOtherBasic.includes(index) }"
        @click="selectOtherRow(index)"
      >
        <div class="form-table-contrBasic-row1">
          <div class="form-table-contrBasic-col">
            <div class="form-table-contrBasic-title1"></div>
            <div class="form-table-contrBasic-td1">
              <VCheckbox v-model="screen.selectedOtherBasic" :value="index" color="primary" hide-details />
            </div>
          </div>
          <div class="form-table-contrBasic-col">
            <div class="form-table-contrBasic-title2">{{ screen.label.contrBasicOtherTable[1].title }}</div>
            <div class="form-table-contrBasic-td2">{{ item.contractContent }}</div>
          </div>
        </div>
        <div class="form-table-contrBasic-row-5">
          <div class="form-table-contrBasic-title9">{{ screen.label.contrBasicOtherTable[2].title }}</div>
          <div class="form-table-contrBasic-td8">
            <VTextField v-model="item.contractAbstract" @click.stop hide-details />
          </div>
        </div>
        <div class="form-table-contrBasic-row2">
          <div class="form-table-contrBasic-col form-table-contrBasic-title3">
            {{ screen.label.contrBasicOtherTable[3].title }}
          </div>
          <div class="form-table-contrBasic-col">
            <div class="form-table-contrBasic-title4">{{ screen.label.contrBasicOtherTable[3].subTitle[0] }}</div>
            <div class="form-table-contrBasic-title5">{{ screen.label.contrBasicOtherTable[3].subTitle[1] }}</div>
          </div>
          <div class="form-table-contrBasic-col">
            <div class="form-table-contrBasic-td3 custom-table-input custom-table-input-num">
              <VTextField
                v-model="item.taxExcluded"
                @keydown="service.blockNonNumeric"
                @focus="() => (item.taxExcluded = service.formatMoneyFocusIn(item.taxExcluded))"
                @blur="() => (item.taxExcluded = service.formatMoneyFocusOut(item.taxExcluded))"
                @click.stop
                hide-details
              >
                <template #append-inner>
                  <span class="custom-address-icon">円</span>
                </template>
              </VTextField>
            </div>
            <div class="form-table-contrBasic-td4">{{ service.formatCurrency(item.taxIncluded) }}</div>
          </div>
        </div>
        <div class="form-table-contrBasic-row3">
          <div class="form-table-contrBasic-col">
            <div class="form-table-contrBasic-title6">{{ screen.label.contrBasicOtherTable[4].title }}</div>
            <div class="form-table-contrBasic-td5">
              {{ item.paymentMethod ? item.paymentMethod : screen.label.hyphen }}
            </div>
          </div>
          <div class="form-table-contrBasic-col">
            <div class="form-table-contrBasic-title7">{{ screen.label.contrBasicOtherTable[5].title }}</div>
            <div class="form-table-contrBasic-td6">
              {{ item.installmentMonths ? item.installmentMonths : screen.label.hyphen }}
            </div>
          </div>
          <div class="form-table-contrBasic-col">
            <div class="form-table-contrBasic-title8">{{ screen.label.contrBasicOtherTable[6].title }}</div>
            <div class="form-table-contrBasic-td7">
              {{ item.subscriptionStartBillingYearMonth }}
              {{ (item.subscriptionStartBillingYearMonth ?? '').split('/').slice(0, 2).join('/') }}
            </div>
          </div>
        </div>
        <div class="form-table-contrBasic-row4">
          <div class="form-table-contrBasic-col">
            <VBtn
              class="custom-btn-billing"
              @click.stop="openModalDetails(index)"
              color="primary"
              :text="screen.label.button.billingSetting"
            />
          </div>
          <div class="form-table-contrBasic-col">
            <div class="form-table-contrBasic-title9">{{ screen.label.contrBasicOtherTable[8].title }}</div>
            <div class="form-table-contrBasic-td8">
              <div class="notes-column">
                {{ item.remarks }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 「行追加」「行削除」SP版 -->
    <div class="custom-table-btn isSP">
      <div class="custom-table-btn-sub">
        <VBtn @click="insertRow" color="primary">{{ screen.label.button.insertRow }}</VBtn>
      </div>
      <div class="custom-table-btn-sub">
        <VBtn @click="deleteRow" color="primary">{{ screen.label.button.deleteRow }}</VBtn>
      </div>
    </div>
    <!-- 備考 -->
    <VRow class="my-3 form-textarea">
      <h3 class="custom-label">{{ screen.label.remarks }}</h3>
    </VRow>
    <VRow>
      <VTextarea class="custom-textarea" v-model="screen.remarks" hide-details />
    </VRow>
  </VContainer>
</template>

<script>
  import BaseTitle from '@/components/BaseTitle.vue';
  import { onMounted, reactive } from 'vue';
  import CMN005_EmpSearch from './modal/CMN005_EmpSearch.vue';
  import { useCommonService } from '@/composables/useCommonService';

  // 基本契約とオプション テーブル
  class contrBasicTable {
    constructor(
      contractContent,
      taxExcluded,
      taxIncluded,
      paymentMethod,
      installmentMonths,
      subscriptionStartBillingYearMonth,
      remarks
    ) {
      this.contractContent = contractContent;
      this.taxExcluded = taxExcluded;
      this.taxIncluded = taxIncluded;
      this.paymentMethod = paymentMethod;
      this.installmentMonths = installmentMonths;
      this.subscriptionStartBillingYearMonth = subscriptionStartBillingYearMonth;
      this.remarks = remarks;
    }
  }
  // その他 テーブル
  class contrBasicOtherTable {
    constructor(
      contractContent,
      contractAbstract,
      taxExcluded,
      taxIncluded,
      paymentMethod,
      installmentMonths,
      subscriptionStartBillingYearMonth,
      remarks
    ) {
      this.contractContent = contractContent;
      this.contractAbstract = contractAbstract;
      this.taxExcluded = taxExcluded;
      this.taxIncluded = taxIncluded;
      this.paymentMethod = paymentMethod;
      this.installmentMonths = installmentMonths;
      this.subscriptionStartBillingYearMonth = subscriptionStartBillingYearMonth;
      this.remarks = remarks;
    }
  }
  export default {
    components: { BaseTitle, CMN005_EmpSearch },
    setup() {
      const screen = reactive({
        label: {
          title: '契約登録',
          titleNote:
            '※入力タイムアウトを防止するため、この画面のみセッションを維持しています。入力が完了したら、速やかに契約登録を行ってください。',
          applyStartDate: '適用開始日',
          applyEndDate: '適用終了日',
          historyId: '履歴番号',
          lastUpdater: '最終更新者',
          contrInfoTitle: '契約者情報',
          contrId: '契約番号',
          memberId: '会員番号',
          memberName: '会員氏名',
          contrOffice: '契約担当所属事務所',
          contrManager: '契約担当者',
          contrHolder: '契約者＝会員本人',
          contrDate: '契約日',
          contrName: {
            tag: '契約者氏名',
            lastNm: '(姓)',
            firstNm: '(名)',
            middleName: '(ミドルネーム)'
          },
          contrNameKana: {
            tag: '氏名フリガナ',
            lastNm: '(姓)',
            firstNm: '(名)',
            middleName: '(ミドルネーム)'
          },
          contrAddress: '住所',
          hyphenInputNotice: '※ハイフン付きで入力してください',
          address1PostalCodeFieldOnly: '※住所⇔郵便番号の変換対象項目は住所1のみ',
          telephoneNumber: '電話番号',
          mobileNumber: '携帯番号',
          billingInfoTitle: '請求情報',
          billingName: '請求先宛名',
          billingAddress: '住所',
          billingMethod: '請求方法',
          billingTransferFee: '振替手数料の請求',
          bankCode: '金融機関コード',
          bankBranchCode: '支店コード',
          bankType: {
            tag: '口座種類',
            savings: '普通',
            current: '当座'
          },
          bankNumber: '口座番号',
          bankHolderNameKana: '口座名義(半角カナ)',
          noticeNoLowercase: '※大文字左詰め(小文字不可)',
          contrDetailsTitle: '契約情報',
          contrBasic: '基本契約',
          optionBasic: 'オプション',
          otherBasic: 'その他',
          contrBasicTable: [
            { title: '', key: 'empty', colspan: 1 },
            { title: '契約内容', key: 'contractContent', colspan: 1 },
            {
              title: '金額',
              key: 'amount',
              colspan: 1,
              subTitle: ['税抜', '税込']
            },
            { title: '支払方法', key: 'paymentMethod', colspan: 1 },
            { title: '分割回数\n纏払月数', key: 'installmentMonths', colspan: 1 },
            { title: '加入日\n請求開始年月', key: 'subscriptionStartBillingYearMonth', colspan: 1 },
            { title: '請求設定', key: 'billingSettings', colspan: 1 },
            { title: '備考', key: 'remarks', colspan: 1 }
          ],
          contrBasicOtherTable: [
            { title: '', key: 'empty', colspan: 1 },
            { title: '契約内容', key: 'contractContent', colspan: 1 },
            { title: '摘要', key: 'contractAbstract', colspan: 1 },
            {
              title: '金額',
              key: 'amount',
              colspan: 1,
              subTitle: ['税抜', '税込']
            },
            { title: '支払方法', key: 'paymentMethod', colspan: 1 },
            { title: '分割回数\n纏払月数', key: 'installmentMonths', colspan: 1 },
            { title: '加入日\n請求開始年月', key: 'subscriptionStartBillingYearMonth', colspan: 1 },
            { title: '請求設定', key: 'billingSettings', colspan: 1 },
            { title: '備考', key: 'remarks', colspan: 1 }
          ],
          taxType: {
            taxExcluded: '税抜',
            taxIncluded: '税込'
          },
          hyphen: '-',
          remarks: '備考',
          birthDate: '生年月日',
          dateHeader: '日付の選択',
          datePlaceholder: '年/月/日',
          dateIcon: 'mdi-calendar-month',
          button: {
            select: '選択',
            postalCodeToAddress: '郵便番号→住所',
            addressToPostalCode: '住所→郵便番号',
            memInfoPull: '会員情報引込み',
            billingSetting: '請求設定',
            billingSetting1: '請求',
            billingSetting2: '設定',
            insertRow: '行追加',
            deleteRow: '行削除'
          }
        },
        placeholder: {
          lastNm: 'えにし',
          firstNm: '太郎',
          middleName: 'Michael',
          lastNmKana: 'エニシ',
          firstNmKana: 'タロウ',
          middleNameKana: 'マイケル',
          billingName: 'ｴﾆｼ ﾀﾛｳ',
          addressCode: '000-0000',
          address1: '都道府県市町村番地',
          address2: '△△△マンション○○○号室',
          telephoneNumber: '03-1234-5678',
          mobileNumber: '080-1234-5678',
          text: 'テキストを入力してください'
        },
        billingMethodList: ['', '口座振替', '口座振込', '予備費', '集金'],
        contrBasicTable: [
          new contrBasicTable('入会金', '150000', null, '分割払', '3回', '2024/09/1', null),
          new contrBasicTable('身元保証支援', '250000', '275000', '一括払', '1回', '2024/09/1', null),
          new contrBasicTable('身元保証支援(三菱UFJ信託)', '0', null, '一括払', '1回', null, null),
          new contrBasicTable('月次会費', '5000', null, null, '3ヶ月', '2024/09/1', '交渉より2024/9月分免除'),
          new contrBasicTable('年次会費(三菱UFJ信託)', '0', null, null, null, null, null)
        ],
        contrBasicOptionTable: [
          new contrBasicTable('万一の支援', '165000', null, '一括払', null, '2024/09/1', null),
          new contrBasicTable('葬儀支援', '275000', null, '一括払', null, '2024/09/1', null),
          new contrBasicTable('火葬料', '100000', null, '一括払', null, '2024/09/1', null),
          new contrBasicTable('格納支援', '110000', null, '一括払', null, '2024/09/1', null),
          new contrBasicTable('遺品整理支援', '150000', null, '一括払', null, '2024/09/1', null),
          new contrBasicTable('金銭管理支援', '0', null, null, null, '2024/09/1', null),
          new contrBasicTable('信託管', '30000', '33000', '一括払', null, '2024/09/1', null),
          new contrBasicTable('信託管理費', '5000', '5500', null, null, '2024/09/1', null)
        ],
        contrBasicOtherTable: [
          new contrBasicOtherTable('保管料', '家財保管料', '5000', null, '一括払', null, '2024/09/1', null),
          new contrBasicOtherTable('保管料', 'お骨保管料', '5000', null, '一括払', null, '2024/09/1', null)
        ],
        selectedContrBasic: [],
        selectedOptionBasic: [],
        selectedOtherBasic: [],
        selectedApplyStartDate: null,
        selectedApplyEndDate: null,
        historyId: 9999999999,
        lastUpdater: null,
        contrId: '1234567890',
        memberId: '0987654321',
        memberName: 'エニシ 太郎',
        openModalShienFlag: false,
        contract_jigyosyo_cd: null,
        contract_jugyoin_cd: null,
        contr_holder_flg: null,
        contrDate: null,
        lastNm: null,
        firstNm: null,
        middleName: null,
        lastNmKana: null,
        firstNmKana: null,
        middleNameKana: null,
        current_post_cd: null,
        contr_current_address1: null,
        contr_current_address2: null,
        phone: null,
        mobile_phone: null,
        billingName: null,
        selectedBillingMethod: null,
        billingTransferFee: null,
        billing_current_address1: null,
        billing_current_address2: null,
        bankCode: null,
        bankCodeValue: null,
        bankBranchCode: null,
        bankType: null,
        bankBranchCodeValue: null,
        bankNumber: null,
        remarks: null
        // billingName: null,
        // billingName: null,
      });

      const service = useCommonService();

      //初期表示処理
      onMounted(() => {
        //初期でカンマ付きの処理
        screen.contrBasicTable = service.formatFieldInTable(screen.contrBasicTable, 'taxExcluded');
        screen.contrBasicOptionTable = service.formatFieldInTable(screen.contrBasicOptionTable, 'taxExcluded');
        screen.contrBasicOtherTable = service.formatFieldInTable(screen.contrBasicOtherTable, 'taxExcluded');
      });

      // 担当者モーダル開き処理
      const openModalShien = () => {
        screen.openModalShienFlag = true;
      };
      // モーダルから値の取得
      const handleSelectedTanto = (value) => {
        screen.contract_jigyosyo_cd = value.idCode + value.jugyoin_nm;
        screen.contract_jugyoin_cd = value.jigyosyo_nm;
      };

      const handleMemInfoPull = () => {
        console.log('「会員情報引込み」の処理');
      };
      const handlePostToAdd = () => {
        console.log('「郵便番号→住所」の処理');
      };

      const handleAddToPost = () => {
        console.log('「住所→郵便番号」の処理');
      };

      //基本契約の行選択の処理
      const selectContrBasicRow = (index) => {
        const selectedIndex = screen.selectedContrBasic.indexOf(index);
        if (selectedIndex === -1) {
          // 選択した行をリストに追加
          screen.selectedContrBasic.push(index);
        } else {
          // 存在すれば、リストから破棄
          screen.selectedContrBasic.splice(selectedIndex, 1);
        }
      };

      //オプションの行選択の処理
      const selectOptionRow = (index) => {
        const selectedIndex = screen.selectedOptionBasic.indexOf(index);
        if (selectedIndex === -1) {
          // 選択した行をリストに追加
          screen.selectedOptionBasic.push(index);
        } else {
          // 存在すれば、リストから破棄
          screen.selectedOptionBasic.splice(selectedIndex, 1);
        }
      };

      //その他の行選択の処理
      const selectOtherRow = (index) => {
        const selectedIndex = screen.selectedOtherBasic.indexOf(index);
        if (selectedIndex === -1) {
          // 選択した行をリストに追加
          screen.selectedOtherBasic.push(index);
        } else {
          // 存在すれば、リストから破棄
          screen.selectedOtherBasic.splice(selectedIndex, 1);
        }
      };

      //その他用の行追加の処理
      const insertRow = () => {
        if (Array.isArray(screen.selectedOtherBasic) && screen.selectedOtherBasic.length > 1) {
          screen.selectedOtherBasic = [];
          return;
        }
        const newRow = new contrBasicOtherTable();

        if (Array.isArray(screen.selectedOtherBasic) && screen.selectedOtherBasic.length === 1) {
          const index = screen.selectedOtherBasic[0];
          screen.contrBasicOtherTable.splice(index, 0, newRow);
          screen.selectedOtherBasic = [index + 1];
        } else {
          screen.contrBasicOtherTable.push(newRow);
          screen.selectedOtherBasic = [];
        }
      };

      //その他用の行削除の処理
      const deleteRow = () => {
        if (screen.selectedOtherBasic && screen.selectedOtherBasic.length > 0) {
          screen.selectedOtherBasic
            .sort((a, b) => b - a)
            .forEach((index) => screen.contrBasicOtherTable.splice(index, 1));
          screen.selectedOtherBasic = [];
        }
      };

      return {
        screen,
        service,
        openModalShien,
        handleSelectedTanto,
        handleMemInfoPull,
        handlePostToAdd,
        handleAddToPost,
        selectContrBasicRow,
        selectOptionRow,
        selectOtherRow,
        insertRow,
        deleteRow
      };
    }
  };
</script>

<style scoped>
  :deep(.custom-text-btn .v-btn__content) {
    display: flex;
    flex-direction: column;
  }
  :deep(.custom-textarea .v-input__control) {
    background-color: white;
  }
  :deep(.custom-input .v-input__control) {
    background-color: white;
    width: 100%;
    height: 50px;
  }

  :deep(.custom-input .v-field__field) {
    height: 50px;
  }

  :deep(.v-picker-title) {
    display: none !important;
  }

  :deep(.custom-checkbox .v-label) {
    font-weight: bolder;
    color: rgb(51, 51, 51);
    opacity: 1;
  }

  :deep(.custom-table-input .v-field__overlay) {
    background-color: white;
    width: 100%;
  }
  :deep(.custom-table-input-num .v-field__input) {
    text-align: right;
  }
  :deep(.custom-table-input .v-input__control) {
    width: 100%;
    height: 50px;
  }

  p {
    font-size: 12px;
  }

  h4 {
    font-weight: 500;
  }

  .custom-label-sub {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .custom-baseTitle {
    padding: 0 12px;
  }

  .form-bankHolder .custom-label,
  .form-shientanto .custom-label {
    width: 200px;
  }

  .custom-flex {
    display: flex;
  }

  .form-address {
    width: 90%;
  }

  .form-address .v-row {
    padding: 0 12px;
  }
  .form-address .custom-label {
    align-items: flex-start;
  }

  .form-address .custom-btn {
    width: 130px;
    height: 30px !important;
    font-size: 15px;
  }

  .form-address-btn {
    display: flex;
    gap: 15px;
    margin: 25px 0 15px 0;
    padding: 0 !important;
  }

  .form-addressPostal-input {
    display: flex;
    flex-direction: column;
  }

  .form-addressPostal-input .v-input {
    padding-bottom: 12px;
  }

  .form-address-col {
    padding-top: 0;
  }

  .form-address-col .custom-checkbox {
    margin-top: -15px;
    margin-left: -11px;
  }
  .custom-text-btn {
    min-height: 51px;
    display: flex;
  }
  .custom-text-btn-sub {
    display: block;
    text-align: center;
  }
  .custom-multi-line {
    white-space: pre-line;
  }

  .form-table {
    margin: 30px 0;
    width: 100%;
    max-height: 360px;
    overflow-y: auto;
    overflow-x: auto;
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
    padding: 0;
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

  .form-table-row:nth-child(1) {
    width: 50px;
  }
  .form-table-row:nth-child(2) {
    width: auto;
    min-width: 150px;
  }
  .form-table-row:nth-child(3) {
    min-width: 300px;
    padding: 0;
  }
  .form-table-row:nth-child(4) {
    min-width: 120px;
    text-align: center;
  }
  .form-table-row:nth-child(5) {
    min-width: 107px;
    max-width: 107px;
    width: 107px;
    text-align: center;
  }
  .form-table-row:nth-child(6) {
    min-width: 142px;
    max-width: 142px;
    width: 142px;
    text-align: center;
  }
  .form-table-row:nth-child(7) {
    width: 120px;
    padding: 0;
  }
  .form-table-row:nth-child(8) {
    width: 350px;
    padding: 0;
    white-space: normal;
    word-wrap: break-word;
    overflow-y: auto !important;
    overflow-x: hidden;
    box-sizing: border-box;
    overflow-wrap: anywhere;
  }

  .notes-column {
    width: 100%;
    max-height: 58px;
    overflow-y: auto;
    white-space: normal;
    text-overflow: ellipsis;
    display: block;
  }

  .form-taxType {
    height: 100%;
  }

  .form-taxType-sub:nth-child(1) {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50%;
  }

  .form-taxType-sub:nth-child(2) {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 50%;
  }

  .form-taxType-sub:nth-child(2) div {
    width: 50%;
    border: 1px solid #ddd;
    border-bottom: none;
  }

  .form-table-title:nth-child(3) {
    padding: 0;
  }

  .form-other-row .v-checkbox,
  .form-table-row .v-checkbox {
    display: flex;
    justify-content: center;
    border: none;
  }

  .form-other-row .custom-btn-billing,
  .form-table-row .custom-btn-billing {
    width: 100%;
    height: 100%;
    font-size: 16px;
  }

  .form-tax-row {
    display: flex;
    width: 100%;
    height: 100%;
  }

  .form-tax-row-sub {
    width: 49%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 1%;
  }

  .form-tax-row-sub:nth-child(1) {
    border-right: 1px solid #ddd;
  }

  .form-other-title:nth-child(4) {
    padding: 0;
  }

  .form-other-row:nth-child(1) {
    width: 70px;
  }

  .form-other-row:nth-child(1) {
    width: 50px;
  }
  .form-other-row:nth-child(2) {
    min-width: 150px;
    max-width: 150px;
    width: 150px;
    padding: 0;
  }
  .form-other-row:nth-child(3) {
    width: auto;
    padding: 0;
  }
  .form-other-row:nth-child(4) {
    min-width: 300px;
    max-width: 300px;
    width: 300px;
    padding: 0;
  }
  .form-other-row:nth-child(5) {
    min-width: 120px;
    max-width: 120px;
    width: 120px;
    text-align: center;
  }
  .form-other-row:nth-child(6) {
    min-width: 107px;
    max-width: 107px;
    width: 107px;
    text-align: center;
  }
  .form-other-row:nth-child(7) {
    min-width: 142px;
    max-width: 142px;
    width: 142px;
    text-align: center;
  }
  .form-other-row:nth-child(8) {
    width: 120px;
    padding: 0;
  }
  .form-other-row:nth-child(9) {
    width: 250px;
    padding: 0;
    white-space: normal;
    word-wrap: break-word;
    overflow-y: auto !important;
    overflow-x: hidden;
    box-sizing: border-box;
    overflow-wrap: anywhere;
  }

  .custom-table-btn {
    height: auto;
    width: 100%;
    display: flex;
    gap: 20px;
  }

  .custom-flex-col .v-col {
    display: flex;
    padding-left: 0;
  }

  .form-contr-holder .form-contr-holder-sub:nth-child(1) {
    transform: translateX(-10px);
  }

  .form-contr-holder .v-col {
    width: 100%;
  }

  .form-contr-holder .custom-label-child {
    width: 120px !important;
  }

  .form-contr-holder .v-text-field {
    width: 100%;
  }

  .form-contr-holder-sub {
    padding-left: 0;
  }

  .form-telephone .v-text-field,
  .form-billingMethod-sub .v-text-field,
  .form-bankHolder .v-text-field,
  .form-jugyoin-sub .v-text-field,
  .form-jigyosyo-sub .v-text-field {
    flex: 0 0 50%;
    max-width: 50%;
  }

  .form-contr-holder-sub .v-text-field {
    flex: 0 0 30%;
    max-width: 30%;
  }

  .custom-notice-input .v-text-field {
    flex: 0 0 15%;
    max-width: 15%;
  }

  .custom-notice-input .custom-btn {
    margin-top: 10px;
    margin-left: 15px;
  }

  .form-name h6 {
    font-weight: normal;
    opacity: 0.5;
  }

  /* SP版のCSS */
  @media (max-width: 850px) {
    .v-container {
      padding: 0;
    }

    .custom-label-sp h3 {
      padding-bottom: 10px;
    }

    .form-name {
      min-width: 100%;
      display: block;
    }
    .form-name h3 {
      transform: translateX(10px);
    }

    .name-col {
      display: inline-block;
      margin-top: 8px;
    }
    .name-col:nth-child(2) {
      width: 48%;
      float: left;
    }
    .name-col:nth-child(3) {
      width: 48%;
      float: right;
    }
    .name-col:nth-child(4) {
      width: 100%;
    }

    .name-col:nth-child(6) {
      width: 48%;
      float: left;
    }
    .name-col:nth-child(7) {
      width: 48%;
      float: right;
    }
    .name-col:nth-child(8) {
      width: 100%;
    }

    .form-bank-sub:nth-child(4) .v-text-field,
    .form-telephone .v-text-field {
      flex: 0 0 100%;
      max-width: 100%;
    }

    .form-billingMethod-sub .v-text-field,
    .form-jugyoin-sub .v-text-field,
    .form-jigyosyo-sub .v-text-field {
      flex: 0 0 55%;
      max-width: 55%;
    }

    .form-contr-holder-sub .v-text-field {
      flex: 0 0 60%;
      max-width: 60%;
    }

    .custom-notice-input .v-text-field {
      flex: 0 0 44%;
      max-width: 44%;
    }

    .form-telephone h3,
    .form-address h3,
    .form-shientanto,
    .form-contr-holder,
    .form-billingName h3,
    .form-billingMethod h3,
    .form-contrBasic h3 {
      padding-left: 12px;
    }

    .form-address,
    .form-shientanto,
    .form-contr-holder,
    .form-contr-holder-sub,
    .form-shientanto .form-jigyosyo-sub,
    .form-telephone,
    .form-billingName,
    .form-billingMethod {
      display: flex;
      flex-direction: column;
    }

    .form-bank,
    .form-shientanto .form-jugyoin-sub {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
    .form-jugyoin-sub .custom-label-child {
      width: 100%;
    }

    .form-address-btn {
      margin-bottom: 12px !important;
      gap: 25px;
      margin-bottom: 0;
    }

    .form-addressPostal-input {
      margin-top: 0;
    }

    .form-billingMethod .custom-checkbox {
      transform: translateX(-10px);
    }

    .form-bank-sub {
      flex: 0 0 33%;
      max-width: 33%;
      box-sizing: border-box;
      padding-right: 0;
    }

    .form-bank-sub h3 {
      font-size: 14px;
    }

    .form-bank-sub:nth-child(1) {
      padding-left: 12px !important;
    }

    .form-bank-sub:nth-child(4) {
      width: 100%;
      min-width: 55%;
    }

    .form-table-contrBasic {
      background-color: white;
      max-height: 500px;
      overflow-y: auto;
      width: 95%;
      margin: 0 auto;
    }

    .form-table-contrBasic-sub {
      border: 1px solid black !important;
    }

    .form-table-contrBasic div {
      border: 1px solid #ddd;
    }

    .form-table-contrBasic-row1,
    .form-table-contrBasic-row2,
    .form-table-contrBasic-row3,
    .form-table-contrBasic-row4 {
      display: flex;
    }

    .form-table-contrBasic-col {
      display: flex;
      height: 100px;
      flex-direction: column;
    }

    .form-table-contrBasic-title1,
    .form-table-contrBasic-title2,
    .form-table-contrBasic-title3,
    .form-table-contrBasic-title4,
    .form-table-contrBasic-title5,
    .form-table-contrBasic-title6,
    .form-table-contrBasic-title7,
    .form-table-contrBasic-title8,
    .form-table-contrBasic-title9 {
      background-color: #97d885;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      color: white;
    }

    .form-table-contrBasic-td1 .v-checkbox {
      display: flex;
      justify-content: center;
      align-items: center;
      transform: translateY(-5px);
      border: none;
    }

    .form-table-contrBasic-title1,
    .form-table-contrBasic-td1,
    .form-table-contrBasic-title2,
    .form-table-contrBasic-td2,
    .form-table-contrBasic-title4,
    .form-table-contrBasic-title5,
    .form-table-contrBasic-td3,
    .form-table-contrBasic-td4,
    .form-table-contrBasic-title6,
    .form-table-contrBasic-title7,
    .form-table-contrBasic-title8,
    .form-table-contrBasic-td5,
    .form-table-contrBasic-td6,
    .form-table-contrBasic-td7 {
      height: 50%;
    }

    .form-table-contrBasic-title9 {
      height: 30%;
    }

    .form-table-contrBasic-td8 {
      height: 70%;
    }

    .form-table-contrBasic-row1 .form-table-contrBasic-col:nth-child(1),
    .form-table-contrBasic-row2 .form-table-contrBasic-col:nth-child(1),
    .form-table-contrBasic-row2 .form-table-contrBasic-col:nth-child(2) {
      width: 20%;
    }
    .form-table-contrBasic-row1 .form-table-contrBasic-col:nth-child(2) {
      width: 80%;
    }

    .form-table-contrBasic-row2 .form-table-contrBasic-col:nth-child(3) {
      width: 60%;
    }

    .form-table-contrBasic-row3 .form-table-contrBasic-col:nth-child(1),
    .form-table-contrBasic-row3 .form-table-contrBasic-col:nth-child(2),
    .form-table-contrBasic-row3 .form-table-contrBasic-col:nth-child(3) {
      display: flex;
      width: 100%;
      height: 110px;
    }

    .form-table-contrBasic-row4 .form-table-contrBasic-col:nth-child(1) {
      width: calc(100% / 3);
    }

    .form-table-contrBasic-row4 .form-table-contrBasic-col:nth-child(2) {
      width: calc(100% * 2 / 3);
    }

    .form-table-contrBasic-title6,
    .form-table-contrBasic-title7,
    .form-table-contrBasic-title8,
    .form-table-contrBasic-td5,
    .form-table-contrBasic-td6,
    .form-table-contrBasic-td7 {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      white-space: pre-wrap;
      font-size: 15px;
    }

    .form-table-contrBasic-td2 {
      display: flex;
      align-items: center;
      padding-left: 10px;
    }

    .form-table-contrBasic-td4 {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 16px;
    }

    .custom-btn-billing {
      width: 100%;
      height: 100%;
      font-size: 16px;
    }

    .custom-table-btn {
      margin: 10px 8px;
      display: flex !important;
      gap: 20px;
    }

    .form-address {
      width: auto;
    }

  }
</style>
