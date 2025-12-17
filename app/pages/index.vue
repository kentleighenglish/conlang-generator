<script setup lang="ts">
const tabCarousel = useTemplateRef("dashboardTabCarousel");
const activeTab = ref<number>(0); // this is changed by UTabs

const DashboardLanguages = resolveComponent("DashboardLanguages");
const DashboardTranslator = resolveComponent("DashboardTranslator");

const Todo = h("div", { class: "w-full h-full p-8" }, h("ul", { class: "list-disc" }, [
  "Add languages button",
  "Language store",
  "Move translations to client",
  "Save/load languages in localStorage",
].map(item => h("li", {}, item))));

const dashboardNav = [
  {
    icon: "i-ion:language",
    label: "Languages",
    value: 0,
    node: h(DashboardLanguages),
  },
  {
    icon: "i-oui:generate",
    label: "Translator",
    value: 1,
    node: h(DashboardTranslator),
  },
  {
    icon: "i-ion:list",
    label: "TODO",
    value: 2,
    node: h(Todo),
  },
];

onMounted(() => {
  const storedActiveTab = localStorage.getItem("activeTab");
  if (storedActiveTab) {
    activeTab.value = Number(storedActiveTab);
  }
})

watch(activeTab, (newTab) => {
  const newIndex = dashboardNav.findIndex((tab) => tab.value === newTab);
  tabCarousel.value?.emblaApi?.scrollTo(newIndex);
  localStorage.setItem("activeTab", newIndex.toString());
});
</script>
<template>
  <div class="flex flex-col w-screen h-screen overflow-hidden">
    <UDashboardNavbar title="Conlang Generator">
      <template #right>
        <UTabs
          v-model="activeTab"
          :items="dashboardNav"
          size="lg"
          variant="pill"
          :content="false"
        />
      </template>
    </UDashboardNavbar>
    <UCarousel
      v-slot="{ item }"
      ref="dashboardTabCarousel"
      :items="dashboardNav"
      :watch-drag="false"
      class="w-full h-full overflow-hidden"
      :ui="{ viewport: 'overflow-hidden h-full', container: 'overflow-hidden h-full', item: 'min-w-0 shrink-0 basis-full h-full', }"
    >
      <component :is="item.node" />
    </UCarousel>
  </div>
</template>
