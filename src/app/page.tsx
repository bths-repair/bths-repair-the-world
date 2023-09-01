import { FC, Suspense } from "react";
import { Banner, JoinButton, REPAIRTabs } from "./components";
import Layout from "@/components/Layout";
import { Loading } from "@/components/Loading";

export const metadata = {
  title: "Home - BTHS Repair the World",
  description: "Inspring BTHS youth to make change in a unjust society.",
};

const HomePage: FC = () => {
  return (
    <>
      <Banner />
      <Layout>
        <REPAIRTabs />
        <JoinButton />
      </Layout>
    </>
  );
};

const HomePageSuspense: FC = () => {
  return (
    <Suspense fallback={<Loading>Loading Homepage...</Loading>}>
      <HomePage />
    </Suspense>
  );
};

export default HomePageSuspense;
