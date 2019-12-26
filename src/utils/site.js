/**
 * 将返回数据转化成 a-tree 可以使用的格式
 *
 * @param {*} data
 * @returns
 */
export const formatDataTree = (data, isTree) => {
  return data.map(item => {
    const { id } = item
    const children = formatDataTree(item.children || [])
    // return {
    //   title: item.label,
    //   slots: {
    //     title: id
    //   },
    //   key: id,
    //   ...item,
    //   children,
    //   value: id
    // }
      return {
          title: item.name,
          slots: {
              title: id
          },
          key: id,
          ...item,
          children,
          value: id
      }
  })
}

export const formatSiteDataTree = data => {
    console.log('data',data)
  return data.map(item => {
    const { id, level } = item
    const children = level === 4 ? [] : formatSiteDataTree(item.children || [])

    return {
      label: item.name,
      slots: {
          label: id
      },
      key: id,
      ...item,
      children,
      value: id
    }
  })
}
export const formatSiteDataTree5 = data => {
    console.log('data',data)
    return data.map(item => {
        const { id, level } = item
        const children = level === 5 ? [] : formatSiteDataTree5(item.children || [])

        return {
            label: item.name,
            slots: {
                label: id
            },
            key: id,
            ...item,
            children,
            value: id
        }
    })
}

/**
 * 格式化tree数据展平 -> flat
 *
 * @param {Array} tree
 * @returns
 */
export const flatTree = tree => {
  const list = []

  function flat(data) {
    data.forEach(item => {
      const { children = [], ...props } = item
      list.push({
        ...props,
        children
      })
      if (children.length) {
        flat(children)
      }
    })
  }
  flat(tree)
  return list
}

/**
 * 格式化数据展平 ID和lable的映射
 *
 * @param {Array} data
 * @returns
 */
const formatArea = (data, mapLabels) => {
  return data.map(item => {
    const { id, label } = item
    mapLabels[id] = label
    return {
      value: id,
      label
    }
  })
}
export const mapFormat = data => {
  const site2Areas = {}
  const mapLabels = {}
  function formatData(data) {
    return data.map(item => {
      const { label, level, id } = item
      let children = []
      if (level !== 3) {
        children = formatData(item.children || [])
      } else {
        site2Areas[id] = formatArea(item.children || [], mapLabels)
      }
      mapLabels[id] = label
      return {
        label: label,
        id,
        value: id,
        children
      }
    })
  }
  const siteList = formatData(data)
  return {
    siteList,
    mapLabels,
    site2Areas
  }
}
