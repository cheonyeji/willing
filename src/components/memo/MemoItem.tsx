import { styled } from "styled-components";
import Memo from "../../models/memo";

type MemoItemProps = {
  item: Memo;
};
function MemoItem({ item }: MemoItemProps) {
  const hours =
    new Date(item.sendTime).getHours() % 12 ? new Date(item.sendTime).getHours() % 12 : 12;
  const ampm = new Date(item.sendTime).getHours() >= 12 ? "PM" : "AM";
  return (
    <Li>
      <ChatText>
        <TextSpan>{item.text}</TextSpan>
      </ChatText>
      <TimeSpan>
        {String(hours).padStart(2, "0") +
          ":" +
          String(new Date(item.sendTime).getMinutes()).padStart(2, "0") +
          " " +
          ampm}
      </TimeSpan>
    </Li>
  );
}

export default MemoItem;

const Li = styled.li`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

`;

const ChatText = styled.div`
  background-color: #f0f5fc;
  border-radius: 30px 30px 1px 30px;
  margin: 8px;
  
`;

const TimeSpan = styled.span`
  font-size: 10px;
  margin-right: 5px;
  margin: 8px;
  color: #929292;
`;

const TextSpan = styled.span`
  margin: 24px 27px;
  word-break: break-all; // ~ 등의 문자 줄바꿈을 위해
  display: inline-block;
`;
