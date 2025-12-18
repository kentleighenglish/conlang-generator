export default defineNuxtPlugin((nuxtApp) => {
  const toast = useToast();

  nuxtApp.hook("vue:error", (err: unknown) => {
    const castErr = err as {
      statusMessage: string;
      message: string;
      data?: { message: string };
    };
    const { statusMessage, message, data } = castErr;

    toast.add({
      title: statusMessage,
      description: (data as { message: string }).message ?? message,
      color: "error",
    });
  });
});
