<script lang="ts" setup>
interface Table {
  title: string;
  rows: [string, string][];
}

defineProps<{ table: Table }>();

</script>

<template>
  <div class="bg-black-400 pb-2 text-[0.6rem] w-96">
    <table class="text-left w-full text-xs">
      <thead class="text-primary-500 uppercase">
        <tr>
          <th colspan="2" scope="overflow" class="px-6 py-2 text-center w-full">
            {{ table.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) of table.rows" :key="row[0]" :class="{'bg-black-600': i%2 === 0}">
          <th scope="row" class="px-4 py-1 font-normal text-black-100 whitespace-nowrap ">
            {{ row[0] }}
          </th>
          <td class="px-4 py-1 text-primary-500 text-right">
            {{ row[1] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
