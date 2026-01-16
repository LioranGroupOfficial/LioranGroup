"use client";

import { useEffect, useState } from "react";

export default function GenerateCertificatePage() {
  const [adminKey, setAdminKey] = useState("");
  const [hasKey, setHasKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    role: "",
    contribution: "",
    description: "",
    startDate: "",
    endDate: "",
    duration: "",
  });

  useEffect(() => {
    const storedKey = localStorage.getItem("ADMIN_KEY");
    if (storedKey) {
      setAdminKey(storedKey);
      setHasKey(true);
    }
  }, []);

  const saveAdminKey = () => {
    if (!adminKey) return;
    localStorage.setItem("ADMIN_KEY", adminKey);
    setHasKey(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/certificates/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setResult(data.data.certificateId);
    } catch (err: any) {
      alert(err.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  if (!hasKey) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-[var(--card)] p-8 rounded-xl w-full max-w-md border border-[var(--border)]">
          <h1 className="text-xl font-semibold mb-4">
            Admin Authentication
          </h1>
          <input
            type="password"
            placeholder="Enter Admin Key"
            className="w-full p-3 bg-black border border-[var(--border)] rounded mb-4"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
          />
          <button
            onClick={saveAdminKey}
            className="w-full bg-[var(--accent)] p-3 rounded font-medium"
          >
            Save Key
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-10 flex justify-center">
      <div className="w-full max-w-3xl bg-[var(--card)] p-8 rounded-xl border border-[var(--border)]">
        <h1 className="text-2xl font-bold mb-6">
          Generate Certificate
        </h1>

        <div className="grid grid-cols-2 gap-4">
          <input name="name" placeholder="Full Name" onChange={handleChange} />
          <input name="role" placeholder="Role" onChange={handleChange} />
          <input name="duration" placeholder="Duration" onChange={handleChange} />
          <input name="contribution" placeholder="Contribution" onChange={handleChange} />
          <input name="startDate" type="date" onChange={handleChange} />
          <input name="endDate" type="date" onChange={handleChange} />
        </div>

        <textarea
          name="description"
          placeholder="Description"
          className="w-full mt-4"
          rows={4}
          onChange={handleChange}
        />

        <button
          onClick={submit}
          disabled={loading}
          className="mt-6 w-full bg-[var(--accent)] p-3 rounded font-medium"
        >
          {loading ? "Creating..." : "Create Certificate"}
        </button>

        {result && (
          <div className="mt-6 text-green-400">
            ✅ Certificate Created  
            <br />
            ID: <strong>{result}</strong>
            <br />
            View: /certificate/{result}
          </div>
        )}
      </div>
    </div>
  );
}
