<script lang="ts" setup>
export interface Table {
  title: string;
  rows: [string | number, string | number][];
}

defineProps<{ table: Table }>();
</script>

<template>
  <div class="bg-black-700 pb-2 text-[0.6rem]">
    <table class="w-full text-left text-xs">
      <thead class="uppercase text-primary-500">
        <tr>
          <th colspan="2" scope="overflow" class="w-full px-6 py-2 text-center">
            {{ table.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, i) of table.rows"
          :key="row[0]"
          :class="{ 'bg-black-800': i % 2 === 0 }"
        >
          <th
            scope="row"
            class="whitespace-nowrap px-4 py-1 font-normal text-white"
          >
            {{ row[0] }}
          </th>
          <td class="px-4 py-1 text-right text-primary-500">
            {{ row[1] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
