<template>
  <div class="aboutorder">
    <div class="item">
      <span class="detail-label">是否与订单有关 :</span>
      <span class="detail-text">
        <a-switch checkedChildren="是" unCheckedChildren="否" disabled :defaultChecked="switchValue"/>
      </span>
    </div>
    <div class="item" v-if="id">
      <span class="detail-label">运单编号 :</span>
      <span class="detail-text">{{id}}</span>
    </div>
  </div>
</template>

<script >
export default {
  name: 'ComplaintDetailFormOrder',
  data() {
    return {}
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  computed: {
    switchValue() {
      return !!this.id
    }
  }
}
</script>
<style lang="less" scoped>
.aboutorder {
  width: 100%;
  .item {
    display: inline-block;
    width: 50%;
  }
  .detail-label {
    display: inline-block;
    color: #999;
    width: 120px;
  }
}
</style>
