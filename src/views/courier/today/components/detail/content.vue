<template>
  <section class="detail-wrapper">
    <dl class="detail-item">
      <dt class="detail-item-title">基本信息</dt>
      <dd>
        <span class="detail-label">姓名及电话</span>
        <span class="detail-text">{{row.name}} {{row.phone}}</span>
      </dd>
      <dd>
        <span class="detail-label">身份证号</span>
        <span class="detail-text">{{row.identity}}</span>
      </dd>
      <dd>
        <span class="detail-label">紧急联系人电话</span>
        <span class="detail-text">{{row.emergencyPeople}}</span>
      </dd>
      <template v-if="row.type === 0">
        <dd>
          <span class="detail-label">所属站点</span>
          <span class="detail-text">{{row.courier.branches }}</span> <!-- | formatId2Label(id2labels)  -->
        </dd>
<!--        <dd>-->
<!--          <span class="detail-label">所属区域</span>-->
<!--          <span class="detail-text">{{row.courier.area }}</span> &lt;!&ndash; | formatId2Label(id2labels) &ndash;&gt;-->
<!--        </dd>-->
      </template>
      <template v-else>
        <dd>
          <span class="detail-label">家庭住址</span>
          <span class="detail-text">{{row.timelyCourier.address}}</span>
        </dd>
      </template>
      <dd>
        <span class="detail-label">最近登录时间</span>
        <span class="detail-text">{{row.loginTime}}</span>
      </dd>
      <dd>
        <span class="detail-label">注册时间</span>
        <span class="detail-text">{{row.createTime}}</span>
      </dd>
    </dl>
  </section>
</template>

<script >
export default {
  name: 'CourierDetailContent',
  data() {
    return {}
  },
  props: {
    row: {
      type: Object,
      default: () => {}
    },
    id2labels: {
      type: Object,
      default: () => {}
    }
  },
  filters: {
    formatId2Label(id, labels) {
      return id ? labels[id] : '--'
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
  min-height: 300px;
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
    width: 120px;
  }
  .detail-text {
    flex: 1;
    font-weight: bold;
    color: #7e7e84;
  }
}
</style>
