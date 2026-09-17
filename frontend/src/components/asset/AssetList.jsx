


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