import { styled } from "styled-components";

function Profile() {
  return (
    <Wrapper>
      <ProfileImg />
      <ProfileText>{"피곤한 고양이"}</ProfileText>
    </Wrapper>
  );
}

export default Profile;

const Wrapper = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 39px;
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
`;

const ProfileText = styled.span`
  font-size: 14px;
`;
