import { FaUser, FaChartBar, FaFileAlt } from "react-icons/fa";

const UserSidebar = ({ userProfile={}, setActiveSection, activeSection }) => {
    const menuItems = [
      { key: "profile", label: "Profile Details", icon: <FaUser className="text-xl" /> },
      { key: "apply", label: "Apply for Certificate", icon: <FaFileAlt className="text-xl" /> },
      { key: "status", label: "View Status", icon: <FaChartBar className="text-xl" /> },
    ];
  
    return (
      <div className="w-74 bg-gray-900 text-white h-full shadow-md flex flex-col">
        {/* User Info */}
        <h2 className="text-2xl text-center font-bold border-b border-black border-4 mx-2 rounded-sm bg-white text-black p-1">OTR Portal</h2>
        
        <div className="p-6">
            <div className="flex flex-col items-center border-b pb-6 mb-4">
            <img src={userProfile.avatar} alt="User Avatar" className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-md" />
            <h2 className="text-xl font-semibold mt-2">{userProfile.fullName}</h2>
            <p className="text-sm px-2 py-1 mt-1 rounded-md text-white font-semibold bg-green-500 ">
                {userProfile.isVerified}
            </p>
            </div>
    
            {/* Menu Items */}
            <ul className="space-y-3">
                {menuItems.map((item) => (
                    <li
                    key={item.key}
                    className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg text-base transition-all
                        ${activeSection === item.key ? "bg-blue-500 text-white font-semibold" : "hover:bg-gray-700"}`}
                    onClick={() => setActiveSection(item.key)}
                    >
                    {item.icon}
                    {item.label}
                    </li>
                ))}
            </ul>
        </div>
      </div>
    );
  };

export default UserSidebar