<script lang="ts" setup>
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const openedUserMenu = ref(false);
const openedDialog = ref(false);
</script>

<template>
  <nav class="z-10">
    <div
      class="relative mx-auto flex h-24 max-w-screen-xl flex-wrap items-center justify-between p-4"
    >
      <!-- LOGO -->
      <NuxtLink to="/" class="flex items-center">
        <span
          class="self-center whitespace-nowrap text-2xl font-semibold text-primary-500"
          >GCSim</span
        >
      </NuxtLink>

      <ul
        class="hidden items-center gap-8 border-black-700 p-0 font-medium md:flex"
      >
        <li>
          <TheNavbarLink to="/simulator"> Simulator </TheNavbarLink>
        </li>
        <li>
          <TheNavbarLink to="/characters"> Characters </TheNavbarLink>
        </li>

        <li>
          <ClientOnly>
            <TheNavbarUserWidget />
          </ClientOnly>
        </li>
      </ul>

      <button
        type="button"
        class="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-black-100 hover:bg-black-600 focus:outline-none focus:ring-2 focus:ring-primary-100 md:hidden"
        aria-controls="navbar-default"
        :aria-expanded="openedUserMenu"
        @click="openedDialog = true"
      >
        <span class="sr-only">Open navigation menu</span>
        <svg
          class="h-6 w-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <Teleport to="body">
      <TransitionRoot as="template" :show="openedDialog">
        <Dialog as="div" class="relative z-10" @close="openedDialog = false">
          <!-- BACKDROP -->
          <TransitionChild
            as="template"
            enter="ease-in-out duration-500"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="ease-in-out duration-500"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div
              class="fixed inset-0 bg-black-500 bg-opacity-75 transition-opacity"
            />
          </TransitionChild>

          <div class="fixed inset-0 overflow-hidden">
            <div class="absolute inset-0 overflow-hidden">
              <div
                class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
              >
                <TransitionChild
                  as="template"
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enter-from="translate-x-full"
                  enter-to="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leave-from="translate-x-0"
                  leave-to="translate-x-full"
                >
                  <DialogPanel
                    class="pointer-events-auto relative w-screen max-w-md"
                  >
                    <TransitionChild
                      as="template"
                      enter="ease-in-out duration-500"
                      enter-from="opacity-0"
                      enter-to="opacity-100"
                      leave="ease-in-out duration-500"
                      leave-from="opacity-100"
                      leave-to="opacity-0"
                    >
                      <div
                        class="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4"
                      >
                        <!-- BACKDROP -->
                        <button
                          type="button"
                          class="text-gray-300 hover:text-white focus:ring-white rounded-md focus:outline-none focus:ring-2"
                          @click="openedDialog = false"
                        >
                          <span class="sr-only">Close panel</span>
                          <FaIcon
                            :icon="faXmark"
                            class="grid h-6 w-6 place-items-center"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </TransitionChild>
                    <div
                      class="flex h-full flex-col overflow-y-auto bg-black-500 py-6 shadow-xl"
                    >
                      <div class="relative mt-6 flex-1 px-4 sm:px-6">
                        <!-- CONTENT -->
                        <ul
                          class="items-center gap-8 space-y-4 border-black-700 p-0 font-medium"
                        >
                          <li>
                            <TheNavbarLink to="/simulator">
                              Simulator
                            </TheNavbarLink>
                          </li>
                          <li>
                            <TheNavbarLink to="/characters">
                              Characters
                            </TheNavbarLink>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </Teleport>
  </nav>
</template>
