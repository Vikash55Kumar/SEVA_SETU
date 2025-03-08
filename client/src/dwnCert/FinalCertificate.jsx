import React, { useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import logo1 from "../assets/logo1.jpeg";
import { QRCodeCanvas } from "qrcode.react"; 
import moment from "moment";

const FinalCertificate = React.memo(function FinalCertificate({onPdfGenerated, certificateData}) {

  const certificateRef = useRef();
  const date = new Date();
  const certificateNumber = Math.floor((Math.random() * 1000000000) + 90000000000);
  // const certificateData = certificateDatas[4]
  // console.log(certificateData);

  const generatePDF = async () => {
    const input = certificateRef.current;

    // ✅ Higher scale for better quality (3 or 4 recommended)
    const canvas = await html2canvas(input, { scale: 3, useCORS: true });

    const imgData = canvas.toDataURL("image/png");

    // ✅ Set A4 size correctly (210 × 297 mm)
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // ✅ Maintain aspect ratio to fit full page
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // ✅ If height is greater than A4, adjust it
    const finalHeight = imgHeight > pageHeight ? pageHeight : imgHeight;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, finalHeight, undefined, "FAST");

    // ✅ Convert PDF to Blob
    const pdfBlob = pdf.output("blob");
    
    const pdfFile = new File([pdfBlob], "certificate.pdf", { type: "application/pdf" });
    
    onPdfGenerated(pdfFile, certificateNumber);
  };

  useEffect(() => {
    generatePDF();
  }, []);

  return (
    <div  ref={certificateRef} className="flex flex-col h-100vh items-center bg-white p-16">
      <table className="border border-black w-full h-100vh text-center">
        <tr>
          <td className="border border-black p-2 w-32">
            <img src={logo1} className="w-32 h-20" alt="Logo" />
          </td>
          <td className="border border-black p-2" colSpan="2">
            <h4 className="text-lg font-semibold">REVENUE DEPARTMENT, GOVT OF NCT OF DELHI</h4>
            <h4 className="text-lg font-semibold">OFFICE OF THE DISTRICT MAGISTRATE</h4>
            <h4 className="text-lg font-semibold">NORTH EAST DISTRICT</h4>
          </td>
        </tr>
        <tr>
          <td colSpan="3" className="border border-black p-2">
            <h4 className="text-xl font-bold">{certificateData.certificateType}</h4>
            <h4>For applying for application to Posts under the Government of India</h4>
          </td>
        </tr>
        <tr className="border border-black">
          <td colSpan="3" className="border-b-0 p-4">
            <table className="w-full">
              <tr>
                <td className="w-24">
                <QRCodeCanvas 
                value={`${certificateData.certificateType}\nCertificate No: ${certificateNumber}\nName: ${certificateData.fullName}\nDate: ${moment(date).format('DD/MM/YYYY')}`}
                size={90}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"H"}
              />
                </td>
                <td className="text-left">
                  <h5 className="text-lg  font-medium">CERTIFICATE NO: {certificateNumber}</h5>
                </td>
                <td className="w-24 p-2">
                  <img src={certificateData.avatar} className="w-24 h-20" alt="Profile" />
                </td>
              </tr>
            </table>
            <p className="m-6 text-sm text-justify leading-relaxed font-sans">
              This is to certify that <span className="font-bold">{certificateData.fullName}</span> D/o <span className="font-bold mr-2">{certificateData.fatherName}</span>
              R/o <span className="font-bold">{certificateData.address} INDIA</span> belongs to the
              <span className="font-bold mr-2">NAI</span> community and is recognized as Other Backward Class under the Government of India,
              Ministry of Social Justice and Empowerment.
              <br /><br />
              <span className="font-bold">{certificateData.fullName}</span> and her family ordinarily reside at <span className="font-bold">{certificateData.address} INDIA</span>.
              <br /><br />
              This certificate is issued on the basis of {certificateData.caste} certificate issued to <span className="font-bold mr-2">{certificateData.fullName}</span> 
              R/o <span className="font-bold">{certificateData.address} INDIA</span> belongs to the <span className="font-bold mr-2">NAI</span>
              community of <span className="font-bold">DELHI</span> State wide certificate no <span className="font-bold">36968</span> dated
              <span className="font-bold ml-2">{moment(date).format('DD/MM/YYYY')}</span> issued by the <span className="font-bold">TEHSILDAR NORTH EAST DISTRICT</span>.
              <br /><br />
              This is also to certify that she does not belong to the person/sections (Creamy layer) mentioned in column 3 of the
              Schedule to the Government of India, Department of Personnel & Training O.M. No. 36012/22/93-Esst(SCT), 36033/3/2004-Esst(RES),
              36033/1/2013-ESST(RES) dated 8/9/2004 & 14/10/2008 and 27/5/2013 respectively.
            </p>
            <h5 className="mt-10 mr-10 text-right font-medium">
              Digitally Signed By <span className="font-bold">RAJESH DHAWAL</span>
              <br />
              TEHSILDAR
              <br />
              {moment(date).format('DD-MM-YYYY')} {moment(date).format('hh:mm:ss A')}
            </h5>
          </td>
        </tr>
        <tr>
          <td colSpan="2" className="border-none p-4">
            <ol className="list-decimal text-sm mx-6 text-justify items-center leading-relaxed">
              <li>This certificate is valid as per Information Technology Act 2000 as amended from time to time.</li>
              <li>The Authenticity of the document should be verified at http://edistrict.delhigovt.nic.in.</li>
              <li>Any discrepancy in this document when compared to those available on the website renders it invalid.</li>
              <li>The onus of checking the legitimacy is on the users of the document.</li>
              <li>The Non-creamy layer status of the applicant has been certified based on the self-declaration provided by the applicant.</li>
            </ol>
          </td>
        </tr>
      </table>
    </div>
  );
});

export default FinalCertificate;
