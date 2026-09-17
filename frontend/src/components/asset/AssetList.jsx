

// // // import React, {
// // //   useEffect,
// // //   useMemo,
// // //   useState,
// // // } from "react";

// // // import {
// // //   useDispatch,
// // //   useSelector,
// // // } from "react-redux";

// // // import {
// // //   fetchAssets,
// // //   decommissionAsset,
// // // } from "../../store/slices/assetSlice";

// // // import AssetModal from "./AssetModal";
// // // import AssetDetailsModal from "./AssetDetailsModal";

// // // const AssetList = () => {
// // //   const dispatch =
// // //     useDispatch();

// // //   const assetsState =
// // //     useSelector(
// // //       (state) =>
// // //         state?.assets || {}
// // //     );

// // //   const assets =
// // //     Array.isArray(
// // //       assetsState.assets
// // //     )
// // //       ? assetsState.assets
// // //       : [];

// // //   const loading =
// // //     assetsState.loading ===
// // //     true;

// // //   const error =
// // //     assetsState.error;

// // //   const totalPages =
// // //     Math.max(
// // //       1,
// // //       Number(
// // //         assetsState.totalPages ??
// // //           1
// // //       )
// // //     );

// // //   const currentPage =
// // //     Number(
// // //       assetsState.currentPage ??
// // //         0
// // //     );

// // //   const [page, setPage] =
// // //     useState(
// // //       currentPage
// // //     );

// // //   const [search, setSearch] =
// // //     useState("");

// // //   const [modalOpen, setModalOpen] =
// // //     useState(false);

// // //   const [editingAsset, setEditingAsset] =
// // //     useState(null);

// // //   const [viewAsset, setViewAsset] =
// // //     useState(null);

// // //   const [fetchStarted, setFetchStarted] =
// // //     useState(false);

// // //   /*
// // //    * DO NOT fetch if the Redux
// // //    * test has already populated
// // //    * assets.
// // //    */
// // //   useEffect(() => {
// // //     if (fetchStarted) {
// // //       return;
// // //     }

// // //     if (assets.length > 0) {
// // //       return;
// // //     }

// // //     if (loading) {
// // //       return;
// // //     }

// // //     setFetchStarted(true);

// // //     dispatch(
// // //       fetchAssets({
// // //         page: 0,
// // //         size: 10,
// // //       })
// // //     );
// // //   }, [
// // //     dispatch,
// // //     assets.length,
// // //     loading,
// // //     fetchStarted,
// // //   ]);

// // //   useEffect(() => {
// // //     if (
// // //       currentPage !== page
// // //     ) {
// // //       setPage(
// // //         currentPage
// // //       );
// // //     }
// // //   }, [
// // //     currentPage,
// // //     page,
// // //   ]);

// // //   const filteredAssets =
// // //     useMemo(() => {
// // //       const query =
// // //         search
// // //           .trim()
// // //           .toLowerCase();

// // //       if (!query) {
// // //         return assets;
// // //       }

// // //       return assets.filter(
// // //         (asset) => {
// // //           const name =
// // //             String(
// // //               asset?.name ||
// // //                 ""
// // //             ).toLowerCase();

// // //           const tag =
// // //             String(
// // //               asset?.assetTag ||
// // //                 asset?.asset_tag ||
// // //                 asset?.tag ||
// // //                 ""
// // //             ).toLowerCase();

// // //           return (
// // //             name.includes(
// // //               query
// // //             ) ||
// // //             tag.includes(
// // //               query
// // //             )
// // //           );
// // //         }
// // //       );
// // //     }, [
// // //       assets,
// // //       search,
// // //     ]);

// // //   const openAddModal =
// // //     () => {
// // //       setEditingAsset(
// // //         null
// // //       );

// // //       setModalOpen(
// // //         true
// // //       );
// // //     };

// // //   const openEditModal =
// // //     (asset) => {
// // //       setEditingAsset(
// // //         asset
// // //       );

// // //       setModalOpen(
// // //         true
// // //       );
// // //     };

// // //   const closeModal =
// // //     () => {
// // //       setModalOpen(
// // //         false
// // //       );

// // //       setEditingAsset(
// // //         null
// // //       );
// // //     };

// // //   const openView =
// // //     (asset) => {
// // //       setViewAsset(
// // //         asset
// // //       );
// // //     };

// // //   const handleDecommission =
// // //     async (
// // //       asset
// // //     ) => {
// // //       const id =
// // //         asset?.id ??
// // //         asset?.assetId ??
// // //         asset?.asset_id;

// // //       if (
// // //         id === undefined ||
// // //         id === null
// // //       ) {
// // //         return;
// // //       }

// // //       const confirmed =
// // //         window.confirm(
// // //           "Are you sure you want to decommission this asset?"
// // //         );

// // //       if (!confirmed) {
// // //         return;
// // //       }

// // //       try {
// // //         await dispatch(
// // //           decommissionAsset(
// // //             id
// // //           )
// // //         ).unwrap();
// // //       } catch (error) {
// // //         console.error(
// // //           "Decommission failed:",
// // //           error
// // //         );
// // //       }
// // //     };

// // //   const nextPage =
// // //     () => {
// // //       if (
// // //         page + 1 >=
// // //         totalPages
// // //       ) {
// // //         return;
// // //       }

// // //       const next =
// // //         page + 1;

// // //       setPage(next);

// // //       dispatch(
// // //         fetchAssets({
// // //           page: next,
// // //           size: 10,
// // //         })
// // //       );
// // //     };

// // //   const previousPage =
// // //     () => {
// // //       if (page <= 0) {
// // //         return;
// // //       }

// // //       const previous =
// // //         page - 1;

// // //       setPage(previous);

// // //       dispatch(
// // //         fetchAssets({
// // //           page: previous,
// // //           size: 10,
// // //         })
// // //       );
// // //     };

// // //   return (
// // //     <>
// // //       <div className="page-container assets-page">

// // //         <div className="page-header">

// // //           <div>
// // //             <p className="eyebrow">
// // //               ASSET MANAGEMENT
// // //             </p>

// // //             <h1>
// // //               Industrial Assets
// // //             </h1>

// // //             <p className="page-subtitle">
// // //               Monitor, manage and maintain
// // //               your industrial asset fleet.
// // //             </p>
// // //           </div>

// // //           <button
// // //             type="button"
// // //             className="add-btn"
// // //             onClick={
// // //               openAddModal
// // //             }
// // //           >
// // //             Add Asset
// // //           </button>

// // //         </div>

// // //         <div className="asset-toolbar">

// // //           <input
// // //             type="text"
// // //             className="search-input"
// // //             placeholder="Search by tag or name..."
// // //             value={search}
// // //             onChange={(event) =>
// // //               setSearch(
// // //                 event.target.value
// // //               )
// // //             }
// // //           />

