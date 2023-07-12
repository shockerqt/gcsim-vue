<script lang="ts" setup>
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

defineProps<{
  label?: string;
}>();

const openedMenu = ref(false);
const container = ref(null);

onClickOutside(container, () => {
  if (openedMenu.value) {
    openedMenu.value = false;
  }
});
</script>

<template>
  <div ref="container" class="w-full rounded bg-black-600 md:relative">
    <div
      class="relative flex h-7 w-full cursor-pointer select-none items-center px-2 py-1"
      @click="openedMenu = !openedMenu"
    >
      <div class="grow py-0.5">
        {{ label || '' }}
      </div>
      <FaIcon class="w-4" :icon="faCaretDown" />
    </div>
    <div
      v-if="openedMenu"
      class="absolute left-0 top-8 z-50 w-full overflow-hidden rounded border border-black-500 bg-black-600 py-1"
    >
      <slot />
    </div>
  </div>
</template>
