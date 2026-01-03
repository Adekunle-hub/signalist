import Alert from "@/components/Alert";
import News from "@/components/News";
import WatchlistTable from "@/components/WatchlistTable";

const page = () => {
  return (
    <main className="flex flex-col w-[95%] mx-auto">
      <section className="flex md:flex-row flex-col gap-8 pt-6 pb-2  ">
        <div className="flex-[70%]">
          <WatchlistTable />
        </div>
        <div className="flex-1/3">
          <Alert />
        </div>
      </section>
      <section className=" w-full">
        <News />
      </section>
    </main>
  );
};

export default page;
