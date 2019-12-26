<template>
  <div class="structure-wrapper">
    <a-tree :treeData="siteTree" :autoExpandParent="true">
      <div
        v-for="node in areaList"
        :key="node.key"
        class="node-item"
        :slot="node.key"
        @click="handleCilck(node)"
      >{{node.title}}</div>
    </a-tree>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'StructureMap',
  data() {
    return {
      treeData: [],
      treeList: []
    }
  },
  computed: {
    ...mapGetters(['siteTree', 'areaList'])
  },
  methods: {
    handleCilck(e) {
      const { pid } = e
      // if (!pid) return
      console.log('handleCilck', e)
      this.$emit('select', e)
    },
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
