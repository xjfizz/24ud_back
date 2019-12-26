<template>
  <section class="modules-wrapper">
    <span class="cate-label" v-if="modules.label">{{ modules.label }}:</span>
    <a-radio-group :value="currentState" buttonStyle="solid">
      <template v-for="item in modules.children">
        <template v-if="item.slot">
          <slot :name="item.slot" :content="item"/>
        </template>
        <!-- <template v-else-if="item.aliasValue">
          <a-radio-button :value="item.value"  :key="item.value" @click="handleChange(item)">{{item.label}}</a-radio-button>
        </template> -->
        <template v-else>
          <a-radio-button
            :key="item.value"
            :value="item.value"
            @click="handleChange(item)"
          >{{item.label}}</a-radio-button>
        </template>
      </template>
    </a-radio-group>
  </section>
</template>

<script >
export default {
  name: 'CommonModuleFilter',
  data() {
    return {
      columns: [],
      option: [],
      operations: [],
      currentState: null
    }
  },
  props: {
    setting: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    setting() {
      this.initModule()
    }
  },
  computed: {
    modules() {
      const { modules = {} } = this.setting
      return modules
    }
  },
  mounted() {
    this.initModule()
  },
  methods: {
    initModule() {
      const { modules = {}, ...setting } = this.setting
      this.currentState = modules.defaultValue
      console.log('modules', 'setting', modules, this.setting, this.modules)
      Object.keys(setting).forEach(key => {
        this[key] = this.setting[key]
      })
      const [defaultCate] = this.modules.children
      this.handleChange(defaultCate)
    },
    handleChange(e) {
      const { value, relation, aliasValue } = e
      const param = {}
      this.currentState = value
      param[this.modules.field] = aliasValue ? aliasValue : value
      const options = this.format(relation.options, this.options)
      console.log('relation.columns',relation.columns, this.columns )
      const columns = this.format(relation.columns, this.columns)
      const operations = { ...this.operations, content: this.format(relation.operations, this.operations.content) }
      this.$emit('change-module', param, options, columns, operations)
    },
    format(rules, source) {
      const temp = [...source]
      return temp.filter(item => rules.includes(item.dataIndex || item.field || item.type)).map(item => ({ ...item }))
    }
  }
}
</script>
<style lang="less" scoped>
.modules-wrapper {
  padding-bottom: 20px;
}
.cate-label {
  padding-right: 10px;
}
</style>
