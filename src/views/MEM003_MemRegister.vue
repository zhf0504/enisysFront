<template>
  <VContainer>
    <!-- TODO モードによる、タイトルが非表示 -->
    <BaseTitle v-if="screen.mode != 0" :title="screen.label.title" />
    <VForm>
      <VRow class="isPC">
        <h3 class="custom-label">{{ screen.label.memberId }}</h3>
        <VCol>{{ screen.memberId }}</VCol>
      </VRow>
      <!-- 会員氏名 -->
      <VRow class="custom-input form-name custom-area">
        <h3 class="custom-label">{{ screen.label.memberName.tag }}</h3>
        <VCol class="name-col">
          <h6>{{ screen.label.memberName.lastNm }}</h6>
          <VTextField v-model="screen.lastNm" :placeholder="screen.placeholder.lastNm" hide-details></VTextField>
        </VCol>
        <VCol class="name-col">
          <h6>{{ screen.label.memberName.firstNm }}</h6>
          <VTextField v-model="screen.firstNm" :placeholder="screen.placeholder.firstNm" hide-details></VTextField>
        </VCol>
        <VCol class="name-col">
          <h6>{{ screen.label.memberName.middleName }}</h6>
          <VTextField
            v-model="screen.middleName"
            :placeholder="screen.placeholder.middleName"
            hide-details
          ></VTextField>
        </VCol>
      </VRow>
      <!-- 会員指名フリガナ -->
      <VRow class="custom-input form-name custom-area">
        <h3 class="custom-label">{{ screen.label.memberNameKana.tag }}</h3>
        <VCol class="name-col">
          <h6>{{ screen.label.memberNameKana.lastNmKana }}</h6>
          <VTextField
            v-model="screen.lastNmKana"
            :placeholder="screen.placeholder.lastNmKana"
            hide-details
          ></VTextField>
        </VCol>
        <VCol class="name-col">
          <h6>{{ screen.label.memberNameKana.firstNmKana }}</h6>
          <VTextField
            v-model="screen.firstNmKana"
            :placeholder="screen.placeholder.firstNmKana"
            hide-details
          ></VTextField>
        </VCol>
        <VCol class="name-col">
          <h6>{{ screen.label.memberNameKana.middleNameKana }}</h6>
          <VTextField
            v-model="screen.middleNameKana"
            :placeholder="screen.placeholder.middleNameKana"
            hide-details
          ></VTextField>
        </VCol>
      </VRow>
      <!-- 会員認証氏名 -->
      <VRow class="custom-input form-membershipName">
        <h3 class="custom-label has-asterisk">{{ screen.label.membershipName }}</h3>
        <VCol cols="auto" class="form-membershipName-group">
          <VTextField
            v-model="screen.middleNameKana"
            :placeholder="screen.placeholder.membershipNameFirst"
            hide-details
          ></VTextField>
          <VTextField
            v-model="screen.middleNameKana"
            :placeholder="screen.placeholder.membershipNameLast"
            hide-details
          ></VTextField>
        </VCol>
        <VCol cols="auto" class="form-membershipName-group-sub">
          <p>{{ screen.label.membershipNameNotice }}</p>
        </VCol>
      </VRow>
      <!-- 会員認証カナ -->
      <VRow class="custom-input form-membershipName">
        <h3 class="custom-label has-asterisk">{{ screen.label.membershipNameKana }}</h3>
        <VCol cols="auto" class="form-membershipName-group">
          <VTextField
            v-model="screen.middleNameKana"
            :placeholder="screen.placeholder.membershipNameKanaFirst"
            hide-details
          ></VTextField>
          <VTextField
            v-model="screen.middleNameKana"
            :placeholder="screen.placeholder.membershipNameKanaLast"
            hide-details
          ></VTextField>
        </VCol>
        <VCol cols="auto" class="form-membershipName-group-sub">
          <p>{{ screen.label.membershipNameNotice }}</p>
        </VCol>
      </VRow>
      <!-- 性別 PC版 -->
      <VRow class="custom-input isPC">
        <h3 class="custom-label has-asterisk">{{ screen.label.gender }}</h3>
        <VCol cols="2">
          <VSelect v-model="screen.selectedOption" :items="screen.genderList" hide-details></VSelect>
        </VCol>
        <h3 class="custom-label-child has-asterisk">{{ screen.label.birthDate }}</h3>
        <VCol>
          <VDateInput
            v-model="screen.selectedBirtday"
            :value="service.formatDateToJapan(screen.selectedBirtday)"
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
            @click:clear="screen.selectedBirtday = null"
            @focus="service.hiddenKeyBoardSP"
            :input-props="{ readonly: true }"
            ok-text="はい"
            cancel-text="キャンセル"
          />
        </VCol>
        <VCol cols="2" class="custom-label-sub">{{ screen.yearEraValue }}</VCol>
        <VCol cols="1" class="custom-label-sub">{{ screen.ageCalculation }}</VCol>
      </VRow>
      <!-- 性別 SP版 -->
      <VRow class="custom-input form-gender isSP">
        <VCol cols="3">
          <h3 class="custom-label has-asterisk">{{ screen.label.gender }}</h3>
          <VCol>
            <VSelect v-model="screen.selectedOption" :items="screen.genderList" hide-details></VSelect>
          </VCol>
        </VCol>
        <VCol cols="8">
          <h3 class="custom-label-child has-asterisk">{{ screen.label.birthDate }}</h3>
          <VDateInput
            v-model="screen.selectedBirtday"
            :value="service.formatDateToJapan(screen.selectedBirtday)"
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
            @click:clear="screen.selectedBirtday = null"
            @focus="service.hiddenKeyBoardSP"
            :input-props="{ readonly: true }"
            ok-text="はい"
            cancel-text="キャンセル"
          />
          <div class="form-yearEraValue">
            <div>{{ screen.yearEraValue }}</div>
            <div>{{ screen.ageCalculation }}</div>
          </div>
        </VCol>
      </VRow>
      <!-- 現住所(居所)＊ -->
      <VRow class="custom-input form-address">
        <h3 class="custom-label has-asterisk">{{ screen.label.address }}</h3>
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
            <VTextField v-model="screen.current_address1" :placeholder="screen.placeholder.address1" hide-details />
            <VTextField v-model="screen.current_address2" :placeholder="screen.placeholder.address2" hide-details />
          </VRow>
        </VCol>
      </VRow>
      <!-- 住民票住所 -->
      <VRow class="form-address">
        <h3 class="custom-label">{{ screen.label.residentialRecordAddress }}</h3>
        <VCol class="form-address-col">
          <VCheckbox
            class="custom-checkbox"
            color="primary"
            v-model="screen.resident_omission_flg"
            :label="screen.label.residentAddressEqualJuminhyo"
            hide-details
          />
          <VRow class="custom-input">
            <p class="custom-notice">{{ screen.label.hyphenInputNotice }}</p>
          </VRow>
          <VRow class="custom-notice-input custom-input">
            <VTextField v-model="screen.resident_post_cd" :placeholder="screen.placeholder.addressCode" hide-details>
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
          <VRow class="form-addressPostal-input custom-input">
            <p>{{ screen.label.address1PostalCodeFieldOnly }}</p>
            <VTextField v-model="screen.resident_address1" :placeholder="screen.placeholder.address1" hide-details />
            <VTextField v-model="screen.resident_address2" :placeholder="screen.placeholder.address2" hide-details />
          </VRow>
        </VCol>
      </VRow>
      <!-- 本籍 -->
      <VRow class="custom-input form-honseki">
        <h3 class="custom-label">{{ screen.label.honseki }}</h3>
        <VCol>
          <VTextField v-model="screen.honseki" :placeholder="screen.placeholder.honseki" hide-details />
        </VCol>
      </VRow>
      <!-- 筆頭者 -->
      <VRow class="custom-input form-honseki">
        <h3 class="custom-label">{{ screen.label.primaryHead }}</h3>
        <VCol>
          <VTextField v-model="screen.hittosya" :placeholder="screen.placeholder.hittosya" hide-details />
        </VCol>
      </VRow>
      <!-- 電話番号と携帯番号 -->
      <VRow class="custom-input form-telephone">
        <h3 class="custom-label">{{ screen.label.telephoneNumber }}</h3>
        <VCol>
          <p class="custom-notice">{{ screen.label.hyphenInputNotice }}</p>
          <VTextField v-model="screen.phone" :placeholder="screen.placeholder.telephoneNumber" hide-details />
        </VCol>
        <h3 class="custom-label-child">{{ screen.label.mobileNumber }}</h3>
        <VCol>
          <p class="custom-notice">{{ screen.label.hyphenInputNotice }}</p>
          <VTextField v-model="screen.mobile_phone" :placeholder="screen.placeholder.mobileNumber" hide-details />
        </VCol>
      </VRow>
      <!-- メールアドレス -->
      <VRow class="custom-input form-honseki">
        <h3 class="custom-label">{{ screen.label.mailAddress }}</h3>
        <VCol>
          <VTextField v-model="screen.mail_address" :placeholder="screen.placeholder.mailAddress" hide-details />
        </VCol>
      </VRow>
      <!-- 年金と預貯金 PC版-->
      <VRow class="custom-input isPC">
        <h3 class="custom-label">{{ screen.label.pension }}</h3>
        <VCol>
          <div class="custom-area-nenkin custom-input-num">
            <VTextField
              v-model="screen.nenkin"
              @keydown="service.blockNonNumeric"
              @focus="() => (screen.nenkin = service.formatMoneyFocusIn(screen.nenkin))"
              @blur="() => (screen.nenkin = service.formatMoneyFocusOut(screen.nenkin))"
              @click.stop
              hide-details
            >
              <template #append-inner>
                <span class="custom-address-icon">円</span>
              </template>
            </VTextField>
          </div>
        </VCol>
        <h3 class="custom-label-child">{{ screen.label.savings }}</h3>
        <VCol>
          <div class="custom-area-nenkin custom-input-num">
            <VTextField
              v-model="screen.yochokin"
              @keydown="service.blockNonNumeric"
              @focus="() => (screen.yochokin = service.formatMoneyFocusIn(screen.yochokin))"
              @blur="() => (screen.yochokin = service.formatMoneyFocusOut(screen.yochokin))"
              @click.stop
              hide-details
            >
              <template #append-inner>
                <span class="custom-address-icon">円</span>
              </template>
            </VTextField>
          </div>
        </VCol>
      </VRow>
      <!-- 年金と預貯金 SP版-->
      <VRow class="custom-input form-nenkin isSP">
        <VCol cols="5" class="custom-input-num">
          <h3 class="custom-label">{{ screen.label.pension }}</h3>
          <VTextField
            v-model="screen.nenkin"
            @keydown="service.blockNonNumeric"
            @focus="() => (screen.nenkin = service.formatMoneyFocusIn(screen.nenkin))"
            @blur="() => (screen.nenkin = service.formatMoneyFocusOut(screen.nenkin))"
            @click.stop
            hide-details
          />
        </VCol>
        <VCol cols="5" class="custom-input-num">
          <h3 class="custom-label-child">{{ screen.label.savings }}</h3>
          <VTextField
            v-model="screen.yochokin"
            @keydown="service.blockNonNumeric"
            @focus="() => (screen.yochokin = service.formatMoneyFocusIn(screen.yochokin))"
            @blur="() => (screen.yochokin = service.formatMoneyFocusOut(screen.yochokin))"
            @click.stop
            hide-details
          />
        </VCol>
      </VRow>
      <!-- 予備費(残高) -->
      <VRow class="custom-input form-amount_of_money">
        <h3 class="custom-label">{{ screen.label.contingencyBalance }}</h3>
        <VCol cols="3">
          <h4>{{ screen.amount_of_money }}</h4>
        </VCol>
      </VRow>
      <!-- 予備費 -->
      <VRow class="form-contingencyFund custom-area">
        <h3 class="custom-label">{{ screen.label.contingencyFund }}</h3>
        <VCol>
          <div class="custom-table-btn">
            <div class="custom-table-btn-sub">
              <VBtn @click="insertYobiRow" color="primary">{{ screen.label.button.insertRow }}</VBtn>
            </div>
            <div class="custom-table-btn-sub">
              <VBtn @click="deleteYobiRow" color="primary">{{ screen.label.button.deleteRow }}</VBtn>
            </div>
          </div>
          <!-- 「予備費」テーブルのPC版 -->
          <VTable class="form-table isPC">
            <thead>
              <tr class="custom-checkbox">
                <th class="form-table-title"></th>
                <th class="form-table-title" v-for="(header, index) in screen.label.reserveFundTable" :key="index">
                  {{ header.title }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in screen.reserveFundTable"
                :key="index"
                :class="{ 'selected-row': screen.selectedYobiRows.includes(index) }"
                @click="selectYobiRow(index)"
              >
                <td class="form-table-row custom-table-input">
                  <VCheckbox v-model="screen.selectedYobiRows" :value="index" color="primary" hide-details></VCheckbox>
                </td>
                <td class="form-table-row custom-table-input">
                  <VTextField v-model="item.summary" @click.stop hide-details />
                </td>
                <td class="form-table-row custom-table-input">
                  <VTextField v-model="item.totalAmount" @click.stop hide-details />
                </td>
                <td class="form-table-row custom-table-input">
                  <VDateInput
                    v-model="item.billingYearMonth"
                    :value="service.formatDateToJapan(item.billingYearMonth)"
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
                    @click.stop
                    @click:clear="item.billingYearMonth = null"
                    @focus="service.hiddenKeyBoardSP"
                    :input-props="{ readonly: true }"
                    ok-text="はい"
                    cancel-text="キャンセル"
                  />
                </td>
                <td class="form-table-row custom-table-input">
                  <VCheckbox v-model="item.billingTarget" color="primary" @click.stop hide-details />
                </td>
                <td class="form-table-row">{{ item.billingStatus }}</td>
                <td class="form-table-row">{{ item.paymentStatus }}</td>
                <td class="form-table-row">{{ item.registrationSource }}</td>
              </tr>
            </tbody>
          </VTable>
          <!-- 「予備費」テーブルのSP版 -->
          <div class="form-table-reserve isSP">
            <div
              class="form-table-reserve-sub"
              v-for="(item, index) in screen.reserveFundTable"
              :key="index"
              :class="{ 'selected-row': screen.selectedYobiRows.includes(index) }"
              @click="selectYobiRow(index)"
            >
              <!-- 摘要 -->
              <div class="form-table-reserve-col">
                <div class="form-table-reserve-title1"></div>
                <div class="form-table-reserve-title2">{{ screen.label.reserveFundTable[0].title }}</div>
              </div>
              <div class="form-table-reserve-col">
                <div class="custom-table-input form-table-reserve-td1 custom-table-checkbox">
                  <VCheckbox v-model="screen.selectedYobiRows" :value="index" color="primary" hide-details></VCheckbox>
                </div>
                <div class="custom-table-input form-table-reserve-td2">
                  <VTextField v-model="item.summary" @click.stop hide-details />
                </div>
              </div>
              <!-- 全額 -->
              <div class="form-table-reserve-col">
                <div class="form-table-reserve-title3">{{ screen.label.reserveFundTable[1].title }}</div>
                <div class="custom-table-input form-table-reserve-td3">
                  <VTextField v-model="item.totalAmount" @click.stop hide-details />
                </div>
              </div>
              <!-- 請求年月 -->
              <div class="form-table-reserve-col">
                <div class="form-table-reserve-title4">{{ screen.label.reserveFundTable[2].title }}</div>
                <div class="custom-table-input form-table-reserve-td4">
                  <VDateInput
                    v-model="item.billingYearMonth"
                    :value="service.formatDateToJapan(item.billingYearMonth)"
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
                    @click.prevent
                    @keydown.prevent
                    @click.stop
                    @click:clear="item.billingYearMonth = null"
                    @focus="service.hiddenKeyBoardSP"
                    :input-props="{ readonly: true }"
                    ok-text="はい"
                    cancel-text="キャンセル"
                  />
                </div>
              </div>
              <div class="form-table-reserve-col">
                <!-- 請求対象 -->
                <div class="form-table-reserve-title5">{{ screen.label.reserveFundTable[3].title }}</div>
                <!-- 請求状況 -->
                <div class="form-table-reserve-title6">{{ screen.label.reserveFundTable[4].title }}</div>
                <!-- 入金状況 -->
                <div class="form-table-reserve-title7">{{ screen.label.reserveFundTable[5].title }}</div>
              </div>
              <div class="form-table-reserve-col">
                <div class="form-table-reserve-td5 custom-table-checkbox">
                  <VCheckbox v-model="item.billingTarget" color="primary" @click.stop hide-details />
                </div>
                <div class="form-table-reserve-td6">{{ item.billingStatus }}</div>
                <div class="form-table-reserve-td7">{{ item.paymentStatus }}</div>
              </div>
            </div>
          </div>
          <!-- 「行追加」「行削除」SP版 -->
          <div class="custom-table-btn custom-table-btn-isSP">
            <div class="custom-table-btn-sub">
              <VBtn @click="insertYobiRow" color="primary">{{ screen.label.button.insertRow }}</VBtn>
            </div>
            <div class="custom-table-btn-sub">
              <VBtn @click="deleteYobiRow" color="primary">{{ screen.label.button.deleteRow }}</VBtn>
            </div>
          </div>
        </VCol>
      </VRow>
      <!-- 要介護等級 PC版 -->
      <VRow class="custom-input isPC">
        <h3 class="custom-label">{{ screen.label.nursingCareLevel }}</h3>
        <VCol cols="3">
          <VSelect v-model="screen.yoshien_kbn" :items="screen.nursingCareLevelList" hide-details />
        </VCol>
        <h3 class="custom-label-child">{{ screen.label.supportLevel }}</h3>
        <VCol cols="3">
          <VSelect v-model="screen.yokaigo_kbn" :items="screen.supportLevelList" hide-details />
        </VCol>
      </VRow>

      <!-- 要介護等級 SP版 -->
      <VRow class="custom-input isSP form-supportLevel">
        <VCol cols="5">
          <h3 class="custom-label">{{ screen.label.nursingCareLevel }}</h3>
          <VSelect v-model="screen.yoshien_kbn" :items="screen.nursingCareLevelList" hide-details />
        </VCol>
        <VCol cols="5">
          <h3 class="custom-label-child">{{ screen.label.supportLevel }}</h3>
          <VSelect v-model="screen.yokaigo_kbn" :items="screen.supportLevelList" hide-details />
        </VCol>
      </VRow>

      <!-- 備考 -->
      <VRow class="form-textarea">
        <h3 class="custom-label">{{ screen.label.notes }}</h3>
        <VCol>
          <VTextarea class="custom-textarea" v-model="screen.remarks" hide-details />
        </VCol>
      </VRow>
      <!-- 既往歴 -->
      <VRow class="form-textarea">
        <h3 class="custom-label">{{ screen.label.pastDiseases }}</h3>
        <VCol>
          <VTextarea class="custom-textarea" v-model="screen.medical_history" hide-details />
        </VCol>
      </VRow>
      <!-- 葬儀予定 -->
      <VRow class="form-textarea">
        <h3 class="custom-label">{{ screen.label.funeralPlan }}</h3>
        <VCol>
          <VTextarea class="custom-textarea" v-model="screen.sougi_schedule" hide-details />
        </VCol>
      </VRow>
      <!-- 納骨予定 -->
      <VRow class="form-textarea">
        <h3 class="custom-label">{{ screen.label.burialPlan }}</h3>
        <VCol>
          <VTextarea class="custom-textarea" v-model="screen.noukotsu_schedule" hide-details />
        </VCol>
      </VRow>
      <!-- 終末期指示書 -->
      <VRow class="form-file custom-input custom-file">
        <h3 class="custom-label">{{ screen.label.endOfLifeDirective }}</h3>
        <VCol cols="3">
          <VTextField
            v-model="screen.file.name"
            append-inner-icon="mdi-folder-open "
            readonly
            @click="triggerFileInput"
            hide-details
          />
          <input type="file" accept=".jpg,.png" ref="fileInput" style="display: none" @change="handleFileChange" />
        </VCol>
        <VImg
          v-if="screen.file.imageSrc"
          :src="screen.file.imageSrc"
          alt="アップロードファイル"
          max-width="200px"
          max-height="100px"
          @click="openModalImage"
        />
        <VDialog v-model="screen.file.dialog" max-width="90%">
          <VImg :src="screen.file.imageSrc" alt="アップロードファイル" />
        </VDialog>
      </VRow>
      <!-- 紹介者 -->
      <VRow class="form-textarea">
        <h3 class="custom-label">{{ screen.label.referrer }}</h3>
        <VCol>
          <VTextarea class="custom-textarea" v-model="screen.introducer" hide-details />
        </VCol>
      </VRow>
      <!-- 担当事業所＊と支援担当者＊ -->
      <VRow class="custom-input form-shientanto">
        <h3 class="custom-label has-asterisk">{{ screen.label.responsibleOffice }}</h3>
        <VCol>
          <div class="form-jigyosyo-sub">
            <VTextField v-model="screen.tanto_jigyosyo_cd" :readonly="true" clearable hide-details />
          </div>
        </VCol>
        <h3 class="custom-label-child has-asterisk">{{ screen.label.supportOfficer }}</h3>
        <VCol @click="openModalShien">
          <div class="form-shientanto-sub">
            <VTextField :readonly="true" v-model="screen.tanto_jugyoin_cd" clearable hide-details />
            <VBtn color="primary" class="custom-btn">
              {{ screen.label.button.select }}
            </VBtn>
            <CMN005_EmpSearch
              :isVisible="screen.openModalShienFlag"
              @update:isVisible="screen.openModalShienFlag = $event"
              @selectedShientanto="handleSelectedShientanto"
              @selectedTanto="handleSelectedTanto"
            />
          </div>
        </VCol>
      </VRow>
      <!-- 転居届提出日と納骨日 PC版-->
      <VRow class="custom-input isPC">
        <h3 class="custom-label">{{ screen.label.relocationDate }}</h3>
        <VCol>
          <div class="custom-area-tenkyo">
            <VDateInput
              v-model="screen.tenkyo_date"
              :value="service.formatDateToJapan(screen.tenkyo_date)"
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
              @click:clear="screen.tenkyo_date = null"
              @focus="service.hiddenKeyBoardSP"
              :input-props="{ readonly: true }"
              ok-text="はい"
              cancel-text="キャンセル"
            />
          </div>
        </VCol>
        <h3 class="custom-label-child">{{ screen.label.burialDate }}</h3>
        <VCol>
          <div class="custom-area-shientanto">
            <VDateInput
              v-model="screen.noukotsu_date"
              :value="service.formatDateToJapan(screen.noukotsu_date)"
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
              @click:clear="screen.noukotsu_date = null"
              @focus="service.hiddenKeyBoardSP"
              :input-props="{ readonly: true }"
              ok-text="はい"
              cancel-text="キャンセル"
            />
          </div>
        </VCol>
      </VRow>
      <!-- 死亡日と死亡時刻 PC版 -->
      <VRow class="custom-input isPC">
        <h3 class="custom-label">{{ screen.label.deathDate }}</h3>
        <VCol>
          <div class="custom-area-deathDate">
            <VDateInput
              v-model="screen.death_date"
              :value="service.formatDateToJapan(screen.death_date)"
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
              @click:clear="screen.death_date = null"
              @focus="service.hiddenKeyBoardSP"
              :input-props="{ readonly: true }"
              ok-text="はい"
              cancel-text="キャンセル"
            />
          </div>
        </VCol>
        <h3 class="custom-label-child">{{ screen.label.deathTime }}</h3>
        <VCol>
          <div class="custom-area-shientanto form-shientanto-sub">
            <VTextField v-model="screen.death_time" type="time" hide-details />
          </div>
        </VCol>
      </VRow>
      <!-- 「転居届提出日」 SP版 -->
      <VRow class="custom-input form-tenkyo-date isSP">
        <h3 class="custom-label">{{ screen.label.relocationDate }}</h3>
        <VCol cols="6">
          <VDateInput
            v-model="screen.tenkyo_date"
            :value="service.formatDateToJapan(screen.tenkyo_date)"
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
            @click:clear="screen.tenkyo_date = null"
            @focus="service.hiddenKeyBoardSP"
            :input-props="{ readonly: true }"
            ok-text="はい"
            cancel-text="キャンセル"
          />
        </VCol>
      </VRow>
      <!-- 「死亡日と死亡時刻」 SP版 -->
      <VRow class="custom-input form-deathDate isSP">
        <VCol cols="6">
          <h3 class="custom-label">{{ screen.label.deathDate }}</h3>
          <VDateInput
            v-model="screen.death_date"
            :value="service.formatDateToJapan(screen.death_date)"
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
            @click:clear="screen.death_date = null"
            @focus="service.hiddenKeyBoardSP"
            :input-props="{ readonly: true }"
            ok-text="はい"
            cancel-text="キャンセル"
          />
        </VCol>
        <VCol cols="4">
          <h3 class="custom-label-child">{{ screen.label.deathTime }}</h3>
          <VTextField v-model="screen.death_time" type="time" hide-details />
        </VCol>
      </VRow>
      <!-- 「納骨日」 SP版 -->
      <VRow class="custom-input form-tenkyo-date isSP">
        <h3 class="custom-label">{{ screen.label.burialDate }}</h3>
        <VCol cols="6">
          <VDateInput
            v-model="screen.noukotsu_date"
            :value="service.formatDateToJapan(screen.noukotsu_date)"
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
            @click:clear="screen.noukotsu_date = null"
            @focus="service.hiddenKeyBoardSP"
            :input-props="{ readonly: true }"
            ok-text="はい"
            cancel-text="キャンセル"
          />
        </VCol>
      </VRow>
      <!-- 会員関係者情報 -->
      <VRow class="my-7 custom-area">
        <h3>{{ screen.label.memberRelatedInfo }}</h3>
      </VRow>
      <VRow class="custom-area">
        <div class="custom-table-btn">
          <div class="custom-table-btn-sub">
            <VBtn @click="insertMemRow" color="primary">{{ screen.label.button.insertRow }}</VBtn>
          </div>
          <div class="custom-table-btn-sub">
            <VBtn @click="deleteMemRow" color="primary">{{ screen.label.button.deleteRow }}</VBtn>
          </div>
        </div>
        <!-- 会員関係者情報のテーブル PC版 -->
        <VTable class="form-table my-0 isPC">
          <thead>
            <tr class="custom-checkbox">
              <th class="form-table-title"></th>
              <th class="form-table-title" v-for="(header, index) in screen.label.memberRelatedTable" :key="index">
                {{ header.title }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in screen.memberRelatedTable"
              :key="index"
              :class="{ 'selected-row': screen.selectedMemRows.includes(index) }"
              @click="selectMemRow(index)"
            >
              <td class="form-table-row-sub">
                <VCheckbox v-model="screen.selectedMemRows" :value="index" color="primary" hide-details />
              </td>
              <td class="form-table-row-sub">{{ index + 1 }}</td>
              <td class="form-table-row-sub">
                <VBtn class="custom-btn-details" @click.stop="openModalDetails(index)" color="primary">
                  {{ screen.label.button.details }}
                </VBtn>
              </td>
              <td class="form-table-row-sub">{{ item.memberRelationship }}</td>
              <td class="form-table-row-sub">{{ item.name }}</td>
              <td class="form-table-row-sub">{{ item.address }}</td>
              <td class="form-table-row-sub">
                <div v-for="(subItem, index) in item.telephoneNumber || ['']" :key="index">
                  {{ subItem }}
                </div>
              </td>
              <td class="form-table-row-sub">
                <div class="notes-column">
                  {{ item.note }}
                </div>
              </td>
            </tr>
          </tbody>
          <KYK003M01_RelatedDetail
          :isVisible="screen.openModalKankeiFlag"
          :memberData="screen.selectedMember" 
          @update:isVisible="screen.openModalKankeiFlag = $event"
          @update:memberData="(updatedData) => {
            const { index, ...memberData } = updatedData;
            if (index !== undefined && screen.memberRelatedTable[index]) {
              screen.memberRelatedTable[index] = memberData;
            }
          }"
        />
        </VTable>
        <!-- 会員関係者情報のテーブル SP版 -->
        <div class="form-table-mem isSP">
          <div
            class="form-table-mem-sub"
            v-for="(item, index) in screen.memberRelatedTable"
            :key="index"
            :class="{ 'selected-row': screen.selectedMemRows.includes(index) }"
            @click="selectMemRow(index)"
          >
            <div class="form-table-mem-col">
              <div class="form-table-mem-row">
                <div class="form-table-mem-title1"></div>
                <div class="form-table-mem-td1">
                  <VCheckbox v-model="screen.selectedMemRows" :value="index" color="primary" hide-details />
                </div>
              </div>
              <div class="form-table-mem-row">
                <div class="form-table-mem-title2">{{ screen.label.memberRelatedTable[0].title }}</div>
                <div class="form-table-mem-td2">{{ index + 1 }}</div>
              </div>
              <div class="form-table-mem-row">
                <VBtn class="custom-btn-details" @click.stop="openModalDetails(index)" color="primary">
                  {{ screen.label.button.details }}
                </VBtn>
              </div>
            </div>
            <div class="form-table-mem-col">
              <div class="form-table-mem-title3">{{ screen.label.memberRelatedTable[2].title }}</div>
              <div class="form-table-mem-td3">{{ item.memberRelationship }}</div>
            </div>
            <div class="form-table-mem-col">
              <div class="form-table-mem-title4">{{ screen.label.memberRelatedTable[3].title }}</div>
              <div class="form-table-mem-td4">{{ item.name }}</div>
            </div>
            <div class="form-table-mem-col">
              <div class="form-table-mem-title5">{{ screen.label.memberRelatedTable[4].title }}</div>
              <div class="form-table-mem-td5">{{ item.address }}</div>
            </div>
            <div class="form-table-mem-col">
              <div class="form-table-mem-title6">{{ screen.label.memberRelatedTable[5].title }}</div>
              <div class="form-table-mem-td6">
                <div v-for="(subItem, index) in item.telephoneNumber || ['']" :key="index">
                  {{ subItem }}
                </div>
              </div>
            </div>
            <div class="form-table-mem-col form-table-mem-title7">{{ screen.label.memberRelatedTable[6].title }}</div>
            <div class="form-table-mem-col form-table-mem-td7 custom-note">{{ item.note }}</div>
          </div>
        </div>
        <!-- 「行追加」「行削除」SP版 -->
        <div class="custom-table-btn custom-table-btn-isSP">
          <div class="custom-table-btn-sub">
            <VBtn @click="insertMemRow" color="primary">{{ screen.label.button.insertRow }}</VBtn>
          </div>
          <div class="custom-table-btn-sub">
            <VBtn @click="deleteMemRow" color="primary">{{ screen.label.button.deleteRow }}</VBtn>
          </div>
        </div>
      </VRow>
    </VForm>
  </VContainer>
</template>

<script>
  import BaseTitle from '@/components/BaseTitle.vue';
  import { useCommonService } from '@/composables/useCommonService';
  import { onMounted, watch } from 'vue';
  import { reactive } from 'vue';
  import CMN005_EmpSearch from './modal/CMN005_EmpSearch.vue';
  import KYK003M01_RelatedDetail from './modal/KYK003M01_RelatedDetail.vue';

  export default {
    components: { BaseTitle, CMN005_EmpSearch, KYK003M01_RelatedDetail },
    setup() {
      // 画面属性の設定: 画面で使用するラベルやテキストを設定するオブジェクト
      const screen = reactive({
        label: {
          title: '会員登録',
          titleNote:
            '※入力タイムアウトを防止するため、この画面のみセッションを維持しています。入力が完了したら、速やかに契約登録を行ってください。',
          applyStartDate: '適用開始日＊',
          applyEndDate: '適用終了日:',
          historyId: '履歴番号:',
          lastUpdater: '最終更新者:',
          memberId: '会員番号',
          contractId: '契約番号',
          memberName: {
            tag: '会員氏名',
            lastNm: '(姓)',
            firstNm: '(名)',
            middleName: '(ミドルネーム)'
          },
          memberNameKana: {
            tag: '会員氏名フリガナ',
            lastNmKana: '(姓)',
            firstNmKana: '(名)',
            middleNameKana: '(ミドルネーム)'
          },
          membershipName: '会員証氏名',
          membershipNameKana: '会員証氏名カナ',
          membershipNameNotice: '※二段目が入力された場合、一段目+二段目 で会員証に出力されます。',
          gender: '性別',
          birthDate: '生年月日',
          dateHeader: '日付の選択',
          datePlaceholder: '年/月/日',
          dateIcon: 'mdi-calendar-month',
          birthDateJapan: null,
          birthDateValue: null,
          address: '現住所(居所)',
          hyphenInputNotice: '※ハイフン付きで入力してください',
          address1PostalCodeFieldOnly: '※住所⇔郵便番号の変換対象項目は住所1のみ',
          residentialRecordAddress: '住民票住所',
          residentAddressEqualJuminhyo: '現住所＝住民票住所 ',
          honseki: '本籍',
          primaryHead: '筆頭者',
          telephoneNumber: '電話番号',
          mobileNumber: '携帯番号',
          mailAddress: 'メールアドレス',
          pension: '年金',
          savings: '預貯金',
          contingencyBalance: '予備費(残高)',
          contingencyFund: '予備費',
          nursingCareLevel: '要介護等級',
          supportLevel: '要支援等級',
          notes: '備考',
          pastDiseases: '既往歴',
          funeralPlan: '葬儀予定',
          burialPlan: '納骨予定',
          endOfLifeDirective: '終末期指示書',
          referrer: '紹介者',
          responsibleOffice: '担当事業所',
          supportOfficer: '支援担当者',
          relocationDate: '転居届提出日',
          burialDate: '納骨日',
          deathDate: '死亡日',
          deathTime: '死亡時刻',
          remainingAmount: '請求残金:',
          nextInvoiceBalanceHandling: '次回請求時の請求残金の扱い',
          sendBulkInvoice: '一括請求する',
          invoiceAsScheduled: '予定通り請求する',
          memberRelatedInfo: '会員関係者情報',
          reserveFundTable: [
            { title: '摘要', key: 'summary' },
            { title: '全額', key: 'totalAmount' },
            { title: '請求年月', key: 'billingYearMonth' },
            { title: '請求対象', key: 'billingTarget' },
            { title: '請求状況', key: 'billingStatus' },
            { title: '入金状況', key: 'paymentStatus' },
            { title: '登録元', key: 'registrationSource' }
          ],
          memberRelatedTable: [
            { title: '連絡優先度', key: 'priorityLevel' },
            { title: '詳細', key: 'details' },
            { title: '会員との関係', key: 'memberRelationship' },
            { title: '氏名', key: 'name' },
            { title: '住所', key: 'address' },
            { title: '電話番号', key: 'telephoneNumber' },
            { title: '備考', key: 'note' }
          ],
          button: {
            postalCodeToAddress: '郵便番号→住所',
            addressToPostalCode: '住所→郵便番号',
            insertRow: '行追加',
            deleteRow: '行削除',
            select: '選択',
            details: '詳細入力'
          }
        },
        placeholder: {
          lastNm: 'えにし',
          firstNm: '太郎',
          middleName: 'Michael',
          lastNmKana: 'エニシ',
          firstNmKana: 'タロウ',
          middleNameKana: 'マイケル',
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
        genderList: ['女性', '男性', 'その他', '無回答'],
        nursingCareLevelList: ['要介護1', '要介護2', '要介護3', '要介護4', '要介護5'],
        supportLevelList: ['自立', '要支援1', '要支援2'],
        mode: 0,
        memberId: '1300001',
        lastNm: null,
        firstNm: null,
        middleName: null,
        lastNmKana: null,
        firstNmKana: null,
        middleNameKana: null,
        genderValue: null,
        selectedBirtday: null,
        yearEraValue: null,
        ageCalculation: null,
        current_post_cd: null,
        current_address1: null,
        current_address2: null,
        resident_omission_flg: null,
        resident_post_cd: null,
        resident_address1: null,
        resident_address2: null,
        honseki: null,
        hittosya: null,
        phone: null,
        mobile_phone: null,
        mail_address: null,
        nenkin: null,
        amount_of_money: '60000',
        yochokin: null,
        yoshien_kbn: null,
        yokaigo_kbn: null,
        remarks: null,
        medical_history: null,
        sougi_schedule: null,
        noukotsu_schedule: null,
        ending_didection: null,
        introducer: null,
        tanto_jigyosyo_cd: null,
        tanto_jugyoin_cd: null,
        contract_number: null,
        tenkyo_date: null,
        noukotsu_date: null,
        death_date: null,
        death_time: null,
        death_bulk_billing_flg: null,
        selectedMember: null,
        selectedYobiRows: [],
        selectedMemRows: [],
        reserveFundTable: [
          {
            yobi_flg: null,
            summary: null,
            totalAmount: null,
            billingYearMonth: null,
            billingYearMonthDateValue: null,
            billingTarget: null,
            billingStatus: '-',
            paymentStatus: '-',
            registrationSource: '画面'
          }
        ],
        memberRelatedTable: [
          {
            priorityLevel: null,
            details: null,
            totalAmount: null,
            memberRelationship: '息子',
            name: '縁一郎',
            address: '東京都千代田区霞が関1-1-1',
            telephoneNumber: ['03-1111-1111', '080-1234-5678'],
            note: '1111111242384712341623578129304095217432041230-9471239085619234897564389'
          },
          {
            priorityLevel: null,
            details: null,
            totalAmount: null,
            memberRelationship: '親戚',
            name: '縁次郎',
            address: '東京都千代田区霞が関1-1-2',
            telephoneNumber: ['03-1111-2222', '080-1234-5678'],
            note: null
          }
        ],
        file: {
          fileInput: null,
          name: null,
          imageSrc: null,
          dialog: false
        },
        openModalShienFlag: false,
        openTimePicker: false,
        openModalKankeiFlag: false,
      });
      const service = useCommonService();

      //初期表示
      onMounted(() => {
        screen.amount_of_money = service.formatCurrency(screen.amount_of_money);
        screen.file.fileInput = document.querySelector('input[type="file"]');
        // console.log(screen.amount_of_money);
      });

      //日付の日本語化
      watch(
        () => screen.selectedBirtday,
        (dateValue) => {
          const year = dateValue.getFullYear();
          const month = String(dateValue.getMonth() + 1).padStart(2, '0');
          const day = String(dateValue.getDate()).padStart(2, '0');
          //画面上で選択した生年月日
          const selectedBirtdayDateValue = `${year}年${month}月${day}日`;
          //和暦の計算
          screen.yearEraValue = service.getJapaneseEra(selectedBirtdayDateValue);
          //歳の計算
          screen.ageCalculation = service.calculateAge(selectedBirtdayDateValue);
        }
      );

      const handlePostToAdd = () => {
        console.log('「郵便番号→住所」の処理');
      };

      const handleAddToPost = () => {
        console.log('「住所→郵便番号」の処理');
      };

      //予備費用の行選択の処理
      const selectYobiRow = (index) => {
        const selectedIndex = screen.selectedYobiRows.indexOf(index);
        if (selectedIndex === -1) {
          // 選択した行をリストに追加
          screen.selectedYobiRows.push(index);
        } else {
          // 存在すれば、リストから破棄
          screen.selectedYobiRows.splice(selectedIndex, 1);
        }
      };
      //予備費用の行追加の処理
      const insertYobiRow = () => {
        if (Array.isArray(screen.selectedYobiRows) && screen.selectedYobiRows.length > 1) {
          screen.selectedYobiRows = [];
          return;
        }
        const newRow = {
          yobi_flg: null,
          summary: null,
          totalAmount: null,
          billingYearMonth: null,
          billingYearMonthDateValue: null,
          billingTarget: null,
          billingStatus: '-',
          paymentStatus: '-',
          registrationSource: '-'
        };

        if (Array.isArray(screen.selectedYobiRows) && screen.selectedYobiRows.length === 1) {
          const index = screen.selectedYobiRows[0];
          screen.reserveFundTable.splice(index, 0, newRow);
          screen.selectedYobiRows = [index + 1];
        } else {
          screen.reserveFundTable.push(newRow);
          screen.selectedYobiRows = [];
        }
      };
      //予備費用の行削除の処理
      const deleteYobiRow = () => {
        if (screen.selectedYobiRows && screen.selectedYobiRows.length > 0) {
          screen.selectedYobiRows.sort((a, b) => b - a).forEach((index) => screen.reserveFundTable.splice(index, 1));
          screen.selectedYobiRows = [];
        }
      };

      //会員関係者情報用の行選択の処理
      const selectMemRow = (index) => {
        const selectedIndex = screen.selectedMemRows.indexOf(index);
        if (selectedIndex === -1) {
          // 選択した行をリストに追加
          screen.selectedMemRows.push(index);
        } else {
          // 存在すれば、リストから破棄
          screen.selectedMemRows.splice(selectedIndex, 1);
        }
      };

      //会員関係者情報用の行追加の処理
      const insertMemRow = () => {
        if (Array.isArray(screen.selectedMemRows) && screen.selectedMemRows.length > 1) {
          screen.selectedMemRows = [];
          return;
        }
        const newRow = {
          priorityLevel: null,
          details: null,
          totalAmount: null,
          memberRelationship: null,
          name: null,
          address: null,
          telephoneNumber: null,
          note: null
        };

        if (Array.isArray(screen.selectedMemRows) && screen.selectedMemRows.length === 1) {
          const index = screen.selectedMemRows[0];
          screen.memberRelatedTable.splice(index, 0, newRow);
          screen.selectedMemRows = [index + 1];
        } else {
          screen.memberRelatedTable.push(newRow);
          screen.selectedMemRows = [];
        }
      };

      //会員関係者情報用の行削除の処理
      const deleteMemRow = () => {
        if (screen.selectedMemRows && screen.selectedMemRows.length > 0) {
          screen.selectedMemRows.sort((a, b) => b - a).forEach((index) => screen.memberRelatedTable.splice(index, 1));
          screen.selectedMemRows = [];
        }
      };

      // fileInputの開き処理
      const triggerFileInput = () => {
        screen.file.fileInput.click();
      };

      const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          screen.file.name = file.name;
          screen.file.imageSrc = URL.createObjectURL(file);
        }
      };

      // イメージモーダル開き処理
      const openModalImage = () => {
        screen.file.dialog = true;
      };

      // 担当者モーダル開き処理
      const openModalShien = () => {
        screen.openModalShienFlag = true;
      };
      // モーダルから値の取得
      const handleSelectedShientanto = (value) => {
        screen.tanto_jugyoin_cd = value;
      };
      // モーダルから値の取得
      const handleSelectedTanto = (value) => {
        screen.tanto_jigyosyo_cd = value.jigyosyo_nm;
      };

      //会員関係者の「詳細入力」処理
      const openModalDetails = (index) => {
        screen.selectedMember = { ...screen.memberRelatedTable[index], index };
        screen.openModalKankeiFlag = true; 
        console.log(screen.selectedMember);
        
      };
      return {
        screen,
        service,
        handlePostToAdd,
        handleAddToPost,
        selectYobiRow,
        insertYobiRow,
        deleteYobiRow,
        triggerFileInput,
        handleFileChange,
        openModalImage,
        openModalShien,
        handleSelectedShientanto,
        handleSelectedTanto,
        selectMemRow,
        insertMemRow,
        deleteMemRow,
        openModalDetails
      };
    }
  };
