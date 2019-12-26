<template>
  <div class="structure-wrapper">
    <a-button type="primary" class="manage-btn" @click="handleCloseForm">管理</a-button>
    <a-tree :treeData="siteTree" @select="onSelect" :autoExpandParent="true"></a-tree>
    <struct-manage :visible="editorVisible" @close="handleCloseForm"/>
  </div>
</template>
<script>
import StructManage from './struct-manage'
import { mapGetters } from 'vuex'

export default {
  name: 'StructureDetail',
  data() {
    return {
      editorVisible: false
    }
  },
  computed: {
    ...mapGetters(['siteTree'])
  },
  mounted() {
    setTimeout(() => {
      const [site] = this.siteTree
      console.log('site.id', this.siteTree)
       this.$emit('select', site.id)
    },500)

  },
  methods: {
    onSelect(selectedKeys, info) {
      const [id] = selectedKeys
      if (id) {
        this.$emit('select', id)
      }
    },
    handleCloseForm() {
      this.editorVisible = !this.editorVisible
    }
  },
  components: {
    StructManage
  }
}
</script>

<style lang="less" scoped>
.structure-wrapper {
  position: relative;
  padding: 10px;
  border: 1px solid #ddd;
  min-height: 400px;
  .manage-btn {
    position: absolute;
    top: 10px;
    right: 20px;
  }
}
</style>