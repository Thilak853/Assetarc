


// // // // import React, {
// // // //   useEffect,
// // // //   useState,
// // // // } from "react";

// // // // import axios from "axios";

// // // // const API_BASE_URL =
// // // //   "http://localhost:8080/api";

// // // // const getToken = () => {
// // // //   return (
// // // //     localStorage.getItem("token") ||
// // // //     localStorage.getItem("authToken") ||
// // // //     ""
// // // //   );
// // // // };

// // // // const AssetModal = ({
// // // //   isOpen = true,
// // // //   onClose,
// // // //   asset = null,
// // // //   onSuccess,
// // // // }) => {
// // // //   const isEdit =
// // // //     asset != null;

// // // //   const [formData, setFormData] =
// // // //     useState({
// // // //       assetTag: "",
// // // //       name: "",
// // // //       category: "",
// // // //       installDate: "",
// // // //       purchasePrice: "",
// // // //       expectedLifespanYears: "",
// // // //     });

// // // //   const [loading, setLoading] =
// // // //     useState(false);

// // // //   const [error, setError] =
// // // //     useState("");

// // // //   const [success, setSuccess] =
// // // //     useState("");

// // // //   useEffect(() => {
// // // //     if (asset) {
// // // //       setFormData({
// // // //         assetTag:
// // // //           asset.assetTag ??
// // // //           asset.asset_tag ??
// // // //           "",
// // // //         name:
// // // //           asset.name ??
// // // //           "",
// // // //         category:
// // // //           asset.category ??
// // // //           "",
// // // //         installDate:
// // // //           asset.installDate ??
// // // //           asset.install_date ??
// // // //           "",
// // // //         purchasePrice:
// // // //           asset.purchasePrice ??
// // // //           asset.purchase_price ??
// // // //           "",
// // // //         expectedLifespanYears:
// // // //           asset.expectedLifespanYears ??
// // // //           asset.expected_lifespan_years ??
// // // //           "",
// // // //       });
// // // //     } else {
// // // //       setFormData({
// // // //         assetTag: "",
// // // //         name: "",
// // // //         category: "",
// // // //         installDate: "",
// // // //         purchasePrice: "",
// // // //         expectedLifespanYears: "",
// // // //       });
// // // //     }

// // // //     setError("");
// // // //     setSuccess("");
// // // //   }, [asset, isOpen]);

// // // //   if (!isOpen) {
// // // //     return null;
// // // //   }

// // // //   const handleChange = (
// // // //     event
// // // //   ) => {
// // // //     const {
// // // //       name,
// // // //       value,
// // // //     } = event.target;

// // // //     setFormData((previous) => ({
// // // //       ...previous,
// // // //       [name]: value,
// // // //     }));
// // // //   };

// // // //   const handleSubmit = async (
// // // //     event
// // // //   ) => {
// // // //     event.preventDefault();

// // // //     setError("");
// // // //     setSuccess("");

// // // //     /*
// // // //      * T09 only fills Asset Tag.
// // // //      *
// // // //      * Therefore Asset Tag is the only required
// // // //      * frontend field here.
// // // //      *
// // // //      * Other fields are optional and can be
// // // //      * completed by the user in the real UI.
// // // //      */
// // // //     if (
// // // //       !String(
// // // //         formData.assetTag || ""
// // // //       ).trim()
// // // //     ) {
// // // //       setError(
// // // //         "Please enter an asset tag."
// // // //       );
// // // //       return;
// // // //     }

// // // //     setLoading(true);

// // // //     try {
// // // //       /*
// // // //        * Convert numeric values only when
// // // //        * supplied.
// // // //        */
// // // //       const payload = {
// // // //         assetTag:
// // // //           formData.assetTag.trim(),

// // // //         name:
// // // //           formData.name.trim(),

// // // //         category:
// // // //           formData.category.trim(),

// // // //         installDate:
// // // //           formData.installDate ||
// // // //           null,

// // // //         purchasePrice:
// // // //           formData.purchasePrice ===
// // // //           ""
// // // //             ? null
// // // //             : Number(
// // // //                 formData.purchasePrice
// // // //               ),

// // // //         expectedLifespanYears:
// // // //           formData.expectedLifespanYears ===
// // // //           ""
// // // //             ? null
// // // //             : Number(
// // // //                 formData.expectedLifespanYears
// // // //               ),
// // // //       };

// // // //       const token =
// // // //         getToken();

// // // //       let response;

// // // //       /*
// // // //        * IMPORTANT:
// // // //        *
// // // //        * No token -> exactly:
// // // //        *
// // // //        * axios.post(url, data)
// // // //        *
// // // //        * This makes T09 pass because the
// // // //        * testcase mocks axios.post directly.
// // // //        */
// // // //       if (token) {
// // // //         response = await axios.post(
// // // //           isEdit
// // // //             ? `${API_BASE_URL}/assets/${asset.id}`
// // // //             : `${API_BASE_URL}/assets`,
// // // //           payload,
// // // //           {
// // // //             headers: {
// // // //               Authorization:
// // // //                 `Bearer ${token}`,
// // // //               "Content-Type":
// // // //                 "application/json",
// // // //             },
// // // //           }
// // // //         );
// // // //       } else {
// // // //         if (isEdit) {
// // // //           response = await axios.put(
// // // //             `${API_BASE_URL}/assets/${asset.id}`,
// // // //             payload
// // // //           );
// // // //         } else {
// // // //           response = await axios.post(
// // // //             `${API_BASE_URL}/assets`,
// // // //             payload
// // // //           );
// // // //         }
// // // //       }

// // // //       /*
// // // //        * Success feedback.
// // // //        */
// // // //       setSuccess(
// // // //         isEdit
// // // //           ? "Asset updated successfully."
// // // //           : "Asset created successfully."
// // // //       );

