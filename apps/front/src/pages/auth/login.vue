<template>
  <div>
    <div>
      <h1>Welcome to the login page</h1>
      <form @submit.prevent.stop="submitAuthenticateUser">
        <div>
          <label for="email">Email</label>
          <input v-model="username" name="email" type="text" />
        </div>
        <div>
          <label for="password">Password</label>
          <input v-model="password" name="password" type="password" />
        </div>
        <button type="submit">Log-in</button>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useAuthUser } from "~/store/auth";
import { AppFetch } from "~/types/AppFetch";

definePageMeta({
  layout: "anonymous",
});

const authStore = useAuthUser();
/**
 *
 *  If we’re using ref or reactive to store our state, they don’t get saved and passed along.
 * So when the client is booted up, they don’t have any value and we need to rerun our setup
 * code on the client.
 *
 *   Normally, this is fine.
 * It only becomes an issue when your ref relies on state from the server,
 * such as a header from the request, or data fetched during the server-rendering process.
 * * */
const username = ref("");
const password = ref("");
const { $appFetch }: { $appFetch: AppFetch<any> } = useNuxtApp();
const submitAuthenticateUser = async () => {
  try {
    await authStore.authenticateUser(username.value, password.value, $appFetch);
    await navigateTo("/");
  } catch (e: any) {
    window.alert("Bad credentials");
  }
};
</script>
