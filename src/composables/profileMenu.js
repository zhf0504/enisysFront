// src/composables/profileMenu.js
import { ref } from 'vue';
import { useMenuisSp } from './useMenuisSp';

//profileメニュー true: 表示  false: 非表示
const useMenuisSP = useMenuisSp();
const isOpenProfileMenu = ref(useMenuisSP.isOpenProfileMenu);

const toggleProfileMenu = () => {
  if (useMenuisSP.isOpenMenuSP.value) {
    return;
  }
  isOpenProfileMenu.value = !isOpenProfileMenu.value;
};

const closeProfileMenu = () => {
  isOpenProfileMenu.value = false;
};
export function profileMenu() {
  return {
    isOpenProfileMenu,
    toggleProfileMenu,
    closeProfileMenu
  };
}
