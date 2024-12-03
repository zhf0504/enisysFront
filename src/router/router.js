import CMN001_Login from '@/views/CMN001_Login.vue';

/**
 * note: メモ
 *
 * path                   //各ページのURLパス
 * name                   //ページの名前（識別子として利用）
 * component              //'views' フォルダからのコンポーネントへのパス
 *
 * meta:                  //ページに追加設定を提供するオプション属性
 *
 * meta.requiresMenu      //メニューを表示するかどうかを決定するフラグ
 *
 * meta.requiredFlag      // 親画面のnameと一致する必要があるフラグ
 *                        // このフラグは、メニューから遷移する画面に対して設定されます。
 *                        // 具体的には、子画面（サブページ）だけが必要とし、親画面のnameと同じ値で設定する必要があります。
 *                        // つまり、メニューから選択した親画面の次に表示される子画面にのみ適用されます。
 *                        //アクセス権限を要求するフラグ；store内の権限と一致する名前を設定する必要がある
 */
const routes = [
  {
    //ログイン画面
    path: '/',
    name: 'login',
    component: CMN001_Login,
    meta: { requiresMenu: false }
  },
  {
    path: '/ErrorPage',
    name: 'ErrorPage',
    component: () => import('@/views/ErrorPage.vue'),
    meta: { requiresMenu: false }
  },
  {
    //プランク画面
    path: '/BlankPage',
    name: 'BlankPage',
    component: () => import('@/views/BlankPage.vue'),
    meta: { requiresMenu: true }
  },
  {
    path: '/Menu1a',
    name: 'Menu1a',
    component: () => import('@/views/MenuPage1a.vue'),
    meta: { requiresMenu: true }
  },
  {
    path: '/Menu1b',
    name: 'Menu1b',
    component: () => import('@/views/MenuPage1b.vue'),
    meta: { requiresMenu: true }
  },
  {
    //パスワード変更画面
    path: '/PassChange',
    name: 'PassChange',
    component: () => import('@/views/CMN003_PassChange.vue'),
    meta: { requiresMenu: true }
  },
  {
    //契約登録画面と会員登録画面の合わせ
    path: '/ContrRegisterInit',
    name: 'ContrRegisterInit',
    component: () => import('@/components/ContrRegisterInit.vue'),
    meta: { requiresMenu: true }
  },
  {
    //契約登録画面
    path: '/ContrRegister',
    name: 'ContrRegister',
    component: () => import('@/views/KYK003_ContrRegister.vue'),
    meta: { requiresMenu: true }
  },
  {
    //会員出力条件指定画面
    path: '/MemReportPrintSetting',
    name: 'MemReportPrintSetting',
    component: () => import('@/views/MEM006_MemReportPrintSetting.vue'),
    meta: { requiresMenu: true, requiredFlag: 'MemSearch' }
  },
  {
    //契約検索画面
    path: '/ContrSearch',
    name: 'ContrSearch',
    component: () => import('@/views/KYK001_ContrSearch.vue'),
    meta: { requiresMenu: true }
  },
  {
    //契約一覧画面
    path: '/ContrList',
    name: 'ContrList',
    component: () => import('@/views/KYK002_ContrList.vue'),
    meta: { requiresMenu: true }
  },
  {
    //会員検索画面
    path: '/MemSearch',
    name: 'MemSearch',
    component: () => import('@/views/MEM001_MemSearch.vue'),
    meta: { requiresMenu: true }
  },
  {
    //会員一覧
    path: '/MemList',
    name: 'MemList',
    component: () => import('@/views/MEM002_MemList.vue'),
    meta: { requiresMenu: true, requiredFlag: 'MemSearch' }
  },
  {
    //会員登録
    path: '/MemRegister',
    name: 'MemRegister',
    component: () => import('@/views/MEM003_MemRegister.vue'),
    meta: { requiresMenu: true, requiredFlag: 'MemSearch' }
  },
  {
    //事業所変更
    path: '/AffOfficeChange',
    name: 'AffOfficeChange',
    component: () => import('@/views/MEM004_AffOfficeChange.vue'),
    meta: { requiresMenu: true, requiredFlag: 'MemSearch' }
  },
  {
    //支援実績検索画面
    path: '/SupportResultsSearch',
    name: 'SupportResultsSearch',
    component: () => import('@/views/SEN006_SupportResultsSearch.vue'),
    meta: { requiresMenu: true }
  },
  {
    //支援実績一覧画面
    path: '/SupportResultsList',
    name: 'SupportResultsList',
    component: () => import('@/views/SEN007_SupportResultsList.vue'),
    meta: { requiresMenu: true }
  },
  {
    //経費登録画面
    path: '/ExpRegister',
    name: 'ExpRegister',
    component: () => import('@/views/KEH003_ExpRegister.vue'),
    meta: { requiresMenu: true }
  },
  {
    //従業員マスタ登録画面
    path: '/EmpMstRegister',
    name: 'EmpMstRegister',
    component: () => import('@/views/MST004_EmpMstRegister.vue'),
    meta: { requiresMenu: true }
  },
  {
    //従業員マスタ一覧画面
    path: '/EmpMstList',
    name: 'EmpMstList',
    component: () => import('@/views/MST003_EmpMstList.vue'),
    meta: { requiresMenu: true }
  }
];

export default routes;
