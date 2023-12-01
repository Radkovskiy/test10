import axios from "axios"

const instance = axios.create({
    baseURL: 'https://api.xpro.com.ua/',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    transformRequest: [function (data) {
        const newData = {
            test_id: '10',
            ...data,
        };

        return JSON.stringify(newData);
    }],
});

export const get_products_all = async () => {
    try {
        const data = await instance.get(`product`)
        return data
    } catch (error) {
        console.log(error);
    }
}
export const post_products = async (body) => {
    try {
        const data = await instance.post(`product`, body)
        console.log('POST :>> ', data);
        return data
    } catch (error) {
        console.log(error);
    }
}
export const get_selected_products = async () => {
    try {
        const data = await instance.get(`selectedProduct`)
        // console.log('GET selected :>> ', data);
        return data
    } catch (error) {
        console.log(error);
    }
}
export const delete_product = async (body) => {
    try {
        const data = await instance.delete(`product`, body)
        return data
    } catch (error) {
        console.log(error);

    }
}

export const patch_product = async (body) => {
    try {
        const data = await instance.patch(`product`, body)
        return data
    } catch (error) {
        console.log(error);

    }
}
