import UserContext from '../../contexts/current-user-context.js';
import { useContext } from 'react';

const Content = ({ currentTab }) => {
  const { currentUser } = useContext(UserContext);

  // TODO: Render components based on the `currentTab`

  return <div className="dashboard-content"></div>;
};

export default Content;
