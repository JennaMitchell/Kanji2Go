import styled from "styled-components";

const BlankSquareImage = styled.image`
  width: min(100%, 100%);
  height: min(100%, 100%);
`;
const PreviewBlankBox = ({ id }) => {
  return (
    <>
      <BlankSquareImage></BlankSquareImage>
    </>
  );
};
export default PreviewBlankBox;
