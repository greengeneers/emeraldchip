const Content = ({ currentTab, onViewAllDonations, onOpenDonationModal, onAddDonation, donations }) => {
  const Component = currentTab.component;

  return (
    <div className="dashboard-content">
      {Component && (
        <Component
          donations={donations}
          onViewAllDonations={onViewAllDonations}
          onOpenDonationModal={onOpenDonationModal}
          onAddDonation={onAddDonation}  
        />
      )}
    </div>
  );
};

export default Content;
