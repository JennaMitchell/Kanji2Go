import html2canvas from "html2canvas";

const downloadImage = (blob, fileName) => {
  const fakeLink = window.document.createElement("a");
  // we create an anchor link in memory to simualte  a click and download the image

  fakeLink.style = "display:none";
  // to do this we set the style of display to none so it doesn't render

  fakeLink.download = fileName;
  // we then set the fileName we want it to be
  fakeLink.href = blob;
  // blob = image

  document.body.appendChild(fakeLink);
  // we then append it to our dom
  fakeLink.click();
  // simulate a fake clikc
  document.body.removeChild(fakeLink);
  // then remove the link
  fakeLink.remove();
};

const exportAsImage = async (el, imageFileName) => {
  console.log("Function was called");
  const html = document.getElementsByTagName("html")[0];
  const body = document.getElementsByTagName("body")[0];
  let htmlWidth = html.clientWidth;
  let bodyWidth = body.clientWidth;
  const newWidth = el.scrollWidth - el.clientWidth;
  if (newWidth > el.clientWidth) {
    // clientWidth is the inner width of an element in pixels, including padding
    // scrollWidth: the minimum width that an element needs to fit in the container
    // /by keeping the size dynamic, rather than static, we can accommodate a maximum number of use cases. For example. if there are only two visuals on the screen,
    // we will not need to set the container width very high. But, if there are several visuals on the screen, we may need a high container width.

    htmlWidth += newWidth;
    bodyWidth += newWidth;
  }
  html.style.width = htmlWidth + "px";
  body.style.width = bodyWidth + "px";
  console.log("awaiting Starting");
  const canvas = await html2canvas(el);
  // this function accepts the give dom element el and reutnrs a P''romise contiang the <canvas> elmement
  console.log("awaiting ended");
  const image = canvas.toDataURL("image/png", 1.0);
  // then we take the canvas Promise elemnt and save it as a png with scaling 1.0

  downloadImage(image, imageFileName);
  html.style.width = null;
  html.style.width = null;
};

export default exportAsImage;
