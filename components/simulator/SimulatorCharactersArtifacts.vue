<script lang="ts" setup>
const labels = [
  'Set',
  'Lvl',
  'Rarity',
  'Stat Principal',
  // 'SubStats1',
  // 'SubStats2',
  // 'Substats3',
  // 'Substats4',
];

const { entries, selectedEntryIndex } = useSimulator();
</script>

<template>
  <div
    v-if="selectedEntryIndex != null"
    class="grid justify-center gap-4 lg:grid-cols-2"
  >
    <main class="max-w-lg">
      <header
        class="mb-6 flex w-full items-center justify-center gap-2 xs:gap-4"
      >
        <button
          v-for="(artifact, i) in entries[selectedEntryIndex]?.artifacts"
          :key="i"
          class="base-background-gradient aspect-square w-full xs:w-20"
          :class="{
            'border-2 border-primary-500':
              entries[selectedEntryIndex]?.ui.selectedArtifact === i,
          }"
          @click="entries[selectedEntryIndex]!.ui.selectedArtifact = i"
        />
      </header>
      <!--buscar un select custom-->
      <section
        class="my-4 grid grid-cols-1 gap-x-12 gap-y-3 font-bold text-primary-500 xs:grid-flow-col xs:grid-cols-2 xs:grid-rows-2"
      >
        <h2 class="uppercase xs:hidden">Main Stats</h2>
        <div
          v-for="label of labels"
          :key="label"
          class="flex items-center justify-between gap-2"
        >
          <label
            class="w-24 text-sm font-medium capitalize text-black-100 xs:text-xs"
            for="artifactsSet"
            >{{ label }}</label
          >
          <BaseSelect
            class="rounded bg-black-600 px-2 py-1 text-xs font-medium capitalize"
          />
        </div>
      </section>

      <section
        class="my-4 grid grid-cols-1 gap-x-12 gap-y-3 font-bold text-primary-500 xs:hidden"
      >
        <h2 class="uppercase xs:hidden">Sub Stats</h2>
        <div class="grid grid-cols-2 gap-x-4 gap-y-2">
          <div
            v-for="label of labels"
            :key="label"
            class="flex items-center justify-between gap-2"
          >
            <BaseSelect
              class="rounded bg-black-600 px-2 py-1 text-xs font-medium capitalize"
            />
          </div>
        </div>
      </section>
    </main>
    <aside class="max-w-lg lg:col-start-2 lg:row-span-2">
      <section>
        <h2 class="font-bold text-primary-500">Set Bonus</h2>
        <div class="mb-4 mt-2">
          <h3 class="text-sm font-bold text-primary-500">
            Furia el Trueno (2)
          </h3>
          <p class="text-justify text-xs">Bono de Daño Electro +15%</p>
        </div>
        <div>
          <h3 class="text-sm font-bold text-primary-500">
            Ritual de la antigua Nobleza (2)
          </h3>
          <p class="text-justify text-xs">
            Cuando el personaje que equipa este conjunto de artefactos cura a
            otro, crea el efecto de "burbuja marina” durante 3 s, el cual
            registra la cantidad de Vida regenerada (incluida la regenerada por
            encima del 100%). Tras ello, la burbuja marina estalla e inflige
            contra los enemigos cercanos un daño basado en el 90% de la cantidad
            regenerada. Este daño se calcula de manera similar al de las
            reacciones de Electrocargado, Superconductor, etc., pero no varía en
            función de la Maestría Elemental, el nivel del personaje o el bono
            de daño de las reacciones. Solo se puede crear una burbuja marina
            cada 3.5 s, la cual solo puede registrar un máximo de 30 000 pts. de
            Vida regenerada, incluyendo la regenerada por encima del 100%.
            Además, solo puede existir una burbuja marina en tu equipo al mismo
            tiempo. Cuando el personaje que equipa este conjunto de artefactos
            está en el equipo pero no en combate, también podrá activar este
            efecto.
          </p>
        </div>
      </section>
    </aside>
  </div>
</template>
