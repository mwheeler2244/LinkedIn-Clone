import {
  Search,
  Home,
  Users,
  Briefcase,
  MessageSquare,
  Bell,
  User,
  ChevronDown,
  Menu,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { User as UserType } from "../../types";

interface HeaderProps {
  currentUser: UserType;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  showSearchResults: boolean;
  searchResults: {
    posts: any[];
    connections: any[];
    jobs: any[];
    people: any[];
  };
  onCloseSearchResults: () => void;
  showToastMessage: (
    message: string,
    type?: "success" | "info" | "warning" | "error"
  ) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showProfileMenu: boolean;
  setShowProfileMenu: (show: boolean) => void;
  showMobileMenu: boolean;
  setShowMobileMenu: (show: boolean) => void;
  setShowMessagingModal: (show: boolean) => void;
  onLogout: () => void;
}

const Header = ({
  currentUser,
  searchTerm,
  onSearchChange,
  showSearchResults,
  searchResults,
  onCloseSearchResults,
  showToastMessage,
  activeTab,
  setActiveTab,
  showProfileMenu,
  setShowProfileMenu,
  showMobileMenu,
  setShowMobileMenu,
  setShowMessagingModal,
  onLogout,
}: HeaderProps) => {
  const NavItem = ({
    icon: Icon,
    label,
    tabKey,
    count,
  }: {
    icon: any;
    label: string;
    tabKey: string;
    count?: number;
  }) => (
    <button
      onClick={() => setActiveTab(tabKey)}
      className={`cursor-pointer flex flex-col items-center px-3 py-2 text-xs font-normal relative transition-colors ${
        activeTab === tabKey
          ? "text-gray-900"
          : "text-gray-600 hover:text-gray-900"
      }`}
    >
      <div className="relative">
        <Icon size={24} strokeWidth={1.5} />
        {count && count > 0 && (
          <span
            className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium"
            style={{ fontSize: "10px" }}
          >
            {count}
          </span>
        )}
      </div>
      <span className="mt-1">{label}</span>
      {activeTab === tabKey && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
      )}
    </button>
  );

  return (
    <header className="bg-white border-b border-gray-300 py-1 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-700 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">NX</span>
            </div>
            <div className="relative ml-2 hidden lg:block search-container">
              <Search
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                size={16}
              />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-8 pr-4 py-1.5 w-72 bg-gray-100 rounded text-sm border-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
              />

              {showSearchResults && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto z-50">
                  {searchResults.people.length > 0 && (
                    <div className="p-3">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">
                        People
                      </h3>
                      {searchResults.people.slice(0, 3).map((person, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            showToastMessage(
                              `Viewing ${person.name}'s profile`,
                              "info"
                            );
                            onCloseSearchResults();
                          }}
                          className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <img
                            src={person.avatar}
                            alt={person.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {person.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {person.title}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {searchResults.posts.length > 0 && (
                    <div className="p-3 border-t border-gray-100">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">
                        Posts
                      </h3>
                      {searchResults.posts.slice(0, 2).map((post) => (
                        <div
                          key={post.id}
                          onClick={() => {
                            showToastMessage(
                              `Opening post by ${post.author.name}`,
                              "info"
                            );
                            onCloseSearchResults();
                          }}
                          className="p-2 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <div className="flex items-center space-x-2 mb-1">
                            <img
                              src={post.author.avatar}
                              alt={post.author.name}
                              className="w-6 h-6 rounded-full"
                            />
                            <span className="text-sm font-medium text-gray-900">
                              {post.author.name}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 truncate">
                            {post.content.slice(0, 60)}...
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {searchResults.jobs.length > 0 && (
                    <div className="p-3 border-t border-gray-100">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">
                        Jobs
                      </h3>
                      {searchResults.jobs.slice(0, 2).map((job) => (
                        <div
                          key={job.id}
                          onClick={() => {
                            showToastMessage(
                              `Opening job: ${job.title} at ${job.company}`,
                              "info"
                            );
                            onCloseSearchResults();
                          }}
                          className="p-2 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <p className="text-sm font-medium text-gray-900">
                            {job.title}
                          </p>
                          <p className="text-xs text-gray-500">{job.company}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {searchResults.connections.length > 0 && (
                    <div className="p-3 border-t border-gray-100">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">
                        Connections
                      </h3>
                      {searchResults.connections
                        .slice(0, 2)
                        .map((connection) => (
                          <div
                            key={connection.id}
                            onClick={() => {
                              showToastMessage(
                                `Viewing ${connection.name}'s profile`,
                                "info"
                              );
                              onCloseSearchResults();
                            }}
                            className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                          >
                            <img
                              src={connection.avatar}
                              alt={connection.name}
                              className="w-8 h-8 rounded-full"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {connection.name}
                              </p>
                              <p className="text-xs text-gray-500 truncate">
                                {connection.title} at {connection.company}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}

                  {searchResults.people.length === 0 &&
                    searchResults.posts.length === 0 &&
                    searchResults.jobs.length === 0 &&
                    searchResults.connections.length === 0 && (
                      <div className="p-4 text-center">
                        <p className="text-sm text-gray-500">
                          No results found for "{searchTerm}"
                        </p>
                      </div>
                    )}
                </div>
              )}
            </div>
          </div>

          <nav className="hidden lg:flex items-center">
            <NavItem icon={Home} label="Home" tabKey="home" />
            <NavItem icon={Users} label="Network" tabKey="network" count={5} />
            <NavItem icon={Briefcase} label="Jobs" tabKey="jobs" />
            <button
              onClick={() => setShowMessagingModal(true)}
              className={`cursor-pointer flex flex-col items-center px-3 py-2 text-xs font-normal relative transition-colors ${
                activeTab === "messages"
                  ? "text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <div className="relative">
                <MessageSquare size={24} strokeWidth={1.5} />
                <span
                  className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium"
                  style={{ fontSize: "10px" }}
                >
                  3
                </span>
              </div>
              <span className="mt-1">Messaging</span>
            </button>
            <NavItem
              icon={Bell}
              label="Notifications"
              tabKey="notifications"
              count={8}
            />
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="cursor-pointer flex flex-col items-center px-3 py-2 text-xs font-normal text-gray-600 hover:text-gray-900 transition-colors"
              >
                <img
                  src={currentUser.avatar}
                  alt="Me"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <div className="flex items-center mt-1">
                  <span>Me</span>
                  <ChevronDown size={12} className="ml-0.5" />
                </div>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">
                          {currentUser.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {currentUser.title}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="py-2">
                    <button
                      onClick={() => {
                        setActiveTab("profile");
                        setShowProfileMenu(false);
                      }}
                      className="cursor-pointer w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <User size={16} className="mr-3" />
                      View Profile
                    </button>
                    <button
                      onClick={() =>
                        showToastMessage("Settings & Privacy coming soon!")
                      }
                      className="cursor-pointer w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <Settings size={16} className="mr-3" />
                      Settings & Privacy
                    </button>
                    <button
                      onClick={() => showToastMessage("Help coming soon!")}
                      className="cursor-pointer w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <HelpCircle size={16} className="mr-3" />
                      Help
                    </button>
                  </div>

                  <div className="border-t border-gray-200 py-2">
                    <button
                      onClick={onLogout}
                      className="cursor-pointer w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut size={16} className="mr-3" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="border-l border-gray-300 ml-3 pl-3">
              <div
                onClick={() =>
                  showToastMessage("Please check back soon!", "info")
                }
                className="flex flex-col items-center px-2 py-2 text-xs font-normal text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
              >
                <div className="grid grid-cols-3 gap-0.5 w-6 h-6">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 bg-gray-600 rounded-sm"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="ml-4 text-xs">
              <span
                onClick={() => showToastMessage("Please check your email!")}
                className="text-amber-600 hover:underline cursor-pointer font-medium"
              >
                Reactivate Premium: 50% Off
              </span>
            </div>
          </nav>

          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="cursor-pointer lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <Menu size={24} />
          </button>
        </div>

        <div className="lg:hidden pb-3"></div>
      </div>

      {showMobileMenu && (
        <div className="lg:hidden bg-white border-t border-gray-200 py-2">
          <div className="space-y-1">
            <button
              onClick={() => {
                setActiveTab("home");
                setShowMobileMenu(false);
              }}
              className={`cursor-pointer w-full text-left px-4 py-3 flex items-center space-x-3 ${
                activeTab === "home"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Home size={20} />
              <span>Home</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("network");
                setShowMobileMenu(false);
              }}
              className={`cursor-pointer w-full text-left px-4 py-3 flex items-center space-x-3 ${
                activeTab === "network"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Users size={20} />
              <span>Network</span>
              <span className="ml-auto bg-red-600 text-white text-xs rounded-full px-2 py-1">
                5
              </span>
            </button>
            <button
              onClick={() => {
                setActiveTab("jobs");
                setShowMobileMenu(false);
              }}
              className={`cursor-pointer w-full text-left px-4 py-3 flex items-center space-x-3 ${
                activeTab === "jobs"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Briefcase size={20} />
              <span>Jobs</span>
            </button>
            <button
              onClick={() => {
                setShowMessagingModal(true);
                setShowMobileMenu(false);
              }}
              className="cursor-pointer w-full text-left px-4 py-3 flex items-center space-x-3 text-gray-700 hover:bg-gray-50"
            >
              <MessageSquare size={20} />
              <span>Messaging</span>
              <span className="ml-auto bg-red-600 text-white text-xs rounded-full px-2 py-1">
                3
              </span>
            </button>
            <button
              onClick={() => {
                setActiveTab("notifications");
                setShowMobileMenu(false);
              }}
              className={`cursor-pointer w-full text-left px-4 py-3 flex items-center space-x-3 ${
                activeTab === "notifications"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Bell size={20} />
              <span>Notifications</span>
              <span className="ml-auto bg-red-600 text-white text-xs rounded-full px-2 py-1">
                8
              </span>
            </button>
            <button
              onClick={() => {
                setActiveTab("profile");
                setShowMobileMenu(false);
              }}
              className={`cursor-pointer w-full text-left px-4 py-3 flex items-center space-x-3 ${
                activeTab === "profile"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <img
                src={currentUser.avatar}
                alt="Profile"
                className="w-5 h-5 rounded-full"
              />
              <span>Profile</span>
            </button>
            <div className="border-t border-gray-200 mt-2 pt-2">
              <button
                onClick={onLogout}
                className="cursor-pointer w-full text-left px-4 py-3 flex items-center space-x-3 text-gray-700 hover:bg-gray-50"
              >
                <LogOut size={20} />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
