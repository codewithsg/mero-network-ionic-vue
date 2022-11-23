import { IAddProductInterface } from "@/interfaces/Product.Interface";
import instance from "@/utils/axios";


export default {
    state: {
        products: []
    },
    getters: {
        allProducts(state: any) {
            return state.products;
        }
    },
    actions: {
        addProduct: async (context: any, data: IAddProductInterface) => {
            try {
                const res = await instance.post('products/add', data);
                // console.log('res:', res);
                const res1 = await instance.get('products/getall');
                // console.log('resq:', res1);
                return res.data;
            } catch (err: any) {
                return err;
            }
        },
        getProducts: async (context: any) => {
            try {
                const res = await instance.get('products/getall');
                // console.log('res:', res);
                return res;
            } catch (err: any) {
                return err;
            }
        },
        getProductById: async (context: any, id: number) => {
            try {
                const res = await instance.get(`products/${id}`);
                console.log('res in by id:', res);
                return res;
            } catch (err) {
                return (err);
            }
        }

    }, mutations: {
        SET_Products(state: any, products: any) {
            state.products = products
        },
        NEW_PRODUCT(state: any, product: any) {
            return state.products.unshift(product)
        }
    }
}

// export default {
//     product: product
// }