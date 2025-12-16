<script setup lang="ts">
const tabCarousel = useTemplateRef("dashboardTabCarousel");
const activeTab = ref<number>(0); // this is changed by UTabs

const DashboardTranslator = resolveComponent("DashboardTranslator");
const dashboardNav = [
  {
    icon: "i-ion:language",
    label: "Languages",
    value: 0,
    node: h("div", { class: "w-full h-full" }, ["Hello World"]),
  },
  {
    icon: "i-oui:generate",
    label: "Translator",
    value: 1,
    node: h(DashboardTranslator),
  }
];


watch(activeTab, (newTab) => {
    const newIndex = dashboardNav.findIndex((tab) => tab.value === newTab);
    tabCarousel.value?.emblaApi?.scrollTo(newIndex);
});
</script>
<template>
    <UDashboardPanel>
        <template #header>
            <UDashboardNavbar title="Conlang Generator">
                <template #right>
                    <UTabs v-model="activeTab" :items="dashboardNav" size="lg" variant="pill" :content="false" />
                </template>
            </UDashboardNavbar>
        </template>
        <template #body>
            <UCarousel v-slot="{ item }" ref="dashboardTabCarousel" :items="dashboardNav" :watch-drag="false" class="w-full h-full">
                <component :is="item.node" />
                <!-- <div class="w-full h-full">
                    <h1>HELLO WORLD</h1>
                </div>
                <DashboardTranslator /> -->
            </UCarousel>
        </template>
    </UDashboardPanel>
</template>