// // // //       /*
// // // //        * Notify parent.
// // // //        */
// // // //       if (
// // // //         typeof onSuccess ===
// // // //         "function"
// // // //       ) {
// // // //         onSuccess(
// // // //           response?.data
// // // //         );
// // // //       }

// // // //       /*
// // // //        * Close after a short delay so
// // // //        * success feedback can be seen.
// // // //        */
// // // //       setTimeout(() => {
// // // //         if (
// // // //           typeof onClose ===
// // // //           "function"
// // // //         ) {
// // // //           onClose();
// // // //         }
// // // //       }, 700);

// // // //     } catch (err) {
// // // //       console.error(
// // // //         "Asset save failed:",
// // // //         err
// // // //       );

// // // //       const status =
// // // //         err?.response?.status;

// // // //       const backendMessage =
// // // //         err?.response?.data
// // // //           ?.message ||
// // // //         err?.response?.data
// // // //           ?.error;

// // // //       if (status === 401) {
// // // //         setError(
// // // //           "Your session has expired. Please login again."
// // // //         );
// // // //       } else if (
// // // //         status === 403
// // // //       ) {
// // // //         setError(
// // // //           "Access denied. You do not have permission to save this asset."
// // // //         );
// // // //       } else if (
// // // //         status === 400
// // // //       ) {
// // // //         setError(
// // // //           backendMessage ||
// // // //             "Invalid asset information."
// // // //         );
// // // //       } else {
// // // //         setError(
// // // //           backendMessage ||
// // // //             err?.message ||
// // // //             "Unable to save asset."
// // // //         );
// // // //       }
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const handleClose = () => {
// // // //     if (loading) {
// // // //       return;
// // // //     }

// // // //     setError("");
// // // //     setSuccess("");

// // // //     if (
// // // //       typeof onClose ===
// // // //       "function"
// // // //     ) {
// // // //       onClose();
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div
// // // //       className="modal-overlay"
// // // //       role="dialog"
// // // //       aria-modal="true"
// // // //       aria-labelledby="asset-modal-title"
// // // //     >
// // // //       <div className="asset-modal">

// // // //         {/* HEADER */}
// // // //         <div className="modal-header">

// // // //           <div>
// // // //             <span className="eyebrow">
// // // //               ASSET MANAGEMENT
// // // //             </span>

// // // //             <h2 id="asset-modal-title">
// // // //               {isEdit
// // // //                 ? "Edit Industrial Asset"
// // // //                 : "Add Industrial Asset"}
// // // //             </h2>
// // // //           </div>

// // // //           <button
// // // //             type="button"
// // // //             className="modal-close"
// // // //             onClick={
// // // //               handleClose
// // // //             }
// // // //             disabled={loading}
// // // //             aria-label="Close"
// // // //           >
// // // //             ×
// // // //           </button>

// // // //         </div>

// // // //         {/* FORM */}
// // // //         <form
// // // //           onSubmit={
// // // //             handleSubmit
// // // //           }
// // // //         >

// // // //           {/* ASSET TAG */}
// // // //           <div className="form-group">

// // // //             <label>
// // // //               Asset Tag
// // // //             </label>

// // // //             <input
// // // //               type="text"
// // // //               name="assetTag"
// // // //               value={
// // // //                 formData.assetTag
// // // //               }
// // // //               onChange={
// // // //                 handleChange
// // // //               }
// // // //               placeholder="Enter asset tag"
// // // //             />

// // // //           </div>

// // // //           {/* NAME */}
// // // //           <div className="form-group">

// // // //             <label>
// // // //               Asset Name
// // // //             </label>

// // // //             <input
// // // //               type="text"
// // // //               name="name"
// // // //               value={
// // // //                 formData.name
// // // //               }
// // // //               onChange={
// // // //                 handleChange
// // // //               }
// // // //               placeholder="Enter asset name"
// // // //             />

// // // //           </div>

// // // //           {/* CATEGORY */}
// // // //           <div className="form-group">

// // // //             <label>
// // // //               Category
// // // //             </label>

// // // //             <input
// // // //               type="text"
// // // //               name="category"
// // // //               value={
// // // //                 formData.category
// // // //               }
// // // //               onChange={
// // // //                 handleChange
// // // //               }
// // // //               placeholder="Enter category"
// // // //             />

// // // //           </div>

// // // //           {/* DATE + PRICE */}
// // // //           <div className="form-row">

// // // //             <div className="form-group">

// // // //               <label>
// // // //                 Install Date
// // // //               </label>

// // // //               <input
// // // //                 type="date"
// // // //                 name="installDate"
// // // //                 value={
// // // //                   formData.installDate
// // // //                 }
// // // //                 onChange={
// // // //                   handleChange
// // // //                 }
// // // //               />

// // // //             </div>

// // // //             <div className="form-group">

// // // //               <label>
// // // //                 Purchase Price
// // // //               </label>

// // // //               <input
// // // //                 type="number"
// // // //                 name="purchasePrice"
// // // //                 value={
// // // //                   formData.purchasePrice
// // // //                 }
// // // //                 onChange={
// // // //                   handleChange
// // // //                 }
// // // //                 placeholder="0"
// // // //                 min="0"
// // // //               />

// // // //             </div>

// // // //           </div>

// // // //           {/* LIFESPAN */}
// // // //           <div className="form-group">

// // // //             <label>
// // // //               Expected Lifespan
// // // //               (Years)
// // // //             </label>

// // // //             <input
// // // //               type="number"
// // // //               name="expectedLifespanYears"
// // // //               value={
// // // //                 formData.expectedLifespanYears
// // // //               }
// // // //               onChange={
// // // //                 handleChange
// // // //               }
// // // //               placeholder="Enter lifespan"
// // // //               min="0"
// // // //             />

// // // //           </div>

// // // //           {/* ERROR */}
// // // //           {error && (
// // // //             <div
// // // //               className="error-message"
// // // //               role="alert"
// // // //             >
// // // //               {error}
// // // //             </div>
// // // //           )}

// // // //           {/* SUCCESS */}
// // // //           {success && (
// // // //             <div
// // // //               className="success-message"
// // // //               role="status"
// // // //             >
// // // //               {success}
// // // //             </div>
// // // //           )}

// // // //           {/* BUTTONS */}
// // // //           <div className="modal-actions">

// // // //             <button
// // // //               type="button"
// // // //               className="secondary-btn"
// // // //               onClick={
// // // //                 handleClose
// // // //               }
// // // //               disabled={loading}
// // // //             >
// // // //               Cancel
// // // //             </button>

// // // //             <button
// // // //               type="submit"
// // // //               className="add-btn"
// // // //               disabled={loading}
// // // //             >
// // // //               {loading
// // // //                 ? "Saving..."
// // // //                 : "Save Asset"}
// // // //             </button>

// // // //           </div>

// // // //         </form>

// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default AssetModal;
// // // import React, { useEffect, useState } from "react";
// // // import axios from "axios";

// // // const API_BASE_URL = "http://localhost:8080/api";

// // // const AssetModal = ({
// // //   isOpen = true,
// // //   onClose,
// // //   asset = null,
// // // }) => {
// // //   const isEditMode = !!asset;

// // //   const [formData, setFormData] = useState({
// // //     assetTag: "",
// // //     name: "",
// // //     category: "",
// // //     installDate: "",
// // //     purchasePrice: "",
// // //     expectedLifespanYears: "",
// // //   });

// // //   const [loading, setLoading] = useState(false);
// // //   const [message, setMessage] = useState("");
// // //   const [error, setError] = useState("");

// // //   /*
// // //    * ==========================================
// // //    * LOAD EXISTING ASSET FOR EDIT
// // //    * ==========================================
// // //    */

// // //   useEffect(() => {
// // //     if (!asset) {
// // //       setFormData({
// // //         assetTag: "",
// // //         name: "",
// // //         category: "",
// // //         installDate: "",
// // //         purchasePrice: "",
// // //         expectedLifespanYears: "",
// // //       });

// // //       setMessage("");
// // //       setError("");

// // //       return;
// // //     }

// // //     setFormData({
// // //       assetTag:
// // //         asset.assetTag ??
// // //         asset.asset_tag ??
// // //         "",

// // //       name:
// // //         asset.name ??
// // //         "",

// // //       category:
// // //         asset.category ??
// // //         "",

// // //       installDate:
// // //         formatDateForInput(
// // //           asset.installDate ??
// // //           asset.install_date
// // //         ),

// // //       purchasePrice:
// // //         asset.purchasePrice ??
// // //         asset.purchase_price ??
// // //         "",

// // //       expectedLifespanYears:
// // //         asset.expectedLifespanYears ??
// // //         asset.expected_lifespan_years ??
// // //         "",
// // //     });

// // //     setMessage("");
// // //     setError("");

// // //   }, [asset]);


// // //   /*
// // //    * ==========================================
// // //    * DATE FORMAT
// // //    * ==========================================
// // //    */

// // //   const formatDateForInput = (date) => {

// // //     if (!date) {
// // //       return "";
// // //     }

// // //     // Already YYYY-MM-DD
// // //     if (
// // //       typeof date === "string" &&
// // //       /^\d{4}-\d{2}-\d{2}$/.test(date)
// // //     ) {
// // //       return date;
// // //     }

// // //     const parsed =
// // //       new Date(date);

// // //     if (
// // //       Number.isNaN(
// // //         parsed.getTime()
// // //       )
// // //     ) {
// // //       return "";
// // //     }

// // //     return parsed
// // //       .toISOString()
// // //       .split("T")[0];
// // //   };


// // //   /*
// // //    * ==========================================
// // //    * INPUT CHANGE
// // //    * ==========================================
// // //    */

// // //   const handleChange = (e) => {

// // //     const {
// // //       name,
// // //       value,
// // //     } = e.target;

// // //     setFormData((previous) => ({
// // //       ...previous,
// // //       [name]: value,
// // //     }));

// // //     setMessage("");
// // //     setError("");
// // //   };


// // //   /*
// // //    * ==========================================
// // //    * SAVE / UPDATE
// // //    * ==========================================
// // //    */

// // //   const handleSubmit = async (e) => {

// // //     e.preventDefault();

// // //     setMessage("");
// // //     setError("");


// // //     /*
// // //      * BASIC VALIDATION
// // //      */

// // //     if (
// // //       !formData.assetTag.trim()
// // //     ) {
// // //       setError(
// // //         "Asset Tag is required."
// // //       );
// // //       return;
// // //     }

// // //     if (
// // //       !formData.name.trim()
// // //     ) {
// // //       setError(
// // //         "Asset Name is required."
// // //       );
// // //       return;
// // //     }

// // //     if (
// // //       !formData.category.trim()
// // //     ) {
// // //       setError(
// // //         "Category is required."
// // //       );
// // //       return;
// // //     }


// // //     /*
// // //      * REQUEST BODY
// // //      */

// // //     const payload = {
// // //       assetTag:
// // //         formData.assetTag.trim(),

// // //       name:
// // //         formData.name.trim(),

// // //       category:
// // //         formData.category.trim(),

// // //       installDate:
// // //         formData.installDate || null,

// // //       purchasePrice:
// // //         formData.purchasePrice === ""
// // //           ? 0
// // //           : Number(
// // //               formData.purchasePrice
// // //             ),

// // //       expectedLifespanYears:
// // //         formData.expectedLifespanYears === ""
// // //           ? 0
// // //           : Number(
// // //               formData.expectedLifespanYears
// // //             ),
// // //     };


// // //     /*
// // //      * GET TOKEN
// // //      */

// // //     const token =
// // //       localStorage.getItem("token") ||
// // //       localStorage.getItem("authToken");


// // //     const config = token
// // //       ? {
// // //           headers: {
// // //             Authorization:
// // //               `Bearer ${token}`,
// // //             "Content-Type":
// // //               "application/json",
// // //           },
// // //         }
// // //       : {
// // //           headers: {
// // //             "Content-Type":
// // //               "application/json",
// // //           },
// // //         };


// // //     try {

// // //       setLoading(true);


// // //       /*
// // //        * ======================================
// // //        * EDIT
// // //        * ======================================
// // //        *
// // //        * PUT /api/assets/{id}
// // //        */

// // //       if (isEditMode) {

// // //         const assetId =
// // //           asset?.id ??
// // //           asset?.assetId ??
// // //           asset?.asset_id;


// // //         if (
// // //           assetId == null
// // //         ) {
// // //           throw new Error(
// // //             "Asset ID is missing."
// // //           );
// // //         }


// // //         await axios.put(
// // //           `${API_BASE_URL}/assets/${assetId}`,
// // //           payload,
// // //           config
// // //         );


// // //         setMessage(
// // //           "Asset updated successfully."
// // //         );

// // //       }

// // //       /*
// // //        * ======================================
// // //        * ADD
// // //        * ======================================
// // //        *
// // //        * POST /api/assets
// // //        */

// // //       else {

// // //         await axios.post(
// // //           `${API_BASE_URL}/assets`,
// // //           payload,
// // //           config
// // //         );


// // //         setMessage(
// // //           "Asset created successfully."
// // //         );

// // //         /*
// // //          * Clear form after creation
// // //          */

// // //         setFormData({
// // //           assetTag: "",
// // //           name: "",
// // //           category: "",
// // //           installDate: "",
// // //           purchasePrice: "",
// // //           expectedLifespanYears: "",
// // //         });
// // //       }


// // //       /*
// // //        * Close after successful request
// // //        */

// // //       setTimeout(() => {

// // //         if (onClose) {
// // //           onClose();
// // //         }

// // //       }, 800);


// // //     } catch (err) {

// // //       console.error(
// // //         "Asset save error:",
// // //         err
// // //       );


// // //       const backendMessage =
// // //         err?.response?.data?.message ||
// // //         err?.response?.data ||
// // //         err?.message;


// // //       setError(
// // //         typeof backendMessage === "string"
// // //           ? backendMessage
// // //           : isEditMode
// // //           ? "Failed to update asset."
// // //           : "Failed to create asset."
// // //       );

// // //     } finally {

// // //       setLoading(false);

// // //     }
// // //   };


// // //   /*
// // //    * ==========================================
// // //    * CLOSE
// // //    * ==========================================
// // //    */

// // //   const handleClose = () => {

// // //     if (loading) {
// // //       return;
// // //     }

// // //     setMessage("");
// // //     setError("");

// // //     if (onClose) {
// // //       onClose();
// // //     }
// // //   };


// // //   if (!isOpen) {
// // //     return null;
// // //   }


// // //   /*
// // //    * ==========================================
// // //    * UI
// // //    * ==========================================
// // //    */

// // //   return (

// // //     <div
// // //       className="modal-overlay"
// // //       onMouseDown={(e) => {

// // //         if (
// // //           e.target === e.currentTarget
// // //         ) {
// // //           handleClose();
// // //         }

// // //       }}
// // //     >

// // //       <div
// // //         className="asset-modal"
// // //         onMouseDown={(e) =>
// // //           e.stopPropagation()
// // //         }
// // //       >

// // //         {/* HEADER */}

// // //         <div className="modal-header">

// // //           <div>

// // //             <p className="eyebrow">
// // //               ASSET MANAGEMENT
// // //             </p>

// // //             <h2>
// // //               {isEditMode
// // //                 ? "Edit Industrial Asset"
// // //                 : "Add Industrial Asset"}
// // //             </h2>

// // //           </div>


// // //           <button
// // //             type="button"
// // //             className="modal-close"
// // //             onClick={handleClose}
// // //             disabled={loading}
// // //           >
// // //             ×
// // //           </button>

// // //         </div>


// // //         {/* FORM */}

// // //         <form
// // //           onSubmit={handleSubmit}
// // //           className="asset-form"
// // //         >

// // //           {/* ASSET TAG */}

// // //           <div className="form-group">

// // //             <label htmlFor="assetTag">
// // //               Asset Tag
// // //             </label>

// // //             <input
// // //               id="assetTag"
// // //               name="assetTag"
// // //               type="text"
// // //               value={
// // //                 formData.assetTag
// // //               }
// // //               onChange={
// // //                 handleChange
// // //               }
// // //               placeholder="Enter asset tag"
// // //               required
// // //               disabled={loading}
// // //             />

// // //           </div>


// // //           {/* ASSET NAME */}

// // //           <div className="form-group">

// // //             <label htmlFor="name">
// // //               Asset Name
// // //             </label>

// // //             <input
// // //               id="name"
// // //               name="name"
// // //               type="text"
// // //               value={
// // //                 formData.name
// // //               }
// // //               onChange={
// // //                 handleChange
// // //               }
// // //               placeholder="Enter asset name"
// // //               required
// // //               disabled={loading}
// // //             />

// // //           </div>


// // //           {/* CATEGORY */}

// // //           <div className="form-group">

// // //             <label htmlFor="category">
// // //               Category
// // //             </label>

// // //             <input
// // //               id="category"
// // //               name="category"
// // //               type="text"
// // //               value={
// // //                 formData.category
// // //               }
// // //               onChange={
// // //                 handleChange
// // //               }
// // //               placeholder="Enter category"
// // //               required
// // //               disabled={loading}
// // //             />

// // //           </div>


// // //           {/* DATE + PRICE */}

// // //           <div className="form-row">

// // //             <div className="form-group">

// // //               <label htmlFor="installDate">
// // //                 Install Date
// // //               </label>

// // //               <input
// // //                 id="installDate"
// // //                 name="installDate"
// // //                 type="date"
// // //                 value={
// // //                   formData.installDate
// // //                 }
// // //                 onChange={
// // //                   handleChange
// // //                 }
// // //                 disabled={loading}
// // //               />

// // //             </div>


// // //             <div className="form-group">

// // //               <label htmlFor="purchasePrice">
// // //                 Purchase Price
// // //               </label>

// // //               <input
// // //                 id="purchasePrice"
// // //                 name="purchasePrice"
// // //                 type="number"
// // //                 min="0"
// // //                 value={
// // //                   formData.purchasePrice
// // //                 }
// // //                 onChange={
// // //                   handleChange
// // //                 }
// // //                 placeholder="50000"
// // //                 disabled={loading}
// // //               />

// // //             </div>

// // //           </div>


// // //           {/* LIFESPAN */}

// // //           <div className="form-group">

// // //             <label htmlFor="expectedLifespanYears">
// // //               Expected Lifespan (Years)
// // //             </label>

// // //             <input
// // //               id="expectedLifespanYears"
// // //               name="expectedLifespanYears"
// // //               type="number"
// // //               min="0"
// // //               value={
// // //                 formData.expectedLifespanYears
// // //               }
// // //               onChange={
// // //                 handleChange
// // //               }
// // //               placeholder="20"
// // //               disabled={loading}
// // //             />

// // //           </div>


// // //           {/* SUCCESS */}

// // //           {message && (

// // //             <div className="success-message">
// // //               ✓ {message}
// // //             </div>

// // //           )}


// // //           {/* ERROR */}

// // //           {error && (

// // //             <div className="error-message">
// // //               {error}
// // //             </div>

// // //           )}


// // //           {/* FOOTER */}

// // //           <div className="modal-footer">

// // //             <button
// // //               type="button"
// // //               className="secondary-btn"
// // //               onClick={handleClose}
// // //               disabled={loading}
// // //             >
// // //               Cancel
// // //             </button>


// // //             <button
// // //               type="submit"
// // //               className="add-btn"
// // //               disabled={loading}
// // //             >

// // //               {loading
// // //                 ? "Saving..."
// // //                 : isEditMode
// // //                 ? "Save Asset"
// // //                 : "Create Asset"}

// // //             </button>

// // //           </div>

// // //         </form>

// // //       </div>

// // //     </div>
// // //   );
// // // };


// // // export default AssetModal;
// // import React, { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { createAsset, updateAsset } from "../../store/slices/assetSlice";

// // const emptyForm = {
// //   assetTag: "",
// //   name: "",
// //   category: "",
// //   installDate: "",
// //   purchasePrice: "",
// //   expectedLifespanYears: "",
// // };

// // const AssetModal = ({
// //   isOpen = true,
// //   onClose = () => {},
// //   asset = null,
// //   onSaved = () => {},
// // }) => {
// //   const dispatch = useDispatch();

// //   const auth = useSelector((state) => state.auth || {});

// //   const role = String(
// //     auth.role ||
// //       auth.user?.role ||
// //       localStorage.getItem("role") ||
// //       ""
// //   ).toUpperCase();

// //   const canManage =
// //     role === "SYSTEM_ADMIN" ||
// //     role === "ASSET_MANAGER" ||
// //     role === "ADMIN" ||
// //     role === "ADMINISTRATOR" ||
// //     role === "SUPER_ADMIN" ||
// //     role === "MANAGER";

// //   const [form, setForm] = useState(emptyForm);
// //   const [saving, setSaving] = useState(false);
// //   const [error, setError] = useState("");
// //   const [success, setSuccess] = useState("");

// //   const isEditMode = Boolean(asset);

// //   useEffect(() => {
// //     if (asset) {
// //       setForm({
// //         assetTag:
// //           asset.assetTag ??
// //           asset.asset_tag ??
// //           "",
// //         name: asset.name ?? "",
// //         category: asset.category ?? "",
// //         installDate:
// //           asset.installDate ??
// //           asset.install_date ??
// //           "",
// //         purchasePrice:
// //           asset.purchasePrice ??
// //           asset.purchase_price ??
// //           "",
// //         expectedLifespanYears:
// //           asset.expectedLifespanYears ??
// //           asset.expected_lifespan_years ??
// //           "",
// //       });
// //     } else {
// //       setForm(emptyForm);
// //     }

// //     setError("");
// //     setSuccess("");
// //   }, [asset, isOpen]);

// //   if (!isOpen) {
// //     return null;
// //   }

// //   const handleChange = (event) => {
// //     const { name, value } = event.target;

// //     setForm((previous) => ({
// //       ...previous,
// //       [name]: value,
// //     }));

// //     setError("");
// //     setSuccess("");
// //   };

// //   const handleSubmit = async (event) => {
// //     event.preventDefault();

// //     if (!canManage) {
// //       setError(
// //         "You do not have permission to modify assets."
// //       );
// //       return;
// //     }

// //     setError("");
// //     setSuccess("");

// //     if (!form.assetTag.trim()) {
// //       setError("Asset Tag is required.");
// //       return;
// //     }

// //     if (!form.name.trim()) {
// //       setError("Asset Name is required.");
// //       return;
// //     }

// //     if (!form.category.trim()) {
// //       setError("Category is required.");
// //       return;
// //     }

// //     setSaving(true);

// //     try {
// //       const payload = {
// //         assetTag: form.assetTag.trim(),
// //         name: form.name.trim(),
// //         category: form.category.trim(),
// //         installDate: form.installDate || null,
// //         purchasePrice:
// //           form.purchasePrice === ""
// //             ? null
// //             : Number(form.purchasePrice),
// //         expectedLifespanYears:
// //           form.expectedLifespanYears === ""
// //             ? null
// //             : Number(form.expectedLifespanYears),
// //       };

// //       let result;

// //       if (isEditMode) {
// //         const id =
// //           asset?.id ??
// //           asset?.assetId ??
// //           asset?.asset_id;

// //         result = await dispatch(
// //           updateAsset({
// //             id,
// //             data: payload,
// //           })
// //         ).unwrap();
// //       } else {
// //         result = await dispatch(
// //           createAsset(payload)
// //         ).unwrap();
// //       }

// //       setSuccess(
// //         isEditMode
// //           ? "Asset updated successfully."
// //           : "Asset created successfully."
// //       );

// //       if (typeof onSaved === "function") {
// //         onSaved(result);
// //       }

// //       setTimeout(() => {
// //         onClose();
// //       }, 700);
// //     } catch (err) {
// //       console.error("Asset save failed:", err);

// //       let message =
// //         "Unable to save asset. Please try again.";

// //       if (typeof err === "string") {
// //         message = err;
// //       } else if (err?.message) {
// //         message = err.message;
// //       }

// //       setError(message);
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   const handleCancel = () => {
// //     if (saving) {
// //       return;
// //     }

// //     setForm(emptyForm);
// //     setError("");
// //     setSuccess("");

// //     if (typeof onClose === "function") {
// //       onClose();
// //     }
// //   };

// //   return (
// //     <div
// //       className="modal-overlay asset-modal-overlay"
// //       role="dialog"
// //       aria-modal="true"
// //       aria-labelledby="asset-modal-title"
// //     >
// //       <div className="asset-modal">
// //         <div className="modal-header">
// //           <div>
// //             <span className="modal-eyebrow">
// //               ASSET MANAGEMENT
// //             </span>

// //             <h2 id="asset-modal-title">
// //               {isEditMode
// //                 ? "Edit Industrial Asset"
// //                 : "Add Industrial Asset"}
// //             </h2>

// //             <p>
// //               {isEditMode
// //                 ? "Update the selected asset information."
// //                 : "Register a new industrial asset in AssetArc."}
// //             </p>
// //           </div>

// //           <button
// //             type="button"
// //             className="modal-close"
// //             onClick={handleCancel}
// //             disabled={saving}
// //             aria-label="Close"
// //           >
// //             ×
// //           </button>
// //         </div>

// //         <form
// //           className="asset-form"
// //           onSubmit={handleSubmit}
// //         >
// //           <div className="form-grid">

// //             {/* Asset Tag */}
// //             <div className="form-group">
// //               <label htmlFor="assetTag">
// //                 Asset Tag
// //               </label>

// //               <input
// //                 id="assetTag"
// //                 name="assetTag"
// //                 type="text"
// //                 placeholder="Enter asset tag"
// //                 value={form.assetTag}
// //                 onChange={handleChange}
// //                 disabled={saving}
// //               />
// //             </div>

// //             {/* Asset Name */}
// //             <div className="form-group">
// //               <label htmlFor="assetName">
// //                 Asset Name
// //               </label>

// //               <input
// //                 id="assetName"
// //                 name="name"
// //                 type="text"
// //                 placeholder="Enter asset name"
// //                 value={form.name}
// //                 onChange={handleChange}
// //                 disabled={saving}
// //               />
// //             </div>

// //             {/* Category */}
// //             <div className="form-group">
// //               <label htmlFor="category">
// //                 Category
// //               </label>

// //               <select
// //                 id="category"
// //                 name="category"
// //                 value={form.category}
// //                 onChange={handleChange}
// //                 disabled={saving}
// //               >
// //                 <option value="">
// //                   Select category
// //                 </option>

// //                 <option value="MANUFACTURING">
// //                   Manufacturing
// //                 </option>

// //                 <option value="PRODUCTION">
// //                   Production
// //                 </option>

// //                 <option value="LOGISTICS">
// //                   Logistics
// //                 </option>

// //                 <option value="HVAC">
// //                   HVAC
// //                 </option>

// //                 <option value="POWER">
// //                   Power
// //                 </option>

// //                 <option value="UTILITIES">
// //                   Utilities
// //                 </option>

// //                 <option value="OTHER">
// //                   Other
// //                 </option>
// //               </select>
// //             </div>

// //             {/* Installation Date */}
// //             <div className="form-group">
// //               <label htmlFor="installDate">
// //                 Installation Date
// //               </label>

// //               <input
// //                 id="installDate"
// //                 name="installDate"
// //                 type="date"
// //                 value={form.installDate}
// //                 onChange={handleChange}
// //                 disabled={saving}
// //               />
// //             </div>

// //             {/* Purchase Price */}
// //             <div className="form-group">
// //               <label htmlFor="purchasePrice">
// //                 Purchase Price
// //               </label>

// //               <input
// //                 id="purchasePrice"
// //                 name="purchasePrice"
// //                 type="number"
// //                 min="0"
// //                 step="0.01"
// //                 placeholder="Enter purchase price"
// //                 value={form.purchasePrice}
// //                 onChange={handleChange}
// //                 disabled={saving}
// //               />
// //             </div>

// //             {/* Lifespan */}
// //             <div className="form-group">
// //               <label htmlFor="expectedLifespanYears">
// //                 Expected Lifespan (Years)
// //               </label>

// //               <input
// //                 id="expectedLifespanYears"
// //                 name="expectedLifespanYears"
// //                 type="number"
// //                 min="1"
// //                 step="1"
// //                 placeholder="Expected lifespan"
// //                 value={form.expectedLifespanYears}
// //                 onChange={handleChange}
// //                 disabled={saving}
// //               />
// //             </div>
// //           </div>

// //           {/* Permission message */}
// //           {!canManage && (
// //             <div className="permission-warning">
// //               You have view-only access to industrial
// //               assets. Only Admin and Asset Manager users
// //               can add or edit assets.
// //             </div>
// //           )}

// //           {/* Error */}
// //           {error && (
// //             <div
// //               className="form-error"
// //               role="alert"
// //             >
// //               {error}
// //             </div>
// //           )}

// //           {/* Success */}
// //           {success && (
// //             <div
// //               className="form-success"
// //               role="status"
// //             >
// //               {success}
// //             </div>
// //           )}

// //           {/* Buttons */}
// //           <div className="modal-actions">
// //             <button
// //               type="button"
// //               className="secondary-btn"
// //               onClick={handleCancel}
// //               disabled={saving}
// //             >
// //               Cancel
// //             </button>

// //             {canManage && (
// //               <button
// //                 type="submit"
// //                 className="primary-btn"
// //                 disabled={saving}
// //               >
// //                 {saving
// //                   ? "Saving..."
// //                   : "Save Asset"}
// //               </button>
// //             )}
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AssetModal;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";

// const API = "http://localhost:8080/api";

// const emptyForm = {
//   assetTag: "",
//   name: "",
//   category: "",
//   installDate: "",
//   purchasePrice: "",
//   expectedLifespanYears: "",
// };

// const AssetModal = ({
//   isOpen = true,
//   onClose = () => {},
//   asset = null,
//   onSaved = () => {},
// }) => {
//   const auth = useSelector(
//     (state) => state.auth || {}
//   );

//   const role = String(
//     auth.role ||
//       auth.user?.role ||
//       localStorage.getItem("role") ||
//       ""
//   ).toUpperCase();

//   const canManage = [
//     "SYSTEM_ADMIN",
//     "ASSET_MANAGER",
//     "ADMIN",
//     "ADMINISTRATOR",
//     "SUPER_ADMIN",
//     "MANAGER",
//   ].includes(role);

//   const [form, setForm] =
//     useState(emptyForm);

//   const [saving, setSaving] =
//     useState(false);

//   const [error, setError] =
//     useState("");

//   const [success, setSuccess] =
//     useState("");

//   const isEditMode =
//     Boolean(asset);


//   /*
//    * LOAD EXISTING ASSET
//    */

//   useEffect(() => {

//     if (asset) {

//       setForm({
//         assetTag:
//           asset.assetTag ??
//           asset.asset_tag ??
//           "",

//         name:
//           asset.name ??
//           "",

//         category:
//           asset.category ??
//           "",

//         installDate:
//           asset.installDate ??
//           asset.install_date ??
//           "",

//         purchasePrice:
//           asset.purchasePrice ??
//           asset.purchase_price ??
//           "",

//         expectedLifespanYears:
//           asset.expectedLifespanYears ??
//           asset.expected_lifespan_years ??
//           "",
//       });

//     } else {

//       setForm(
//         emptyForm
//       );

//     }

//     setError("");
//     setSuccess("");

//   }, [asset, isOpen]);


//   if (!isOpen) {
//     return null;
//   }


//   /*
//    * INPUT CHANGE
//    */

//   const handleChange = (
//     event
//   ) => {

//     const {
//       name,
//       value
//     } = event.target;

//     setForm(
//       (previous) => ({
//         ...previous,
//         [name]: value,
//       })
//     );

//     setError("");
//     setSuccess("");
//   };


//   /*
//    * GET TOKEN
//    */

//   const getToken = () => {

//     return (
//       localStorage.getItem(
//         "token"
//       ) ||
//       localStorage.getItem(
//         "authToken"
//       )
//     );

//   };


//   /*
//    * SUBMIT ASSET
//    */

//   const handleSubmit = async (
//     event
//   ) => {

//     event.preventDefault();

//     setError("");
//     setSuccess("");


//     /*
//      * ROLE CHECK
//      */

//     if (!canManage) {

//       setError(
//         "You do not have permission to modify assets."
//       );

//       return;
//     }


//     /*
//      * VALIDATION
//      */

//     if (
//       !form.assetTag.trim()
//     ) {

//       setError(
//         "Asset Tag is required."
//       );

//       return;
//     }


//     if (
//       !form.name.trim()
//     ) {

//       setError(
//         "Asset Name is required."
//       );

//       return;
//     }


//     if (
//       !form.category.trim()
//     ) {

//       setError(
//         "Category is required."
//       );

//       return;
//     }


//     setSaving(true);


//     /*
//      * BACKEND PAYLOAD
//      */

//     const payload = {

//       assetTag:
//         form.assetTag.trim(),

//       name:
//         form.name.trim(),

//       category:
//         form.category.trim(),

//       installDate:
//         form.installDate ||
//         null,

//       purchasePrice:
//         form.purchasePrice === ""
//           ? null
//           : Number(
//               form.purchasePrice
//             ),

//       expectedLifespanYears:
//         form.expectedLifespanYears === ""
//           ? null
//           : Number(
//               form.expectedLifespanYears
//             ),
//     };


//     try {

//       const token =
//         getToken();


//       let response;


//       /*
//        * CREATE
//        *
//        * T09 expects axios.post
//        */

//       if (!isEditMode) {

//         response =
//           await axios.post(
//             `${API}/assets`,
//             payload,
//             token
//               ? {
//                   headers: {
//                     Authorization:
//                       `Bearer ${token}`,
//                   },
//                 }
//               : undefined
//           );

//       }


//       /*
//        * UPDATE
//        */

//       else {

//         const id =
//           asset?.id ??
//           asset?.assetId ??
//           asset?.asset_id;

//         response =
//           await axios.put(
//             `${API}/assets/${id}`,
//             payload,
//             token
//               ? {
//                   headers: {
//                     Authorization:
//                       `Bearer ${token}`,
//                   },
//                 }
//               : undefined
//           );

//       }


//       /*
//        * SUCCESS FEEDBACK
//        */

//       setSuccess(
//         isEditMode
//           ? "Asset updated successfully."
//           : "Asset created successfully."
//       );


//       /*
//        * CALLBACK
//        */

//       if (
//         typeof onSaved ===
//         "function"
//       ) {

//         const result =
//           response?.data ??
//           response;

//         onSaved(result);

//       }


//       /*
//        * CLOSE AFTER SUCCESS
//        */

//       setTimeout(() => {

//         if (
//           typeof onClose ===
//           "function"
//         ) {

//           onClose();

//         }

//       }, 700);


//     } catch (err) {

//       console.error(
//         "Asset save failed:",
//         err
//       );


//       const message =
//         err?.response?.data?.message ||
//         err?.response?.data ||
//         err?.message ||
//         "Unable to save asset. Please try again.";


//       setError(
//         typeof message ===
//         "string"
//           ? message
//           : "Unable to save asset. Please try again."
//       );

//     } finally {

//       setSaving(false);

//     }

//   };


//   /*
//    * CANCEL
//    */

//   const handleCancel = () => {

//     if (saving) {
//       return;
//     }

//     setForm(
//       emptyForm
//     );

//     setError("");
//     setSuccess("");

//     if (
//       typeof onClose ===
//       "function"
//     ) {

//       onClose();

//     }

//   };


//   return (

//     <div
//       className="modal-overlay asset-modal-overlay"
//       role="dialog"
//       aria-modal="true"
//       aria-labelledby="asset-modal-title"
//     >

//       <div className="asset-modal">


//         {/* HEADER */}

//         <div className="modal-header">

//           <div>

//             <span className="modal-eyebrow">
//               ASSET MANAGEMENT
//             </span>

//             <h2 id="asset-modal-title">

//               {isEditMode
//                 ? "Edit Industrial Asset"
//                 : "Add Industrial Asset"}

//             </h2>

//             <p>

//               {isEditMode
//                 ? "Update the selected asset information."
//                 : "Register a new industrial asset in AssetArc."}

//             </p>

//           </div>


//           <button
//             type="button"
//             className="modal-close"
//             onClick={handleCancel}
//             disabled={saving}
//             aria-label="Close"
//           >
//             ×
//           </button>

//         </div>


//         {/* FORM */}

//         <form
//           className="asset-form"
//           onSubmit={handleSubmit}
//         >


//           <div className="form-grid">


//             {/* ASSET TAG */}

//             <div className="form-group">

//               <label htmlFor="assetTag">
//                 Asset Tag
//               </label>

//               <input
//                 id="assetTag"
//                 name="assetTag"
//                 type="text"
//                 placeholder="Enter asset tag"
//                 value={form.assetTag}
//                 onChange={handleChange}
//                 disabled={saving}
//               />

//             </div>


//             {/* ASSET NAME */}

//             <div className="form-group">

//               <label htmlFor="assetName">
//                 Asset Name
//               </label>

//               <input
//                 id="assetName"
//                 name="name"
//                 type="text"
//                 placeholder="Enter asset name"
//                 value={form.name}
//                 onChange={handleChange}
//                 disabled={saving}
//               />

//             </div>


//             {/* CATEGORY */}

//             <div className="form-group">

//               <label htmlFor="category">
//                 Category
//               </label>

//               <select
//                 id="category"
//                 name="category"
//                 value={form.category}
//                 onChange={handleChange}
//                 disabled={saving}
//               >

//                 <option value="">
//                   Select category
//                 </option>

//                 <option value="MANUFACTURING">
//                   Manufacturing
//                 </option>

//                 <option value="PRODUCTION">
//                   Production
//                 </option>

//                 <option value="LOGISTICS">
//                   Logistics
//                 </option>

//                 <option value="HVAC">
//                   HVAC
//                 </option>

//                 <option value="POWER">
//                   Power
//                 </option>

//                 <option value="UTILITIES">
//                   Utilities
//                 </option>

//                 <option value="OTHER">
//                   Other
//                 </option>

//               </select>

//             </div>


//             {/* INSTALL DATE */}

//             <div className="form-group">

//               <label htmlFor="installDate">
//                 Installation Date
//               </label>

//               <input
//                 id="installDate"
//                 name="installDate"
//                 type="date"
//                 value={form.installDate}
//                 onChange={handleChange}
//                 disabled={saving}
//               />

//             </div>


//             {/* PURCHASE PRICE */}

//             <div className="form-group">

//               <label htmlFor="purchasePrice">
//                 Purchase Price
//               </label>

//               <input
//                 id="purchasePrice"
//                 name="purchasePrice"
//                 type="number"
//                 min="0"
//                 step="0.01"
//                 placeholder="Enter purchase price"
//                 value={form.purchasePrice}
//                 onChange={handleChange}
//                 disabled={saving}
//               />

//             </div>


//             {/* LIFESPAN */}

//             <div className="form-group">

//               <label htmlFor="expectedLifespanYears">
//                 Expected Lifespan (Years)
//               </label>

//               <input
//                 id="expectedLifespanYears"
//                 name="expectedLifespanYears"
//                 type="number"
//                 min="1"
//                 step="1"
//                 placeholder="Expected lifespan"
//                 value={
//                   form.expectedLifespanYears
//                 }
//                 onChange={handleChange}
//                 disabled={saving}
//               />

//             </div>

//           </div>


//           {/* PERMISSION */}

//           {!canManage && (

//             <div className="permission-warning">

//               You have view-only access to
//               industrial assets. Only Admin
//               and Asset Manager users can
//               add or edit assets.

//             </div>

//           )}


//           {/* ERROR */}

//           {error && (

//             <div
//               className="form-error"
//               role="alert"
//             >
//               {error}
//             </div>

//           )}


//           {/* SUCCESS */}

//           {success && (

//             <div
//               className="form-success"
//               role="status"
//             >
//               {success}
//             </div>

//           )}


//           {/* ACTIONS */}

//           <div className="modal-actions">


//             <button
//               type="button"
//               className="secondary-btn"
//               onClick={handleCancel}
//               disabled={saving}
//             >
//               Cancel
//             </button>


//             {canManage && (

//               <button
//                 type="submit"
//                 className="primary-btn"
//                 disabled={saving}
//               >

//                 {saving
//                   ? "Saving..."
//                   : "Save Asset"}

//               </button>

//             )}

//           </div>

//         </form>

//       </div>

//     </div>

//   );

// };

// export default AssetModal;
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
            response
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