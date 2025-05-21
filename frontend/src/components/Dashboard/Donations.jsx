import { useContext } from "react";
import { listDonations } from "../../adapters/donation-adapter.js";
import Donation from "./Donations/Donation.jsx";
import DonationsContext from "../../contexts/donation-context";
import DonationModal from "./Donations/DonationsModal.jsx";
import "../../styles/Donations.css";

const Donations = () => {
  const {
    donations,
    isModalOpen,
    selectedDonation,
    openDonationModal,
    closeModal,
    saveDonation,
    showAll,
  } = useContext(DonationsContext);

  return (
    <div id="donations">
      <h1 className="tab-title">Donations</h1>
      <div className="donations-container">
        {donations.map((donation) => (
          <Donation
            data={donation}
            key={donation.id}
            onClick={() => openDonationModal(donation)}
          />
        ))}
      </div>

      {isModalOpen && selectedDonation && (
        <DonationModal
          donation={selectedDonation}
          onSave={saveDonation}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Donations;
