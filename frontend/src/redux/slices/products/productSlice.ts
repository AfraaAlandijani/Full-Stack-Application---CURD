import { createSlice } from '@reduxjs/toolkit'

export type Product = {
  id: number
  name: string
  price: number
  image: string
  description: string
  categories: string[]
  variants: string[]
  sizes: string[]
}

export type ProductState = {
  items: Product[]
  error: null | string
  isLoading: boolean
  searchTerm: string
  sortProducts: number[]
  singleProduct: Product
}

const initialState: ProductState = {
  items: [],
  error: null,
  isLoading: false,
  searchTerm: '',
  sortProducts: [],
  singleProduct: {} as Product
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productsRequest: (state) => {
      state.isLoading = true
    },
    productsSuccess: (state, action) => {
      state.isLoading = false
      state.items = action.payload
    },
    findProductById: (state, action) => {
      const id = action.payload
      const foundProduct = state.items.find((product) => product.id == Number(id))
      if (foundProduct) {
        state.singleProduct = foundProduct
      }
    },
    addProduct: (state, action: { payload: { product: Product } }) => {
      // let's append the new product to the beginning of the array
      state.items = [action.payload.product, ...state.items]
    },
    removeProduct: (state, action: { payload: { productId: number } }) => {
      const filteredItems = state.items.filter((product) => product.id !== action.payload.productId)
      state.items = filteredItems
    },
    searchProduct: (state, action) => {
      state.searchTerm = action.payload
    },
    sortProducts: (state, action) => {
      const sortingType = action.payload
      if (sortingType == 'low-high') {
        state.items.sort((a, b) => a.price - b.price)
      } else if (sortingType == 'high-low') {
        state.items.sort((a, b) => b.price - a.price)
      } else if (sortingType == 'a-z') {
        state.items.sort((a, b) => a.name.localeCompare(b.name))
      } else if (sortingType == 'z-a') {
        state.items.sort((a, b) => b.name.localeCompare(a.name))
      }
    },
    updateProduct: (state, action) => {
      const { id, name, image, description, categories, variants, sizes, price } = action.payload
      const foundProduct = state.items.find((product) => product.id == id)
      if (foundProduct) {
        foundProduct.name = name
        foundProduct.image = image
        foundProduct.description = description
        foundProduct.categories = categories
        foundProduct.variants = variants
        foundProduct.sizes = sizes
        foundProduct.price = price
      }
    }
  }
})
export const {
  removeProduct,
  addProduct,
  productsRequest,
  productsSuccess,
  searchProduct,
  sortProducts,
  findProductById,
  updateProduct
} = productSlice.actions

export default productSlice.reducer
