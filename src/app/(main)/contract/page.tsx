"use client";

// components/DigitalSignatureField.tsx
import SignatureCanvas from "react-signature-canvas";
import { useRef } from "react";

function DigitalSignatureField() {
  const sigRef = useRef<SignatureCanvas>(null);

  const handleClear = () => sigRef.current?.clear();
  const handleSave = () => {
    const signature = sigRef.current?.toDataURL();
    console.log(signature);
  };

  return (
    <div>
      <h3 className="font-medium mb-2">title</h3>
      <div className="border rounded-md h-32 bg-white">
        <SignatureCanvas
          ref={sigRef}
          penColor="black"
          canvasProps={{ className: "w-full h-full" }}
        />
      </div>
      <div className="flex gap-2 mt-2">
        <button
          onClick={handleClear}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Clear
        </button>
        <button
          onClick={handleSave}
          className="text-sm text-primary hover:text-primary-dark"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default DigitalSignatureField;
