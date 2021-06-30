<template>
  <div class="organMgt">
    <el-card style="margin-bottom: 15px">
      <el-form :inline="true">
        <el-form-item label="关键字">
          <el-input
            placeholder="请输入客户名称进行搜索"
            style="width: 240px"
            v-model="searchForm.name"
          ></el-input>
        </el-form-item>

        <el-form-item label="客户类型">
          <el-select v-model="searchForm.type">
            <el-option
              v-for="(item, index) in auditStatusOption"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="fr">
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">重置</el-button>
          <el-button type="warning" @click="goEdit">添加客户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-table border :data="list">
        <el-table-column label="创建时间" prop="creatTime"></el-table-column>
        <el-table-column label="客户ID" prop="id"></el-table-column>
        <el-table-column label="客户名称" prop="name"></el-table-column>
        <el-table-column label="客户类型">
          <template #default="scope">
            {{ scope.row.type == 1 ? '组织机构' : '个人' }}
          </template>
        </el-table-column>
        <el-table-column label="联系人">
          <template #default="scope">
            {{
              scope.row.organContactsResps[0]
                ? scope.row.organContactsResps[0].contactsName
                : 'empty'
            }}
          </template>
        </el-table-column>
        <el-table-column label="手机号">
          <template #default="scope">
            {{
              scope.row.organContactsResps[0]
                ? scope.row.organContactsResps[0].contactsPhone
                : 'empty'
            }}
          </template>
        </el-table-column>
        <el-table-column label="我司负责人">
          <template #default="scope">
            {{
              scope.row.organOperatorResps[0]
                ? scope.row.organOperatorResps[0].operatorName
                : 'empty'
            }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="text" @click="goDetail(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination
        :pagiParams="pagiParams"
        @change="getList"
        style="text-align: right; margin-top: 10px"
      ></Pagination>
    </el-card>
  </div>
</template>

<script>
import Pagination from '@/components/pagination'
import axios from 'axios'

export default {
  //部件
  components: { Pagination },
  data() {
    return {
      searchForm: {
        type: 0,
        name: '',
      },
      auditStatusOption: [
        { label: '全部', value: 0 },
        { label: '组织机构', value: 1 },
        { label: '个人', value: 2 },
      ],
      pagiParams: {
        pageNumber: 1,
        pageSize: 10,
        total: 0,
      },
      list: [],
    }
  },
  //静态
  props: {},
  //对象内部的属性监听，也叫深度监听
  watch: {},
  //属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；
  computed: {},
  //方法表示一个具体的操作，主要书写业务逻辑；
  methods: {
    // goPatientEditor() {
    //   this.$router.push('/patientMessageEditor')
    // },
    search() {
      // this.pagiParams.pageNumber = 1
      // this.getList()
      this.$message.warning('此功能暂未开发')
    },
    getListBySizePage(pageNumber, pageSize) {
      this.pagiParams.pageNumber = pageNumber
      this.pagiParams.pageSize = pageSize
      this.getList()
    },
    getList() {
      let data = JSON.parse(JSON.stringify(this.searchForm))
      if (this.searchForm.type == 0) {
        delete data.type
      }

      data.pageNumber = this.pagiParams.pageNumber
      data.pageSize = this.pagiParams.pageSize
      // api.getOrganList(data).then((res) => {
      //   if (!res.code) {
      //     this.list = res.data.list;
      //     this.pagiParams.total = res.data.totalCount;
      //   }
      // });

      //这里暂时用axios模仿联网请求，到时候把import取消掉
      axios.get('/js/data.json').then(
        (res) => {
          this.list = res.data.data.list
          this.pagiParams.total = res.data.data.totalCount
        },
        (res) => {
          console.log('error')
        }
      )
    },
    goDetail({ id }) {
      this.$router.push('/patientMessageEditor')
      // this.$router.push(`/organMgt/${id}`)
    },
    reset() {
      this.searchForm = JSON.parse(this._searchForm)
    },
    goEdit() {
      this.$message.warning('此功能暂未开发')
    },
  },
  //请求数据
  created() {},
  mounted() {
    this._searchForm = JSON.stringify(this.searchForm)
    this.getList()
  },
}
</script>

<style scoped>
.organMgt {
  width: 100%;
}
</style>
