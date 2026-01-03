export default defineNuxtPlugin((nuxtApp) => {
  const toast = useToast();

  nuxtApp.hook("vue:error", (err: unknown) => {
    const castErr = err as {
      statusMessage: string;
      message: string;
      data?: { message: string };
    };
    const { statusMessage, message, data } = castErr;

    let errMessage = message;
    if (data && data?.message) {
      errMessage = data.message;
    }
    console.error(err);

    toast.add({
      title: statusMessage,
      description: errMessage,
      color: "error",
    });
  });
});
