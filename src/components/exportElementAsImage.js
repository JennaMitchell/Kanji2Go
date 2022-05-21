import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

// const downloadImage = (blob, fileName) => {
//   const fakeLink = window.document.createElement("a");
//   // we create an anchor link in memory to simualte  a click and download the image

//   fakeLink.style = "display:none";
//   // to do this we set the style of display to none so it doesn't render

//   fakeLink.download = fileName;
//   // we then set the fileName we want it to be
//   fakeLink.href = blob;
//   // blob = image

//   document.body.appendChild(fakeLink);
//   // we then append it to our dom
//   fakeLink.click();
//   // simulate a fake clikc
//   document.body.removeChild(fakeLink);
//   // then remove the link
//   fakeLink.remove();
// };

// const exportAsImage = async (el, imageFileName) => {
//   const { jsPDF } = require("jspdf");
//   const doc = new jsPDF({
//     orientation: "p",
//     unit: "px",
//     format: "a4",
//     putOnlyUsedFonts: false,
//     compress: false,
//     precision: 2,
//     userUnit: 1.0,
//   });
//   console.log("Function was called");
//   const html = document.getElementsByTagName("html")[0];
//   const body = document.getElementsByTagName("body")[0];
//   let htmlWidth = html.clientWidth;
//   let bodyWidth = body.clientWidth;
//   let htmlHeight = html.clientHeight;
//   const newWidth = el.scrollWidth - el.clientWidth;
//   if (newWidth > el.clientWidth) {
//     // clientWidth is the inner width of an element in pixels, including padding
//     // scrollWidth: the minimum width that an element needs to fit in the container
//     // /by keeping the size dynamic, rather than static, we can accommodate a maximum number of use cases. For example. if there are only two visuals on the screen,
//     // we will not need to set the container width very high. But, if there are several visuals on the screen, we may need a high container width.

//     htmlWidth += newWidth;
//     bodyWidth += newWidth;
//   }
//   html.style.width = htmlWidth + "px";
//   body.style.width = bodyWidth + "px";
//   console.log("awaiting Starting");
//   const canvas = await html2canvas(el);
//   // this function accepts the give dom element el and reutnrs a P''romise contiang the <canvas> elmement
//   console.log("awaiting ended");
//   const image = canvas.toDataURL("image/png", 1.0);
//   doc.addImage(image, "png", 15, 2, htmlWidth, htmlHeight);
//   doc.save("test.pdf");
//   // then we take the canvas Promise elemnt and save it as a png with scaling 1.0

//   // downloadImage(image, imageFileName);
//   html.style.width = null;
//   html.style.width = null;
// };
const getCurrentDateStr = () => {
  const date = new Date();
  const yyyy = date.getFullYear().toString();
  const mm =
    date.getMonth() + 1 < 10
      ? "0" + date.getMonth() + 1
      : (date.getMonth() + 1).toString();
  const dd =
    date.getDate() < 10 ? "0" + date.getDate() : date.getDate().toString();
  const HH =
    date.getHours() < 10 ? "0" + date.getHours() : date.getHours().toString();
  const MM =
    date.getMinutes() < 10
      ? "0" + date.getMinutes()
      : date.getMinutes().toString();
  const SS =
    date.getSeconds() < 10
      ? "0" + date.getSeconds()
      : date.getSeconds().toString();
  return yyyy + mm + dd + HH + MM + SS;
};

const exportAsImage = (targetElm, fileName = null) => {
  let options = {
    jsPDF: {
      orientation: "p",
      unit: "px",
      format: "a4",
      putOnlyUsedFonts: false,
      compress: false,
      precision: 2,
      userUnit: 1,
    },
    html2canvas: {
      allowTaint: false,
      backgroundColor: "#ffffff",
      canvas: null,
      foreignObjectRendering: false,
      imageTimeout: 15000,
      logging: false,
      onclone: null,
      proxy: null,
      removeContainer: true,
      scale: window.devicePixelRatio,
      useCORS: false,
    },
  };
  let totalHeight = targetElm.offsetHeight;
  const pdf = new jsPDF(
    options.jsPDF.orientation,
    options.jsPDF.unit,
    options.jsPDF.format
  );
  const pdfWidth = pdf.internal.pageSize.width;
  const pdfHeight = pdf.internal.pageSize.height;
  window.scrollTo(0, 0);
  html2canvas(targetElm, options.html2canvas).then((canvas) => {
    const widthRatio = pdfWidth / canvas.width;
    const sX = 0;
    const sWidth = canvas.width;
    const sHeight =
      pdfHeight + (pdfHeight - pdfHeight * widthRatio) / widthRatio;
    const dX = 0;
    const dY = 0;
    const dWidth = sWidth;
    const dHeight = sHeight;
    let pageCnt = 1;
    while (totalHeight > 0) {
      totalHeight -= sHeight;
      let sY = sHeight * (pageCnt - 1);
      const childCanvas = document.createElement("CANVAS");
      childCanvas.setAttribute("width", sWidth);
      childCanvas.setAttribute("height", sHeight);
      const childCanvasCtx = childCanvas.getContext("2d");
      childCanvasCtx.drawImage(
        canvas,
        sX,
        sY,
        sWidth,
        sHeight,
        dX,
        dY,
        dWidth,
        dHeight
      );
      if (pageCnt > 1) {
        pdf.addPage();
      }
      pdf.setPage(pageCnt);
      pdf.addImage(
        childCanvas.toDataURL("image/png"),
        "PNG",
        0,
        0,
        canvas.width * widthRatio,
        0
      );
      pageCnt++;
    }
    if (fileName == null) {
      fileName = "";
    } else {
      fileName += "_";
    }
    fileName += getCurrentDateStr();
    pdf.save(fileName);
  });
  window.scrollTo(
    0,
    document.body.scrollHeight || document.documentElement.scrollHeight
  );
};

export default exportAsImage;
