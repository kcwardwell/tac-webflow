<!-- Load Stripe.js on your website. -->


<!-- Create a button that your customers click to complete their purchase. Customize the styling to suit your branding. -->
<button
  style="background-color:#6772E5;color:#FFF;padding:8px 12px;border:0;border-radius:4px;font-size:1em;cursor:pointer"
  id="checkout-button-price_1KX5e4GVXffAZsyt0krmMHRY"
  role="link"
  type="button"
>
  Checkout
</button>

<div id="error-message"></div>


<script src="https://js.stripe.com/v3"></script>
<script>
(function() {
  var stripe = Stripe('pk_test_51H8FY6GVXffAZsytNQgeJGgEKuQv6sjVt3BJSFNSEBZI0GpqqVgbpuA3SLfNNjREB6nFegZabnxg5Ko0VWtqXqFk00zQvfa2M6');

  var checkoutButton = document.getElementById('checkout-button-price_1KX5e4GVXffAZsyt0krmMHRY');
  checkoutButton.addEventListener('click', function () {
    /*
     * When the customer clicks on the button, redirect
     * them to Checkout.
     */
    stripe.redirectToCheckout({
      lineItems: [{price: 'price_1KX5e4GVXffAZsyt0krmMHRY', quantity: 1}],
      mode: 'payment',
      /*
       * Do not rely on the redirect to the successUrl for fulfilling
       * purchases, customers may not always reach the success_url after
       * a successful payment.
       * Instead use one of the strategies described in
       * https://stripe.com/docs/payments/checkout/fulfill-orders
       */
      successUrl: window.location.protocol + '//www.smithhorizons.com/success',
      cancelUrl: window.location.protocol + '//www.smithhorizons.com/canceled',
    })
    .then(function (result) {
      if (result.error) {
        /*
         * If `redirectToCheckout` fails due to a browser or network
         * error, display the localized error message to your customer.
         */
        var displayError = document.getElementById('error-message');
        displayError.textContent = result.error.message;
      }
    });
  });
})();
</script>