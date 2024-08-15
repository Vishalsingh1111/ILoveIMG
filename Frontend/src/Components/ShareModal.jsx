import React, { useState } from 'react';
import { FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';

const ShareModal = ({ showModal, onClose, onShare, downloadLink }) => {
    const [email, setEmail] = useState('');

    const handleEmailShare = () => {
        onShare(email, downloadLink);
        setEmail('');
    };

    const shareVia = (platform) => {
        const encodedLink = encodeURIComponent(downloadLink);
        let shareUrl = '';

        switch (platform) {
            case 'whatsapp':
                shareUrl = `https://api.whatsapp.com/send?text=Here%20is%20the%20link%20to%20the%20file:%20${encodedLink}`;
                break;
            case 'telegram':
                shareUrl = `https://t.me/share/url?url=${encodedLink}`;
                break;
            default:
                return;
        }

        window.open(shareUrl, '_blank');
    };

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold mb-4">Share File</h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter recipient email"
                    className="border border-gray-300 p-2 rounded w-full mb-4"
                />
                <button
                    onClick={handleEmailShare}
                    className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                >
                    Send Email
                </button>
                <button
                    onClick={onClose}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                    Close
                </button>
                <div className="flex space-x-2 mt-4">
                    <button
                        onClick={() => shareVia('whatsapp')}
                        className="text-green-500"
                        title="Share via WhatsApp"
                    >
                        <FaWhatsapp size={28} />
                    </button>
                    <button
                        onClick={() => shareVia('telegram')}
                        className="text-blue-500"
                        title="Share via Telegram"
                    >
                        <FaTelegramPlane size={28} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShareModal;
