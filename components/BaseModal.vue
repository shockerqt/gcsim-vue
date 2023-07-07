<script lang="ts" setup>
const isOpen = useState('is-open-modal', () => false);

</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="absolute top-0 left-0 w-screen min-h-screen h-screen grid place-items-center bg-primary-500/50 p-4">
      <div class="bg-black-700 rounded px-4 pb-8 h-full overflow-y-auto max-w-screen-lg w-full">
        <p>Hello from the modal!</p>
        <button class="fixed right-4 top-4" @click="isOpen = false">
          Close
        </button>
        <slot />
      </div>
    </div>
  </Teleport>
</template>