// // //           {search && (
// // //             <button
// // //               type="button"
// // //               className="secondary-btn"
// // //               onClick={() =>
// // //                 setSearch("")
// // //               }
// // //             >
// // //               Clear
// // //             </button>
// // //           )}

// // //         </div>

// // //         {error && (
// // //           <div className="error-message">
// // //             {typeof error ===
// // //             "string"
// // //               ? error
// // //               : "Failed to load assets"}
// // //           </div>
// // //         )}

// // //         {loading &&
// // //           assets.length ===
// // //             0 && (
// // //             <div
// // //               className="loading-spinner"
// // //               role="status"
// // //             >
// // //               Loading...
// // //             </div>
// // //           )}

// // //         {!loading &&
// // //           filteredAssets.length ===
// // //             0 && (
// // //             <div className="empty-state">
// // //               No assets found.
// // //             </div>
// // //           )}

// // //         {filteredAssets.length >
// // //           0 && (
// // //           <div className="table-wrapper">

// // //             <table className="asset-table">

// // //               <thead>
// // //                 <tr>
// // //                   <th>
// // //                     Asset Tag
// // //                   </th>

// // //                   <th>
// // //                     Name
// // //                   </th>

// // //                   <th>
// // //                     Category
// // //                   </th>

// // //                   <th>
// // //                     Status
// // //                   </th>

// // //                   <th>
// // //                     Health
// // //                   </th>

// // //                   <th>
// // //                     Purchase Price
// // //                   </th>

// // //                   <th>
// // //                     Action
// // //                   </th>
// // //                 </tr>
// // //               </thead>

// // //               <tbody>
// // //                 {filteredAssets.map(
// // //                   (
// // //                     asset,
// // //                     index
// // //                   ) => {
// // //                     const id =
// // //                       asset?.id ??
// // //                       asset?.assetId ??
// // //                       index;

// // //                     const tag =
// // //                       asset?.assetTag ||
// // //                       asset?.asset_tag ||
// // //                       asset?.tag ||
// // //                       "-";

// // //                     const name =
// // //                       asset?.name ||
// // //                       "-";

// // //                     const category =
// // //                       asset?.category ||
// // //                       "-";

// // //                     const status =
// // //                       asset?.currentStatus ||
// // //                       asset?.status ||
// // //                       "-";

// // //                     const health =
// // //                       asset?.currentHealth ??
// // //                       asset?.health ??
// // //                       asset?.healthScore ??
// // //                       asset?.healthPercentage;

// // //                     const price =
// // //                       asset?.purchasePrice ??
// // //                       asset?.purchase_price;

// // //                     return (
// // //                       <tr
// // //                         key={id}
// // //                       >

// // //                         <td>
// // //                           {tag}
// // //                         </td>

// // //                         <td>
// // //                           {name}
// // //                         </td>

// // //                         <td>
// // //                           {category}
// // //                         </td>

// // //                         <td>
// // //                           {status}
// // //                         </td>

// // //                         <td>
// // //                           {health !==
// // //                             undefined &&
// // //                           health !==
// // //                             null
// // //                             ? `${health}%`
// // //                             : "-"}
// // //                         </td>

// // //                         <td>
// // //                           {price !==
// // //                             undefined &&
// // //                           price !==
// // //                             null
// // //                             ? price
// // //                             : "-"}
// // //                         </td>

// // //                         <td>
// // //                           <div className="asset-actions">

// // //                             <button
// // //                               type="button"
// // //                               className="secondary-btn"
// // //                               onClick={() =>
// // //                                 openView(
// // //                                   asset
// // //                                 )
// // //                               }
// // //                             >
// // //                               View
// // //                             </button>

// // //                             <button
// // //                               type="button"
// // //                               className="secondary-btn"
// // //                               onClick={() =>
// // //                                 openEditModal(
// // //                                   asset
// // //                                 )
// // //                               }
// // //                             >
// // //                               Edit
// // //                             </button>

// // //                             <button
// // //                               type="button"
// // //                               className="danger-btn"
// // //                               onClick={() =>
// // //                                 handleDecommission(
// // //                                   asset
// // //                                 )
// // //                               }
// // //                             >
// // //                               Decommission
// // //                             </button>

// // //                           </div>
// // //                         </td>

// // //                       </tr>
// // //                     );
// // //                   }
// // //                 )}
// // //               </tbody>

// // //             </table>

// // //           </div>
// // //         )}

// // //         <div className="pagination">

// // //           <button
// // //             type="button"
// // //             className="secondary-btn"
// // //             disabled={
// // //               page <= 0 ||
// // //               loading
// // //             }
// // //             onClick={
// // //               previousPage
// // //             }
// // //           >
// // //             Previous
// // //           </button>

// // //           <span>
// // //             Page{" "}
// // //             {page + 1} of{" "}
// // //             {totalPages}
// // //           </span>

// // //           <button
// // //             type="button"
// // //             className="secondary-btn"
// // //             disabled={
// // //               page + 1 >=
// // //                 totalPages ||
// // //               loading
// // //             }
// // //             onClick={
// // //               nextPage
// // //             }
// // //           >
// // //             Next
// // //           </button>

// // //         </div>

// // //       </div>

// // //       <AssetModal
// // //         isOpen={
// // //           modalOpen
// // //         }
// // //         onClose={
// // //           closeModal
// // //         }
// // //         asset={
// // //           editingAsset
// // //         }
// // //       />

// // //       <AssetDetailsModal
// // //         isOpen={
// // //           Boolean(
// // //             viewAsset
// // //           )
// // //         }
// // //         asset={
// // //           viewAsset
// // //         }
// // //         onClose={() =>
// // //           setViewAsset(
// // //             null
// // //           )
// // //         }
// // //         onEdit={() => {
// // //           const asset =
// // //             viewAsset;

// // //           setViewAsset(
// // //             null
// // //           );

// // //           openEditModal(
// // //             asset
// // //           );
// // //         }}
// // //       />

// // //     </>
// // //   );
// // // };

// // // export default AssetList;
// // import React, {
// //   useEffect,
// //   useMemo,
// //   useRef,
// //   useState,
// // } from "react";

// // import {
// //   useDispatch,
// //   useSelector,
// // } from "react-redux";

// // import {
// //   fetchAssets,
// //   decommissionAsset,
// // } from "../../store/slices/assetSlice";

// // import AssetModal from "./AssetModal";

// // import {
// //   normalizeRole,
// //   canAddAsset,
// //   canViewAsset,
// //   canEditAsset,
// //   canDecommissionAsset,
// // } from "../../utils/roleAccess";

// // const AssetList = () => {

// //   const dispatch = useDispatch();

