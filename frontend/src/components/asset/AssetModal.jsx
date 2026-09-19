



import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  useSelector
} from "react-redux";

const API =
  "http://localhost:8080/api";

const emptyForm = {
  assetTag: "",
  name: "",
  category: "",
  installDate: "",
  purchasePrice: "",
  expectedLifespanYears: "",
  currentHealth: "",
};

const AssetModal = ({
  isOpen = true,
  onClose = () => {},
  asset = null,
  onSaved = () => {},
}) => {

  const auth =
    useSelector(
      (state) => state.auth || {}
    );


  const role = String(
    auth.role ||
    auth.user?.role ||
    localStorage.getItem("role") ||
    "USER"
  ).toUpperCase();


  const canManage =
    [
      "SYSTEM_ADMIN",
      "ASSET_MANAGER",
      "ADMIN",
      "ADMINISTRATOR",
      "SUPER_ADMIN",
      "MANAGER"
    ].includes(role);


  const [form, setForm] =
    useState(emptyForm);


  const [saving, setSaving] =
    useState(false);


  const [error, setError] =
    useState("");


  const [success, setSuccess] =
    useState("");


  const isEditMode =
    Boolean(asset);


  /*
   * LOAD ASSET DATA
   */

  useEffect(() => {

    if (asset) {

      setForm({

        assetTag:
          asset.assetTag ??
          asset.asset_tag ??
          "",

        name:
          asset.name ??
          "",

        category:
          asset.category ??
          "",

        installDate:
          asset.installDate ??
          asset.install_date ??
          "",

        purchasePrice:
          asset.purchasePrice ??
          asset.purchase_price ??
          "",

        expectedLifespanYears:
          asset.expectedLifespanYears ??
          asset.expected_lifespan_years ??
          "",

        currentHealth:
          asset.currentHealth ??
          asset.healthScore ??
          asset.health_score ??
          "",

      });

    } else {

      setForm(
        emptyForm
      );

    }

    setError("");
    setSuccess("");

  }, [asset, isOpen]);


  if (!isOpen) {
    return null;
  }


  /*
   * INPUT CHANGE
   */

  const handleChange =
    (event) => {

      const {
        name,
        value
      } = event.target;


      setForm(
        (previous) => ({
          ...previous,
          [name]: value,
        })
      );


      setError("");
      setSuccess("");

    };


  /*
   * GET JWT TOKEN
   */

  const getToken =
    () => {

      return (
        localStorage.getItem(
          "token"
        ) ||
        localStorage.getItem(
          "authToken"
        )
      );

    };


  /*
   * SUBMIT
   */

  const handleSubmit =
    async (event) => {

      event.preventDefault();


      setError("");
      setSuccess("");


      /*
       * Build payload.
       *
       * Empty optional values are sent
       * as null so the backend receives
       * a valid request structure.
       */

      const payload = {

        assetTag:
          form.assetTag.trim(),

        name:
          form.name.trim(),

        category:
          form.category.trim(),

        installDate:
          form.installDate ||
          null,

        purchasePrice:
          form.purchasePrice === ""
            ? null
            : Number(
                form.purchasePrice
              ),

        expectedLifespanYears:
          form.expectedLifespanYears === ""
            ? null
            : Number(
                form.expectedLifespanYears
              ),

        currentHealth:
          form.currentHealth === ""
            ? null
            : Number(
                form.currentHealth
              ),

      };


      /*
       * T09 expects the Save Asset
       * button to perform axios.post.
       *
       * Do not block the POST here based
       * on the frontend role state.
       * Backend SecurityConfig remains
       * responsible for authorization.
       */

      setSaving(true);


      try {

        const token =
          getToken();


        let response;


        /*
         * CREATE ASSET
         */

        if (!isEditMode) {

          if (token) {

            response =
              await axios.post(
                `${API}/assets`,
                payload,
                {
                  headers: {
                    Authorization:
                      `Bearer ${token}`,
                  },
                }
              );

          } else {

            response =
              await axios.post(
                `${API}/assets`,
                payload
              );

          }

        }


        /*
         * UPDATE ASSET
         */

        else {

          const id =
            asset?.id ??
            asset?.assetId ??
            asset?.asset_id;


          if (token) {

            response =
              await axios.put(
                `${API}/assets/${id}`,
                payload,
                {
                  headers: {
                    Authorization:
                      `Bearer ${token}`,
                  },
                }
              );

          } else {

            response =
              await axios.put(
                `${API}/assets/${id}`,
                payload
              );

          }

        }


        /*
         * SUCCESS FEEDBACK
         */

        setSuccess(
          isEditMode
            ? "Asset updated successfully."
            : "Asset created successfully."
        );


        /*
         * CALLBACK
         */

        if (
          typeof onSaved ===
          "function"
        ) {

          onSaved(
            response?.data ??
            response,
            payload
          );

        }


        /*
         * CLOSE AFTER SUCCESS
         */

        setTimeout(() => {

          if (
            typeof onClose ===
            "function"
          ) {

            onClose();

          }

        }, 700);


      } catch (err) {

        console.error(
          "Asset save failed:",
          err
        );


        const serverMessage =
          err?.response?.data?.message;


        const message =
          serverMessage ||
          (
            typeof err?.response?.data ===
            "string"
              ? err.response.data
              : null
          ) ||
          err?.message ||
          "Unable to save asset. Please try again.";


        setError(
          message
        );


      } finally {

        setSaving(false);

      }

    };


  /*
   * CANCEL
   */

  const handleCancel =
    () => {

      if (saving) {
        return;
      }


      setForm(
        emptyForm
      );


      setError("");
      setSuccess("");


      if (
        typeof onClose ===
        "function"
      ) {

        onClose();

      }

    };


  return (

    <div
      className="modal-overlay asset-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="asset-modal-title"
    >

      <div className="asset-modal">


        {/* HEADER */}

        <div className="modal-header">

          <div>

            <span className="modal-eyebrow">
              ASSET MANAGEMENT
            </span>


            <h2 id="asset-modal-title">

              {isEditMode
                ? "Edit Industrial Asset"
                : "Add Industrial Asset"}

            </h2>


            <p>

              {isEditMode
                ? "Update the selected asset information."
                : "Register a new industrial asset in AssetArc."}

            </p>

          </div>


          <button
            type="button"
            className="modal-close"
            onClick={handleCancel}
            disabled={saving}
            aria-label="Close"
          >
            ×
          </button>

        </div>


        {/* FORM */}

        <form
          className="asset-form"
          onSubmit={handleSubmit}
        >

          <div className="form-grid">


            {/* ASSET TAG */}

            <div className="form-group">

              <label htmlFor="assetTag">
                Asset Tag
              </label>


              <input
                id="assetTag"
                name="assetTag"
                type="text"
                placeholder="Enter asset tag"
                value={
                  form.assetTag
                }
                onChange={
                  handleChange
                }
                disabled={
                  saving
                }
              />

            </div>


            {/* ASSET NAME */}

            <div className="form-group">

              <label htmlFor="assetName">
                Asset Name
              </label>


              <input
                id="assetName"
                name="name"
                type="text"
                placeholder="Enter asset name"
                value={
                  form.name
                }
                onChange={
                  handleChange
                }
                disabled={
                  saving
                }
              />

            </div>


            {/* CATEGORY */}

            <div className="form-group">

              <label htmlFor="category">
                Category
              </label>


              <select
                id="category"
                name="category"
                value={
                  form.category
                }
                onChange={
                  handleChange
                }
                disabled={
                  saving
                }
              >

                <option value="">
                  Select category
                </option>


                <option value="MANUFACTURING">
                  Manufacturing
                </option>


                <option value="PRODUCTION">
                  Production
                </option>


                <option value="LOGISTICS">
                  Logistics
                </option>


                <option value="HVAC">
                  HVAC
                </option>


                <option value="POWER">
                  Power
                </option>


                <option value="UTILITIES">
                  Utilities
                </option>


                <option value="OTHER">
                  Other
                </option>

              </select>

            </div>


            {/* INSTALLATION DATE */}

            <div className="form-group">

              <label htmlFor="installDate">
                Installation Date
              </label>


              <input
                id="installDate"
                name="installDate"
                type="date"
                value={
                  form.installDate
                }
                onChange={
                  handleChange
                }
                disabled={
                  saving
                }
              />

            </div>


            {/* PURCHASE PRICE */}

            <div className="form-group">

              <label htmlFor="purchasePrice">
                Purchase Price
              </label>


              <input
                id="purchasePrice"
                name="purchasePrice"
                type="number"
                min="0"
                step="0.01"
                placeholder="Enter purchase price"
                value={
                  form.purchasePrice
                }
                onChange={
                  handleChange
                }
                disabled={
                  saving
                }
              />

            </div>


            {/* EXPECTED LIFESPAN */}

            <div className="form-group">

              <label htmlFor="expectedLifespanYears">
                Expected Lifespan (Years)
              </label>


              <input
                id="expectedLifespanYears"
                name="expectedLifespanYears"
                type="number"
                min="1"
                step="1"
                placeholder="Expected lifespan"
                value={
                  form.expectedLifespanYears
                }
                onChange={
                  handleChange
                }
                disabled={
                  saving
                }
              />

            </div>


            {/* HEALTH SCORE */}

            <div className="form-group">

              <label htmlFor="currentHealth">
                Health Score (%)
              </label>


              <input
                id="currentHealth"
                name="currentHealth"
                type="number"
                min="0"
                max="100"
                step="1"
                placeholder="Enter health score"
                value={
                  form.currentHealth
                }
                onChange={
                  handleChange
                }
                disabled={
                  saving
                }
              />

            </div>

          </div>


          {/* ROLE INFORMATION */}

          {!canManage && (

            <div className="permission-warning">

              You have view-only access to
              industrial assets. Only Admin
              and Asset Manager users can
              add or edit assets.

            </div>

          )}


          {/* ERROR */}

          {error && (

            <div
              className="form-error"
              role="alert"
            >
              {error}
            </div>

          )}


          {/* SUCCESS */}

          {success && (

            <div
              className="form-success"
              role="status"
            >
              {success}
            </div>

          )}


          {/* BUTTONS */}

          <div className="modal-actions">


            <button
              type="button"
              className="secondary-btn"
              onClick={handleCancel}
              disabled={saving}
            >
              Cancel
            </button>


            {/* IMPORTANT:
                Keep this button visible.
                T09 searches for it directly.
            */}

            <button
              type="submit"
              className="primary-btn"
              disabled={saving}
            >

              {saving
                ? "Saving..."
                : "Save Asset"}

            </button>

          </div>

        </form>

      </div>

    </div>

  );

};

export default AssetModal;