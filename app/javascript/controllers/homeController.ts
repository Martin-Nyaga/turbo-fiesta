import Rails from "@rails/ujs"

Paloma.controller("Home", {
  index: function () {
    document
      .querySelector("[data-capture-payment]")
      .addEventListener("click", () => {
        postRequest(this.params.capturePaymentUrl, { orderId: 12 })
      })
  },
})

function postRequest(url, data) {
  return fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": Rails.csrfToken(),
    },
    body: JSON.stringify(data),
  })
}
