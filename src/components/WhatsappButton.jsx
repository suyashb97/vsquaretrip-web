import React from "react";

const WhatsappButton = ({ phoneNumber, message = "Hello!", children }) => {
  const openWhatsApp = () => {
    const countryCode = "91"; // India
    const fullNumber = countryCode + phoneNumber;
    const encodedMessage = encodeURIComponent(message);

    window.open(
      `https://wa.me/${fullNumber}?text=${encodedMessage}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <span
      onClick={openWhatsApp}
      className="inline-block"
    >
      {children}
    </span>
  );
};

export default WhatsappButton;
