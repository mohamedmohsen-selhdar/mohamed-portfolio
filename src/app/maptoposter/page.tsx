"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function MapToPoster() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    city: "",
    country: "",
    theme: "noir",
  });
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const resp = await fetch("/api/generate-map", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await resp.json();
      if (resp.ok) {
        setSuccessMsg("Generation started! The image will be generated via GitHub Actions shortly. Check back in a few minutes.");
      } else {
        setErrorMsg(data.error || "Something went wrong.");
      }
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold tracking-tight mb-4">MapToPoster</h1>
        <p className="text-gray-400 mb-12 max-w-2xl">
          Generate minimalist map posters for your favorite cities. Powered by open-source data and beautifully themed styles.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-6">Create a Poster</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 opacity-80">City</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Paris"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 opacity-80">Country</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. France"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 opacity-80">Theme</label>
                <select
                  value={formData.theme}
                  onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                  className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
                >
                  <option value="noir">Noir</option>
                  <option value="ocean">Ocean</option>
                  <option value="terracotta">Terracotta</option>
                  <option value="sunset">Sunset</option>
                  <option value="midnight_blue">Midnight Blue</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                {isGenerating ? "Triggering..." : "Generate Poster"}
              </button>

              {successMsg && <p className="text-green-400 text-sm mt-4">{successMsg}</p>}
              {errorMsg && <p className="text-red-400 text-sm mt-4">{errorMsg}</p>}
            </form>
          </div>

          {/* Explanation Section */}
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4">How it works</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                This tool connects directly to the GitHub Action workflow on the repository. Since creating a high resolution map requires significant processing with Python and OpenStreetMap data, the generation runs asynchronously in the background.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Images are saved into the repository's public directory. Note that the generation process can take 2-5 minutes depending on the city size.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
