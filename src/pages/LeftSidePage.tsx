import GroupPage from "./GroupPage";
import ProfilePage from "./ProfilePage";

type pageProps = { className: string };

function SidebarPage(props: pageProps) {
  return (
    <div className={props.className}>
      <ProfilePage />
      <GroupPage />
    </div>
  );
}

export default SidebarPage;
