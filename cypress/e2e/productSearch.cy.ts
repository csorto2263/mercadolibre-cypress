import { HomePage } from '../pages/HomePage'
import { ProductPage } from '../pages/ProductPage'

const home = new HomePage()
const product = new ProductPage()

const config = require('../../config.json')

describe('MercadoLibre product purchase flow', () => {
  it('searches, selects, modifies and attempts to add product to cart', () => {
    home.visit()
    home.searchProduct(config.product)
    home.goToSecondPage()
    home.selectNonFirstFreeShippingProduct()

    product.setQuantity(2)
    product.addToCart()
    product.verifyAccountOrLoginPrompt()
  })
})
