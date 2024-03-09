import { Suspense, useState, useTransition } from "react";
import MainPage from "../Main/index.js";
import Layout from "../../components/Layout/index.js";
import Loader from "../../components/Loader/index.js";

// FIXME: REMOVE TO SEPERATE CONTAINER
function SearchPage() {
  return <div>Search smth</div>;
}

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Router />
    </Suspense>
  );
}

function Router() {
  const [page, setPage] = useState("/");
  const [isPending, startTransition] = useTransition();

  function navigate(url) {
    startTransition(() => {
      setPage(url);
    });
  }

  let content;
  if (page === "/") {
    content = <MainPage navigate={navigate} />;
  } else if (page === "/search") {
    content = (
      <SearchPage
        artist={{
          id: "the-beatles",
          name: "The Beatles",
        }}
      />
    );
  }
  return (
    <Layout isPending={isPending} navigate={navigate}>
      {content}
    </Layout>
  );
}
