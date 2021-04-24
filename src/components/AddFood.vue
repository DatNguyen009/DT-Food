<template>
    <main>
    <div class="container-fluid">
      <h1 class="mt-4">Thêm món ăn</h1>
      <ol class="breadcrumb mb-4">
        <li class="breadcrumb-item active">Dashboard</li>
      </ol>

      <div class="mb-4">
        <el-tabs tab-position="top">
            <el-tab-pane label="Thêm món chính">
                <el-form ref="inforFood" :model="inforFood">
                    <el-form-item label="Nhập tên món ăn">
                        <el-input v-model="inforFood.name"></el-input>
                    </el-form-item>
                    <el-form-item label="Nhập giá">
                        <el-input v-model="inforFood.price"></el-input>
                    </el-form-item>
                    <el-form-item label="Nhập mô tả">
                        <el-input v-model="inforFood.desciption"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" @click="uploadFood(inforFood)">Thêm món ăn</el-button>
            </el-tab-pane>
            <el-tab-pane label="Thêm nguyên liệu">
                <el-form>
                    <el-form-item label="Chọn slug món ăn">
                        <el-select v-model="value" placeholder="Select">
                            <el-option v-for="(item, index) in this.$store.state.allSlug" :key="index" :label="item.product_slug" :value="item.product_slug"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Nhập tên nguyên liệu">
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item label="Nhập số lượng nguyên liệu">
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item label="Nhập đơn vị của nguyên liệu">
                        <el-input></el-input>
                    </el-form-item>
                    
                </el-form>
                <el-button type="primary">Thêm nguyên liệu</el-button>
            </el-tab-pane>
            <el-tab-pane label="Thêm ảnh">
                <el-form>
                    <el-form-item label="Chọn slug món ăn">
                        <el-select v-model="value" placeholder="Select">
                            <el-option v-for="(item, index) in this.$store.state.allSlug" :key="index" :label="item.product_slug" :value="item.product_slug"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Chọn ảnh">
                        <el-upload
                            ref="file"
                            class="upload-demo"
                            action="#"
                             accept="image/*"
                        
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            :limit="1"
                            :on-exceed="handleExceed"
                            :file-list="fileList"
                        
                            :auto-upload="false"
                            >
                        <el-button size="small" type="primary">Click to upload</el-button>
                        <div slot="tip" class="el-upload__tip">file ảnh loại nào cũng được nhá</div>
                        </el-upload>
                     
                    </el-form-item>
                    <el-button type="primary" @click="onUpload()">Thêm ảnh</el-button>
                </el-form>
          
            </el-tab-pane>
        </el-tabs>
        
      </div>
    </div>
  </main>
</template>

<script>
import Axios from 'axios'
import firebase from 'firebase'
import Vue from 'vue'
import ElementUI from 'element-ui'
Vue.use(ElementUI)

export default {
    data() {
        return {
            inforFood:{
                name:'',
                price: 0,
                desciption: ''
            },
            value: '',
            fileList:[],
            picture: null,
        }
    },
    created() {
        this.$store.dispatch("AllSlug", {
            url: "http://localhost:8080/apiDTfood/public/api/v1/uploadFood"
        });

        // var listRef = firebase.storage().ref('test');

        // Find all the prefixes and items.
        //  listRef.listAll()
        // .then((res) => {
        //     res.items.forEach(() => {
        //     // All the items under listRef.
                
        //     });
        // }).catch((error) => {
        //     console.log(error);
        //     // Uh-oh, an error occurred!
        // });

        // firebase.storage().ref().child('test/107931535_647033369502030_7726298956583507912_n.jpg').getDownloadURL()
        // .then((url) => {
           
        //     // Or inserted into an <img> element
        //     var img = document.getElementById('myimg');
        //     console.log(url);
        //     img.setAttribute('src', url);
        // })
        // .catch((error) => {
        //     // Handle any errors
        //     console.log(error);
        // });

    },
    methods: {
        uploadFood(inforFood){
            Axios.post('http://localhost:8080/apiDTfood/public/api/v1/uploadFood',{
               name: inforFood.name,
               price: inforFood.price,
               description: inforFood.desciption
            })
            .then(res => {console.log(res.data);})
            .catch(err => console.log(err))
        },
      
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
      
        handleExceed() {
            this.$message.warning(`Chỉ có thể upload được một sản phẩm!!`);
        },
        beforeRemove(file) {
            return this.$confirm(`Cancel the transfert of ${ file.name } ?`);
        },
      
       
        onUpload()
        {  
            // console.log(this.$refs.file.uploadFiles[0].raw);

            this.picture=null;
            const storageRef=firebase.storage().ref(`dt-food/${this.$refs.file.uploadFiles[0].name}`).put(this.$refs.file.uploadFiles[0].raw);
            storageRef.on(`state_changed`,snapshot=>{
                this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            }, error=>{console.log(error.message)},
            ()=>{this.uploadValue=100;
                storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                    this.picture =url;
                });
            }
            );
        }

       
    },
    components:{
        // 'app-left-nav': LeftNav,

    }
}
</script>

<style lang="scss">
@import '../assets/css/style.css';
@import url("//unpkg.com/element-ui@2.14.1/lib/theme-chalk/index.css");

</style>