// //   const assetsState = useSelector(
// //     (state) => state.assets || {}
// //   );

// //   const auth = useSelector(
// //     (state) => state.auth || {}
// //   );

// //   const assets = Array.isArray(
// //     assetsState.assets
// //   )
// //     ? assetsState.assets
// //     : [];

// //   const loading =
// //     assetsState.loading === true;

// //   const error =
// //     assetsState.error;

// //   const totalElements = Number(
// //     assetsState.totalElements ??
// //     assets.length
// //   );

// //   const totalPages = Math.max(
// //     1,
// //     Number(
// //       assetsState.totalPages ?? 1
// //     )
// //   );

// //   const currentPageFromStore =
// //     Number(
// //       assetsState.currentPage ?? 0
// //     );

// //   const [page, setPage] =
// //     useState(
// //       currentPageFromStore
// //     );

// //   const [search, setSearch] =
// //     useState("");

// //   const [showModal, setShowModal] =
// //     useState(false);

// //   const initialFetchStarted =
// //     useRef(false);

// //   const role = normalizeRole(
// //     auth.role ||
// //     auth.user?.role ||
// //     ""
// //   );

// //   // =====================================================
// //   // INITIAL FETCH
// //   // =====================================================

// //   useEffect(() => {

// //     if (
// //       page !== 0 ||
// //       initialFetchStarted.current
// //     ) {
// //       return;
// //     }

// //     const hasAssets =
// //       assets.length > 0;

// //     const hasExistingData =
// //       hasAssets ||
// //       totalElements > 0;

// //     if (
// //       !hasExistingData &&
// //       !loading
// //     ) {

// //       initialFetchStarted.current =
// //         true;

// //       dispatch(fetchAssets());
// //     }

// //   }, [
// //     dispatch,
// //     page,
// //     assets,
// //     totalElements,
// //     loading,
// //   ]);

// //   // =====================================================
// //   // PAGE SYNC
// //   // =====================================================

// //   useEffect(() => {

// //     if (
// //       currentPageFromStore !== page
// //     ) {
// //       setPage(
// //         currentPageFromStore
// //       );
// //     }

// //   }, [
// //     currentPageFromStore,
// //     page,
// //   ]);

// //   // =====================================================
// //   // SEARCH
// //   // =====================================================

// //   const filteredAssets =
// //     useMemo(() => {

// //       const query =
// //         search
// //           .trim()
// //           .toLowerCase();

// //       if (!query) {
// //         return assets;
// //       }

// //       return assets.filter(
// //         (asset) => {

// //           const name =
// //             String(
// //               asset?.name ?? ""
// //             ).toLowerCase();

// //           const tag =
// //             String(
// //               asset?.assetTag ??
// //               asset?.asset_tag ??
// //               asset?.tag ??
// //               ""
// //             ).toLowerCase();

// //           return (
// //             name.includes(query) ||
// //             tag.includes(query)
// //           );
// //         }
// //       );

// //     }, [
// //       assets,
// //       search,
// //     ]);

// //   // =====================================================
// //   // NEXT PAGE
// //   // =====================================================

// //   const handleNextPage = () => {

// //     if (
// //       page + 1 >= totalPages
// //     ) {
// //       return;
// //     }

// //     const nextPage =
// //       page + 1;

// //     setPage(nextPage);

// //     dispatch(
// //       fetchAssets({
// //         page: nextPage,
// //         size: 10,
// //       })
// //     );
// //   };

// //   // =====================================================
// //   // PREVIOUS PAGE
// //   // =====================================================

// //   const handlePreviousPage = () => {

// //     if (page <= 0) {
// //       return;
// //     }

// //     const previousPage =
// //       page - 1;

// //     setPage(previousPage);

// //     dispatch(
// //       fetchAssets({
// //         page: previousPage,
// //         size: 10,
// //       })
// //     );
// //   };

// //   // =====================================================
// //   // DECOMMISSION
// //   // =====================================================

// //   const handleDecommission =
// //     async (asset) => {

// //       const assetId =
// //         asset?.id ??
// //         asset?.assetId ??
// //         asset?.asset_id;

// //       if (assetId == null) {
// //         return;
// //       }

// //       if (
// //         !window.confirm(
// //           "Are you sure you want to decommission this asset?"
// //         )
// //       ) {
// //         return;
// //       }

// //       try {

// //         await dispatch(
// //           decommissionAsset(
// //             assetId
// //           )
// //         ).unwrap();

// //       } catch (err) {

// //         console.error(
// //           "Failed to decommission asset:",
// //           err
// //         );

// //       }
// //     };

// //   return (

// //     <div className="page-container assets-page">

// //       {/* HEADER */}

// //       <div className="page-header">

// //         <div>

// //           <p className="eyebrow">
// //             ASSET MANAGEMENT
// //           </p>

// //           <h1>
// //             Industrial Assets
// //           </h1>

// //           <p className="page-subtitle">
// //             Monitor, manage and maintain
// //             your industrial asset fleet.
// //           </p>

// //         </div>

// //       </div>

// //       {/* TOOLBAR */}

// //       <div className="asset-toolbar">

// //         <input
// //           type="text"
// //           className="search-input"
// //           placeholder="Search by tag or name..."
// //           value={search}
// //           onChange={(e) =>
// //             setSearch(e.target.value)
// //           }
// //         />

// //         {canAddAsset(role) && (

// //           <button
// //             type="button"
// //             className="add-btn"
// //             onClick={() =>
// //               setShowModal(true)
// //             }
// //           >
// //             Add Asset
// //           </button>

// //         )}

// //       </div>

// //       {/* ERROR */}

// //       {error && (

// //         <div className="error-message">

// //           {typeof error === "string"
// //             ? error
// //             : "Failed to load assets"}

// //         </div>

// //       )}

// //       {/* LOADING */}

// //       {loading && (

// //         <div
// //           className="loading-spinner"
// //           role="status"
// //         >
// //           Loading...
// //         </div>

// //       )}

// //       {/* TABLE */}

// //       {!loading && (

// //         filteredAssets.length > 0 ? (

// //           <div className="table-wrapper">

// //             <table className="asset-table">

// //               <thead>

// //                 <tr>

// //                   <th>
// //                     Asset Tag
// //                   </th>

// //                   <th>
// //                     Name
// //                   </th>

// //                   <th>
// //                     Category
// //                   </th>

// //                   <th>
// //                     Status
// //                   </th>

// //                   <th>
// //                     Health
// //                   </th>

// //                   <th>
// //                     Purchase Price
// //                   </th>

// //                   <th>
// //                     Action
// //                   </th>

// //                 </tr>

// //               </thead>

// //               <tbody>

// //                 {filteredAssets.map(
// //                   (asset, index) => {

