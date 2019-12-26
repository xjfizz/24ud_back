<template>
  <section class="detail-wrapper">
    <template v-for="items in contextList">
      <template v-if="items.children.length">
        <div :key="items.lable" class="items-eapper">
          <dl class="detail-item">
            <dt class="detail-item-title">{{items.label}}</dt>
            <dd
              v-for="item in items.children"
              :key="item.field"
              :class="item.full?'detail-item-full': ''"
            >
              <span class="detail-label">{{item.label}}</span>
              <span class="detail-text">{{item.value}}</span>
            </dd>
          </dl>
        </div>
      </template>
    </template>
  </section>
</template>

<script >
export default {
  name: 'CommonDetailContent',
  data() {
    return {}
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    contextList() {
      const { list } = this
      if (!list.length) return [{ children: [] }]
      return list
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="less" scoped>
.detail-wrapper {
  .items-eapper {
    & + .items-eapper {
      border-top: 1px solid #ddd;
    }
  }
  .detail-item {
    display: flex;
    flex-flow: row wrap;
    dd {
      display: flex;
      width: 50%;
    }
    .detail-item-full {
      width: 100%;
    }
  }
  .detail-item-title {
    width: 100%;
    padding: 5px 0;
    font-size: 18px;
  }
  .detail-label {
    width: 90px;
  }
  .detail-text {
    flex: 1;
  }
}
</style>