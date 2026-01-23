<script setup lang="ts">
import type { AcceptableValue, SelectItem } from "@nuxt/ui";

const languageStore = useLanguageStore();

const tabCarousel = useTemplateRef("dashboardTabCarousel");
const activeTab = ref<number>(0); // this is changed by UTabs

const DashboardLanguages = resolveComponent("DashboardLanguages");
const DashboardTranslator = resolveComponent("DashboardTranslator");

// const Todo = h(
//   "div",
//   { class: "w-full h-full p-8" },
//   h(
//     "ul",
//     { class: "list-disc" },
//     [
//       "Add languages button",
//       "Language store",
//       "Move translations to client",
//       "Save/load languages in localStorage",
//     ].map((item) => h("li", {}, item)),
//   ),
// );

const dashboardNav = computed(() => ([
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
    disabled: !currentLanguage.value,
  },
  // {
  //   icon: "i-ion:list",
  //   label: "TODO",
  //   value: 2,
  //   node: h(Todo),
  // },
]));

const addLanguageModalData = ref<object>({});
const addLanguageModalOpen = ref<boolean>(false);
const addLanguageName = ref<string>("");
const onAddLanguage = () => {
  if (addLanguageName.value) {
    const newLanguage = languageStore.addLanguage({ name: addLanguageName.value });
    addLanguageModalOpen.value = false;
    addLanguageName.value = "";
    languageStore.setCurrentLanguage(newLanguage.id);
  }
};
const onOpenAddLanguageModal = () => {
  addLanguageName.value = "";
  addLanguageModalData.value = {
    prevLanguage: languageStore.currentLanguageId,
  };
  addLanguageModalOpen.value = true;
}
  
provide("onOpenAddLanguageModal", () => onOpenAddLanguageModal());

const currentLanguage = computed(() => languageStore.currentLanguage);
const languageSelectValue = ref<string | undefined>(currentLanguage.value?.id ?? undefined);
const onLanguageSelect = (id: AcceptableValue | undefined) => {
  if (id === "addLanguage") {
    onOpenAddLanguageModal();
    return;
  }

  if (id && typeof id === "string") {
    languageStore.setCurrentLanguage(id);
  }
};

const languageOptions = computed<SelectItem[]>(() => [
  ...languageStore.languages.map((language) => ({
    label: language.name,
    value: language.id,
  })),
  {
    label: "Add Language",
    trailingIcon: "i-ion:plus",
    value: "addLanguage",
    // onSelect: (e: Event) => {
    //   e.preventDefault();
    //   addLanguageModalOpen.value = true;
    // },
  },
]);

onMounted(() => {
  const storedActiveTab = localStorage.getItem("activeTab");
  if (storedActiveTab) {
    activeTab.value = Number(storedActiveTab);
    setTimeout(() => {
      tabCarousel.value?.emblaApi?.scrollTo(activeTab.value, true);
    }, 100);
  }
});

watch(activeTab, (newTab) => {
  const newIndex = dashboardNav.value.findIndex((tab) => tab.value === newTab);
  tabCarousel.value?.emblaApi?.scrollTo(newIndex);
  localStorage.setItem("activeTab", newIndex.toString());
});
watch(currentLanguage, (currentLang) => {
  if (currentLang) {
    languageSelectValue.value = currentLang.id;
  }
});
</script>
<template>
  <div class="flex flex-col w-screen h-screen overflow-hidden">
    <UModal ref="addLanguageModal" v-model:open="addLanguageModalOpen" title="Add Language">
      <template #body>
        <UForm @submit="onAddLanguage" class="w-full space-y-4">
          <UFormField class="w-full">
            <UInput v-model="addLanguageName" type="text" placeholder="Name" size="lg" class="w-full" />
          </UFormField>
          <UButton type="submit" block color="primary" :disabled="!addLanguageName.length">Add</UButton>
        </UForm>
      </template>
    </UModal>
    <UDashboardNavbar title="Conlang Generator">
      <template #trailing>
        <USelect
          v-model="languageSelectValue"
          placeholder="Add Language"
          size="lg"
          variant="ghost"
          color="primary"
          :items="languageOptions"
          @update:model-value="onLanguageSelect"
        />
      </template>
      <template #right>
        <UTabs
          v-model="activeTab"
          :items="dashboardNav"
          size="md"
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
      :ui="{
        viewport: 'overflow-hidden h-full',
        container: 'h-full',
        item: 'min-w-0 shrink-0 basis-full h-full',
      }"
    >
      <component :is="item.node" />
    </UCarousel>
  </div>
</template>
