<template>
  <VTextField
    class="custom-input"
    v-model="displayDate"
    placeholder="年月"
    type="text"
    append-inner-icon="mdi-calendar-month"
    hide-details
    :readonly="true"
    @click="openCalendar"
  />
  <input
    class="custom-input"
    ref="monthPicker"
    type="month"
    v-model="selectedDate"
    @input="updateDisplayDate"
    style="opacity: 0; position: absolute; width: 0; height: 0"
  />
</template>

<script>
  import { ref, nextTick, watch } from 'vue';

  export default {
    name: 'MonthPicker',
    props: {
      modelValue: {
        type: String,
        default: ''
      }
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const selectedDate = ref(props.modelValue); // 初期値として親から受け取った値を使用
      const displayDate = ref('');
      const monthPicker = ref(null);
      const openCalendar = async () => {
        await nextTick();
        if (monthPicker.value) {
          monthPicker.value.showPicker();
        }
      };

      const updateDisplayDate = () => {
        if (selectedDate.value) {
          const [year, month] = selectedDate.value.split('-');
          displayDate.value = `${year}年${month}月`;
        } else {
          displayDate.value = '';
        }
        emit('update:modelValue', selectedDate.value); // 親コンポーネントに選択した値を送信
      };

      // props.modelValueが変更されたときにselectedDateを更新
      watch(
        () => props.modelValue,
        (newValue) => {
          selectedDate.value = newValue;
          updateDisplayDate(); // 表示も更新
        }
      );

      return {
        selectedDate,
        displayDate,
        monthPicker,
        openCalendar,
        updateDisplayDate
      };
    }
  };
</script>

<style scoped>
  .v-input__append-inner {
    display: none;
  }

  .custom-input {
    padding-right: 0;
  }

  input[type='month']::-webkit-calendar-picker-indicator {
    display: none;
  }
</style>
