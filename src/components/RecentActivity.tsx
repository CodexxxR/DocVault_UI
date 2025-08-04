import "../styles/recentActivity.css";
import { mockActivity } from "../assets/mocks/mockActivity";

const RecentActivity = () => {
  return (
    <div className="activity-container">
      <h3 className="activity-header">Recent Activity</h3>
      <ul className="activity-list">
        {mockActivity.map(activity => (
          <li key={activity.id} className="activity-item">
            <span className={`activity-type ${activity.action}`}>
              {activity.action.toUpperCase()}
            </span>{" "}
            <span className="activity-title">{activity.documentTitle}</span> by{" "}
            <strong>{activity.performedBy}</strong> on{" "}
            {new Date(activity.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;
