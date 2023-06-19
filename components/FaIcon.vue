<script lang="ts" setup>
import { IconDefinition } from '@fortawesome/fontawesome-common-types';

defineProps<{
  icon: IconDefinition;
  color?: string;
}>();
</script>

<template>
  <svg
    height="1em"
    class="inline align-[-0.125em]"
    :fill="color || 'currentColor'"
    :viewBox="`0 0 ${icon.icon[0]} ${icon.icon[1]}`"
  >
    <template v-if="Array.isArray(icon.icon[4])">
      <path v-for="(path, i) of icon.icon[4]" :key="i" :d="path" />
    </template>
    <path v-else :d="icon.icon[4]" />
  </svg>
</template>
