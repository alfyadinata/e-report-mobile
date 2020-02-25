import React from 'react'
import Axios from 'axios'

const baseApi   =   Axios.create({
    baseURL: `http://10.236.247.82:5000`
})

export default baseApi