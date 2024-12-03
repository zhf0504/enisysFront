// src/composables/useMenuisSp.js
import { ref } from 'vue';

const isOpenMenuSP = ref(false);
const isOpenProfileMenu = ref(false);

const toggleMenu = () => {
  if (isOpenProfileMenu.value) {
    isOpenProfileMenu.value = false;
  }
  isOpenMenuSP.value = !isOpenMenuSP.value;
};

const closeMenu = () => {
  isOpenMenuSP.value = false;
};
export function useMenuisSp() {
  return {
    isOpenMenuSP,
    isOpenProfileMenu,
    toggleMenu,
    closeMenu
  };
}
