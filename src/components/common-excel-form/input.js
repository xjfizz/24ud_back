/* eslint-disable space-before-function-paren */
export default {
  functional: true,
  name: 'c-input',
  render(h, context) {
    const { component, ...props } = context.data.attrs.options
    const { prop } = props
    const decorator = [prop]
    return <a-input {...{ props }} v-decorator={decorator} />
  }
}
