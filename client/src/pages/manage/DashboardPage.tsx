import Navbar from "../../components/layout/Navbar";

function DashboardPage() {
  return (
    <div className="flex h-screen flex-row">
      <Navbar
        items={[
          { label: "Dashboard" },
          { label: "Projects" },
          { label: "Tasks" },
          { label: "Reports" },
          { label: "Settings", position: "bottom" },
          { label: "Profile", position: "bottom" },
        ]}
      />
      {/* Main content  */}
      <div></div>
    </div>
  );
}

export default DashboardPage;
