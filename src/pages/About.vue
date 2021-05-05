<template>
  <h1>about</h1>
</template>
<script lang="ts">
import { ref, defineComponent } from "vue";
export default defineComponent({
  name: "app-about",
  props: {},
  setup: () => {
    const count = ref(0);
    return { count };
  },
});
</script>
<style scoped>
</style>