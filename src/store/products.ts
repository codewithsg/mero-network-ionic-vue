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
                const res1 = await instance.get('products');
                // console.log('resq:', res1);
                return res.data;
            } catch (err: any) {
                return err;
            }
        },
        getProducts: async (context: any) => {
            try {
                const res = await instance.get('products');
                // console.log('res:', res);
                return res;
            } catch (err: any) {
                return err;
            }
        },
        getProductById: async (context: any, id: number) => {
            try {
                const res = await instance.get(`products/${id}`);
                return res;
            } catch (err) {
                return (err);
            }
        },
        deleteProduct: async (context: any, id: number) => {
            try {
                console.log('id:', id);
                const res = await instance.delete(`products/${id}`);
                console.log('res in by id:', res);
                return res;
            } catch (err) {
                return (err);
            }
        },
        editProduct: async (context: any, data: any) => {
            try {
                const res = await instance.put(`products/${data.id}`, data);
                return res;
            } catch (err) {
                return err;
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