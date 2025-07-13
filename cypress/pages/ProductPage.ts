export class ProductPage {
  private shouldUseOrigin(host: string): boolean {
    return [
      'articulo.mercadolibre.com.ar',
      'www.mercadolibre.com'
    ].includes(host)
  }

  setQuantity(qty: number) {
    cy.location('hostname').then((host) => {
      const useOrigin = this.shouldUseOrigin(host)

      const trySetQty = () => {
        cy.document({ timeout: 10000 }).then((doc) => {
          const input = Cypress.$('input[title="Cantidad"]', doc)

          if (input.length > 0) {
            cy.get('input[title="Cantidad"]').clear().type(`${qty}`)
          } else {
            cy.log('❗ Product does not have a quantity input field')
          }
        })
      }

      if (useOrigin) {
        cy.origin(`https://${host}`, { args: { qty } }, ({ qty }) => {
          Cypress.on('uncaught:exception', () => false)

          cy.document({ timeout: 10000 }).then((doc) => {
            const input = Cypress.$('input[title="Cantidad"]', doc)

            if (input.length > 0) {
              cy.get('input[title="Cantidad"]').clear().type(`${qty}`)
            } else {
              cy.log('❗ Product does not have a quantity input field')
            }
          })
        })
      } else {
        Cypress.on('uncaught:exception', () => false)
        trySetQty()
      }
    })
  }

  addToCart() {
    cy.location('hostname').then((host) => {
      const useOrigin = this.shouldUseOrigin(host)

      if (useOrigin) {
        cy.origin(`https://${host}`, () => {
          Cypress.on('uncaught:exception', () => false)
          cy.contains('Agregar al carrito', { timeout: 10000 }).click()
        })
      } else {
        Cypress.on('uncaught:exception', () => false)
        cy.contains('Agregar al carrito', { timeout: 10000 }).click()
      }
    })
  }

  verifyAccountOrLoginPrompt() {
    Cypress.on('uncaught:exception', () => false);

    cy.origin('https://www.mercadolibre.com', () => {
      cy.contains('Crear cuenta', { timeout: 10000 })
        .should('be.visible');
      cy.log("✅ 'Crear cuenta' encontrado con cy.origin()");
    });
  }
}
