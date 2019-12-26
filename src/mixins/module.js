/* eslint-disable indent */
/* eslint-disable space-before-function-paren */

export default {
  data() {
    return {
      moduleType: {}
    }
  },
  watch: {
    moduleType() {
      this.params = {
        ...this.params,
        ...this.moduleType
      }
    }
  },
  methods: {
    handleModuleChange(modules, options, columns, operations) {
        console.log(modules, options, columns, operations)
      this.moduleType = {
        ...modules
      }
      this.params = {
        ...modules
      }
      this.configFilters = []
      this.columns = []
      this.$nextTick(() => {
        this.configFilters = options
        this.columns = columns
      })
      this.operations = operations
    },
    handleFilterChange(params) {
        console.log('params11',params,optionsConfig)
      const {
        setting: optionsConfig
      } = this
      let primaries = {}
      if (optionsConfig.isprimary) {
        primaries = this.filterPrimary(optionsConfig)
      }
      this.params = {
        ...primaries,
        ...this.params,
        ...params
      }
        console.log(this.params);
    },
    filterPrimary(optionsConfig) {
      return optionsConfig.primary.reduce((param, item) => {
        param[item] = ''
        return param
      }, {})
    }
  }
}
