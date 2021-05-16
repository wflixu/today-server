<template>
  <div class="h-full flex w-full">
    <div class="left  flex-1">
       <input type="text">
       <button>
           submit
       </button>
    </div>
    <div class="right flex-1 border p-5 ">
       {{
           res
       }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  setup() {
    let res = reactive({
    
    });
    return {
      res
    };
  },
});
</script>

<style scoped></style>
