<template>
  <main>
    <div class="container-fluid">
      <h1 class="mt-4">Sửa món ăn</h1>
      <ol class="breadcrumb mb-4">
        <li class="breadcrumb-item active">Dashboard</li>
      </ol>

      <div class="mb-4">
       

        <el-tabs tab-position="top">
            <el-tab-pane label="Sửa món chính">
                <p>Chọn slug</p>
                <el-select v-model="valueFood" placeholder="Select" @change="slugFood()" >
                    <el-option v-for="(item, index) in this.$store.state.allSlug" :key="index" :label="item.product_slug" :value="item.product_slug"></el-option>
                </el-select>
                <el-form ref="inforFood"  v-for="(item, index) in product" :key="index">
                   
                    <el-form-item label=" tên món ăn">
                        <el-input v-model="item.product_name"></el-input>
                    </el-form-item>
                    <el-form-item label=" giá">
                        <el-input v-model="item.product_price"></el-input>
                    </el-form-item>
                    <el-form-item label=" mô tả">
                        <el-input type="textarea" :rows="4" v-model="item.product_description"></el-input>
                    </el-form-item>
                </el-form>
                <!-- <el-button type="primary" @click="uploadFood(inforFood)">Thêm món ăn</el-button> -->
            </el-tab-pane>
            <el-tab-pane label="Sửa nguyên liệu">
                <p>Chọn slug</p>
                <el-select v-model="valueMaterial" placeholder="Select" @change="slugMaterial()" style="margin-bottom: 10px;">
                    <el-option v-for="(item, index) in this.$store.state.slugMaterial" :key="index" :label="item" :value="item"></el-option>
                </el-select>
                <table
                    class="table table-bordered"
                    id="dataTable"
                    width="100%"
                    cellspacing="0"
                    v-if="valueMaterial != 0"
                    >
                    <thead>
                        <tr style="font-size: 14px">
                            <th>STT</th>
                            <th>Tên thể loại</th>
                            <th>Số lượng</th>
                            <th>Đơn vị</th>
                            <th>Tùy chọn</th>
                        </tr>
                    </thead>

                    <tbody
                        v-for="(item, index) in materials" :key="'b' + index"
                    >
                        <tr style="font-size: 12px">
                            <td>{{ index + 1 }}</td>
                            <td>
                                <el-input v-model="item.materials_name"></el-input>
                            </td>
                             <td>
                                <el-input v-model="item.materials_amount"></el-input>
                            </td>
                             <td>
                                <el-input v-model="item.materials_unit"></el-input>
                            </td>
                            <td>
                                <el-button type="primary" >Sửa thể loại</el-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <!-- <el-button type="primary">Thêm nguyên liệu</el-button> -->
            </el-tab-pane>
            <el-tab-pane label="Sửa thể loại">
                <p>Chọn slug</p>
                <el-select v-model="valueCategory" placeholder="Select" @change="slugCategory()" style="margin-bottom: 10px;">
                    <el-option v-for="(item, index) in this.$store.state.slugCategory" :key="index" :label="item" :value="item"></el-option>
                </el-select>
               
                <table
                    class="table table-bordered"
                    id="dataTable"
                    width="100%"
                    cellspacing="0"
                    v-if="valueCategory != 0"
                    >
                    <thead>
                        <tr style="font-size: 14px">
                            <th>STT</th>
                            <th>Tên thể loại</th>
                            <th>Tùy chọn</th>
                        </tr>
                    </thead>

                    <tbody
                        v-for="(item, index) in category" :key="'b' + index"
                    >
                        <tr style="font-size: 12px">
                            <td>{{ index + 1 }}</td>
                            <td>
                                <el-input v-model="item.category_name"></el-input>
                            </td>
                            <td>
                                <el-button type="primary" >Sửa thể loại</el-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
               
            </el-tab-pane>
            <el-tab-pane label="Sửa ảnh">
                <el-form>
                    <el-form-item label="Chọn slug món ăn">
                        <el-select v-model="value" placeholder="Select">
                            <el-option v-for="(item, index) in this.$store.state.allSlug" :key="index" :label="item.product_slug" :value="item.product_slug"></el-option>
                        </el-select>
                    </el-form-item>
                    
                    <!-- <el-button type="primary" @click="onUpload()">Thêm ảnh</el-button> -->
                </el-form>
          
            </el-tab-pane>
        </el-tabs>
        
      </div>
    </div>
  </main>
</template>

<script>
import Axios from 'axios'
import Vue from 'vue'
import ElementUI from 'element-ui'
Vue.use(ElementUI)
export default {
    data() {
        return {
            product: [],
            category: [],
            materials: [],
            valueFood:'',
            valueMaterial:'',
            valueCategory:'',
             inforFood:{
                name:'',
                price: 0,
                desciption: '',
                category:''
            },
            fileList:[],
            picture: null,
        }
    },
    created() {
        this.$store.dispatch("AllSlug", {
            url: "http://localhost:8080/apiDTfood/public/api/v1/slugFoods"
        });
        this.$store.dispatch("SlugCategory", {
            url: "http://localhost:8080/apiDTfood/public/api/v1/slugCategory"
        });
        this.$store.dispatch("SlugMaterial", {
            url: "http://localhost:8080/apiDTfood/public/api/v1/slugMaterials"
        });
    },
    methods: {
        slugFood(){
            Axios.get(`http://localhost:8080/apiDTfood/public/api/v1/productDetail/${this.valueFood}`)
            .then(res => this.product = res.data)
            .catch(err => console.log(err))
        },
        slugCategory(){
            Axios.get(`http://localhost:8080/apiDTfood/public/api/v1/getCategory/${this.valueCategory}`)
            .then(res => this.category = res.data)
            .catch(err => console.log(err))
        },
        slugMaterial(){
            Axios.get(`http://localhost:8080/apiDTfood/public/api/v1/getMaterialfollowSlug/${this.valueMaterial}`)
            .then(res => this.materials = res.data)
            .catch(err => console.log(err))
        }
    },
}
</script>

<style>
@import url("//unpkg.com/element-ui@2.14.1/lib/theme-chalk/index.css");

</style>