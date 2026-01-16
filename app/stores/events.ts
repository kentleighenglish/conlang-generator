type EventData = Record<string, unknown>
type EventCallback = (data?: EventData) => void;

export const useEventStore = defineStore("events", () => {
  const events = ref<Record<string, EventCallback[]>>({});

  const subscribe = (name: string, cb: EventCallback) => {
    console.log(name, cb);
    if (!events.value[name]) {
      events.value[name] = [];
    }
    events.value[name].push(cb);

    console.log(events.value);
  };

  const dispatch = (name: string, data?: EventData) => {
        if(!events.value[name]) return;
        for (const eventsCb of events.value[name])
          eventsCb(data);
  };

  return {
    events,
    subscribe,
    dispatch,
  };
});