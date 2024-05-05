import { load } from "@cashfreepayments/cashfree-js";

const Cashfree = ({ sessionId }) => {
  let cashfree;
  var initializeSDK = async function () {
    cashfree = await load({
      mode: "sandbox",
    });
  };
  initializeSDK();
  console.log(sessionId);
  const doPayment = async () => {
    let checkoutOptions = {
      paymentSessionId: sessionId,
      redirectTarget: "_self",
    };
    cashfree.checkout(checkoutOptions).then((result) => {
      if (result.error) {
        // This will be true whenever user clicks on close icon inside the modal or any error happens during the payment
        console.log("User has closed the popup, Check for Payment Status");
        console.log(result.error);
      }
      if (result.redirect) {
        // This will be true when the payment redirection page couldnt be opened in the same window
        // This is an exceptional case only when the page is opened inside an inAppBrowser
        // In this case the customer will be redirected to return url once payment is completed
        console.log("Payment will be redirected");
      }
      if (result.paymentDetails) {
        // This will be called whenever the payment is completed irrespective of transaction status
        console.log("Payment has been completed, Check for Payment Status");
        console.log(result.paymentDetails.paymentMessage);
      }
    });
  };

  return (
    <div className='row'>
      <p>Click below to open the checkout page in popup</p>
      <button
        type='submit'
        class='btn btn-primary'
        id='renderBtn'
        onClick={doPayment}>
        Pay Now
      </button>
    </div>
  );
};

export default Cashfree;
