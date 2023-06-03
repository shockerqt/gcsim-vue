<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()
const data = ref('')

import(`@/assets/charactersData/${route.params.character}.json`).then((module) => {
  data.value = module.default
  console.log(data)
})
</script>

<template>
  <div
    class="absolute bottom-0 -left-[17%] -z-20 h-screen w-screen overflow-hidden bg-no-repeat bg-left-bottom"
    :style="{
      backgroundImage: `url(
        'https://res.cloudinary.com/genshin/image/upload/sprites/${data?.character?.images?.namegachasplash}.png'
      )`,
      backgroundSize: '180vh'
    }"
  >
    <div
      class="absolute top-0 bottom-[70vh] w-[180vh] -z-10 bg-gradient-to-b from-b1 to-transparent"
    />
    <!-- <img
      class="max-w-fit object-scale-down max-w-screen"
      :src="
        `https://res.cloudinary.com/genshin/image/upload/sprites/${data?.character?.images?.namegachasplash}.png` ||
        ''
      "
      alt=""
    /> -->
  </div>
  <div class="relative max-w-2xl w-full ml-auto mr-10 p-4">
    <!-- BG CLIP -->
    <div
      class="absolute -z-10 top-0 bottom-0 -left-1/2 -right-0"
      :style="{
        background:
          'linear-gradient(90deg, rgba(18,18,18,0) 10%, rgba(18,18,18,0.45) 28%, rgba(18,18,18,0.9) 50%, rgba(18,18,18,1) 80%)'
      }"
    />

    <div class="flex items-end justify-between">
      <div>
        <i
          v-for="key of Array.from({ length: data?.character?.rarity }, (v, i) => i)"
          v-bind:key="key"
          class="fas fa-star text-xl mr-1 text-g2"
        ></i>
      </div>
      <img class="w-8 ml-3" :src="`/src/assets/Elements/Element_${data?.character?.element}.svg`" />
    </div>
    <hr class="border-g2 border-t my-4" />
    <div>
      <p class="text-gray-200 font-bold text-3xl">
        {{ data?.character?.name }}
      </p>
      <p class="text-neutral-600 font-bold text-xl mb-3">{{ data?.character?.title }}</p>
      <div class="flex">
        <img
          class="w-11 h-11 mr-4"
          v-for="value of Object.values(data?.talents?.images)"
          v-bind:key="value"
          :src="`https://res.cloudinary.com/genshin/image/upload/sprites/${value}.png`"
        />
      </div>
    </div>
    <hr class="border-g2 border-t my-4" />
  </div>
</template>
