# 🍛 Gama Gama Biriyani - Self-Ordering Kiosk

[![Live Demo](https://img.shields.io/badge/Live_Demo-View_Project-success?style=for-the-badge&logo=vercel)](https://final-kiosk-app.vercel.app/)
[![Tech Stack](https://img.shields.io/badge/Tech-Vite%20|%20TypeScript%20|%20Tailwind-blue?style=for-the-badge)](#)

A modern, interactive self-ordering kiosk web application designed for a seamless restaurant experience. Built with a focus on intuitive UI/UX, dynamic state management, and real-time user feedback.

## 🚀 Live Demo
**Check out the live application here:** [https://final-kiosk-app.vercel.app/](https://final-kiosk-app.vercel.app/)

## ✨ Key Features

* **Dynamic Daily Menus:** The application automatically detects the current day of the week to display the correct active menu, with seamless toggling between Lunch and Dinner offerings.
* **Smart Cart System:** Interactive `+` and `-` quantity controls integrated directly into the menu cards and cart modal for frictionless ordering.
* **Table Booking Engine:** A visual table selection system that adapts based on party size:
  * Table for 2 (`T2-X`)
  * Table for 4 (`T4-X`)
  * Family Tables (`FAM-X`)
  * Includes randomized "occupied" states to simulate real-world restaurant capacity.
* **Native Audio Feedback:** Custom-built sound effects utilizing the native **Web Audio API** for tactile button clicks, adding items to the cart, and successful order placements.
* **Dedicated Dosai Section:** A grid-based persistent add-on section for hot items available all day.
* **Mock Checkout Flow:** Supports simulated selections for Cash on Delivery (COD), UPI/QR, and Card payments, generating a randomized four-digit order number upon completion.

## 🛠️ Tech Stack

* **Frontend Build Tool:** Vite
* **Language:** TypeScript / JavaScript
* **Styling:** CSS3 / Tailwind CSS
* **Assets:** Custom mapped local assets and high-quality UI iconography (FontAwesome)
* **Deployment:** Vercel

## 💻 Local Development

To run this project locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/mukherjeeaanish-oss/Final-Kiosk-App.git](https://github.com/mukherjeeaanish-oss/Final-Kiosk-App.git)
