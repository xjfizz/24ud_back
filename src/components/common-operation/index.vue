<template>
  <div class="btns-container">
    <template v-for="btn in btns">
      <!-- <template v-if="btn.slot">
        <slot :name="btn.slot" :row="row"/>
      </template>-->
      <component
        @trigger="handleAction"
        :is="btn.component"
        :btn="btn"
        :row="row"
        :key="btn.title"
        :type="btn.color"
        :icon="btn.icon"
        class="btn"
        @click="handleAction(row, btn)"
      >{{btn.title}}</component>
    </template>
  </div>
</template>

<script>
import sDelete from './delete'

export default {
  name: 'CommonOperation',
  props: {
    operations: {
      type: Object,
      default: () => {}
    },
    row: {
      type: Object
    }
  },
  computed: {
    relation() {},
    btns() {
      const { row, operations } = this
      const { content, relation, filters } = operations
      const st = row[relation]
      const btns = relation
        ? content.filter(items => {
            return items.relation.includes(st)
          })
        : content

      const btnsFilters = btns.filter(item => {
        const { filter } = item
        return typeof filter === 'function' ? filter(row) : true
      })

      return btnsFilters.map(item => (item.component ? item : { ...item, component: 'a' }))
    }
  },
  methods: {
    handleAction(row, action) {
      this.$emit('row-action', row, action)
    }
  },
  components: {
    sDelete
  }
}
</script>

<style lang='less' scope>
.btns-container {
  a {
    display: inline-block;
    margin: 0 5px;
    padding: 2px;
    color: #1890ff;
    &:hover {
      color: #40a9ff;
      text-decoration: none;
    }
    // &+a{
    //   border-left: 1px solid #999;
    // }
  }
}
</style>
