import Meta from "../shared/Meta";
import AppHeader from "./header/AppHeader";
import { Footer } from "./footer/Footer";
import { Navbar } from "./navbar/Navbar";

interface Props {
  title: string;
  desc: string;
  children: React.ReactNode;
}

const AppLayout = ({ title, desc, children }: Props) => {
  return (
    <div className="flex min-h-screen font-sans antialiased text-gray-600 bg-gray-100 dark:bg-gray-900">
      <Meta pageTitle={title} description={desc} />

      <main className="relative w-full h-screen overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-2xl">
        <div className="flex items-start justify-between">
          <div className="relative hidden h-screen my-4 ml-4 shadow-lg lg:block w-80">
            <div className="h-full ">
              <Navbar />
            </div>
          </div>
          <div className="flex flex-col w-full p-4">
            <AppHeader />
            <div className="h-screen p-2 pb-24 overflow-auto">{children}</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
