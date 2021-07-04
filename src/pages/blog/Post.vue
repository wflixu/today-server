<template>
  <div>
    <h2>请输入内容</h2>
    <span>title:</span>
    <a-input type="text" :value="title" @input="onChangeTitle" />
    <textarea
      name=""
      id=""
      :value="post"
      @input="onInput"
      cols="30"
      rows="10"
    ></textarea>

    <a-button @click="save">保存</a-button>
    <ul>
      <li v-for="item in postList" :key="item._id">
        <span>{{ item.title }}</span>
        <span>{{ item.createdAt }}</span>
        <a-button @click="deletePost(item)">删除</a-button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";

export interface Post {
  title: string;
  body: string;
  _id: string;
  [key: string]: any;
}

export default defineComponent({
  setup() {
    let post = ref("");
    let title = ref("");

    let postList = ref([]);
    const route = useRoute();

    const updatePost = () => {
      let {id} = route.query;
      let param = {
        title: title.value,
        body: post.value,
      };
      axios.put(`/api/post/${id}`, param).then((res) => {
        console.log(res);
      });
    };

    const save = () => {
      if (route.query?.id) {
        updatePost();
      } else {
        console.log(post.value);
        let param = {
          title: title.value,
          body: post.value,
        };
        axios.post("/api/post", param).then((res) => {
          console.log(res);
        });
      }
    };
    const onInput = (event: InputEvent) => {
      console.log(event.target?.value);
      post.value = event.target?.value;
    };
    const onChangeTitle = (event: InputEvent) => {
      title.value = event.target.value;
    };

    onMounted(() => {
      let { id } = route.query;

      if (id) {
        axios.get(`/api/post/${id}`).then((res) => {
          console.log(res.data);
          if (!res.data.code) {
            const { title: titlev, body, createdAt } = res.data.data;
            title.value = titlev;
            post.value = body;
          }
        });
      }
      let param = {};

      axios.get("/api/post", param).then((res) => {
        console.log(res);
        if (res.status == 200) {
          postList.value = res.data.data?.list as Array<Post>;
        }
      });
    });

    const deletePost = (item: Post) => {
      axios.delete(`/api/post/${item._id}`).then((res) => {
        console.log(res);
      });
    };

    return {
      post,
      title,
      onChangeTitle,
      onInput,
      save,

      postList,
      deletePost,
    };
  },
});
</script>

<style scoped>
</style>