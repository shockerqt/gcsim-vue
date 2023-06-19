<script lang="ts" setup>

export interface TabButton {
  title: string;
  state: 'active' | 'inactive' | 'disabled';
}

const props = defineProps<{
  buttons: TabButton[];
  column?: boolean;
}>();

const handleClick = (button: TabButton) => {
  for (const b of props.buttons) {
    if (b.state !== 'disabled') { b.state = 'inactive'; }
  }
  button.state = 'active';
};

</script>

<template>
  <nav class="text-sm font-medium text-center text-black-100">
    <ul class="flex flex-wrap -mb-px" :class="{ 'flex-col': column, 'text-start': column }">
      <li v-for="button in buttons" :key="button.title" class="mr-2">
        <button
          :disabled="button.state === 'active' || button.state === 'disabled'"
          class="base-tab"
          :class="{ 'active-tab': button.state === 'active',
                    'inactive-tab': button.state === 'inactive',
                    'disabled-tab': button.state === 'disabled' }"
          @click="() => handleClick(button)"
        >
          {{ button.title }}
        </button>
      </li>
    </ul>
  </nav>
</template>

<style>
.base-tab {
  @apply inline-block p-4 rounded-t-lg
}

.active-tab {
  @apply text-primary-500 ;
}

.inactive-tab {
  @apply  hover:text-primary-100 ;
}

.disabled-tab {
  @apply text-black-500 cursor-not-allowed;
}
</style>
