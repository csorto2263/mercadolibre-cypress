export class HomePage {
  visit() {
    cy.visit('/')
  }

  searchProduct(product: string) {
    cy.get('input[name="as_word"]').type(`${product}{enter}`)
  }

  goToSecondPage() {
    cy.origin('https://listado.mercadolibre.com.ar', () => {
      cy.scrollTo('bottom')
      cy.wait(3000)
      cy.get('a.andes-pagination__link').contains('2').click()
    })
  }

  selectNonFirstFreeShippingProduct() {
    cy.origin('https://listado.mercadolibre.com.ar', () => {
      // Ignorar errores uncaught dentro del dominio listado
      Cypress.on('uncaught:exception', () => {
        return false
      })

      cy.location('hostname', { timeout: 10000 }).should('include', 'listado.mercadolibre.com.ar')

      cy.get('.ui-search-layout__item', { timeout: 15000 }).then(($items) => {
        let selected = false
        for (let i = 1; i < $items.length; i++) {
          const el = $items[i]
          if (el.innerText.includes('Envío gratis')) {
            cy.wrap(el).find('a').first().click()
            selected = true
            break
          }
        }

        if (!selected) {
          cy.get('.ui-search-layout__item').eq(1).find('a').first().click()
        }
      })
    })
  }
}
