import Groups from "../components/group/Groups";
import NewGroup from "../components/group/NewGroup";

type pageProps = { className: string };

function SidebarPage(props: pageProps) {
  return (
    <div className={props.className}>
      <Groups />
      <NewGroup />
    </div>
  );
}

export default SidebarPage;
