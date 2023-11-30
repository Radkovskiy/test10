import axios from "axios"

const instance = axios.create({
    baseURL: 'https://api.xpro.com.ua/',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
})

export const get_products_all = async () => {
    try {
        const data = await instance.get(`product`)
        return data
    } catch (error) {
        console.log(error);
    }
}

export const post_products_all = async (body) => {
    console.log('body :>> ', body);

    try {
        const data = await instance.post(`product`, { test_id: '10', ...body })
        return data
    } catch (error) {
        console.log(error);
    }
}

export const delete_product = async (body) => {
    try {
        const data = await instance.delete(`product`, { test_id: '10', ...body })
        return data
    } catch (error) {
        console.log(error);

    }
}

export const patch_product = async (body) => {
    try {
        const data = await instance.patch(`product`, { test_id: '10', ...body })
        return data
    } catch (error) {
        console.log(error);

    }
}
