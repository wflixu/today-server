<template>
  <div>
    {{ count }}
  </div>
  <div>
    <button @click="add">add</button>
  </div>
  <div>
    <div>
      mobile:
      <input  type="text" :value="mobile" />
    </div>
    <div>
      realName:
      <input type="text" :value="realName" />
    </div>
    <div>
      password
      <input type="text" :value="password" />
    </div>
    <div class="bg-">
      <button @click="login">login</button>
    </div>
  </div>
</template>
 <script lang="ts">
import { ref, defineComponent } from "vue";

import axios from "axios";

export default defineComponent({
  name: "",
  props: {},
  setup: () => {
    const count = ref(0);
    const add = () => {
      count.value++;
    };
    const mobile = ref("13366668888");
    const realName = ref("test-1");
    const password = ref("123");
    const login = () => {
      let data = {
        mobile: mobile.value,
        realName: realName.value,
        password: password.value,
        role:'606b12a332769fddb075fb3b'
      };
      console.log('data',data);
      console.log('sign');
      
      axios
        .post("/api/user", data, {})
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      console.log("login");
    };
    return {
      mobile,
      realName,
      password,
      login,

      count,

      add,
    };
  },
});
</script>
 <style scoped>
</style>