/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

interface QRScannerProps {
  onScan: (data: string) => void;
  onClose: () => void;
}

export default function QRScanner({ onScan, onClose }: QRScannerProps) {
  const [error, setError] = useState<string>('');
  const [scanner, setScanner] = useState<Html5Qrcode | null>(null);
  
  useEffect(() => {
    // Initialize scanner
    const html5QrCode = new Html5Qrcode("qr-reader");
    setScanner(html5QrCode);

    const startScanner = async () => {
      try {
        await html5QrCode.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            onScan(decodedText);
            // Don't stop here, let the cleanup handle it
          },
          () => {
            // Ignore errors during scanning
          }
        );
      } catch (err) {
        setError('Camera access failed. Please check permissions and try again.');
      }
    };

    startScanner();

    // Cleanup function
    return () => {
      if (html5QrCode.isScanning) {
        html5QrCode.stop().catch(() => {
          // Ignore stop errors
          console.log('Scanner cleanup completed');
        });
      }
    };
  }, [onScan]);

  const handleClose = async () => {
    if (scanner && scanner.isScanning) {
      try {
        await scanner.stop();
      } catch (err) {
        console.log('Error stopping scanner:', err);
      }
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl max-w-sm w-full mx-4">
        {error ? (
          <>
            <h3 className="text-lg font-semibold mb-2">Camera Access Error</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
            <button
              onClick={handleClose}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-xl"
            >
              Close
            </button>
          </>
        ) : (
          <>
            <div className="relative">
              <div id="qr-reader" className="w-full rounded-lg overflow-hidden" />
              <button
                onClick={handleClose}
                className="absolute top-2 right-2 p-2 bg-gray-800/50 text-white rounded-full"
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
              Position the QR code within the frame to scan
            </p>
          </>
        )}
      </div>
    </div>
  );
}