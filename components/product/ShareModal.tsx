import React, { useEffect, useRef, useState } from 'react';
import { X, Facebook, Twitter, Copy, Instagram, Mail, MessageSquare } from 'lucide-react';
import { MessageCircle } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  productUrl: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, productUrl }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleCopyLink = async () => {
    if (inputRef.current) {
      inputRef.current.select();
      try {
        await navigator.clipboard.writeText(productUrl);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (err) {
        console.error('Failed to copy text:', err);
      }
    }
  };

  const shareButtons = [
    {
      name: 'Facebook',
      icon: <Facebook className="w-5 h-5" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`,
      hoverClass: 'hover:bg-[#1877F2]'
    },
    {
      name: 'Messenger',
      icon: <MessageSquare className="w-5 h-5" />,
      url: `fb-messenger://share/?link=${encodeURIComponent(productUrl)}`,
      hoverClass: 'hover:bg-gradient-to-r hover:from-[#00B2FF] hover:to-[#006AFF]'
    },
    {
      name: 'Twitter',
      icon: <Twitter className="w-5 h-5" />,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(productUrl)}`,
      hoverClass: 'hover:bg-[#1DA1F2]'
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="w-5 h-5" />,
      url: `https://wa.me/?text=${encodeURIComponent(productUrl)}`,
      hoverClass: 'hover:bg-[#25D366]'
    },
    {
      name: 'Instagram',
      icon: <Instagram className="w-5 h-5" />,
      url: `https://instagram.com/share?url=${encodeURIComponent(productUrl)}`,
      hoverClass: 'hover:bg-gradient-to-tr hover:from-[#feda75] hover:via-[#fa7e1e] hover:via-[#d62976] hover:via-[#962fbf] hover:to-[#4f5bd5]'
    },
    {
      name: 'Email',
      icon: <Mail className="w-5 h-5" />,
      url: `mailto:?subject=Check out this product&body=${encodeURIComponent(productUrl)}`,
      hoverClass: 'hover:bg-gradient-to-r hover:from-[#EA4335] hover:to-[#FBBC05]'
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all duration-200 ease-out"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Share This Product</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <p className="text-gray-600 mb-6">Share this product with friends</p>

          <div className="grid grid-cols-3 gap-4 mb-6">
            {shareButtons.map((button) => (
              <a
                key={button.name}
                href={button.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`border border-gray-200 text-gray-700 hover:text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 ${button.hoverClass}`}
              >
                {button.icon}
                <span className="text-sm">{button.name}</span>
              </a>
            ))}
          </div>

          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={productUrl}
              readOnly
              className="w-full pr-24 py-3 px-4 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 transition-all"
            />
            <button
              onClick={handleCopyLink}
              className={`absolute right-2 top-1/2 -translate-y-1/2 ${
                copySuccess
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-orange-500 hover:bg-orange-600'
              } text-white py-1.5 px-3 rounded-md transition-colors flex items-center space-x-1`}
            >
              <Copy className="w-4 h-4" />
              <span className="text-sm">{copySuccess ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};