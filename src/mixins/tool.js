export default {
  computed: {
    styleObj () {
      const {
        width = '100'
      } = this.option
      return {
        width: `${width}px`
      }
    }
  }
}
