import { useState } from 'react';
import Header from './components/Header/Header';
import QuickAccessNav from './components/QuickAccess/QuickAccessNav';
import WelcomeSection from './components/Welcome/WelcomeSection';
import PendenciasAvisos from './components/Alerts/PendenciasAvisos';
import RecentServices from './components/RecentAccess/RecentServices';
import NotaMTModule from './components/NotaMT/NotaMTModule';
import MenorPrecoModule from './components/MenorPreco/MenorPrecoModule';
import VehiclesModule from './components/Vehicles/VehiclesModule';
import ProcessesModule from './components/Processes/ProcessesModule';
import TADsModule from './components/TADs/TADsModule';
import InstallmentsModule from './components/Installments/InstallmentsModule';
import PaymentHistoryModule from './components/PaymentHistory/PaymentHistoryModule';
import PurchasesModule from './components/Purchases/PurchasesModule';
import NFAeModule from './components/NFAe/NFAeModule';
import DividaAtivaModule from './components/DividaAtiva/DividaAtivaModule';
import CompaniesModule from './components/Companies/CompaniesModule';
import Footer from './components/Footer/Footer';
import Chatbot from './components/Chatbot/Chatbot';
import UpdateProfileModal from './components/Modals/UpdateProfileModal';
import ExitSurveyModal from './components/Modals/ExitSurveyModal';
import { userData } from './data/userData';
import './styles/portal.css';

export default function App() {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showExitSurvey, setShowExitSurvey] = useState(false);

  return (
    <>
      <Header user={userData} />

      <div className="portal-body-wrapper">
        <main className="portal-content" role="main">
          <div className="container">
            <QuickAccessNav />
            <WelcomeSection user={userData} onShowUpdateModal={() => setShowUpdateModal(true)} />
            <PendenciasAvisos />
            <RecentServices />

            <div className="module-row">
              <NotaMTModule />
              <MenorPrecoModule />
            </div>

            <VehiclesModule />

            <div className="module-row">
              <ProcessesModule />
              <TADsModule />
            </div>

            <div className="module-row">
              <InstallmentsModule />
              <PaymentHistoryModule />
            </div>

            <div className="module-row">
              <PurchasesModule />
              <NFAeModule />
            </div>

            <DividaAtivaModule />
            <CompaniesModule />
          </div>
        </main>

        <Footer />
      </div>

      <Chatbot />

      <UpdateProfileModal
        user={userData}
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
      />
      <ExitSurveyModal
        isOpen={showExitSurvey}
        onClose={() => setShowExitSurvey(false)}
      />
    </>
  );
}
