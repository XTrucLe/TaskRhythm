import Header from "./Header";

function UserLayout({
  showSearchBox,
  children,
}: {
  showSearchBox?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header showSearch={showSearchBox ?? true} />
      <main className="w-7xl items-center mx-auto">{children}</main>
    </div>
  );
}

export default UserLayout;