</script>

<style scoped>
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
  }
  :deep(.custom-input-num .v-field__input) {
    text-align: right;
  }

  .v-container .v-row {
    width: 80%;
  }

  .v-container .custom-area {
    width: 100%;
  }

  .v-container .custom-label-child {
    margin-left: 10%;
  }

  .form-address .custom-notice-input {
    width: 20%;
  }
  .form-membershipName-group {
    display: flex;
    flex-direction: column;
    width: calc(55% - 120px);
    padding-right: 0;
  }

  .form-membershipName-group-sub {
    display: flex;
    width: calc(45% - 30px);
    align-items: flex-end;
    padding-left: 0;
    padding-right: 0;
  }

  .custom-label-sub {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
  }

  p {
    font-size: 12px;
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

  .form-amount_of_money {
    text-align: right;
    font-size: large;
  }

  .form-amount_of_money h4 {
    padding-right: 5%;
  }

  .custom-table-btn {
    height: auto;
    width: 100%;
    display: flex;
    gap: 20px;
    margin-bottom: 10px;
  }

  .form-textarea .custom-label,
  .form-contingencyFund .custom-label {
    align-items: flex-start;
    padding-top: 12px;
  }

  .form-file .custom-label {
    align-items: flex-start;
    padding-top: 30px;
  }

  .form-table {
    margin: 30px 0;
    width: 100%;
    max-height: 300px;
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
    padding: 0;
  }

  .form-table th {
    font-size: 18px;
    background-color: #97d885;
    color: white;
    font-weight: 500;
    text-align: center !important;
  }

  .selected-row {
    background-color: #e2efda !important;
  }

  .form-table-title {
    margin: 10px auto !important;
  }
  .form-table-row {
    text-align: center;
  }

  .form-table .form-table-row {
    padding: 0;
  }

  .form-table-row:nth-child(1) {
    width: 50px;
  }
  .form-table-row:nth-child(2) {
    width: calc(100% -50px -150px -300px -80px * 3 -100px);
  }
  .form-table-row:nth-child(3) {
    width: 150px;
  }
  .form-table-row:nth-child(4) {
    width: 300px;
  }
  .form-table-row:nth-child(5),
  .form-table-row:nth-child(6),
  .form-table-row:nth-child(7) {
    width: 80px;
  }
  .form-table-row:nth-child(8) {
    width: 100px;
  }

  .custom-table-checkbox .v-checkbox,
  .form-table-row .v-checkbox,
  .form-table-row-sub .v-checkbox {
    display: flex;
    justify-content: center;
    border: none;
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

  .form-shientanto-sub {
    display: flex;
  }

  .form-table .form-table-row-sub {
    padding: 0;
  }

  table {
    border-collapse: collapse;
  }
  .form-table-row-sub {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    width: 100%;
  }

  .custom-btn-details {
    height: 100%;
    width: 100%;
  }

  .form-table-row-sub:nth-child(1) {
    width: 50px;
  }
  .form-table-row-sub:nth-child(2) {
    text-align: center;
    width: 90px;
  }
  .form-table-row-sub:nth-child(3) {
    width: 100px;
  }
  .form-table-row-sub:nth-child(4) {
    width: 100px;
  }
  .form-table-row-sub:nth-child(5) {
    text-align: center;
    width: 100px;
  }
  .form-table-row-sub:nth-child(6) {
    width: auto;
  }
  .form-table-row-sub:nth-child(7) {
    width: 200px;
  }

  /* 備考：ラベル自動改行 */
  .form-table-row-sub:nth-child(8) {
    width: 300px;
    padding: 0;
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

  .form-name h6 {
    font-weight: normal;
    opacity: 0.5;
  }

  .custom-table-btn-isSP {
    display: none;
  }

  .custom-area-nenkin,
  .custom-area-tenkyo,
  .custom-area-deathDate,
  .custom-area-shientanto {
    width: 63%;
  }

  .custom-note {
    display: block;
    white-space: break-spaces;
    overflow-y: auto;
    word-wrap: break-word;
    box-sizing: border-box;
    resize: none;
  }

  /* SP版のCSS */
  @media (max-width: 850px) {
    .v-col {
      padding: 0;
    }
    .v-container {
      padding: 0 12px;
    }
    .v-container .v-row {
      padding-top: 12px;
      min-width: 100%;
      width: auto;
    }

    .v-container .custom-area {
      width: auto;
    }

    .v-container .custom-label-child {
      margin-left: 0;
    }

    .custom-area-nenkin,
    .custom-area-tenkyo,
    .custom-area-deathDate,
    .custom-area-shientanto {
      width: auto;
    }
    .custom-notice {
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .form-name {
      min-width: 100%;
      display: block;
    }
    .form-name h3 {
      padding-left: 0;
      padding-right: 0;
    }
    .custom-label,
    .custom-label-child {
      width: 100%;
      padding-bottom: 12px;
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

    .form-membershipName-group {
      min-width: 100%;
    }

    .form-membershipName-group-sub {
      min-width: 100%;
    }
    .form-gender .custom-label,
    .form-gender .custom-label-child {
      width: auto;
    }

    .form-gender {
      display: flex !important;
      justify-content: space-between;
    }

    .form-yearEraValue {
      display: flex;
      justify-content: space-evenly;
    }

    .custom-notice-input {
      padding-top: 0 !important;
      min-width: 50% !important;
    }

    .form-address-btn {
      margin-bottom: 0;
    }

    .form-addressPostal-input {
      margin-top: 0;
    }
    .form-honseki {
      display: flex;
      flex-direction: column;
    }
    .form-telephone .custom-label-child {
      padding-top: 12px;
    }
    .form-nenkin {
      display: flex !important;
      flex-direction: row;
      justify-content: space-between;
    }
    .form-amount_of_money .v-col {
      min-width: 41.67%;
    }

    /* SP版のテーブル「予備費」の調整 */
    .form-table-reserve {
      background-color: white;
      max-height: 619px;
      overflow-y: auto;
      width: 95%;
      margin: 0 auto;
    }
    .form-table-reserve-sub {
      border: 1px solid black !important;
    }
    .form-table-reserve div {
      border: 1px solid #ddd;
    }
    .form-table-reserve-title1,
    .form-table-reserve-title2,
    .form-table-reserve-title3,
    .form-table-reserve-title4,
    .form-table-reserve-title5,
    .form-table-reserve-title6,
    .form-table-reserve-title7 {
      background-color: #97d885;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      color: white;
    }
    .form-table-reserve-col {
      display: flex;
    }

    .form-table-reserve-title1,
    .form-table-reserve-td1 {
      width: 15%;
    }
    .form-table-reserve-title2,
    .form-table-reserve-td2 {
      width: 85%;
    }

    .form-table-reserve-title3,
    .form-table-reserve-title4 {
      width: 30%;
    }
    .form-table-reserve-td3,
    .form-table-reserve-td4 {
      width: 70%;
    }

    .form-table-reserve-title5,
    .form-table-reserve-title6,
    .form-table-reserve-title7,
    .form-table-reserve-td5,
    .form-table-reserve-td6,
    .form-table-reserve-td7 {
      width: calc(100% / 3);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .custom-table-btn-isSP {
      display: flex;
      padding-top: 12px;
    }

    .form-supportLevel {
      display: flex !important;
      justify-content: space-between;
    }

    .form-supportLevel .custom-label,
    .form-supportLevel .custom-label-child {
      width: auto;
      display: flex;
      align-items: center;
    }
    .form-textarea {
      display: flex;
      flex-direction: column;
    }

    .custom-file .v-col {
      max-width: 50%;
      flex: 0 0 50%;
    }

    .form-shientanto {
      display: flex;
      flex-direction: column;
    }

    .form-shientanto .custom-label {
      padding-top: 12px;
    }
    .form-shientanto .form-jigyosyo-sub {
      flex: 0 0 70%;
      max-width: 70%;
    }

    .form-shientanto .custom-label-child {
      padding-top: 24px;
    }
    .form-shientanto .form-shientanto-sub {
      flex: 0 0 calc(70% + 100px);
      max-width: calc(70% + 100px);
    }

    .form-deathDate {
      display: flex !important;
      justify-content: flex-start;
      gap: 10%;
    }

    .form-table-mem {
      background-color: white;
      max-height: 500px;
      overflow-y: auto;
      width: 95%;
      margin: 0 auto;
    }

    .form-table-mem-sub {
      border: 1px solid black !important;
    }

    .form-table-mem div {
      border: 1px solid #ddd;
    }
    .form-table-mem-col {
      display: flex;
      height: 50px;
    }

    .form-table-mem-col:nth-child(1) {
      height: 100px;
    }

    .form-table-mem-title1,
    .form-table-mem-title2,
    .form-table-mem-title3,
    .form-table-mem-title4,
    .form-table-mem-title5,
    .form-table-mem-title6,
    .form-table-mem-title7 {
      background-color: #97d885;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      color: white;
    }

    .form-table-mem-td2,
    .form-table-mem-td3,
    .form-table-mem-td4,
    .form-table-mem-td5,
    .form-table-mem-td6,
    .form-table-mem-td7 {
      padding-left: 5px;
    }

    .form-table-mem-row {
      width: calc(100% / 3);
    }

    .form-table-mem-title1,
    .form-table-mem-td1,
    .form-table-mem-title2,
    .form-table-mem-td2 {
      height: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .form-table-mem-row .custom-btn-details {
      height: 100%;
      font-size: 16px;
    }

    .form-table-mem-td1 {
      padding: 0;
      margin: 0;
    }

    .form-table-mem-td1 .v-checkbox {
      border: none;
    }

    .form-table-mem-title3,
    .form-table-mem-title4,
    .form-table-mem-title5,
    .form-table-mem-title6 {
      width: calc(100% / 3);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .form-table-mem-td3,
    .form-table-mem-td4,
    .form-table-mem-td5 {
      width: calc(100% * 2 / 3);
      display: flex;
      align-items: center;
    }

    .form-table-mem-td6 {
      width: calc(100% * 2 / 3);
      flex-direction: column;
      align-items: flex-start;
    }

    .form-table-mem-td6 div {
      border: none;
    }

    .form-jigyosyo {
      width: 100%;
    }
  }
</style>
