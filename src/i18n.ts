import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      navbar: {
        home: "Home",
        shop: "Shop",
        vendors: "Vendors",
        deals: "Deals",
        cart: "Shopping Cart",
        search: "Search in...",
        categories: "All Categories",
        flashSale: "Flash Sale",
        offers: "Special Offers",
        login: "Sign In",
        signup: "Register",
      },
      topbar: {
        findStore: "Find Walmart Store",
        freeShipping: "Free Standard Shipping",
      },
      categories: {
        all: "All Categories",
        fashion: "Fashion",
        bags: "Bags",
        shoes: "Shoes",
        sports: "Sports",
        games: "Games",
        headphones: "Headphones",
        clothing: "Clothing & Apparel",
        camera: "Camera",
        electronics: "Electronics",
        watches: "Watches",
      },
    },
  },
  ar: {
    translation: {
      navbar: {
        home: "الرئيسية",
        shop: "المتجر",
        vendors: "التجار",
        deals: "العروض",
        cart: "سلة المشتريات",
        search: "ابحث في...",
        categories: "كل الأقسام",
        flashSale: "عروض سريعة",
        offers: "عروض خاصة",
        login: "تسجيل الدخول",
        signup: "إنشاء حساب",
      },
      topbar: {
        findStore: "اعثر على متجر وول مارت",
        freeShipping: "شحن قياسي مجاني",
      },
      categories: {
        all: "كل الأقسام",
        fashion: "أزياء",
        bags: "حقائب",
        shoes: "أحذية",
        sports: "رياضة",
        games: "ألعاب",
        headphones: "سماعات",
        clothing: "ملابس",
        camera: "كاميرات",
        electronics: "إلكترونيات",
        watches: "ساعات",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
