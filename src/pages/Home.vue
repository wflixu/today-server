<template>
  <div class="t-home min-h-full">
    <div class="boxs bg-gray-50 rounded w-96 mx-auto">
      <div class="card" @click="onClick('/admin')">
        <h3>控制台</h3>
        <p>管理系统</p>
      </div>
      <div class="card" @click="onClick('/test')">
        <h3>api测试</h3>
        <p>api测试</p>
      </div>
      <div class="card" @click="onClick('/login')">
        <h3>login</h3>
        <p>login</p>
      </div>
      <div class="card" @click="onClick('/sign')">
        <h3>sign-</h3>
        <p>sign-</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent } from "vue";
import { useRouter, useRoute } from "vue-router";
export default defineComponent({
  name: "app-home",
  props: {},
  setup: () => {
    const router = useRouter();
    const route = useRoute();
    let token  = window.localStorage.getItem('token');
    if(!token){
      router.push('/login');
    }
    let onClick = (key: string) => {
      router.push(key);
    };
    return {
      onClick,
    };
  },
});
</script>
<style scoped lang="less">
.t-home {
  position: relative;
  background-image: url("./../assets/bg.jpeg");
}
.boxs {
  position: absolute;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 600px;
  height: 600px;
}
.boxs:hover {
  box-shadow: 0 5px 5px #999;
  transition: all 0.2s ease-in-out;
}

.card {
  width: 120px;
  height: 120px;
  border: 1px solid #ddd;
  display: inline-flex;
  flex-direction: column;
  &:hover {
    cursor: pointer;
    box-shadow: 2px 5px 10px #999;
    transition: all 0.2s ease-in-out;
  }
}
</style>
