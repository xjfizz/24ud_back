/* eslint-disable space-before-function-paren */
export default {
  functional: true,
  name: 'c-select',
  render(h, context) {
    const { component, ...props } = context.data.attrs.options
    const { prop, options, style } = props
    const decorator = [prop]
    const styleObj = Object.assign({ width: '200px' }, style)
    const Props = {
      allowClear: true,
      options,
      ...props
    }
    return <a-select {...{ props: Props }} v-decorator={decorator} style={styleObj} />
  }
}
