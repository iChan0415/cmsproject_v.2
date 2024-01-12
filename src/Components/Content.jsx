import React, { useState, useEffect } from "react";
import "../Css/content.css";
import cert from "../assets/cert.png";
import { pdfjs } from "react-pdf";
import { Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { BiFileFind } from "react-icons/bi";
import { MdOutlineFileDownload } from "react-icons/md";
import { FiSearch } from "react-icons/fi";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Content = ({ pdfPath }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [disableDownloadButton, setDisableDownloadButton] = useState(false);

  useEffect(() => {
    const fetchThumbnail = async () => {
      try {
        const loadingTask = pdfjs.getDocument(pdfPath);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1); // Fetch the first page

        const viewport = page.getViewport({ scale: 0.5 }); // Adjust scale as needed
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;

        // Convert the canvas content to a data URL
        const dataUrl = canvas.toDataURL();
        setThumbnailUrl(dataUrl);
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };

    fetchThumbnail();
  }, [pdfPath]);

  const handleDownloadClick = () => {
    if (disableDownloadButton) {
      return; // Do nothing if the button is disabled
    }

    // Trigger the download
    const link = document.createElement("a");
    link.href = pdfPath;
    link.download = "Certificate.pdf";

    link.addEventListener("abort", () => {
      setShowNotification({
        type: "danger",
        message: "Download aborted. Please try again.",
      });
    });

    link.addEventListener("error", () => {
      setShowNotification({
        type: "danger",
        message: "Error during download. Please try again.",
      });
    });

    link.click();

    // Show the notification
    setShowNotification({
      type: "success",
      message: "Download successful!",
    });

    // Disable the button for a specified duration (e.g., 10 seconds)
    setDisableDownloadButton(true);
    setTimeout(() => {
      setDisableDownloadButton(false);
      setShowNotification(null);
    }, 10000); // 10000 milliseconds (10 seconds)
  };

  return (
    <div>
      <section className="content">
        <section className="withSearchBar">
          <h1>Certifications</h1>
          <InputGroup expand="lg" size="sm" className="float-right">
            <Form.Control
              placeholder="Certificate Name"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <Button variant="success" id="button-addon2">
              <FiSearch className="icon search_icon" />
            </Button>
          </InputGroup>
        </section>
        <div className="hr"></div>
      </section>
      <section className="certificates">
        <div className="certificate_thumbnail">
          <div className="cert">
            {thumbnailUrl ? (
              <img src={thumbnailUrl} alt="PDF Thumbnail" />
            ) : (
              <p>Loading thumbnail...</p>
            )}

            <div className="overlay">
              <div className="buttons">
                <button className="view">
                  <BiFileFind className="icon view_icon" />
                </button>
                <button
                  className="download"
                  onClick={handleDownloadClick}
                  disabled={disableDownloadButton}
                >
                  <MdOutlineFileDownload className="icon download_icon" />
                </button>
              </div>
            </div>
          </div>
          <p>Course Title</p>
        </div>
        <div className="certificate_thumbnail">
          <div className="cert">
            {thumbnailUrl ? (
              <img src={thumbnailUrl} alt="PDF Thumbnail" />
            ) : (
              <p>Loading thumbnail...</p>
            )}

            <div className="overlay">
              <div className="buttons">
                <button className="view">
                  <BiFileFind className="icon view_icon" />
                </button>
                <button
                  className="download"
                  onClick={handleDownloadClick}
                  disabled={disableDownloadButton}
                >
                  <MdOutlineFileDownload className="icon download_icon" />
                </button>
              </div>
            </div>
          </div>
          <p>Course Title</p>
        </div>
        <div className="certificate_thumbnail">
          <div className="cert">
            {thumbnailUrl ? (
              <img src={thumbnailUrl} alt="PDF Thumbnail" />
            ) : (
              <p>Loading thumbnail...</p>
            )}

            <div className="overlay">
              <div className="buttons">
                <button className="view">
                  <BiFileFind className="icon view_icon" />
                </button>
                <button
                  className="download"
                  onClick={handleDownloadClick}
                  disabled={disableDownloadButton}
                >
                  <MdOutlineFileDownload className="icon download_icon" />
                </button>
              </div>
            </div>
          </div>
          <p>Course Title</p>
        </div>
        <div className="certificate_thumbnail">
          <div className="cert">
            {thumbnailUrl ? (
              <img src={thumbnailUrl} alt="PDF Thumbnail" />
            ) : (
              <p>Loading thumbnail...</p>
            )}

            <div className="overlay">
              <div className="buttons">
                <button className="view">
                  <BiFileFind className="icon view_icon" />
                </button>
                <button
                  className="download"
                  onClick={handleDownloadClick}
                  disabled={disableDownloadButton}
                >
                  <MdOutlineFileDownload className="icon download_icon" />
                </button>
              </div>
            </div>
          </div>
          <p>Course Title</p>
        </div>
      </section>
      {showNotification && (
        <Alert
          variant={showNotification.type}
          onClose={() => setShowNotification(null)}
          dismissible
          style={{
            position: "fixed",
            top: "10px", // Adjust the top position as needed
            right: "10px", // Adjust the right position as needed
            zIndex: 1000, // Ensure the alert appears above other elements
          }}
        >
          {showNotification.message}
        </Alert>
      )}
    </div>
  );
};

export default Content;