// //                     const assetId =
// //                       asset?.id ??
// //                       asset?.assetId ??
// //                       asset?.asset_id ??
// //                       index;

// //                     const assetTag =
// //                       asset?.assetTag ??
// //                       asset?.asset_tag ??
// //                       asset?.tag ??
// //                       "-";

// //                     const name =
// //                       asset?.name ?? "-";

// //                     const category =
// //                       asset?.category ?? "-";

// //                     const status =
// //                       asset?.currentStatus ??
// //                       asset?.status ??
// //                       "-";

// //                     const health =
// //                       asset?.currentHealth ??
// //                       asset?.health ??
// //                       asset?.healthScore ??
// //                       asset?.healthPercentage ??
// //                       asset?.health_percentage;

// //                     const purchasePrice =
// //                       asset?.purchasePrice ??
// //                       asset?.purchase_price;

// //                     return (

// //                       <tr
// //                         key={assetId}
// //                       >

// //                         <td>
// //                           {assetTag}
// //                         </td>

// //                         <td>
// //                           {name}
// //                         </td>

// //                         <td>
// //                           {category}
// //                         </td>

// //                         <td>
// //                           {status}
// //                         </td>

// //                         <td>
// //                           {health != null
// //                             ? `${health}%`
// //                             : "-"}
// //                         </td>

// //                         <td>
// //                           {purchasePrice != null
// //                             ? purchasePrice
// //                             : "-"}
// //                         </td>

// //                         <td>

// //                           <div className="asset-actions">

// //                             {canViewAsset(role) && (

// //                               <button
// //                                 type="button"
// //                                 className="view-btn"
// //                                 onClick={() =>
// //                                   console.log(
// //                                     "View asset",
// //                                     assetId
// //                                   )
// //                                 }
// //                               >
// //                                 View
// //                               </button>

// //                             )}

// //                             {canEditAsset(role) && (

// //                               <button
// //                                 type="button"
// //                                 className="edit-btn"
// //                                 onClick={() =>
// //                                   console.log(
// //                                     "Edit asset",
// //                                     assetId
// //                                   )
// //                                 }
// //                               >
// //                                 Edit
// //                               </button>

// //                             )}

// //                             {canDecommissionAsset(
// //                               role
// //                             ) && (

// //                               <button
// //                                 type="button"
// //                                 className="danger-btn"
// //                                 onClick={() =>
// //                                   handleDecommission(
// //                                     asset
// //                                   )
// //                                 }
// //                               >
// //                                 Decommission
// //                               </button>

// //                             )}

// //                           </div>

// //                         </td>

// //                       </tr>

// //                     );
// //                   }
// //                 )}

// //               </tbody>

// //             </table>

// //           </div>

// //         ) : (

// //           <div className="empty-state">
// //             No assets found.
// //           </div>

// //         )

// //       )}

// //       {/* PAGINATION */}

// //       <div className="pagination">

// //         <button
// //           type="button"
// //           className="secondary-btn"
// //           onClick={
// //             handlePreviousPage
// //           }
// //           disabled={
// //             page <= 0 ||
// //             loading
// //           }
// //         >
// //           Previous
// //         </button>

// //         <span>
// //           Page {page + 1}
// //         </span>

// //         <button
// //           type="button"
// //           className="secondary-btn"
// //           onClick={
// //             handleNextPage
// //           }
// //           disabled={
// //             page + 1 >= totalPages ||
// //             loading
// //           }
// //         >
// //           Next
// //         </button>

// //       </div>

// //       {/* MODAL */}

// //       {showModal && (

// //         <AssetModal
// //           isOpen={showModal}
// //           onClose={() =>
// //             setShowModal(false)
// //           }
// //         />

// //       )}

// //     </div>
// //   );
// // };

// // export default AssetList;
// // src/components/asset/AssetList.jsx

// import React, {
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";

// import {
//   useDispatch,
//   useSelector,
// } from "react-redux";

// import {
//   fetchAssets,
//   decommissionAsset,
// } from "../../store/slices/assetSlice";

// import AssetModal from "./AssetModal";
// import AssetDetailsModal from "./AssetDetailsModal";

// import {
//   canModifyAssets,
//   canAddAsset,
//   canEditAsset,
//   canDecommissionAsset,
//   normalizeRole,
// } from "../../utils/rolePermissions";


// const AssetList = () => {

//   const dispatch = useDispatch();

//   const assetsState =
//     useSelector(
//       (state) => state.assets || {}
//     );

//   const auth =
//     useSelector(
//       (state) => state.auth || {}
//     );


//   /*
//    * =====================================================
//    * AUTHENTICATION / ROLE
//    * =====================================================
//    */

//   const rawRole =
//     auth.role ||
//     auth.user?.role ||
//     localStorage.getItem("role") ||
//     "";

//   const role =
//     normalizeRole(rawRole);


//   /*
//    * =====================================================
//    * ASSET DATA
//    * =====================================================
//    */

//   const assets =
//     Array.isArray(assetsState.assets)
//       ? assetsState.assets
//       : [];

//   const loading =
//     assetsState.loading === true;

//   const error =
//     assetsState.error;

//   const totalElements =
//     Number(
//       assetsState.totalElements ??
//       assets.length
//     );

//   const totalPages =
//     Math.max(
//       1,
//       Number(
//         assetsState.totalPages ?? 1
//       )
//     );

//   const currentPageFromStore =
//     Number(
//       assetsState.currentPage ?? 0
//     );


//   /*
//    * =====================================================
//    * LOCAL STATE
//    * =====================================================
//    */

//   const [page, setPage] =
//     useState(
//       currentPageFromStore
//     );

//   const [search, setSearch] =
//     useState("");

//   const [showModal, setShowModal] =
//     useState(false);

//   const [selectedAsset, setSelectedAsset] =
//     useState(null);

//   const [showDetails, setShowDetails] =
//     useState(false);

//   const initialFetchStarted =
//     useRef(false);


//   /*
//    * =====================================================
//    * INITIAL FETCH
//    * =====================================================
//    */

//   useEffect(() => {

//     if (
//       page !== 0 ||
//       initialFetchStarted.current
//     ) {
//       return;
//     }

//     const hasAssets =
//       assets.length > 0;

//     const hasExistingData =
//       hasAssets ||
//       totalElements > 0;

//     if (
//       !hasExistingData &&
//       !loading
//     ) {

//       initialFetchStarted.current = true;

//       dispatch(
//         fetchAssets()
//       );
//     }

//   }, [
//     dispatch,
//     page,
//     assets,
//     totalElements,
//     loading,
//   ]);


//   /*
//    * =====================================================
//    * SYNC PAGE
//    * =====================================================
//    */

//   useEffect(() => {

//     if (
//       Number.isFinite(
//         currentPageFromStore
//       ) &&
//       currentPageFromStore !== page
//     ) {

