<template>
  <div class="uploadImg">
    <el-upload
      :http-request="upload"
      :headers="headers"
      :multiple="false"
      :limit="limitCount"
      accept="image/*"
      class="avatar-uploader"
      :action="action"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :on-exceed="exceedImgs"
    >
      <i class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'uploadImg',
  props: {
    limit: {
      type: Number,
      default: 9,
    },
    hasCount: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    limitCount() {
      return this.limit
    },
  },
  data() {
    return {
      action: 'uploadFileWeb',
      data: {
        type: 'patient',
      },
      name: 'imageUrl',
      imageUrl: '',
      headers: {},
    }
  },
  methods: {
    exceedImgs() {
      this.$message.warning('图片数量超过最大限制, 请重新选择')
    },
    beforeAvatarUpload(file) {
      // 文件大小 
      const isLt1M = file.size / 1024 / 1024 < 5
      if (!isLt1M) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
      }
    },
    upload(file) {
      const isLt5M = file.file.size / 1024 / 1024 < 5
      if (isLt5M) {
        const formData = new FormData()
        formData.append('file', file.file)
        formData.append('type', 'patient')
        // 这里方法用async 然后请求网络用await的话，也可以拿到数据像login里一样。通过axio的then同样可以拿到
        // var res = await this.$Http.uploadFiles(formData)
        this.$Http.uploadFiles(formData).then((res) => {
          console.log(res.code)
          if (res.code === 0) {
            this.imageUrl = res.data;
            this.$emit("addImg", this.imageUrl);
          } else {
            this.$message.error('上传图片失败~')
          }
        });


      }
    },
  },
  mounted() {
    this.headers.Authorization = localStorage.getItem('COBRAIN_ADMIN_TK')
  },
}
</script>

<style scope lang="scss">
.uploadImg {
  .avatar-uploader {
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    text-align: center;
  }
  .el-upload {
    width: 100%;
  }
}
</style>
