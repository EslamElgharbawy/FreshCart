"use client";
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
        findStore: "Find FreshCart Store",
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
      hero: {
        running: "Running",
        nikeShoes: "Nike Shoes",
        startingAt: "Starting at",
        shopCollection: "Shop Collection",

        fashion: "Fashion",
        sportswear: "Sportswear",
        from: "From",
      },
      footer: {
        supportText: "Got Question? Call us 24/7",
        description: "Register now to get updates on promotions & coupons.",

        company: "Company",
        myAccount: "My Account",
        customerService: "Customer Service",

        aboutUs: "About Us",
        teamMember: "Team Member",
        career: "Career",
        contactUs: "Contact Us",
        affilate: "Affilate",
        orderHistory: "Order History",

        trackOrder: "Track My Order",
        viewCart: "View Cart",
        signIn: "Sign In",
        help: "Help",
        myWishlist: "My Wishlist",
        privacyPolicy: "Privacy Policy",

        paymentMethods: "Payment Methods",
        moneyBackGuarantee: "Money-back Guarantee",
        returns: "Product Returns",
        supportCenter: "Support Center",
        shipping: "Shipping",
        termsOfService: "Terms of Service",

        subscribe: "Subscribe To Our Newsletter",
        subscribeDescription:
          "Get all the latest information on Events, Sales and Offers.",
        emailPlaceholder: "Your E-mail Address",
        signUp: "SIGN UP",

        copyright: "Copyright © 2026 FreshCart Store. All Rights Reserved.",
        safePayment: "We're using safe payment for",
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
        findStore: "اعثر على متجر فريش كارت",
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
      hero: {
        running: "الجري",
        nikeShoes: "أحذية نايكي",
        startingAt: "يبدأ من",
        shopCollection: "تسوق المجموعة",

        fashion: "الأزياء",
        sportswear: "الملابس الرياضية",
        from: "من",
      },
      footer: {
        supportText: "هل لديك سؤال؟ اتصل بنا 24/7",
        description: "سجل الآن للحصول على تحديثات حول العروض والقسائم.",

        company: "الشركة",
        myAccount: "حسابي",
        customerService: "خدمة العملاء",

        aboutUs: "من نحن",
        teamMember: "فريق العمل",
        career: "الوظائف",
        contactUs: "تواصل معنا",
        affilate: "التسويق بالعمولة",
        orderHistory: "تاريخ الطلبات",

        trackOrder: "تتبع الطلب",
        viewCart: "عرض السلة",
        signIn: "تسجيل الدخول",
        help: "المساعدة",
        myWishlist: "قائمة الأمنيات",
        privacyPolicy: "سياسة الخصوصية",

        paymentMethods: "طرق الدفع",
        moneyBackGuarantee: "ضمان إرجاع المال",
        returns: "إرجاع المنتجات",
        supportCenter: "مركز الدعم",
        shipping: "الشحن",
        termsOfService: "شروط الخدمة",

        subscribe: "اشترك في النشرة البريدية",
        subscribeDescription:
          "احصل على أحدث المعلومات حول الأحداث والمبيعات والعروض.",
        emailPlaceholder: "البريد الإلكتروني",
        signUp: "اشترك",

        copyright: "حقوق النشر © 2026 FreshCart Store. جميع الحقوق محفوظة.",
        safePayment: "نحن نستخدم الدفع الآمن ل",
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
