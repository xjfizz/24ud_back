import axios from 'axios'

const url = 'https://restapi.amap.com/v3/config/district'
const key = '7ddad78b66d8b776a0457d24579151ea'

export const getDistrict = (params) => axios.get(url, {
  params: {
    key,
    ...params
  }
}).then(res => {
  console.log(res)
  const {
    districts,
    status
  } = res.data
  if (status === 200) {
    res(districts)
  }
})
