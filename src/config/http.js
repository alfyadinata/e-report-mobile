import React from 'react'
import Axios from 'axios'

const baseApi   =   Axios.create({
    baseURL: `http://192.168.43.136:3000`
})

export default baseApi