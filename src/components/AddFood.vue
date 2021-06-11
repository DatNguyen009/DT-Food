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
                <el-form ref="material" :model="material">
                    <el-form-item label="Chọn slug món ăn">
                        <el-select v-model="value" placeholder="Select">
                            <el-option v-for="(item, index) in this.$store.state.allSlug" :key="index" :label="item.product_slug" :value="item.product_slug"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Nhập tên nguyên liệu">
                        <el-input v-model="material.name"></el-input>
                    </el-form-item>
                    <el-form-item label="Nhập số lượng nguyên liệu">
                        <el-input v-model="material.amount"></el-input>
                    </el-form-item>
                    <el-form-item label="Nhập đơn vị của nguyên liệu">
                        <el-input v-model="material.unit"></el-input>    
                    </el-form-item>
                    <el-form-item label="Chọn ảnh">
                        <el-upload
                            ref="imageMaterial"
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
                </el-form>
                <el-button type="primary" @click="upMaterial()">Thêm nguyên liệu</el-button>
            </el-tab-pane>
            <el-tab-pane label="Thêm thể loại">
                <el-form  ref="inforFood" :model="inforFood">
                    <el-form-item label="Chọn slug món ăn">
                        <el-select v-model="value" placeholder="Select">
                            <el-option v-for="(item, index) in this.$store.state.allSlug" :key="index" :label="item.product_slug" :value="item.product_slug"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Nhập tên thể loại">
                        <el-input v-model="inforFood.category"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" @click="upCategory()">Thêm thể loại</el-button>
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
                desciption: '',
                category:''
            },
            material:{
                name: '',
                amount: 0,
                unit: ''
            },
            value: '',
            fileList:[],
            picture: null,
        }
    },
    props:{
        a:{
            type: String
        }
    },
    created() {
        this.$store.dispatch("AllSlug", {
            url: "http://localhost:8080/apiDTfood/public/api/v1/uploadFood"
        });
        if (this.a != "qtv") {
            this.$router.push({ path: "/admin" });
        }
    },
    methods: {
        uploadFood(inforFood){
            Axios.post('http://localhost:8080/apiDTfood/public/api/v1/uploadFood',{
               name: inforFood.name,
               price: inforFood.price,
               description: inforFood.desciption
            })
            .then(res => {
                if (res.data == "success") {
                    this.$notify({
                        type: 'success',
                        message: 'Thêm sản phẩm thành công!!!',
                        title: 'Thành công',
                        position: 'top-right',
                    })
                    this.inforFood.name = "";
                    this.inforFood.price = 0;
                    this.inforFood.desciption = "";
                }
            })
            .catch(() => {
                this.$notify({
                    type: 'error',
                    message: 'Thêm sản phẩm thất bại!!!',
                    title: 'Thất bại',
                    position: 'top-left',
                })
            })
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

        upMaterial(){
            if (this.value == '') {
                this.$message({
                    type:'error',
                    message:'Vui lòng chọn slug'
                })
            } else {
                this.picture=null;
                const storageRef =  firebase.storage().ref(`material/${this.$refs.imageMaterial.uploadFiles[0].name}`).put(this.$refs.imageMaterial.uploadFiles[0].raw);
                storageRef.on(`state_changed`,snapshot=>{
                    this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                }, error=>{console.log(error.message)},
                ()=>{this.uploadValue=100;
                    new Promise(function(resolve){
                        storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                            resolve(url)
                        });
                        
                    })
                    .then(res => {
                        Axios.post("http://localhost:8080/apiDTfood/public/api/v1/postMaterial", {
                            slug: this.value,
                            name: this.material.name,
                            amount: this.material.amount,
                            unit: this.material.unit,
                            image_url: res
                        })
                        .then(res => {
                            if (res.data == "success") {
                                this.$notify({
                                    type: 'success',
                                    message: 'Thêm nguyên liệu thành công!!!',
                                    title: 'Thành công',
                                    position: 'top-right',
                                })
                            }
                        })
                        .catch(() => {
                            this.$notify({
                                type: 'error',
                                message: 'Thêm nguyên liệu thất bại!!!',
                                title: 'Thất bại',
                                position: 'top-left',
                            })
                        })
                    })
                    
                }
                );

                        
            }
        },
       
        onUpload()
        {  

            if (this.value == '') {
                this.$message({
                    type:'error',
                    message:'Vui lòng chọn slug'
                })
            } else {
                this.picture=null;
                const storageRef =  firebase.storage().ref(`dt-food/${this.$refs.file.uploadFiles[0].name}`).put(this.$refs.file.uploadFiles[0].raw);
                storageRef.on(`state_changed`,snapshot=>{
                    this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                }, error=>{console.log(error.message)},
                ()=>{this.uploadValue=100;
                    new Promise(function(resolve){
                        storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                            resolve(url)
                        });
                        
                    })
                    .then(res => {
                        Axios.post("http://localhost:8080/apiDTfood/public/api/v1/postImage", {
                            image_url: res,
                            slug: this.value
                        })
                        .then(res => {
                            if (res.data == "success") {
                                this.$notify({
                                    type: 'success',
                                    message: 'Thêm sản phẩm thành công!!!',
                                    title: 'Thành công',
                                    position: 'top-right',
                                })
                            }
                        })
                        .catch(() => {
                            this.$notify({
                                type: 'error',
                                message: 'Thêm sản phẩm thất bại!!!',
                                title: 'Thất bại',
                                position: 'top-left',
                            })
                        })
                    })
                    
                }
                );
            }
        },
        upCategory()
        {
            if (this.value == '') {
                this.$message({
                    type:'error',
                    message:'Vui lòng chọn slug'
                })
            }
            else{
                if (this.inforFood.category == '') {
                    this.$message({
                        type:'error',
                        message:'Vui lòng nhập thể loại'
                    })
                }
                else{
                    Axios.post("http://localhost:8080/apiDTfood/public/api/v1/postCategory", {
                        category_name: this.inforFood.category,
                        slug: this.value
                    })
                    .then(res => {
                        if (res.data == "success") {
                            this.$notify({
                                type: 'success',
                                message: 'Thêm sản phẩm thành công!!!',
                                title: 'Thành công',
                                position: 'top-right',
                            })
                            this.value = "";
                            this.inforFood.category ="";
                        }
                    })
                    .catch(() => {
                        this.$notify({
                            type: 'error',
                            message: 'Thêm sản phẩm thất bại!!!',
                            title: 'Thất bại',
                            position: 'top-left',
                        })
                    })
                    
                }   
            }
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