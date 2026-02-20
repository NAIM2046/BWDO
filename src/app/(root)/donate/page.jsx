"use client";
import React, { useState } from "react";
import {
  Copy,
  CheckCircle,
  Smartphone,
  Building2,
  Heart,
  Info,
} from "lucide-react";

const DonatePage = () => {
  const [copied, setCopied] = useState("");

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  const mobileBanking = [
    {
      name: "bKash",
      number: "017XXXXXXXX",
      type: "Personal",
      color: "bg-pink-50 border-pink-200",
    },
    {
      name: "Nagad",
      number: "018XXXXXXXX",
      type: "Personal",
      color: "bg-orange-50 border-orange-200",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block p-3 bg-red-100 rounded-full mb-4">
            <Heart className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">
            Support Our Cause
          </h1>
          <p className="mt-3 text-gray-600">
            Your contribution brings hope to those in need. Choose a payment
            method below.
          </p>
        </div>

        {/* Mobile Banking Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-blue-600" /> Mobile Banking
          </h2>
          <div className="grid gap-4">
            {mobileBanking.map((item) => (
              <div
                key={item.name}
                className={`p-5 rounded-xl border-2 flex justify-between items-center transition-all ${item.color}`}
              >
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-gray-500">
                    {item.name} ({item.type})
                  </p>
                  <p className="text-2xl font-mono font-bold text-gray-800">
                    {item.number}
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(item.number, item.name)}
                  className="p-3 bg-white rounded-full shadow-sm hover:shadow-md active:scale-95 transition-all"
                >
                  {copied === item.name ? (
                    <CheckCircle className="text-green-500" />
                  ) : (
                    <Copy className="text-gray-400" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Bank Transfer Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="bg-blue-600 p-4 flex items-center gap-2 text-white">
            <Building2 className="w-5 h-5" />
            <h2 className="font-semibold text-lg">Direct Bank Transfer</h2>
          </div>
          <div className="p-6 space-y-4 text-gray-700">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Bank Name</span>
              <span className="font-bold">Dutch-Bangla Bank PLC</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Account Name</span>
              <span className="font-bold">Humanitarian NGO Fund</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Account Number</span>
              <span className="font-bold text-blue-700 select-all">
                123.105.XXXXXXX
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Branch</span>
              <span className="font-bold">Dhaka Main Branch</span>
            </div>
          </div>
        </div>

        {/* Note Section */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
          <div className="flex items-center gap-2 mb-1">
            <Info className="w-4 h-4 text-blue-600" />
            <span className="font-bold text-blue-800 text-sm italic">
              After Donation:
            </span>
          </div>
          <p className="text-sm text-blue-700">
            Please send a screenshot or your transaction ID to our
            <span className="font-bold"> WhatsApp: +880 1XXX-XXXXXX</span> so we
            can confirm your contribution.
          </p>
        </div>

        {/* Footer info */}
        <p className="text-center text-gray-400 text-sm mt-10">
          All donations are used for non-profit humanitarian purposes.
        </p>
      </div>
    </div>
  );
};

export default DonatePage;
