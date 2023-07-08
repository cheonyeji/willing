import ShowCalendar from "../components/calendar/ShowCalendar";
import MemoPage from "./MemoPage";

type pageProps = { className: string };

function RightSidePage(props: pageProps) {
  return (
    <div className={props.className}>
      <ShowCalendar />
      <MemoPage />
    </div>
  );
}

export default RightSidePage;
