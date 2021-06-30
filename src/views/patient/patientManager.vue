<template>
  <div class="managerFather">
    <div class="img-contanier">
      <div class="pic-flex-wrap">
        <div
          class="img-wrap"
          v-for="(img, index) in formData.qualificaImgs"
          :key="index"
        >
          <img :src="img" alt="" class="item-img" />
          <div class="delete-btn-wrap">
            <el-button type="text" @click="deleteImg(index)"
              ><i class="el-icon-error delete-icon"></i
            ></el-button>
          </div>
        </div>
        <UploadImg
          class="img-btn"
          v-if="formData.qualificaImgs.length < 9"
          @addImg="addImg"
          :hasCount="formData.qualificaImgs.length"
        ></UploadImg>
      </div>
    </div>
  </div>
</template>

<script>
import UploadImg from '../../components/uploadImg.vue'
export default {
  data() {
    return {
      show: true,
      formData: {
        name: '',
        type: 1,
        email: '',
        unitName: '',
        customerPhone: '',
        organContactsReqs: [
          {
            contactsName: '',
            contactsPhone: '',
          },
        ],
        organOperatorReqs: [],
        qualificaImgs: [],
      },
    }
  },
  //部件
  components: {UploadImg},
  //静态
  props: {},
  //对象内部的属性监听，也叫深度监听
  watch: {},
  //属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；
  computed: {},
  //方法表示一个具体的操作，主要书写业务逻辑；
  methods: {
    deleteImg(index) {
      this.formData.qualificaImgs.splice(index, 1)
    },
    addImg(imgUrl) {
      this.formData.qualificaImgs.push(imgUrl)
    },
  },
  //请求数据
  created() {},
  mounted() {},
}
</script>

<style lang="scss" scoped>
.managerFather {
  width: 100%;

  .img-contanier {
    display: flex;

    .pic-flex-wrap {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      .img-wrap {
        width: 120px;
        height: 120px;
        border: 1px solid #eee;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        position: relative;
        .delete-btn-wrap {
          visibility: hidden;
        }
        &:hover .delete-btn-wrap {
          visibility: visible;
        }
        .item-img {
          width: 120px;
          max-width: 120px;
          height: 120px;
          max-height: 120px;
          vertical-align: middle;
        }
        .delete-icon {
          position: absolute;
          color: red;
          top: -5px;
          right: -5px;
          font-size: 20px;
        }
      }
    }

    .img-btn {
      width: 120px;
      height: 120px;
      line-height: 120px;
      border: 1px dashed #ccc;
      color: #ccc;
      font-size: 40px;
    }
  }
}
</style>
