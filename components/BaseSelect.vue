<script lang="ts" setup generic="T">
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

type Option = {
  label: string;
  value: T;
};

interface Props {
  options?: Option[];
  handler?: (value: T) => void;
  value?: T;
}

const props = defineProps<Props>();

const selectedOption = ref<Option | undefined>(
  props.options?.find(({ value }) => value === props.value),
) as Ref<Option | undefined>;

watch(selectedOption, (newValue) => {
  if (newValue !== undefined && props.handler) {
    props.handler(newValue.value);
  }
});
</script>

<template>
  <div>
    <Listbox v-model="selectedOption">
      <div class="relative mt-1">
        <ListboxButton
          class="bg-white focus-visible:border-indigo-500 focus-visible:ring-white focus-visible:ring-offset-orange-300 relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm"
        >
          <span class="block truncate">{{
            selectedOption?.label || 'SELECCIONAR'
          }}</span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <FaIcon
              :icon="faCaretDown"
              class="text-gray-400 h-5 w-5"
              aria-hidden="true"
            />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="bg-white ring-black absolute mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-for="option in options"
              v-slot="{ active, selected }"
              :key="option.label"
              :value="option"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                  'relative cursor-default select-none py-2 pl-10 pr-4',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                  >{{ option.label }}
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>
