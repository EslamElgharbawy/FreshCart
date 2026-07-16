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
      Menu: {
        search: "Search...",
        pages: "Pages",
        categories: "Categories",
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
      features: {
        freeShipping: {
          title: "Free Shipping & Returns",
          desc: "For all orders over $99",
        },
        securePayment: {
          title: "Secure Payment",
          desc: "We ensure secure payment",
        },
        moneyBack: {
          title: "Money Back Guarantee",
          desc: "Any back within 30 days",
        },
        customerSupport: {
          title: "Customer Support",
          desc: "Call or email us 24/7",
        },
      },
      deals: {
        topDailyDeals: "Top Daily Deals",

        trending: "Tranding",
        collection: "Collection",
        dealsAndPromotion: "Deals and Promotion",
        from: "From",
        shopNow: "Shop Now",

        bestSeller: "Best Seller",
        electricHeadphone: "Electric Headphone",

        weekendSale: "Weekend Sale",
        tradeInYourCurrent: "Trade In Your Current",
        camera: "Camera",

        upTo: "Up To 50%",
        ultimateSaleCollection: "Ultimate Sale Collection",

        bestSelling: "Best Selling",
        fashionSale: "Fashion Sale",

        reviews: "Reviews",
      },
      vendors: {
        topWeeklyVendors: "Top Weekly Vendors",
        products: "Products",
      },
      categories_menu: {
        all: "All Categories",
        shopByCategories: "Shop By Categories",
        music: "Music",
        "men's-fashion": "Men's Fashion",
        "women's-fashion": "Women's Fashion",
        supermarket: "SuperMarket",
        "baby-and-toys": "Baby & Toys",
        home: "Home",
        books: "Books",
        "beauty-and-health": "Beauty & Health",
        mobiles: "Mobiles",
        electronics: "Electronics",
      },
      electronicsSidebar: {
        title: "Electronics",
        "networking-products": "Networking Products",
        "printers-and-accessories": "Printers & Accessories",
        "cameras-and-accessories": "Cameras & Accessories",
        "video-games": "Video Games",
        "laptops-and-accessories": "Laptops & Accessories",
        browseAll: "Browse All",
      },
      subcategory: {
        "computer-accessories": "Computer Accessories",
        "computer-components": "Computer Components",
        "data-storage": "Data Storage",
        "networking-products": "Networking Products",
        "printers-and-accessories": "Printers & Accessories",
        "cameras-and-accessories": "Cameras & Accessories",
        "video-games": "Video Games",
        "audio-and-home-entertainment": "Audio & Home Entertainment",
        "laptops-and-accessories": "Laptops & Accessories",
        "tvs-satellites-and-accessories": "TVs, Satellites & Accessories",
        "mobile-gaming-and-vr-gadgets": "Mobile Gaming & VR Gadgets",
        "covers-and-screen-protectors": "Covers & Screen Protectors",
        "chargers-and-cables": "Chargers & Cables",
        "power-banks": "Power Banks",
        earphones: "Earphones",
        "wireless-earphones": "Wireless Earphones",
        "smartwatches-and-accessories": "Smartwatches & Accessories",
        "all-tablets": "All Tablets",
        "all-mobile-phones": "All Mobile Phones",
        "mobile-new-arrivals": "Mobile New Arrivals",
        "bags-and-luggage": "Bags & Luggage",
        "men's-clothing": "Men's Clothing",
        "kid's-fashion": "Kid's Fashion",
        handbags: "Handbags",
        eyewear: "Eyewear",
        jewellery: "Jewellery",
        watches: "Watches",
        footwear: "Footwear",
        "women's-clothing": "Women's Clothing",
        "kitchen-and-dining": "Kitchen & Dining",
        "home-decor": "Home Decor",
        furniture: "Furniture",
        "tools-and-home-improvement": "Tools & Home Improvement",
        "bath-and-bedding": "Bath & Bedding",
        drinkware: "Drinkware",
        cookware: "Cookware",
        "large-appliances": "Large Appliances",
        "home-appliances": "Home Appliances",
        "health-and-nutrition": "Health & Nutrition",
        "personal-care": "Personal Care",
      },
      clothesSidebar: {
        title: "Men's Fashion",
        "men's-clothing": "Men's Clothing",
        browseAll: "Browse All",
      },
      products: {
        addToCart: "Add To Cart",
        quickView: "Quick View",
      },
      bannerHome: {
        discount: "OFF",
        title: "For Today's Fashion",
        useCode: "Use code",
        code: "Black 12345",
        offer: "to get best offer.",
      },

      breadcrumb: {
        home: "Home",
        shop: "Shop",
        product: "Product",
        cart: "Shopping Cart",
        checkout: "Checkout",
        wishlist: "Wishlist",
        compare: "Compare",
      },
      common: {
        reviews: "Reviews",
        at: "at",
      },
      productDetails: {
        category: "Category",
        inStock: "In stock",
        quantity: "Quantity",
        addToCart: "Add to Cart",
      },
      shippingInfo: {
        freeShipping: {
          title: "Free Shipping & Return",
          description:
            "We offer free shipping for products on orders above $50 and free delivery for all orders in the US.",
        },
        easyReturns: {
          title: "Free and Easy Returns",
          description:
            "We guarantee our products, and you can get a full refund within 30 days.",
        },
        specialFinancing: {
          title: "Special Financing",
          description:
            "Get 20%-50% off items over $50 for a month or over $250 for a year with our special credit card.",
        },
      },
      reviewsSection: {
        averageRating: "Average Rating",
        wantReview: "Want to leave a review?",
        signInMessage:
          "Please sign in to share your experience with this product.",
        signIn: "Sign In",
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
      Menu: {
        search: "بحث...",
        pages: "الصفحات",
        categories: "الأقسام",
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
      features: {
        freeShipping: {
          title: "شحن وإرجاع مجاني",
          desc: "لجميع الطلبات فوق 99$",
        },
        securePayment: {
          title: "دفع آمن",
          desc: "نضمن لك عملية دفع آمنة",
        },
        moneyBack: {
          title: "ضمان استرداد الأموال",
          desc: "استرجاع خلال 30 يوم",
        },
        customerSupport: {
          title: "دعم العملاء",
          desc: "اتصل أو راسلنا 24/7",
        },
      },
      deals: {
        topDailyDeals: "أفضل العروض اليومية",

        dealsAndPromotion: "العروض والتخفيضات",
        trending: "الرائجة",
        collection: "المجموعة",
        from: "من",
        shopNow: "تسوق الآن",

        bestSeller: "الأكثر مبيعاً",
        electricHeadphone: "سماعات كهربائية",

        weekendSale: "تخفيضات نهاية الأسبوع",
        tradeInYourCurrent: "استبدل كاميرتك الحالية",
        camera: "كاميرا",

        upTo: "خصم حتى 50%",
        ultimateSaleCollection: "مجموعة التخفيضات الكبرى",

        bestSelling: "الأكثر مبيعاً",
        fashionSale: "تخفيضات الأزياء",

        reviews: "مراجعة",
      },

      vendors: {
        topWeeklyVendors: "أفضل البائعين الأسبوعيين",
        products: "منتج",
      },
      categories_menu: {
        all: "كل الأقسام",
        shopByCategories: "تسوق حسب الأقسام",
        music: "الموسيقى",
        "men's-fashion": "أزياء رجالية",
        "women's-fashion": "أزياء نسائية",
        supermarket: "السوبر ماركت",
        "baby-and-toys": "الأطفال والألعاب",
        home: "المنزل",
        books: "الكتب",
        "beauty-and-health": "الجمال والصحة",
        mobiles: "الهواتف المحمولة",
        electronics: "الإلكترونيات",
      },

      subcategory: {
        "computer-accessories": "ملحقات الكمبيوتر",
        "computer-components": "مكونات الكمبيوتر",
        "data-storage": "وحدات التخزين",
        "networking-products": "منتجات الشبكات",
        "printers-and-accessories": "الطابعات وملحقاتها",
        "cameras-and-accessories": "الكاميرات وملحقاتها",
        "video-games": "ألعاب الفيديو",
        "audio-and-home-entertainment": "الصوتيات والترفيه المنزلي",
        "laptops-and-accessories": "أجهزة اللابتوب وملحقاتها",
        "tvs-satellites-and-accessories": "أجهزة التلفاز والريسيفرات وملحقاتها",
        "mobile-gaming-and-vr-gadgets": "ألعاب الجوال ونظارات الواقع الافتراضي",
        "covers-and-screen-protectors": "الأغطية وواقيات الشاشة",
        "chargers-and-cables": "الشواحن والكابلات",
        "power-banks": "بنوك الطاقة",
        earphones: "سماعات الأذن",
        "wireless-earphones": "السماعات اللاسلكية",
        "smartwatches-and-accessories": "الساعات الذكية وملحقاتها",
        "all-tablets": "جميع الأجهزة اللوحية",
        "all-mobile-phones": "جميع الهواتف المحمولة",
        "mobile-new-arrivals": "أحدث الهواتف",
        "bags-and-luggage": "الحقائب والأمتعة",
        "men's-clothing": "ملابس رجالية",
        "kid's-fashion": "أزياء الأطفال",
        handbags: "حقائب اليد",
        eyewear: "النظارات",
        jewellery: "المجوهرات",
        watches: "الساعات",
        footwear: "الأحذية",
        "women's-clothing": "ملابس نسائية",
        "kitchen-and-dining": "المطبخ والسفرة",
        "home-decor": "ديكور المنزل",
        furniture: "الأثاث",
        "tools-and-home-improvement": "الأدوات وتحسين المنزل",
        "bath-and-bedding": "الحمام والمفروشات",
        drinkware: "أدوات المشروبات",
        cookware: "أدوات الطهي",
        "large-appliances": "الأجهزة المنزلية الكبيرة",
        "home-appliances": "الأجهزة المنزلية",
        "health-and-nutrition": "الصحة والتغذية",
        "personal-care": "العناية الشخصية",
      },
      electronicsSidebar: {
        title: "الإلكترونيات",
        "networking-products": "منتجات الشبكات",
        "printers-and-accessories": "الطابعات وملحقاتها",
        "cameras-and-accessories": "الكاميرات وملحقاتها",
        "video-games": "ألعاب الفيديو",
        "laptops-and-accessories": "أجهزة اللابتوب وملحقاتها",
        browseAll: "عرض الكل",
      },

      clothesSidebar: {
        title: "أزياء رجالية",
        "men's-clothing": "ملابس رجالية",
        browseAll: "تصفح الكل",
      },
      products: {
        addToCart: "أضف إلى السلة",
        quickView: "عرض سريع",
      },
      bannerHome: {
        discount: "خصم",
        title: "لأزياء اليوم",
        useCode: "استخدم الكود",
        code: "Black 12345",
        offer: "للحصول على أفضل عرض.",
      },

      breadcrumb: {
        home: "الرئيسية",
        shop: "المتجر",
        product: "المنتجات",
        cart: "سلة المشتريات",
        checkout: "إتمام الطلب",
        wishlist: "المفضلة",
        compare: "المقارنة",
      },
      common: {
        reviews: "تقييمات",
        at: "في",
      },
      productDetails: {
        category: "الفئة",
        inStock: "متوفر بالمخزون",
        quantity: "الكمية",
        addToCart: "أضف إلى السلة",
      },

      shippingInfo: {
        freeShipping: {
          title: "شحن وإرجاع مجاني",
          description:
            "نوفر شحنًا مجانيًا للطلبات التي تزيد قيمتها عن 50 دولارًا، مع توصيل مجاني لجميع الطلبات داخل الولايات المتحدة.",
        },
        easyReturns: {
          title: "إرجاع مجاني وسهل",
          description:
            "نضمن جودة منتجاتنا، ويمكنك استرداد أموالك بالكامل خلال 30 يومًا.",
        },
        specialFinancing: {
          title: "تمويل خاص",
          description:
            "احصل على خصم من 20% إلى 50% على المشتريات التي تزيد عن 50 دولارًا لمدة شهر، أو التي تزيد عن 250 دولارًا لمدة عام باستخدام بطاقتنا الائتمانية الخاصة.",
        },
      },
      reviewsSection: {
        averageRating: "متوسط التقييم",
        wantReview: "هل ترغب في كتابة تقييم؟",
        signInMessage: "يرجى تسجيل الدخول لمشاركة تجربتك مع هذا المنتج.",
        signIn: "تسجيل الدخول",
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
