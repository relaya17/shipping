import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import ModernHome from "../pages/ModernHome";
import About from "../pages/About";
import Contact from "../pages/Contact";
import CheckoutPage from "../pages/CheckOutPage";
import Error404Page from "../pages/404/Error404Page";
import MovingTips from "../pages/MovingTips";
import Podcast from "../pages/Podcast";
import Thankyou from "../pages/thankyou/Thankyou";
import InterstateMoving from "../pages/InterstateMoving";
import MovingServices from "../pages/MovingServices";
import WorldwideMoving from "../pages/WorldwideMoving";
import FreeMovingQuote from "../pages/FreeMovingQuote";
import InternationalCarShipping from "../pages/InternationalCarShipping";
import InternationalHouseholdMovers from "../pages/InternationalHouseholdMovers";
import MotorcycleToEurope from "../pages/MotorcycleToEurope";
import MovingInsurance from "../pages/MovingInsurance";
import OverseasArtworkShipping from "../pages/OverseasArtworkShipping";
import InternationalPianoMovers from "../pages/InternationalPianoMovers";
import PackingService from "../pages/PackingService";
import ComparingQuotes from "../pages/ComparingQuotes";
import WhyTrustVIPInternationalShipping from "../components/WhyTrustVIPInternationalShipping";
import AdminDashboard from "../pages/AdminDashboard";
import TermsAndConditions from "../pages/TermsAndConditions";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import PaymentDemo from "../pages/PaymentDemo";
import { ROUTES } from "../routs/routes";
import Footer from '../pages/Footer';  // ודא שייבאת את הפוטר

const AppRoutes: React.FC = () => {
  return (
    <>
      {/* <NavigationBar /> */}
      <Routes>
        <Route path={ROUTES.HOME} element={<ModernHome />} />
        <Route path="/old-home" element={<Home />} />
        <Route path={ROUTES.ABOUT} element={<About />} />
        <Route path={ROUTES.CONTACT} element={<Contact />} />
        <Route path={ROUTES.CHECKOUT} element={<CheckoutPage />} />
        <Route path={ROUTES.THANKYOU} element={<Thankyou />} />
        <Route path={ROUTES.MOVING_TIPS} element={<MovingTips />} />
        <Route path={ROUTES.PODCAST} element={<Podcast />} />
        <Route path={ROUTES.INTERSTATE_MOVING} element={<InterstateMoving />} />
        <Route path={ROUTES.MOVING_SERVICES} element={<MovingServices />} />
        <Route path={ROUTES.WORLDWIDE_MOVING} element={<WorldwideMoving />} />
        <Route path={ROUTES.FREE_MOVING_QUOTE} element={<FreeMovingQuote />} />
        <Route path={ROUTES.INTERNATIONAL_CAR_SHIPPING} element={<InternationalCarShipping />} />
        <Route path={ROUTES.INTERNATIONAL_HOUSEHOLD_MOVERS} element={<InternationalHouseholdMovers />} />
        <Route path={ROUTES.MOTORCYCLE_TO_EUROPE} element={<MotorcycleToEurope />} />
        <Route path={ROUTES.MOVING_INSURANCE} element={<MovingInsurance />} />
        <Route path={ROUTES.OVERSEAS_ARTWORK_SHIPPING} element={<OverseasArtworkShipping />} />
        <Route path={ROUTES.INTERNATIONAL_PIANO_MOVERS} element={<InternationalPianoMovers />} />
        <Route path={ROUTES.PACKING_SERVICE} element={<PackingService />} />
        <Route path={ROUTES.WHY_TRUST_VIP} element={<WhyTrustVIPInternationalShipping/>} />
        <Route path={ROUTES.COMPARING_QUOTES} element={<ComparingQuotes />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/payment-demo" element={<PaymentDemo />} />
        <Route path="*" element={<Error404Page />} />
      </Routes>
      <Footer /> {/* ודא שהפוטר נמצא כאן */}
    </>
  );
};

export default AppRoutes;
