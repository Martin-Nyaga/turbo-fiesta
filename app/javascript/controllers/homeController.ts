import Rails from "@rails/ujs"
import consumer from "channels/consumer"

Paloma.controller("Home", {
  index: function () {
    const orderId = Math.ceil(Math.random() * 10)
    console.log(consumer)
    new PaymentHandler(orderId, this.params.capturePaymentUrl).init()
  },
})

class PaymentHandler {
  orderId: number
  captureButton: HTMLButtonElement
  statusDiv: HTMLDivElement
  capturePaymentUrl: string

  constructor(orderId: number, capturePaymentUrl: string) {
    this.orderId = orderId
    this.captureButton = document.querySelector("[data-capture-payment]")
    this.statusDiv = document.querySelector("[data-status]")
    this.capturePaymentUrl = capturePaymentUrl
  }

  async capturePayment() {
    this.statusDiv.innerHTML = "Requesting Mpesa payment..."
    const response = await postRequest(this.capturePaymentUrl, {
      order_id: this.orderId,
    })
    if (response.success) {
      this.statusDiv.innerHTML =
        "Payment requested. Please enter your Mpesa pin when prompted..."
    }
  }

  handleMessageReceived(data) {
    if (data.success) {
      this.statusDiv.innerHTML = `Payment successful: ${data.message}`
    }
  }

  createSubscription() {
    consumer.subscriptions.create(
      {
        channel: "PaymentsChannel",
        order_id: this.orderId,
      },
      {
        connected() {
          console.log("connected!")
        },

        disconnected() {
          console.log("disconnected!")
        },

        received: this.handleMessageReceived.bind(this),
      }
    )
    document.addEventListener("turbolinks:beforechange", () => {
      consumer.disconnect()
    })
  }

  init() {
    this.createSubscription()
    this.captureButton.addEventListener("click", this.capturePayment.bind(this))
  }
}

function postRequest(url: string, data: any) {
  return fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": Rails.csrfToken(),
    },
    body: JSON.stringify(data),
  }).then((res) => res.json())
}
