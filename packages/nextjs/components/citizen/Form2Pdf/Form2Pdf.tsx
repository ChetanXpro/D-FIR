import React from "react";
import { FIR } from "./form.types";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// Define the shape of your data

const Form2Pdf: React.FC = () => {
  const jsonData: FIR[] = [
    {
      basicDetails: {
        district: "Bengaluru",
        policeStation: "Koramangala",
        year: "2019",
        firNumber: "1234",
        dateAndTimeOfRegistration: "2019-01-01",
      },
      violatedActsWithSectionNumbers: [
        {
          act: "IPC",
          sectionNumber: "302",
        },
        {
          act: "IPC",
          sectionNumber: "304",
        },
      ],
      complainantDetails: {
        name: "John Doe",
        fatherName: "John Doe Sr.",
        dateOfBirth: "1990-01-01",
        uidNo: "1234-5678-9012",
        address: "123, 4th Cross, 5th Main, Koramangala, Bengaluru - 560034",
        permanentAddress: "123, 4th Cross, 5th Main, Koramangala, Bengaluru - 560034",
        mobileNumber: "1234567890",
        emailId: "johnDoe@gmail.com",
      },
      propertyDetails: {
        propertyType: "Cash",
        propertyDescription: "1000 INR",
        propertyValue: "1000",
      },
      accusedDetails: [
        {
          name: "John Doe",
          fatherName: "John Doe Sr.",
          dateOfBirth: "1990-01-01",
          uidNo: "1234-5678-9012",
          address: "123, 4th Cross, 5th Main, Koramangala, Bengaluru - 560034",
          permanentAddress: "123, 4th Cross, 5th Main, Koramangala, Bengaluru - 560034",
          mobileNumber: "1234567890",
          emailId: "accused@gmail.com",
        },
      ],
      witnessDetails: [
        {
          name: "John Doe",
          fatherName: "John Doe Sr.",
          dateOfBirth: "1990-01-01",
          uidNo: "1234-5678-9012",
          address: "123, 4th Cross, 5th Main, Koramangala, Bengaluru - 560034",
          permanentAddress: "123, 4th Cross, 5th Main, Koramangala, Bengaluru - 560034",
          mobileNumber: "1234567890",
          emailId: "witness@gmail.com",
        },
      ],
    },
  ];

  const generatePDF = () => {
    const doc = new jsPDF();

    jsonData.forEach((item, index) => {
      if (index !== 0) {
        doc.addPage();
      }
      doc.text(`FIR No: ${item.basicDetails.firNumber}`, 10, 10);
      doc.text(`Date and Time of Registration: ${item.basicDetails.dateAndTimeOfRegistration}`, 10, 15);
      doc.text(`Complainant Name: ${item.complainantDetails.name}`, 10, 20);
      doc.text(`Complainant Address: ${item.complainantDetails.address}`, 10, 25);
      doc.text(`Complainant Mobile Number: ${item.complainantDetails.mobileNumber}`, 10, 30);
      doc.text(`Complainant Email ID: ${item.complainantDetails.emailId}`, 10, 35);
      doc.text(`Complainant UID Number: ${item.complainantDetails.uidNo}`, 10, 40);
      doc.text(`Complainant Date of Birth: ${item.complainantDetails.dateOfBirth}`, 10, 45);
      doc.text(`Complainant Father's Name: ${item.complainantDetails.fatherName}`, 10, 50);
      doc.text(`Complainant Permanent Address: ${item.complainantDetails.permanentAddress}`, 10, 55);
      doc.text(`Property Type: ${item.propertyDetails.propertyType}`, 10, 60);
      doc.text(`Property Description: ${item.propertyDetails.propertyDescription}`, 10, 65);

      doc.text(`Accused Name: ${item.accusedDetails[0].name}`, 10, 70);
      doc.text(`Accused Address: ${item.accusedDetails[0].address}`, 10, 75);
      doc.text(`Accused Mobile Number: ${item.accusedDetails[0].mobileNumber}`, 10, 80);
      doc.text(`Accused Email ID: ${item.accusedDetails[0].emailId}`, 10, 85);
      doc.text(`Accused UID Number: ${item.accusedDetails[0].uidNo}`, 10, 90);
      doc.text(`Accused Date of Birth: ${item.accusedDetails[0].dateOfBirth}`, 10, 95);
      doc.text(`Accused Father's Name: ${item.accusedDetails[0].fatherName}`, 10, 100);
      doc.text(`Accused Permanent Address: ${item.accusedDetails[0].permanentAddress}`, 10, 105);
      doc.text(`Witness Name: ${item.witnessDetails[0].name}`, 10, 110);
      doc.text(`Witness Address: ${item.witnessDetails[0].address}`, 10, 115);
      doc.text(`Witness Mobile Number: ${item.witnessDetails[0].mobileNumber}`, 10, 120);
      doc.text(`Witness Email ID: ${item.witnessDetails[0].emailId}`, 10, 125);
      doc.text(`Witness UID Number: ${item.witnessDetails[0].uidNo}`, 10, 130);
      doc.text(`Witness Date of Birth: ${item.witnessDetails[0].dateOfBirth}`, 10, 135);
      doc.text(`Witness Father's Name: ${item.witnessDetails[0].fatherName}`, 10, 140);
      doc.text(`Witness Permanent Address: ${item.witnessDetails[0].permanentAddress}`, 10, 145);

      doc.text(`Property Value: ${item.propertyDetails.propertyValue}`, 10, 150);
      doc.text(`District: ${item.basicDetails.district}`, 10, 155);
      doc.text(`Police Station: ${item.basicDetails.policeStation}`, 10, 160);
      doc.text(`Year: ${item.basicDetails.year}`, 10, 165);

      item.violatedActsWithSectionNumbers.forEach((record, index) => {
        doc.text(`Act ${index + 1}: ${record.act}`, 10, 170 + index * 5);
        doc.text(`Section Number ${index + 1}: ${record.sectionNumber}`, 10, 175 + index * 5);
      });

      // Add more text and tables as needed
      // Example for adding a table
      autoTable(doc, {
        head: [["Act", "Section Number"]],
        body: item.violatedActsWithSectionNumbers.map(record => [record.act, record.sectionNumber]),
        startY: 20,
      });

      // Similarly add other sections of the FIR
      // ...
    });

    // Save the PDF
    doc.save("FIR_Report.pdf");
  };

  return (
    <div>
      <button onClick={generatePDF}>Export to PDF</button>
    </div>
  );
};

export default Form2Pdf;
