<script setup lang="ts">
const tabCarousel = useTemplateRef("dashboardTabCarousel");
const activeTab = ref<number>(0); // this is changed by UTabs
// const activeTab = ref<string>(selectedTab.value);
const dashboardNav = [
  {
    icon: "i-ion:language",
    label: "Languages",
    value: 0,
  },
  {
    icon: "i-oui:generate",
    label: "Translator",
    value: 1
  }
];

const DashboardTranslator = resolveComponent("DashboardTranslator");
const items = [
    {
        node: h(DashboardTranslator)
    },
    {
        node: h("div", { class: "w-full h-full" }, ["Hello World"])
    }
];

// const tabClass = ref<{ "tabTransition--left"?: boolean; "tabTransition--right"?: boolean }>({ "tabTransition--right": true });

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
                    <UTabs v-model="activeTab" :items="dashboardNav" size="lg" variant="link" :content="false" />
                </template>
            </UDashboardNavbar>
        </template>
        <template #body>
            <UCarousel v-slot="{ item }" ref="dashboardTabCarousel" :items="items" class="w-full h-full">
                <component :is="item.node" />
                <!-- <div class="w-full h-full">
                    <h1>HELLO WORLD</h1>
                </div>
                <DashboardTranslator /> -->
            </UCarousel>
        </template>
    </UDashboardPanel>
</template>