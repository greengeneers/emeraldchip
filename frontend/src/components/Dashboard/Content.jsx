const Content = ({ currentTab }) => {
  return (
    <div className="dashboard-content">
      {currentTab.component && <currentTab.component />}
    </div>
  );
};

export default Content;
