<template>
  <div>
    <H2>{{ post.title }}</H2>
    <p><a-button @click="clickEdit"> 编辑</a-button></p>
    <article>
      {{ post.body }}
    </article>
  </div>
</template>

<script lang="ts">
import axios from "axios";

import { defineComponent, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const post = reactive({
      title: "",
      body: "",
    });

    onMounted(() => {
      console.log(route.params);
      const { id } = route.params;
      axios.get(`/api/post/${id}`).then((res) => {
        console.log(res.data);
        if (!res.data.code) {
          const { title, body, createdAt } = res.data.data;

          (post.title = title), (post.body = body);
        }
      });
    });

    const clickEdit = () => {
        const { id } = route.params;
        router.push(`/post?id=${id}`)
    };

    return {
      post,
      clickEdit,
    };
  },
});
</script>

<style scoped>
</style>