<script lang="ts" setup>
const { setCharacter, selectCharacterModalState } = useSimulator();
</script>

<template>
  <TransitionRoot appear :show="selectCharacterModalState.open" as="template">
    <Dialog
      as="div"
      class="relative z-10"
      @close="selectCharacterModalState.open = false"
    >
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black-500 bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-screen-lg transform overflow-hidden rounded-2xl bg-black-900 p-6 text-left align-middle shadow-xl transition-all"
            >
              <CharactersList
                :handler="async (slug: string) => {
                  if (selectCharacterModalState.open) {
                    await setCharacter(slug, selectCharacterModalState.entryId);
                  }
                  selectCharacterModalState.open = false;
                }"
              />
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
