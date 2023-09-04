import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { isModalShownState } from "../../models/atoms";

function Profile() {
  const [isModalShown, setIsModalShown] = useRecoilState(isModalShownState);
  const clickHandler = () => {
    setIsModalShown(isModalShown ? 0 : 3);
  };

  return (
    <Wrapper onClick={clickHandler}>
      <ProfileImg />
      <ProfileText>{"피곤한 고양이"}</ProfileText>
    </Wrapper>
  );
}

export default Profile;

const Wrapper = styled.div`
  margin-top: 34px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 39px;
  @media (max-width: 768px) {
    flex-direction: column;
    margin-bottom: -30px;
    margin-left: 30px;
    margin-right: 8px;
    height: 130px;
  }
  &:hover {
    cursor: pointer;
  }
`;

const ProfileImg = styled.div`
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background-image: url("/resource/default_profile.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  margin-bottom: 17px;
  @media (max-width: 768px) {
    width: 63px;
    height: 63px;
  }
`;

const ProfileText = styled.span`
  font-size: 14px;

  @media (max-width: 768px) {
    display: none;
  }
`;
