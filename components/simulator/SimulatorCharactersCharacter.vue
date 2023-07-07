<script lang="ts" setup>
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const { state, active, setCharacter } = useSimulator();
const isOpen = useState<boolean>('is-open-modal');

const lvlsOptions = [
  '1/20', '20', '20/40', '40', '40/50', '50', '50/60', '60', '60/70', '70', '70/80', '80', '80/90', '90/90',
];

</script>

<template>
  <BaseModal>
    <CharactersList
      :handler="async (slug: string) => {
        await setCharacter(slug)
        isOpen = false;
      }"
    />
  </BaseModal>
  <div v-if="active !== null" class="text-primary-500 grid md:grid-cols-2 xl:grid-cols-3 gap-10 rounded max-xs:bg-black-500 max-xs:p-4">
    <!--personaje-->
    <div class="flex gap-3 grow justify-center items-center">
      <div class="aspect-square base-background-gradient flex-wrap">
        <img class="h-32" :src="state[active]?.character.portraitImg" alt="">
      </div>
      <div class="grow flex flex-col gap-2">
        <BaseSelect class="font-medium text-xs" :value="state[active]!.character.name" @click="isOpen = true" />
        <!-- lvls -->
        <BaseSelect
          :value="state[active]?.character.lvl"
          :options="lvlsOptions"
          :handler="(value: string) => { if (active !== null) state[active]!.character.lvl = value }"
          class="font-medium text-xs"
        />
        <BaseSelect class="font-medium text-xs" />
        <p class="font-medium text-xs flex gap-2 items-center my-1">
          <FaIcon class="text-black-100" height="1.5em" :icon="faPaperPlane" /> {{ state[active]?.character.substat }}
        </p>
      </div>
    </div>
    <!-- weapon -->
    <div class="flex gap-3 grow justify-center">
      <div class="h-full aspect-square base-background-gradient flex-wrap" />
      <div class="grow flex flex-col gap-2">
        <BaseSelect class="font-medium text-xs" />
        <BaseSelect class="font-medium text-xs" />
        <BaseSelect class="font-medium text-xs" />
        <div class="grid grid-cols-3 justify-items-center place-items-center">
          <p class="font-medium text-xs flex gap-2 items-center my-1">
            <FaIcon class="text-black-100" height="1.5em" :icon="faPaperPlane" /> {{ 'xx' }}
          </p>
          <hr class="border-r h-3/4 border-r-primary-500">
          <p class="font-medium text-xs flex gap-2 items-center my-1">
            <FaIcon class="text-black-100" height="1.5em" :icon="faPaperPlane" /> {{ 'yy' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
