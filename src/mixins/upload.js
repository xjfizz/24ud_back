/* eslint-disable space-before-function-paren */
export default {
  computed: {
    uploadUrl() {
      const {
        row,
        url
      } = this
      return `/api${url}/${row.id}/upload`
    }
  }
}
