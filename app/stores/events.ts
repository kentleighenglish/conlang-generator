type EventData = Record<string, number | string | object | []>;
type EventCallback = (data?: EventData) => void;

export const useEventStore = defineStore("events", () => {
  const runtimeConfig = useRuntimeConfig();

  const events = ref<Record<string, EventCallback[]>>({});

  const subscribe = (name: string, cb: EventCallback) => {
    if (!runtimeConfig.isServer) {
      if (!events.value[name]) {
        events.value[name] = [];
      }
      events.value[name].push(cb);
    }
  };

  const dispatch = (name: string, data?: EventData) => {
        if(!events.value[name]) return;
        for (const eventsCb of events.value[name].filter(cb => typeof cb === "function"))
          eventsCb(data);
  };

  return {
    events,
    subscribe,
    dispatch,
  };
});