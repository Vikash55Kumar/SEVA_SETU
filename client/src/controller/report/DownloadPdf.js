import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const DownloadPDF = async (formTitle) => {
  try {
    const element = document.querySelector(".report");
    const canvas = await html2canvas(element, { scale: 2 });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${formTitle}.pdf`);

    // Generate base64 data URL
    const pdfURL = pdf.output("bloburl");

    // Open PDF in a new tab or window
    window.open(pdfURL);
  } catch (error) {
    console.error("Error generating PDF:", error);
    toast.error("Failed to download the PDF");
  } 
};
