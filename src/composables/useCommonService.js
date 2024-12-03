// composables/useCommonService.js

export function useCommonService() {
  // 各日本の元号とその開始日を定義
  const eras = [
    { name: '令和', start: new Date(2019, 4, 1) }, // 令和は2019年5月1日から
    { name: '平成', start: new Date(1989, 0, 8) }, // 平成は1989年1月8日から
    { name: '昭和', start: new Date(1926, 11, 25) }, // 昭和は1926年12月25日から
    { name: '大正', start: new Date(1912, 6, 30) }, // 大正は1912年7月30日から
    { name: '明治', start: new Date(1868, 0, 25) } // 明治は1868年1月25日から
  ];

  // 'yyyy年MM月dd日'形式の日付文字列をDateオブジェクトに変換する関数
  const parseJapaneseDate = (dateStr) => {
    const regex = /^(\d{4})年(\d{1,2})月(\d{1,2})日$/;
    const match = dateStr.match(regex);
    if (match) {
      // 年・月・日をそれぞれ取得し、Dateオブジェクトを生成
      const year = parseInt(match[1], 10);
      const month = parseInt(match[2], 10) - 1; // 月は0-11で指定する必要がある
      const day = parseInt(match[3], 10);
      return new Date(year, month, day);
    }
    return null;
  };

  // 日本の元号を取得する関数
  const getJapaneseEra = (dateStr) => {
    const date = parseJapaneseDate(dateStr); // 日付文字列をDate型に変換
    if (!date) return '日付が無効です';

    for (const era of eras) {
      if (date >= era.start) {
        // 元号の年数を計算して返す
        const year = date.getFullYear() - era.start.getFullYear() + 1;
        return `${era.name}${year}年${date.getMonth() + 1}月${date.getDate()}日`;
      }
    }
    return '日付が無効です';
  };

  // 年齢を計算する関数 (誕生日を過ぎたかどうかも計算)
  const calculateAge = (birthDateStr) => {
    const birthDate = parseJapaneseDate(birthDateStr); // 日付文字列をDate型に変換
    if (!birthDate) return '無効な日付です';

    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();

    // 今年の誕生日が過ぎたかどうかをチェック
    const birthdayThisYear = new Date(currentDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (currentDate < birthdayThisYear) {
      age--; // まだ誕生日が来ていない場合、1歳減らす
    }

    if (age <= 0) {
      age = '0 歳';
    } else {
      age = age + ' 歳';
    }
    return age;
  };

  /**
   * 数値を通貨形式 (例: 2,000,000 円) にフォーマットするメソッド
   * @param {number|string|Event} input - 数値またはイベントオブジェクト
   * @returns {string} - フォーマットされた文字列 (イベントの場合は値を更新)
   */
  const formatCurrency = (input) => {
    let value = '';

    // Eventオブジェクトの場合 //TODO削除
    if (input instanceof Event) {
      const target = input.target;
      if (!target.value) return '0 円';
      value = target.value.replace(/[^\d]/g, ''); // 数字以外を削除
      const parsedValue = parseInt(value, 10);
      return isNaN(parsedValue) ? '0 円' : parsedValue.toLocaleString() + ' 円';
    } else {
      // 数値または文字列として渡された場合
      if (!input) return '0 円';
      value = typeof input === 'string' ? input.replace(/[^\d]/g, '') : input;
      const parsedValue = parseInt(value, 10);
      return isNaN(parsedValue) ? '0 円' : parsedValue.toLocaleString() + ' 円';
    }
  };

  /**
   * 日付を日本のフォーマットに変換します。
   * @param {dateString} dateString (v-modelの値を変更)
   * @returns {string} - フォーマット済みの日付文字列「yyyy年mm月dd日」
   */
  const formatDateToJapan = (dateString) => {
    if (!dateString) return '';
    const year = dateString.getFullYear();
    const month = String(dateString.getMonth() + 1).padStart(2, '0');
    const day = String(dateString.getDate()).padStart(2, '0');
    //画面上で選択した生年月日
    const date = `${year}年${month}月${day}日`;
    return date;
  };

  /**
   * フォーカスする時、カンマを外す処理
   * @param {valueRef} valueRef 変換する変数
   * @returns {valueRef} valueRef 変換する変数
   */
  const formatMoneyFocusIn = (valueRef) => {
    console.log(valueRef);

    if (valueRef) {
      valueRef = valueRef.replace(/,/g, '');
    }
    return valueRef;
  };
  /**
   * フォーカスアウトする時、カンマをつける処理
   * @param {valueRef} valueRef 変換する変数
   * @returns {valueRef} valueRef 変換する変数
   */
  const formatMoneyFocusOut = (valueRef) => {
    console.log(valueRef);
    if (valueRef) {
      valueRef = valueRef.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return valueRef;
  };

  /**
   * リスト内の「初期表示用」
   * @param {Array} valueList 処理する値のリスト
   * @returns {Array} 処理後のリスト
   */
  const formatMoneyForList = (valueList) => {
    if (Array.isArray(valueList)) {
      return valueList.map((valueRef) => formatMoneyFocusOut(valueRef));
    }
    return [];
  };

  /**
   * 任意のフィールドにカンマを追加する処理
   * @param {Array} table 処理するテーブル（配列）
   * @param {string} field フォーマットするフィールド名
   * @returns {Array} 処理後のテーブル
   */
  const formatFieldInTable = (table, field) => {
    return table.map((row) => {
      if (row[field] !== null && row[field] !== undefined) {
        row[field] = formatMoneyFocusOut(row[field]);
      }
      return row;
    });
  };

  /**
   * 入力欄が数字のみの制限処理
   * @param {event} event
   */
  const blockNonNumeric = (event) => {
    if (!/^\d$/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete') {
      event.preventDefault();
    }
  };

  /**
   * SP版DateInputキーボード表示させない処理
   * @param {event} event
   *
   */
  const hiddenKeyBoardSP = (event) => {
    event.target.blur();
  };

  return {
    getJapaneseEra,
    calculateAge,
    formatCurrency,
    formatDateToJapan,
    hiddenKeyBoardSP,
    formatMoneyFocusIn,
    formatMoneyFocusOut,
    formatMoneyForList,
    blockNonNumeric,
    formatFieldInTable
  };
}
