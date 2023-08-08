import { useAuthUser } from "~/store/auth";

export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthUser();
  // We refresh the data information
  // If the syncMe result in a 401, the component RedirectToLogin will be triggered,
  // so no need to wait the sync
  logger.info("------ in middleware");
  const mePromise = authStore.syncMe();
  await mePromise;
});
