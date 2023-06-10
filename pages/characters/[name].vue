<script lang="ts" setup>
interface Character {
  name: string;
  fullname: string;
  title: string;
  element: string;
  rarity: number;
  splashImage: string;
  talentImages: { [key: string]: string };
}

const route = useRoute();
const { data: character } = await useFetch<Character>(`/api/characters/${route.params.name}`);

if (!character.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
}
</script>

<template>
  <main>
    <div
      class="bg-image"
      :style="{
        backgroundImage: `url('https://res.cloudinary.com/genshin/image/upload/sprites/${character?.splashImage}.png')`
      }"
    >
      <div class="bg-gradient" />
    </div>
    <div class="relative max-w-2xl w-full ml-auto mr-10 p-4">
      <!-- BG CLIP -->
      <!-- <div
        class="absolute -z-10 top-0 bottom-0 -left-1/2 -right-0"
        :style="{ background: 'linear-gradient(90deg, rgba(18,18,18,0) 10%, rgba(18,18,18,0.45) 28%, rgba(18,18,18,0.9) 50%, rgba(18,18,18,1) 80%)' }"
      /> -->

      <div class="flex items-end justify-between">
        <div>
          <GenshinIcon
            v-for="key in character?.rarity"
            :key="key"
            icon="star"
            class="text-xl mr-1 text-g2"
          />
        </div>
        <img class="w-8 ml-3" :src="`/img/elements/${character?.element?.toLowerCase()}.svg`">
      </div>
      <hr class="border-primary-500 border-t my-4">
      <div>
        <p class="text-black-100 font-bold text-3xl">
          {{ character?.name }}
        </p>
        <p class="text-black-500 font-bold text-xl mb-3">
          {{ character?.title }}
        </p>
        <div class="flex">
          <img
            v-for="value in character?.talentImages"
            :key="value"
            class="w-11 h-11 mr-4"
            :src="`https://res.cloudinary.com/genshin/image/upload/sprites/${value}.png`"
          >
        </div>
      </div>
      <hr class="border-primary-500 border-t my-4">
      <div class="max-h-64 overflow-auto">
        <CharacterTeamPreview />
        <CharacterTeamPreview />
        <CharacterTeamPreview />
        <CharacterTeamPreview />
        <CharacterTeamPreview />
      </div>
    </div>
  </main>
</template>

<style scoped>
.bg-image {
  position: absolute;
  z-index: -20;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-size: 180vh;
  background-repeat: no-repeat;
  background-position: calc(50% - 20vw) bottom;
}

.bg-gradient {
  height: 100%;
  width: 100%;
  background-image: linear-gradient(to right, transparent, rgba(0, 0, 0, 0.8), black);
}
</style>
