# SAMPAY

Luxury general e-commerce storefront starter for Nigeria.

## Included in this first storefront
- Responsive luxury storefront and product catalogue
- Category filtering and live product search
- Shopping bag with quantity controls and automatic subtotal
- Delivery details checkout form
- Paystack Inline checkout integration point (test public key placeholder)
- Newsletter interaction

## Preview locally
Open `index.html` in a browser, or serve the repository with any static web server.

## Paystack production checklist
The browser callback is not proof of payment. Before accepting real orders:
1. Add a backend endpoint to initialize transactions using your Paystack **secret key** (never expose it in browser code).
2. Verify every transaction reference server-side with Paystack's transaction verification API.
3. Validate amount, currency, reference, and payment status on the server before creating an order.
4. Add a Paystack webhook endpoint and verify its signature.
5. Store customers, products, stock, and orders in a database. Never trust prices submitted by the browser.
6. Replace the public test key placeholder in `index.html` with your Paystack **public** test key for testing, then the live public key after approval.

## Not yet connected
Authentication, persistent database, admin dashboard, order tracking, inventory management, and secure server-side Paystack verification are the next full-stack phase. The current repository build is a working static storefront foundation, not yet a production payment system.
