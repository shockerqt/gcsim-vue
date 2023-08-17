<script lang="ts" setup>
const props = defineProps<{
  handler: (weaponSlug: string) => void;
  fixedWeapontype?: string;
}>();

const { data } = await useFetch('/api/data/weapons');

const filteredWeapons = computed(() => {
  let filteredWeapons = (data?.value && Object.values(data.value)) ?? [];

  if (props.fixedWeapontype != null) {
    filteredWeapons = filteredWeapons.filter((weapon) => weapon.weapontype.en === props.fixedWeapontype);
  }

  return filteredWeapons;
});
</script>

<template>
  <header>
    <div>
      Filtros de rareza
    </div>
    <div v-if="fixedWeapontype != null">
      Filtros de tipo
    </div>
  </header>
  <main class="relative m-auto w-full">
    <TransitionGroup class="grid grid-cols-[repeat(auto-fill,_minmax(8rem,_1fr))] gap-5" name="grid" tag="div">
      <button v-for="(weapon) in filteredWeapons" :key="weapon.slug" @click="handler(weapon.slug)">
        <div class="base-background-gradient aspect-square overflow-hidden rounded-xl">
          <!-- <img :class="{ pinned: i === 0 && !!pinnedCharacter }" class="character-grid-item-img"
            :src="character.images.portrait.src" :alt="character.name.en" /> -->
          <div>
            <p>{{ weapon.name.es }}</p>
          </div>
        </div>
      </button>
    </TransitionGroup>
  </main>
</template>
