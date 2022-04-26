import styled from "styled-components";

const Container = styled.div`
  background-color: #221f1f;
  height: 120px;
  width: max(1190px, 1190px);
`;
const DownloadContainer = styled.div`
  background-color: white;
  height: 6px;
  width: max(1190px, 1190px);
`;

const PreviewPageBreak = ({ downloadClicked }) => {
  return <>{downloadClicked ? <DownloadContainer /> : <Container />}</>;
};
export default PreviewPageBreak;
