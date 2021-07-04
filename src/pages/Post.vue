<template lang="">
  <div>
    <div>
        <a-table :dataSource="posts" :columns="columns" >
            <template #action="{record}">
                <a-button @click="linkToDetail(record)">查看</a-button>
                <a-button size="small" @click="onClickDetele(record)" >删除</a-button>
            </template>
          
        </a-table>
    </div>
  </div>
</template>
<script lang="ts">
import { message } from "ant-design-vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import { defineComponent, onMounted, ref } from "vue";
import axios from "axios";
import router from "../../app/router";
import { useRouter } from "vue-router";
interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: string;
  url?: string;
}
interface Post {
  _id: string;
  title: string;
  body: string;
  createdAt:string;
  [key: string]: string;
}

interface FileInfo {
  file: FileItem;
  fileList: FileItem[];
}
export default defineComponent({
  components: {
    UploadOutlined,
  },
  setup() {
    
    const router = useRouter();

    const handleChange = (info: FileInfo) => {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    };

    const fileList = ref([]);
    const getFiles = async()=>{
        let response = await axios.get("/api/post");
        let res = response.data;
        
        if (!res.data.code) {
        
          return res.data.list  as Post[];
        } else {
         return null;
        }
      
    }
    let posts = ref<Post[]>([]);
    onMounted(() => {
       getFiles().then(data=>{
          if(data){
            posts.value = data;
          }
       })
    });



    const columns = [
      {
        title: "id",
        dataIndex: "_id",
        key: "_id",
      },
      {
        title: "文件名",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "操作",
        dataIndex: "action",
        slots: { customRender: 'action' },
      },
      
    ];

    const onClickDetele = (record:Post)=> {
        axios.delete(`/api/post/${record._id}`).then((res) => {
            console.log(res.data);
        if (!res.data.code) {
            getFiles().then(data=>{
                if(data){
                    posts.value = data;
                }
            });
        }
      });
    }
    
    const linkToDetail = (record:Post) =>{
      router.push(`/post/${record._id}`);
    }

    return {
      fileList,
      posts,
      columns,
      onClickDetele,
      headers: {
        authorization: "authorization-text",
      },
      linkToDetail,
      handleChange,
    };
  },
});
</script>
<style lang=""></style>
