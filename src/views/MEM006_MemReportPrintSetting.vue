<template>
    <VContainer>
    <!-- タイトル -->
    <BaseTitle :title="screen.label.title" />

    <!-- 出力帳票選択 -->
    <VRow class="form-row">
        <h2 class="custom-label">{{ screen.label.outputReport }}</h2>
        <VRadioGroup class="custom-form-radio form-radio-1" v-model="selectedRadio" inline>
            <VRadio class="custom-radio1" :label="screen.label.radioBtn.memberList" value="memberList" />
            <VRadio class="custom-radio1" 
            :label="screen.label.radioBtn.newYearCardsList" 
            value="newYearCardsList"
            :disabled="true" />
            <VRadio class="custom-radio1" 
            :label="screen.label.radioBtn.memberId" 
            value="memberId" 
            :disabled="true"/>
        </VRadioGroup>
    </VRow>

    <!-- 出力帳票選択 -->
    <VRow class="form-row">
        <h2 class="custom-label" v-html="screen.label.sortOutputReport"></h2>
        <VRadioGroup class="custom-form-radio form-radio-2" v-model="selectedRadio" inline>
            <VRadio class="custom-radio2" :label="screen.label.radioBtn.sortByNameAndDate" value="sortByNameAndDate" />
            <VRadio class="custom-radio2" :label="screen.label.radioBtn.sortByIdAndDate" value="sortByIdAndDate" />
        </VRadioGroup>
    </VRow>

    <!-- 戻る-出力ボタン -->
    <VRow class="form-row-btn">
    <VBtn @click="handleBackBtn" class="custom-btn" color="primary">
        {{ screen.label.BackBtn }}
    </VBtn>
    <VBtn class="custom-btn" color="primary" type="submit">
        <template v-if="screen.isLoading">
        <VProgressCircular indeterminate size="20" color="white" class="mr-2" />
        </template>
        <template v-else>
        {{ screen.label.outputBtn }}
        </template>
    </VBtn>
    </VRow>
</VContainer>

</template>

<script>
import BaseTitle from '@/components/BaseTitle.vue';
import router from '@/router';
import { reactive, ref } from 'vue';

    export default {
        components: { BaseTitle },
        setup() {
            const screen = reactive({
                label: {
                    title: '全員出力条件指定',
                    outputReport: '出力帳票選択',
                    sortOutputReport: '出力帳票選択<br>（並び順）',
                    BackBtn: '戻る',
                    outputBtn: '出力',

                    radioBtn: {
                        memberList: '全員リスト',
                        newYearCardsList: '年賀状送付リスト',
                        memberId: '全員証',
                        sortByNameAndDate: '氏名 （アイウエオ順）、適用開始日（新しい順）',
                        sortByIdAndDate: '全員ID（昇順）、適用開始日（新しい順）'

                    }
                }
            });
            const selectedRadio = ref('');
            //戻るボタン処理
            const handleBackBtn = () => {
                router.push({ name: 'MemList' });
            };
            return {
                screen,
                selectedRadio,
                handleBackBtn
            };
            }
            
        };
</script>

<style scoped>

.v-row.form-row {
    margin-top: 100px;
    border: 1px dotted #333;
    height: 100px; 
    box-sizing: border-box; 
}

.custom-label {
    width: 200px;
    margin-right: 5em;
    border-right: 1px dotted #333;
    height: 100px;
    justify-content: center;

}

.form-row,
.custom-form-radio {
    display: flex;
    align-items: center;
    color: black;
}

:deep(.v-selection-control--inline .v-label) {
    width: auto;
}

.custom-radio1 {
    margin-right: 5em;
}

.custom-radio2 {
    margin-right: 3em;
}

.form-row-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8em;
}

.custom-btn {
    width: 200px;
    font-size: 28px;
    height: auto;
}


</style>
