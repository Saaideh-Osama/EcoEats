import ReactDOM from "react-dom";
import "./Sidebar.css";
import { IoMdCloseCircleOutline } from "react-icons/io";

const Sidebar = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <div className="sidebar-overlay" onClick={onClose}>
      <div className="sidebar-panel" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
        <div className="sidebar-close" onClick={onClose}>
            <IoMdCloseCircleOutline />
</div>

    </div>,
    document.getElementById("sidebar-root")
  );
};

export default Sidebar;
