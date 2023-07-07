<script lang="ts" setup>
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const props = defineProps<{
  options?: string[] | [string, string][];
  handler?:(value: string) => void;
  value?: string;
}>();

const openedMenu = ref(false);
const container = ref(null);

onClickOutside(container, () => { if (openedMenu.value) { openedMenu.value = false; } });

const optionObjects = props.options === undefined
  ? []
  : props.options.map((option) => {
    if (typeof option === 'string') {
      return { value: option, label: option };
    } else {
      return { value: option[0], label: option[1] };
    }
  });

const selectedLabel = (value: string | undefined) => value && optionObjects.find(option => option.value === value)?.label;

</script>

<template>
  <div ref="container" class="flex select-none w-full h-7 items-center relative bg-black-600 rounded px-2 py-1 cursor-pointer" @click="openedMenu = !openedMenu">
    <input type="hidden" :value="value">
    <div class="grow py-0.5">
      {{ selectedLabel(value) }}
    </div>
    <FaIcon class="w-4" :icon="faCaretDown" />
    <ul v-if="openedMenu" class="absolute top-8 left-0 z-50 bg-black-600 rounded w-full overflow-hidden">
      <li
        v-for="option of optionObjects"
        :key="option.value"
        :class="{ 'bg-primary-700 text-black-700': value === option.value, 'hover:bg-black-500': value !== option.value }"
        class="py-1 px-2 my-1"
        @click="() => handler ? handler(option.value) : () => {}"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>
