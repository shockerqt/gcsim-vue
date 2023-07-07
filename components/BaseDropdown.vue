<script lang="ts" setup>
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

defineProps<{
  label?: string;
}>();

const openedMenu = ref(false);
const container = ref(null);

onClickOutside(container, () => { if (openedMenu.value) { openedMenu.value = false; } });

</script>

<template>
  <div
    ref="container"
    class="w-full md:relative bg-black-600 rounded"
  >
    <div class="flex select-none w-full h-7 items-center relative  px-2 py-1 cursor-pointer" @click="openedMenu = !openedMenu">
      <div class="grow py-0.5">
        {{ label || '' }}
      </div>
      <FaIcon class="w-4" :icon="faCaretDown" />
    </div>
    <div
      v-if="openedMenu"
      class="absolute top-8 left-0 z-50 bg-black-600 rounded w-full overflow-hidden border border-black-500 py-1"
    >
      <slot />
    </div>
  </div>
</template>
