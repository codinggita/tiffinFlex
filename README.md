# 🍱 FlexiTiffin — Smart Customizable Tiffin Service

## 📌 Problem Statement

**"Why can't tiffin subscribers customize daily meals?"**

Professionals using tiffin services receive fixed daily menus with no flexibility. Dietary preferences, allergies, and taste preferences are often ignored. Users frequently receive meals they dislike multiple times a week but cannot modify them. Cancelling subscriptions leads to wasted money and food. Currently, there is no system that enables daily meal customization while maintaining the benefits of a subscription model.

---

## 💡 Proposed Solution

FlexiTiffin introduces a flexible and user-centric approach to tiffin services by allowing:

* Daily meal customization within an active subscription
* Easy swapping of meals from available menu options
* Setting dietary preferences (vegetarian, non-vegetarian, allergies, etc.)
* Skipping or rescheduling meals as needed
* Retaining subscription pricing while offering flexibility
* Intelligent meal suggestions based on user preferences and behavior

---

## ⚙️ Tech Stack

### Frontend

* React.js
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB

---

## 🚀 Key Features

* **Customizable Subscriptions**: Starter, Regular, and Pro tiers with monthly/annual billing.
* **Daily Meal Selection & Swapping**: Swap meals effortlessly based on preferences.
* **Nutrition Tracker**: Real-time calorie and macronutrient visualization.
* **Admin Dashboard**: Manage menus, view revenue analytics, and track subscribers.
* **Refer & Earn**: Built-in referral system with progress tracking.
* **Secure Payments**: Integrated with Razorpay (simulated checkout flow).
* **Theme Support**: Seamless Dark (Spice Market) and Light (Vanilla Cream) mode toggling.
* **Robust Auth**: JWT-based authentication with role-based access control (User/Admin).

---

## 🎨 UI/UX Design

* Designed with a premium **Espresso, Cocoa, and Gold** color palette.
* Features smooth micro-interactions powered by `framer-motion`.
* Fully responsive across mobile, tablet, and desktop.

---

## 🚀 Deployment Instructions

### Frontend (Vercel)
1. Push the repository to GitHub.
2. Go to [Vercel](https://vercel.com/) and create a new project.
3. Import the repository and set the **Framework Preset** to `Create React App`.
4. Set the **Root Directory** to `frontend`.
5. Add Environment Variables (if any).
6. Click **Deploy**. (The `vercel.json` file is already included to handle React Router client-side routing).

### Backend (Render / Heroku)
1. Go to [Render](https://render.com/) and create a new **Web Service**.
2. Connect the GitHub repository.
3. Set the **Root Directory** to `backend`.
4. Set the **Build Command** to `npm install` and the **Start Command** to `npm start`.
5. Add the following Environment Variables:
   * `PORT`: `5000`
   * `MONGO_URI`: Your MongoDB Atlas connection string.
   * `JWT_SECRET`: A secure random string for JWT signing.
6. Click **Create Web Service**.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

## 📝 License

This project is MIT licensed.
