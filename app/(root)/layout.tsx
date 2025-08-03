import getCurrentUser from "../actions/getCurrentUser";
import Navbar from "../components/navbar/Navbar";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <main>
      <Navbar currentUser={currentUser} />
      {children}
    </main>
  );
}