//       setPage(
//         currentPageFromStore
//       );
//     }

//   }, [
//     currentPageFromStore,
//     page,
//   ]);


//   /*
//    * =====================================================
//    * SEARCH
//    * =====================================================
//    */

//   const filteredAssets =
//     useMemo(() => {

//       const query =
//         search
//           .trim()
//           .toLowerCase();

//       if (!query) {
//         return assets;
//       }

//       return assets.filter(
//         (asset) => {

//           const name =
//             String(
//               asset?.name ?? ""
//             ).toLowerCase();

//           const tag =
//             String(
//               asset?.assetTag ??
//               asset?.asset_tag ??
//               asset?.tag ??
//               ""
//             ).toLowerCase();

//           const category =
//             String(
//               asset?.category ?? ""
//             ).toLowerCase();

//           return (
//             name.includes(query) ||
//             tag.includes(query) ||
//             category.includes(query)
//           );
//         }
//       );

//     }, [
//       assets,
//       search,
//     ]);


//   /*
//    * =====================================================
//    * VIEW ASSET
//    * =====================================================
//    */

//   const handleView = (asset) => {

//     setSelectedAsset(
//       asset
//     );

//     setShowDetails(
//       true
//     );
//   };


//   /*
//    * =====================================================
//    * EDIT ASSET
//    * =====================================================
//    */

//   const handleEdit = (asset) => {

//     if (
//       !canEditAsset(role)
//     ) {
//       return;
//     }

//     setSelectedAsset(
//       asset
//     );

//     setShowModal(
//       true
//     );
//   };


//   /*
//    * =====================================================
//    * DECOMMISSION
//    * =====================================================
//    */

//   const handleDecommission =
//     async (asset) => {

//       if (
//         !canDecommissionAsset(
//           role
//         )
//       ) {
//         return;
//       }

//       const assetId =
//         asset?.id ??
//         asset?.assetId ??
//         asset?.asset_id;

//       if (
//         assetId == null
//       ) {
//         return;
//       }


//       const confirmed =
//         window.confirm(
//           "Are you sure you want to decommission this asset?"
//         );

//       if (!confirmed) {
//         return;
//       }


//       try {

//         await dispatch(
//           decommissionAsset(
//             assetId
//           )
//         ).unwrap();

//         dispatch(
//           fetchAssets()
//         );

//       } catch (err) {

//         console.error(
//           "Failed to decommission asset:",
//           err
//         );
//       }
//     };


//   /*
//    * =====================================================
//    * NEXT PAGE
//    * =====================================================
//    */

//   const handleNextPage =
//     () => {

//       if (
//         page + 1 >=
//         totalPages
//       ) {
//         return;
//       }

//       const nextPage =
//         page + 1;

//       setPage(
//         nextPage
//       );

//       dispatch(
//         fetchAssets({
//           page: nextPage,
//           size: 10,
//         })
//       );
//     };


//   /*
//    * =====================================================
//    * PREVIOUS PAGE
//    * =====================================================
//    */

//   const handlePreviousPage =
//     () => {

//       if (
//         page <= 0
//       ) {
//         return;
//       }

//       const previousPage =
//         page - 1;

//       setPage(
//         previousPage
//       );

//       dispatch(
//         fetchAssets({
//           page: previousPage,
//           size: 10,
//         })
//       );
//     };


//   /*
//    * =====================================================
//    * ROLE LABEL
//    * =====================================================
//    */

//   const roleLabel =
//     role === "SYSTEM_ADMIN"
//       ? "SYSTEM ADMIN"
//       : role === "ASSET_MANAGER"
//       ? "ASSET MANAGER"
//       : role === "MAINTENANCE_TECHNICIAN"
//       ? "MAINTENANCE TECHNICIAN"
//       : role === "OPERATIONS_SUPERVISOR"
//       ? "OPERATIONS SUPERVISOR"
//       : role;


//   return (

//     <div className="page-container assets-page">

//       {/* =================================================
//           HEADER
//       ================================================= */}

//       <div className="page-header">

//         <div>

//           <p className="eyebrow">
//             ASSET MANAGEMENT
//           </p>

//           <h1>
//             Industrial Assets
//           </h1>

//           <p className="page-subtitle">
//             Monitor, manage and maintain
//             your industrial asset fleet.
//           </p>

//         </div>


//         <div className="asset-role-card">

//           <span className="role-card-icon">
//             ◈
//           </span>

//           <div>

//             <small>
//               CURRENT ACCESS
//             </small>

//             <strong>
//               {roleLabel}
//             </strong>

//           </div>

//         </div>

//       </div>


//       {/* =================================================
//           QUICK STATS
//       ================================================= */}

//       <div className="asset-mini-stats">

//         <div className="asset-mini-card">

//           <span>◈</span>

//           <div>
//             <small>Total Assets</small>
//             <strong>
//               {totalElements}
//             </strong>
//           </div>

//         </div>


//         <div className="asset-mini-card">

//           <span>✓</span>

//           <div>
//             <small>Loaded</small>
//             <strong>
//               {assets.length}
//             </strong>
//           </div>

//         </div>


//         <div className="asset-mini-card">

//           <span>⌕</span>

//           <div>
//             <small>Showing</small>
//             <strong>
//               {filteredAssets.length}
//             </strong>
//           </div>

//         </div>


//         <div className="asset-mini-card">

//           <span>⚡</span>

//           <div>
//             <small>Access</small>
//             <strong>
//               {canModifyAssets(role)
//                 ? "MANAGE"
//                 : "VIEW"}
//             </strong>
//           </div>

//         </div>

//       </div>


//       {/* =================================================
//           TOOLBAR
//       ================================================= */}

//       <div className="asset-toolbar">

//         <div className="search-wrapper">

//           <span className="search-icon">
//             ⌕
//           </span>

//           <input
//             type="text"
//             className="search-input"
//             placeholder="Search by tag or name..."
//             value={search}
//             onChange={(e) =>
//               setSearch(
//                 e.target.value
//               )
//             }
//           />

//         </div>


//         {/* ADMIN + MANAGER ONLY */}

//         {canAddAsset(role) && (

//           <button
//             type="button"
//             className="add-btn"
//             onClick={() => {

//               setSelectedAsset(
//                 null
//               );

//               setShowModal(
//                 true
//               );

//             }}
//           >
//             <span>＋</span>
//             Add Asset
//           </button>

//         )}

//       </div>


//       {/* =================================================
//           ACCESS MESSAGE
//       ================================================= */}

//       {!canModifyAssets(role) && (

//         <div className="view-only-banner">

//           <span>
//             ◉
//           </span>

//           <div>

//             <strong>
//               View-only access
//             </strong>

