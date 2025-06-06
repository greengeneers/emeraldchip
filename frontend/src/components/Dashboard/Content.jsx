const Content = ({ currentTab, setCurrentTab }) => {
  const Component = currentTab.component;

  return (
    <div className="dashboard-content">
      {Component && <Component setCurrentTab={setCurrentTab} />}
    </div>
  );
};

export default Content;
