import { useContext } from 'react';
import DonationsContext from '../../contexts/donation-context';

const Content = ({ currentTab, setCurrentTab }) => {
  const {
    donations,
    addDonation,
    openDonationModal,
    onViewAllDonations,
  } = useContext(DonationsContext);

  const Component = currentTab.component;

  return (
    <div className="dashboard-content">
      {Component && (
        <Component
          donations={donations}
          onAddDonation={addDonation}
          onOpenDonationModal={openDonationModal}
          onViewAllDonations={onViewAllDonations}
          setCurrentTab={setCurrentTab}
        />
      )}
    </div>
  );
};

export default Content;