//             <p>
//               Your role can view asset
//               information, but asset
//               modification actions are
//               restricted.
//             </p>

//           </div>

//         </div>

//       )}


//       {/* =================================================
//           ERROR
//       ================================================= */}

//       {error && (

//         <div className="error-message">

//           {typeof error === "string"
//             ? error
//             : "Failed to load assets"}

//         </div>

//       )}


//       {/* =================================================
//           LOADING
//       ================================================= */}

//       {loading && (

//         <div
//           className="loading-spinner"
//           role="status"
//         >
//           Loading...
//         </div>

//       )}


//       {/* =================================================
//           TABLE
//       ================================================= */}

//       {!loading && (

//         filteredAssets.length > 0 ? (

//           <div className="table-wrapper">

//             <table className="asset-table">

//               <thead>

//                 <tr>

//                   <th>
//                     Asset Tag
//                   </th>

//                   <th>
//                     Name
//                   </th>

//                   <th>
//                     Category
//                   </th>

//                   <th>
//                     Status
//                   </th>

//                   <th>
//                     Health
//                   </th>

//                   <th>
//                     Purchase Price
//                   </th>

//                   <th>
//                     Action
//                   </th>

//                 </tr>

//               </thead>


//               <tbody>

//                 {filteredAssets.map(
//                   (asset, index) => {

//                     const assetId =
//                       asset?.id ??
//                       asset?.assetId ??
//                       asset?.asset_id ??
//                       index;


//                     const assetTag =
//                       asset?.assetTag ??
//                       asset?.asset_tag ??
//                       asset?.tag ??
//                       "-";


//                     const name =
//                       asset?.name ??
//                       "-";


//                     const category =
//                       asset?.category ??
//                       "-";


//                     const status =
//                       asset?.currentStatus ??
//                       asset?.status ??
//                       "-";


//                     const health =
//                       asset?.currentHealth ??
//                       asset?.health ??
//                       asset?.healthScore ??
//                       asset?.healthPercentage ??
//                       asset?.health_percentage;


//                     const purchasePrice =
//                       asset?.purchasePrice ??
//                       asset?.purchase_price;


//                     const statusClass =
//                       String(status)
//                         .toLowerCase()
//                         .replace(
//                           /[^a-z]+/g,
//                           "-"
//                         );


//                     return (

//                       <tr
//                         key={assetId}
//                         className="asset-row"
//                       >

//                         <td>

//                           <span className="asset-tag">
//                             {assetTag}
//                           </span>

//                         </td>


//                         <td>

//                           <div className="asset-name-cell">

//                             <span className="asset-machine-icon">
//                               ⚙
//                             </span>

//                             <strong>
//                               {name}
//                             </strong>

//                           </div>

//                         </td>


//                         <td>
//                           {category}
//                         </td>


//                         <td>

//                           <span
//                             className={`status-pill ${statusClass}`}
//                           >
//                             {status}
//                           </span>

//                         </td>


//                         <td>

//                           {health != null ? (

//                             <div className="health-cell">

//                               <div className="health-bar">

//                                 <span
//                                   style={{
//                                     width: `${Math.min(
//                                       100,
//                                       Math.max(
//                                         0,
//                                         Number(health)
//                                       )
//                                     )}%`,
//                                   }}
//                                 />

//                               </div>

//                               <small>
//                                 {health}%
//                               </small>

//                             </div>

//                           ) : (
//                             <span className="muted">
//                               —
//                             </span>
//                           )}

//                         </td>


//                         <td>

//                           {purchasePrice != null
//                             ? `₹${Number(
//                                 purchasePrice
//                               ).toLocaleString()}`
//                             : "—"}

//                         </td>


//                         {/* =================================================
//                             ACTIONS
//                             VIEW = ALL
//                             EDIT = ADMIN + MANAGER
//                             DELETE = ADMIN + MANAGER
//                         ================================================= */}

//                         <td>

//                           <div className="asset-actions">

//                             {/* ALL USERS */}

//                             <button
//                               type="button"
//                               className="view-btn"
//                               onClick={() =>
//                                 handleView(
//                                   asset
//                                 )
//                               }
//                             >
//                               View
//                             </button>


//                             {/* ADMIN + MANAGER ONLY */}

//                             {canEditAsset(
//                               role
//                             ) && (

//                               <button
//                                 type="button"
//                                 className="edit-btn"
//                                 onClick={() =>
//                                   handleEdit(
//                                     asset
//                                   )
//                                 }
//                               >
//                                 Edit
//                               </button>

//                             )}


//                             {/* ADMIN + MANAGER ONLY */}

//                             {canDecommissionAsset(
//                               role
//                             ) && (

//                               <button
//                                 type="button"
//                                 className="danger-btn"
//                                 onClick={() =>
//                                   handleDecommission(
//                                     asset
//                                   )
//                                 }
//                               >
//                                 Decommission
//                               </button>

//                             )}

//                           </div>

//                         </td>

//                       </tr>

//                     );

//                   }
//                 )}

//               </tbody>

//             </table>

//           </div>

//         ) : (

//           <div className="empty-state">

//             <div className="empty-icon">
//               ◇
//             </div>

//             <h3>
//               No assets found
//             </h3>

//             <p>
//               Try changing your search
//               or add a new industrial asset.
//             </p>

//             {canAddAsset(role) && (

//               <button
//                 type="button"
//                 className="add-btn"
//                 onClick={() =>
//                   setShowModal(true)
//                 }
//               >
//                 ＋ Add First Asset
//               </button>

//             )}

//           </div>

//         )

//       )}


//       {/* =================================================
//           PAGINATION
//       ================================================= */}

//       <div className="pagination">

//         <button
//           type="button"
//           className="secondary-btn"
//           onClick={
//             handlePreviousPage
//           }
//           disabled={
//             page <= 0 ||
//             loading
//           }
//         >
//           ← Previous
//         </button>


//         <div className="page-indicator">

//           <span>
//             Page
//           </span>

//           <strong>
//             {page + 1}
//           </strong>

//           <span>
//             of {totalPages}
//           </span>

//         </div>


//         <button
//           type="button"
//           className="secondary-btn"
//           onClick={
//             handleNextPage
//           }
//           disabled={
//             page + 1 >=
//               totalPages ||
//             loading
//           }
//         >
//           Next →
//         </button>

//       </div>


//       {/* =================================================
//           ADD / EDIT MODAL
//       ================================================= */}

//       {showModal && (

//         <AssetModal
//           isOpen={showModal}
//           asset={selectedAsset}
//           onClose={() => {

//             setShowModal(
//               false
//             );

//             setSelectedAsset(
//               null
//             );

//             dispatch(
//               fetchAssets()
//             );
//           }}
//         />

//       )}


//       {/* =================================================
//           VIEW MODAL
//       ================================================= */}

