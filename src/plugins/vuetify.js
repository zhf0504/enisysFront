// plugins/vuetify.js
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Import Vuetify CSS
import { aliases, mdi } from 'vuetify/lib/iconsets/mdi';
import {
  VApp,
  VAppBar,
  VBtn,
  VCard,
  VCardActions,
  VCardItem,
  VCardText,
  VCardTitle,
  VCheckbox,
  VChip,
  VCol,
  VContainer,
  VDataTable,
  VDataTableFooter,
  VDataTableHeaders,
  VDataTableRow,
  VDataTableRows,
  VDataTableServer,
  VDataTableVirtual,
  VDatePicker,
  VDatePickerControls,
  VDatePickerHeader,
  VDatePickerMonth,
  VDatePickerMonths,
  VDatePickerYears,
  VDialog,
  VExpandTransition,
  VExpansionPanel,
  VExpansionPanels,
  VExpansionPanelText,
  VExpansionPanelTitle,
  VForm,
  VHover,
  VIcon,
  VImg,
  VList,
  VListGroup,
  VListItem,
  VListItemAction,
  VListItemMedia,
  VListItemTitle,
  VLocaleProvider,
  VMain,
  VMenu,
  VNavigationDrawer,
  VProgressCircular,
  VRadio,
  VRadioGroup,
  VRow,
  VSelect,
  VSpacer,
  VTab,
  VTable,
  VTabs,
  VTextarea,
  VTextField,
  VTooltip
} from 'vuetify/lib/components/index.mjs';
import { VDateInput, VNumberInput, VSnackbarQueue, VTimePicker } from 'vuetify/lib/labs/components.mjs';
import { ja } from 'vuetify/locale';

export default createVuetify({
  components: {
    // ボックス系
    VApp,
    VMain,
    VContainer,
    VRow,
    VCol,
    VForm,
    VCard,
    VCardText,
    VCardItem,
    VCardTitle,
    VCardActions,
    // チェックボックス
    VCheckbox,
    VRadio,
    VRadioGroup,
    VSelect,
    //Image参照系
    VImg,
    //button系
    VBtn,
    //入力欄
    VTextField,
    VTextarea,
    VNumberInput,
    //span系
    VChip,
    //カレンダーに関する
    VDateInput,
    VDatePicker,
    VDatePickerControls,
    VDatePickerHeader,
    VDatePickerMonth,
    VDatePickerMonths,
    VDatePickerYears,
    VTooltip,
    VMenu,
    //確認ダイヤログ用
    VDialog,
    //言語調整
    VLocaleProvider,
    // メニュー系
    VNavigationDrawer,
    VAppBar,
    // リスト表示系
    VList,
    VListGroup,
    VListItem,
    VListItemTitle,
    VListItemAction,
    VListItemMedia,
    // Icon系
    VIcon,
    // マウスホバー系
    VHover,
    // ドロップダウン系
    VExpansionPanel,
    VExpansionPanels,
    VExpansionPanelText,
    VExpansionPanelTitle,
    VExpandTransition,
    // テーブル系
    VTable,
    VDataTable,
    VDataTableHeaders,
    VDataTableFooter,
    VDataTableRow,
    VDataTableRows,
    VDataTableServer,
    VDataTableVirtual,
    //ボタンの読み込み中animation
    VProgressCircular,
    VSnackbarQueue,
    //タブ
    VTabs,
    VTab,
    VTimePicker,
    //スペース
    VSpacer
  },
  //「mdi」Iconの設定
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  },
  //言語の設定
  locale: {
    locale: 'ja',
    messages: { ja }
  }
});
