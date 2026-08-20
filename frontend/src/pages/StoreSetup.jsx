import { useState } from "react";
import { Store, MapPin, Receipt } from "lucide-react";
import { useNavigate } from "react-router-dom";

import InputField from "../components/InputField";
import Button from "../components/Button";
import store from "../api/store";

function StoreSetup() {
  const [businessName, setBusinessName] = useState("");
  const [location, setLocation] = useState("");
  const [taxInfo, setTaxInfo] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!businessName || !location) {
      setError("Business name and location are required.");
      return;
    }

    try {
      setLoading(true);

      await store.createStore({
        business_name: businessName,
        location: location,
        tax_info: taxInfo,
      });

      navigate("/dashboard");

    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
        "Something went wrong while creating your store."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-10">

      <div className="w-full max-w-xl">

        {/* Header */}

        <div className="text-center mb-8">

          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white">
            <Store size={28} />
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            Set Up Your Store
          </h1>

          <p className="mt-2 text-slate-500">
            Let's get your business ready for StoreMaster.
          </p>

        </div>

        {/* Card */}

        <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-200">

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Business Name */}

            <InputField
              label="Business Name"
              type="text"
              placeholder="e.g. Mary's Store"
              icon={Store}
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />

            {/* Location */}

            <InputField
              label="Location"
              type="text"
              placeholder="e.g. Nairobi"
              icon={MapPin}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            {/* Tax Information */}

            <InputField
              label="Tax Information"
              type="text"
              placeholder="e.g. P051234567A"
              icon={Receipt}
              value={taxInfo}
              onChange={(e) => setTaxInfo(e.target.value)}
            />

            {/* Error */}

            {error && (
              <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Submit */}

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? "Creating Store..." : "Create Store"}
            </Button>

          </form>

        </div>

        {/* Footer */}

        <p className="mt-6 text-center text-sm text-slate-400">
          You can update your store information later from settings.
        </p>

      </div>

    </div>
  );
}

export default StoreSetup;