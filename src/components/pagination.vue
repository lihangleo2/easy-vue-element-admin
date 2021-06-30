<template>
  <div class="pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="data.pageNumber"
      :page-sizes="data.limitSelect"
      :page-size="data.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="data.total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  props: {
    pagiParams: {
      type: Object,
      default: function () {
        return {}
      },
    },
  },
  data() {
    return {
      data: {
        pageNumber: 1,
        pageSize: 10,
        limitSelect: [10, 20, 50],
        total: 0,
      },
    }
  },
  watch: {
    'pagiParams.total'(newV) {
      this.data.total = newV
    },
    'pagiParams.pageNumber'(newV) {
      this.data.pageNumber = newV
    },
  },
  methods: {
    handleSizeChange(val) {
      this.data.pageSize = val
      this.emitChange()
    },
    handleCurrentChange(val) {
      this.data.pageNumber = val
      this.emitChange()
    },
    emitChange() {
      this.$emit('change',this.data.pageNumber,this.data.pageSize);
    },
  },
  mounted() {
    Object.assign(this.data, this.pagiParams)
  },
}
</script>

<style scope lang="scss">
</style>
