import Header from "./Header";

function UserLayout({
  showSearchBox,
  children,
}: {
  showSearchBox?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col">
      <Header showSearch={showSearchBox ?? true} />
      <main
        className="flex-1 min-w-7xl items-center mx-auto w-full"
        style={{ height: "calc(100vh -54px)" }}
      >
        {children}
      </main>
    </div>
  );
}

export default UserLayout;