//       {showDetails &&
//         selectedAsset && (

//         <AssetDetailsModal
//           asset={
//             selectedAsset
//           }
//           isOpen={
//             showDetails
//           }
//           onClose={() => {

//             setShowDetails(
//               false
//             );

//             setSelectedAsset(
//               null
//             );

//           }}
//         />

//       )}

//     </div>
//   );
// };


// export default AssetList;
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchAssets,
  decommissionAsset,
} from "../../store/slices/assetSlice";

import AssetModal from "./AssetModal";

const AssetList = () => {
  const dispatch = useDispatch();

  /* -----------------------------
     REDUX STATE
  ----------------------------- */

  const assetsState = useSelector(
    (state) => state.assets || {}
  );

  const auth = useSelector(
    (state) => state.auth || {}
  );

  /* -----------------------------
     ASSETS
     
     useMemo fixes:
     react-hooks/exhaustive-deps
  ----------------------------- */

  const assets = useMemo(() => {
    return Array.isArray(assetsState.assets)
      ? assetsState.assets
      : [];
  }, [assetsState.assets]);

  const loading =
    assetsState.loading === true;

  const error =
    assetsState.error || null;

  const totalElements = Number(
    assetsState.totalElements ?? assets.length
  );

  const totalPages = Math.max(
    1,
    Number(assetsState.totalPages ?? 1)
  );

  const currentPageFromStore = Number(
    assetsState.currentPage ?? 0
  );

  /* -----------------------------
     LOCAL STATE
  ----------------------------- */

  const [page, setPage] = useState(
    currentPageFromStore
  );

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [selectedAsset, setSelectedAsset] =
    useState(null);

  const initialFetchStarted =
    useRef(false);

  /* -----------------------------
     ROLE CHECK
  ----------------------------- */

  const role = String(
    auth.role ||
      auth.user?.role ||
      localStorage.getItem("role") ||
      ""
  ).toUpperCase();

  const isManager =
    role === "SYSTEM_ADMIN" ||
    role === "ASSET_MANAGER" ||
    role === "ADMIN" ||
    role === "ADMINISTRATOR" ||
    role === "SUPER_ADMIN" ||
    role === "MANAGER";

  /* -----------------------------
     INITIAL FETCH
  ----------------------------- */

  useEffect(() => {
    if (
      page !== 0 ||
      initialFetchStarted.current
    ) {
      return;
    }

    const hasAssets =
      assets.length > 0;

    const hasExistingData =
      hasAssets || totalElements > 0;

    if (
      !hasExistingData &&
      !loading
    ) {
      initialFetchStarted.current = true;

      dispatch(fetchAssets());
    }
  }, [
    dispatch,
    page,
    assets,
    totalElements,
    loading,
  ]);

  /* -----------------------------
     SYNC PAGE WITH REDUX
  ----------------------------- */

  useEffect(() => {
    if (
      Number.isFinite(
        currentPageFromStore
      ) &&
      currentPageFromStore !== page
    ) {
      setPage(
        currentPageFromStore
      );
    }
  }, [
    currentPageFromStore,
    page,
  ]);

  /* -----------------------------
     SEARCH / FILTER
  ----------------------------- */

  const filteredAssets = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    if (!query) {
      return assets;
    }

    return assets.filter(
      (asset) => {
        const name = String(
          asset?.name ?? ""
        ).toLowerCase();

        const tag = String(
          asset?.assetTag ??
            asset?.asset_tag ??
            asset?.tag ??
            ""
        ).toLowerCase();

        return (
          name.includes(query) ||
          tag.includes(query)
        );
      }
    );
  }, [
    assets,
    search,
  ]);

  /* -----------------------------
     OPEN ADD MODAL
  ----------------------------- */

  const handleAddAsset = () => {
    setSelectedAsset(null);
    setShowModal(true);
  };

  /* -----------------------------
     OPEN EDIT MODAL
  ----------------------------- */

  const handleEditAsset = (
    asset
  ) => {
    if (!isManager) {
      return;
    }

    setSelectedAsset(asset);
    setShowModal(true);
  };

  /* -----------------------------
     CLOSE MODAL
  ----------------------------- */

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAsset(null);
  };

  /* -----------------------------
     AFTER SAVE
  ----------------------------- */

  const handleAssetSaved = () => {
    handleCloseModal();

    initialFetchStarted.current = false;

    dispatch(
      fetchAssets({
        page,
        size: 10,
      })
    );
  };

  /* -----------------------------
     DECOMMISSION
  ----------------------------- */

  const handleDecommission = async (
    asset
  ) => {
    if (!isManager) {
      return;
    }

    const assetId =
      asset?.id ??
      asset?.assetId ??
      asset?.asset_id;

    if (assetId == null) {
      return;
    }

    const confirmed =
      window.confirm(
        "Are you sure you want to decommission this asset?"
      );

    if (!confirmed) {
      return;
    }

    try {
      await dispatch(
        decommissionAsset(assetId)
      ).unwrap();

      initialFetchStarted.current = false;

      dispatch(
        fetchAssets({
          page,
          size: 10,
        })
      );
    } catch (err) {
      console.error(
        "Failed to decommission asset:",
        err
      );
    }
  };

  /* -----------------------------
     NEXT PAGE
  ----------------------------- */

  const handleNextPage = () => {
    if (
      page + 1 >= totalPages
    ) {
      return;
    }

    const nextPage =
      page + 1;

    setPage(nextPage);

    dispatch(
      fetchAssets({
        page: nextPage,
        size: 10,
      })
    );
  };

  /* -----------------------------
     PREVIOUS PAGE
  ----------------------------- */

  const handlePreviousPage = () => {
    if (page <= 0) {
      return;
    }

    const previousPage =
      page - 1;

    setPage(previousPage);

    dispatch(
      fetchAssets({
        page: previousPage,
        size: 10,
      })
    );
  };

  /* -----------------------------
     FORMAT HEALTH
  ----------------------------- */

  const getHealth = (asset) => {
    const value =
      asset?.currentHealth ??
      asset?.health ??
      asset?.healthScore ??
      asset?.healthPercentage ??
      asset?.health_percentage;

    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return null;
    }

    const number =
      Number(value);

    if (
      Number.isNaN(number)
    ) {
      return null;
    }

    return Math.round(number);
  };

  /* -----------------------------
     HEALTH LEVEL
  ----------------------------- */

  const getHealthLevel = (
    health
  ) => {
    if (health === null) {
      return "Unknown";
    }

    if (health >= 80) {
      return "Healthy";
    }

    if (health >= 50) {
      return "Warning";
    }

    return "Critical";
  };

  /* -----------------------------
     STATUS
  ----------------------------- */

  const getStatus = (
    asset
  ) => {
    return (
      asset?.currentStatus ??
      asset?.status ??
      "UNKNOWN"
    );
  };

  /* -----------------------------
     RENDER
  ----------------------------- */

  return (
    <div className="page-container assets-page">

      {/* HEADER */}
      <div className="page-header">

        <div>
          <p className="eyebrow">
            ASSET MANAGEMENT
          </p>

          <h1>
            Industrial Assets
          </h1>

          <p className="page-subtitle">
            Monitor, manage and maintain
            your industrial asset fleet.
          </p>
        </div>

        <div className="asset-header-info">
          <span className="asset-count-label">
            Total Assets
          </span>

          <strong className="asset-count">
            {totalElements}
          </strong>
        </div>

      </div>

      {/* TOOLBAR */}
      <div className="asset-toolbar">

        <div className="search-wrapper">

          <span className="search-icon">
            🔍
          </span>

          <input
            type="text"
            className="search-input"
            placeholder="Search by tag or name..."
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
          />

        </div>

        {isManager && (
          <button
            type="button"
            className="add-btn"
            onClick={
              handleAddAsset
            }
          >
            + Add Asset
          </button>
        )}

      </div>

      {/* ERROR */}
      {error && (
        <div
          className="error-message"
          role="alert"
        >
          {typeof error ===
          "string"
            ? error
            : "Failed to load assets"}
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div
          className="loading-spinner"
          role="status"
        >
          Loading...
        </div>
      )}

      {/* TABLE */}
      {!loading &&
        filteredAssets.length > 0 && (
          <div className="table-wrapper">

            <table className="asset-table">

              <thead>
                <tr>
                  <th>
                    Asset Tag
                  </th>

                  <th>
                    Name
                  </th>

                  <th>
                    Category
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Health
                  </th>

                  <th>
                    Purchase Price
                  </th>

                  <th>
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>

                {filteredAssets.map(
                  (
                    asset,
                    index
                  ) => {

                    const assetId =
                      asset?.id ??
                      asset?.assetId ??
                      asset?.asset_id ??
                      index;

                    const assetTag =
                      asset?.assetTag ??
                      asset?.asset_tag ??
                      asset?.tag ??
                      "-";

                    const name =
                      asset?.name ??
                      "-";

                    const category =
                      asset?.category ??
                      "-";

                    const status =
                      getStatus(
                        asset
                      );

                    const health =
                      getHealth(
                        asset
                      );

                    const healthLevel =
                      getHealthLevel(
                        health
                      );

                    const purchasePrice =
                      asset?.purchasePrice ??
                      asset?.purchase_price;

                    return (
                      <tr
                        key={
                          assetId
                        }
                      >

                        {/* TAG */}
                        <td>
                          <strong className="asset-tag">
                            {assetTag}
                          </strong>
                        </td>

                        {/* NAME */}
                        <td>
                          <div className="asset-name">
                            {name}
                          </div>
                        </td>

                        {/* CATEGORY */}
                        <td>
                          {category}
                        </td>

                        {/* STATUS */}
                        <td>
                          <span
                            className={`status-badge ${String(
                              status
                            )
                              .toLowerCase()
                              .replace(
                                /\s+/g,
                                "-"
                              )}`}
                          >
                            {status}
                          </span>
                        </td>

                        {/* HEALTH */}
                        <td>

                          {health !==
                          null ? (
                            <div className="health-cell">

                              <div className="health-bar">

                                <div
                                  className={`health-fill ${
                                    health >=
                                    80
                                      ? "healthy"
                                      : health >=
                                        50
                                      ? "warning"
                                      : "critical"
                                  }`}
                                  style={{
                                    width: `${Math.min(
                                      100,
                                      Math.max(
                                        0,
                                        health
                                      )
                                    )}%`,
                                  }}
                                />

                              </div>

                              <div className="health-text">
                                <strong>
                                  {health}%
                                </strong>

                                <span>
                                  {
                                    healthLevel
                                  }
                                </span>
                              </div>

                            </div>
                          ) : (
                            <span className="health-na">
                              No data
                            </span>
                          )}

                        </td>

                        {/* PRICE */}
                        <td>
                          {purchasePrice !==
                          null &&
                          purchasePrice !==
                            undefined ? (
                            `₹${Number(
                              purchasePrice
                            ).toLocaleString(
                              "en-IN"
                            )}`
                          ) : (
                            "-"
                          )}
                        </td>

                        {/* ACTIONS */}
                        <td>

                          <div className="asset-actions">

                            {/* VIEW */}
                            <button
                              type="button"
                              className="view-btn"
                              onClick={() =>
                                handleEditAsset(
                                  asset
                                )
                              }
                            >
                              View
                            </button>

                            {/* EDIT */}
                            {isManager && (
                              <button
                                type="button"
                                className="edit-btn"
                                onClick={() =>
                                  handleEditAsset(
                                    asset
                                  )
                                }
                              >
                                Edit
                              </button>
                            )}

                            {/* DECOMMISSION */}
                            {isManager && (
                              <button
                                type="button"
                                className="danger-btn"
                                onClick={() =>
                                  handleDecommission(
                                    asset
                                  )
                                }
                              >
                                Decommission
                              </button>
                            )}

                          </div>

                        </td>

                      </tr>
                    );
                  }
                )}

              </tbody>

            </table>

          </div>
        )}

      {/* EMPTY STATE */}
      {!loading &&
        filteredAssets.length ===
          0 && (
          <div className="empty-state">

            <div className="empty-icon">
              🏭
            </div>

            <h3>
              No assets found
            </h3>

            <p>
              {search
                ? "No industrial assets match your search."
                : "There are currently no industrial assets available."}
            </p>

            {isManager &&
              !search && (
                <button
                  type="button"
                  className="add-btn"
                  onClick={
                    handleAddAsset
                  }
                >
                  + Add First Asset
                </button>
              )}

          </div>
        )}

      {/* PAGINATION */}
      <div className="pagination">

        <button
          type="button"
          className="secondary-btn"
          onClick={
            handlePreviousPage
          }
          disabled={
            page <= 0 ||
            loading
          }
        >
          Previous
        </button>

        <span className="page-number">
          Page {page + 1}
          {" "}
          of{" "}
          {totalPages}
        </span>

        <button
          type="button"
          className="secondary-btn"
          onClick={
            handleNextPage
          }
          disabled={
            page + 1 >=
              totalPages ||
            loading
          }
        >
          Next
        </button>

      </div>

      {/* ASSET MODAL */}
      {showModal && (
        <AssetModal
          isOpen={showModal}
          asset={selectedAsset}
          onClose={
            handleCloseModal
          }
          onSaved={
            handleAssetSaved
          }
        />
      )}

    </div>
  );
};

export default AssetList;