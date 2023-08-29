<script lang="ts" setup>
const isOpen = useState('is-open-modal', () => false);
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="absolute left-0 top-0 grid h-screen min-h-screen w-screen place-items-center bg-primary-500/50 p-4"
    >
      <div
        class="h-full w-full max-w-screen-lg overflow-y-auto rounded bg-black-900 px-4 pb-8"
      >
        <p>Hello from the modal!</p>
        <button class="fixed right-4 top-4" @click="isOpen = false">
          Close
        </button>
        <slot />
      </div>
    </div>
  </Teleport>
</template>
