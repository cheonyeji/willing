import { styled } from "styled-components";
import ShowCalendar from "../components/calendar/ShowCalendar";
import MemoPage from "./MemoPage";

type pageProps = { className: string };

function RightSidePage(props: pageProps) {
  return (
    <div className={props.className}>
      <ShowCalendarWrapper className="" />
      <MemoPageWrapper className="" />
    </div>
  );
}

export default RightSidePage;

const ShowCalendarWrapper = styled((props: pageProps) => (
  <ShowCalendar {...props} />
))`
  background-color: #ffffff;
  border-radius: 7px;
  margin-bottom: 30px;
  @media (max-width: 768px) {
  height: 100vh;
  }
`;

const MemoPageWrapper = styled((props: pageProps) => <MemoPage {...props} />)`
  background-color: #ffffff;
  border-radius: 7px;
  @media (max-width: 768px) {
    height: 100vh;
  }
`;

