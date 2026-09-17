
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";

import {
  useSelector,
} from "react-redux";


// ============================================================
// API
// ============================================================

const API_BASE_URL = "http://localhost:8080/api";


// ============================================================
// INLINE STYLES
// No HealthMonitor.css required
// ============================================================

const styles = {
  page: {
    minHeight: "100vh",
    padding: "28px 32px 60px",
    boxSizing: "border-box",
    color: "#eaf7ff",
    background:
      "radial-gradient(circle at 15% 10%, rgba(0,170,255,.14), transparent 30%), radial-gradient(circle at 90% 25%, rgba(0,220,255,.10), transparent 30%), linear-gradient(135deg,#04101b,#071a29 50%,#03101a)",
    position: "relative",
    overflow: "hidden",
  },

  container: {
    width: "100%",
    maxWidth: "1500px",
    margin: "0 auto",
    position: "relative",
    zIndex: 2,
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: "20px",
    marginBottom: "22px",
  },

  kicker: {
    color: "#55d6ff",
    fontSize: "11px",
    fontWeight: 800,
    letterSpacing: "3px",
    textTransform: "uppercase",
    marginBottom: "9px",
  },

  title: {
    margin: 0,
    color: "#ffffff",
    fontSize: "38px",
    lineHeight: 1.1,
    fontWeight: 800,
    letterSpacing: "-1.2px",
  },

  subtitle: {
    margin: "9px 0 0",
    color: "#88aabd",
    fontSize: "13px",
  },

  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  live: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#69e6c5",
    fontSize: "10px",
    fontWeight: 800,
    letterSpacing: "1px",
  },

  liveDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#20e6bb",
    boxShadow:
      "0 0 8px #20e6bb, 0 0 20px rgba(32,230,187,.5)",
  },

  refreshButton: {
    height: "36px",
    padding: "0 15px",
    border: "1px solid rgba(0,195,255,.25)",
    borderRadius: "9px",
    background:
      "linear-gradient(135deg,#008cff,#00b9dd)",
    color: "#fff",
    fontSize: "10px",
    fontWeight: 800,
    cursor: "pointer",
  },

  banner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    padding: "15px 20px",
    marginBottom: "18px",
    border:
      "1px solid rgba(43,200,255,.20)",
    borderRadius: "13px",
    background:
      "linear-gradient(90deg,rgba(0,150,190,.18),rgba(0,100,135,.35),rgba(0,190,230,.15))",
    boxShadow:
      "inset 0 0 30px rgba(0,190,255,.04)",
  },

  bannerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  bannerIcon: {
    width: "34px",
    height: "34px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    color: "#52e4c4",
    background: "rgba(37,221,185,.12)",
    fontSize: "17px",
  },

  bannerTitle: {
    color: "#54e3c5",
    fontSize: "10px",
    fontWeight: 800,
    letterSpacing: "1.5px",
  },

  bannerText: {
    marginTop: "4px",
    color: "#7ea4b7",
    fontSize: "10px",
  },

  bannerRight: {
    textAlign: "right",
  },

  autoTitle: {
    color: "#d8f5ff",
    fontSize: "10px",
    fontWeight: 700,
  },

  autoText: {
    marginTop: "4px",
    color: "#5f8497",
    fontSize: "9px",
  },

  stats: {
    display: "grid",
    gridTemplateColumns:
      "repeat(4,minmax(0,1fr))",
    gap: "12px",
    marginBottom: "22px",
  },

  statCard: {
    position: "relative",
    overflow: "hidden",
    minHeight: "105px",
    padding: "18px",
    border:
      "1px solid rgba(88,172,215,.16)",
    borderRadius: "14px",
    background:
      "linear-gradient(145deg,rgba(15,39,56,.94),rgba(6,23,36,.97))",
    boxShadow:
      "0 18px 45px rgba(0,0,0,.22)",
    boxSizing: "border-box",
  },

  statLabel: {
    color: "#678b9e",
    fontSize: "9px",
    fontWeight: 800,
    letterSpacing: "1px",
    textTransform: "uppercase",
  },

  statValue: {
    marginTop: "9px",
    color: "#fff",
    fontSize: "28px",
    fontWeight: 800,
  },

  statSmall: {
    marginTop: "5px",
    color: "#63879a",
    fontSize: "9px",
  },

  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    marginBottom: "14px",
  },

  search: {
    width: "320px",
    height: "40px",
    padding: "0 14px",
    boxSizing: "border-box",
    outline: "none",
    border:
      "1px solid rgba(77,174,220,.20)",
    borderRadius: "9px",
    color: "#fff",
    background: "rgba(8,28,43,.85)",
    fontSize: "11px",
  },

  filters: {
    display: "flex",
    gap: "7px",
    flexWrap: "wrap",
  },

  filterButton: {
    height: "30px",
    padding: "0 12px",
    border:
      "1px solid rgba(76,159,201,.20)",
    borderRadius: "15px",
    color: "#6e9aae",
    background: "rgba(8,27,42,.8)",
    fontSize: "8px",
    fontWeight: 800,
    cursor: "pointer",
  },

  sectionKicker: {
    color: "#4fcfff",
    fontSize: "8px",
    fontWeight: 800,
    letterSpacing: "2px",
    textTransform: "uppercase",
  },

  sectionTitle: {
    margin: "6px 0 12px",
    color: "#fff",
    fontSize: "18px",
    fontWeight: 800,
  },

  tableContainer: {
    width: "100%",
    overflowX: "auto",
    border:
      "1px solid rgba(78,161,204,.15)",
    borderRadius: "16px",
    background:
      "linear-gradient(145deg,rgba(9,30,46,.97),rgba(5,20,32,.99))",
    boxShadow:
      "0 25px 70px rgba(0,0,0,.30)",
  },

  table: {
    width: "100%",
    minWidth: "1180px",
    borderCollapse: "collapse",
  },

  th: {
    height: "48px",
    padding: "0 14px",
    color: "#78a5ba",
    fontSize: "8px",
    fontWeight: 800,
    letterSpacing: ".8px",
    textAlign: "left",
    textTransform: "uppercase",
    background: "rgba(16,50,70,.75)",
    borderBottom:
      "1px solid rgba(83,159,195,.12)",
  },

  td: {
    height: "64px",
    padding: "9px 14px",
    color: "#b7cfda",
    fontSize: "10px",
    borderBottom:
      "1px solid rgba(73,140,170,.09)",
  },

  tag: {
    color: "#fff",
    fontWeight: 800,
  },

  statusActive: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "5px 9px",
    borderRadius: "12px",
    color: "#49dfb9",
    background: "rgba(40,220,170,.08)",
    fontSize: "8px",
    fontWeight: 800,
  },

  statusDecommissioned: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "5px 9px",
    borderRadius: "12px",
    color: "#ff7985",
    background: "rgba(255,60,80,.08)",
    fontSize: "8px",
    fontWeight: 800,
  },

  statusDot: {
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    background: "#3fe3b8",
    boxShadow: "0 0 7px #3fe3b8",
  },

  scoreBox: {
    minWidth: "120px",
  },

  scoreTop: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "5px",
  },

  score: {
    color: "#45dfb5",
    fontWeight: 800,
  },

  scoreUnavailable: {
    color: "#718b99",
    fontWeight: 700,
    fontSize: "9px",
  },

  bar: {
    height: "5px",
    overflow: "hidden",
    borderRadius: "10px",
    background: "rgba(255,255,255,.08)",
  },

  barFill: {
    height: "100%",
    borderRadius: "10px",
    background:
      "linear-gradient(90deg,#1bc69c,#45e8be)",
  },

  conditionHealthy: {
    color: "#47dfb7",
    background: "rgba(36,215,170,.08)",
  },

  conditionWarning: {
    color: "#ffd15a",
    background: "rgba(255,198,65,.08)",
  },

  conditionCritical: {
    color: "#ff6877",
    background: "rgba(255,70,85,.08)",
  },

  conditionUnavailable: {
    color: "#7694a4",
    background: "rgba(120,150,165,.08)",
  },

  condition: {
    display: "inline-flex",
    padding: "5px 9px",
    borderRadius: "8px",
    fontSize: "8px",
    fontWeight: 800,
  },

  healthLevel: {
    fontSize: "8px",
    fontWeight: 800,
    letterSpacing: ".7px",
  },

  actions: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  action: {
    height: "29px",
    padding: "0 10px",
    border:
      "1px solid rgba(78,170,215,.22)",
    borderRadius: "7px",
    color: "#a7d8e9",
    background: "rgba(10,36,52,.85)",
    fontSize: "8px",
    fontWeight: 800,
    cursor: "pointer",
  },

  editAction: {
    color: "#5fd6ff",
  },

  deleteAction: {
    color: "#ff7180",
    borderColor:
      "rgba(255,80,95,.20)",
  },

  empty: {
    minHeight: "230px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#6c8d9e",
  },

  emptyIcon: {
    width: "55px",
    height: "55px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "13px",
    borderRadius: "15px",
    color: "#52d5ff",
    background: "rgba(0,170,255,.10)",
    fontSize: "22px",
  },

  loading: {
    minHeight: "250px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#78a6b9",
    fontSize: "12px",
  },

  error: {
    marginBottom: "14px",
    padding: "12px 14px",
    border:
      "1px solid rgba(255,75,90,.22)",
    borderRadius: "9px",
    color: "#ff8995",
    background: "rgba(100,15,25,.18)",
    fontSize: "10px",
  },

  info: {
    marginTop: "13px",
    padding: "11px 15px",
    border:
      "1px solid rgba(69,145,183,.14)",
    borderRadius: "8px",
    color: "#61879a",
    background: "rgba(7,26,40,.75)",
    fontSize: "9px",
  },

  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    background: "rgba(1,8,14,.82)",
    backdropFilter: "blur(10px)",
  },

  modal: {
    width: "100%",
    maxWidth: "540px",
    maxHeight: "90vh",
    overflowY: "auto",
    padding: "27px",
    boxSizing: "border-box",
    border:
      "1px solid rgba(69,185,235,.25)",
    borderRadius: "18px",
    background:
      "linear-gradient(145deg,#0c2639,#061725)",
    boxShadow:
      "0 40px 100px rgba(0,0,0,.6)",
  },

  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "20px",
    paddingBottom: "18px",
    borderBottom:
      "1px solid rgba(92,160,195,.13)",
  },

  modalKicker: {
    color: "#50d5ff",
    fontSize: "9px",
    fontWeight: 800,
    letterSpacing: "2px",
  },

  modalTitle: {
    margin: "7px 0 0",
    color: "#fff",
    fontSize: "22px",
  },

  close: {
    width: "32px",
    height: "32px",
    border:
      "1px solid rgba(95,170,210,.2)",
    borderRadius: "8px",
    cursor: "pointer",
    color: "#8db0c0",
    background: "rgba(7,27,42,.8)",
    fontSize: "17px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
  },

  label: {
    color: "#a9c3cf",
    fontSize: "9px",
    fontWeight: 800,
  },

  input: {
    width: "100%",
    height: "42px",
    padding: "0 12px",
    boxSizing: "border-box",
    outline: "none",
    border:
      "1px solid rgba(77,161,200,.20)",
    borderRadius: "8px",
    color: "#fff",
    background: "rgba(3,16,27,.8)",
    fontSize: "11px",
  },

  select: {
    width: "100%",
    height: "42px",
    padding: "0 12px",
    boxSizing: "border-box",
    outline: "none",
    border:
      "1px solid rgba(77,161,200,.20)",
    borderRadius: "8px",
    color: "#fff",
    background: "rgba(3,16,27,.8)",
    fontSize: "11px",
  },

  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "9px",
    marginTop: "7px",
  },

  cancel: {
    height: "40px",
    padding: "0 17px",
    border:
      "1px solid rgba(91,155,188,.22)",
    borderRadius: "8px",
    cursor: "pointer",
    color: "#9bb8c5",
    background: "rgba(8,27,40,.8)",
    fontSize: "10px",
    fontWeight: 700,
  },

  save: {
    height: "40px",
    padding: "0 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    color: "#fff",
    background:
      "linear-gradient(90deg,#008dff,#00c3e9)",
    fontSize: "10px",
    fontWeight: 800,
  },
};


// ============================================================
// HELPERS
// ============================================================

const getToken = () => {
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    ""
  );
};


const getAuthConfig = () => {
  const token = getToken();

  if (!token) {
    return {};
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};


const normalizeHealth = (asset) => {

  if (!asset) {
    return null;
  }

  const possibleValues = [
    asset.currentHealth,
    asset.healthScore,
    asset.health,
    asset.healthPercentage,
    asset.health_score,
    asset.current_health,
  ];

  for (const value of possibleValues) {

    if (
      value !== null &&
      value !== undefined &&
      value !== "" &&
      !Number.isNaN(Number(value))
    ) {

      const number =
        Number(value);

      if (number >= 0 && number <= 100) {
        return number;
      }
    }
  }

  return null;
};


const getAssetTag = (asset) => {
  return (
    asset?.assetTag ||
    asset?.asset_tag ||
    asset?.tag ||
    "—"
  );
};


const getAssetName = (asset) => {
  return (
    asset?.name ||
    asset?.assetName ||
    asset?.asset_name ||
    "Unnamed Asset"
  );
};


const getCategory = (asset) => {
  return (
    asset?.category ||
    asset?.assetCategory ||
    "—"
  );
};


const getStatus = (asset) => {

  const status =
    asset?.currentStatus ||
    asset?.status ||
    asset?.current_status ||
    "ACTIVE";

  return String(status).toUpperCase();
};


const getCondition = (health) => {

  if (health === null) {
    return "Metric unavailable";
  }

  if (health >= 80) {
    return "Healthy";
  }

  if (health >= 50) {
    return "Needs Attention";
  }

  return "Critical";
};


const getHealthLevel = (health) => {

  if (health === null) {
    return "—";
  }

  if (health >= 90) {
    return "EXCELLENT";
  }

  if (health >= 75) {
    return "GOOD";
  }

  if (health >= 50) {
    return "ATTENTION";
  }

  return "CRITICAL";
};


// ============================================================
// COMPONENT
// ============================================================

const HealthMonitor = () => {

  const auth =
    useSelector(
      (state) => state.auth || {}
    );


  // ==========================================================
  // ROLE
  // ==========================================================

  const role = String(
    auth?.role ||
    auth?.user?.role ||
    localStorage.getItem("role") ||
    ""
  ).toUpperCase();


  const canEditHealth =
    role === "SYSTEM_ADMIN" ||
    role === "ADMIN" ||
    role === "ASSET_MANAGER" ||
    role === "MAINTENANCE_TECHNICIAN";


  const canDelete =
    role === "SYSTEM_ADMIN" ||
    role === "ADMIN" ||
    role === "ASSET_MANAGER";


  // ==========================================================
  // STATE
  // ==========================================================

  const [assets, setAssets] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("ALL");

  const [editingAsset, setEditingAsset] =
    useState(null);

  const [viewingAsset, setViewingAsset] =
    useState(null);

  const [saving, setSaving] =
    useState(false);


  const [form, setForm] =
    useState({
      healthScore: "",
      condition: "",
      healthLevel: "",
    });


  // ==========================================================
  // FETCH ASSETS
  // ==========================================================

  const fetchAssets = useCallback(
    async () => {

      setLoading(true);
      setError("");

      try {

        const response =
          await axios.get(
            `${API_BASE_URL}/assets`,
            getAuthConfig()
          );

        const data =
          response?.data;

        if (Array.isArray(data)) {

          setAssets(data);

        } else if (
          Array.isArray(data?.content)
        ) {

          setAssets(data.content);

        } else if (
          Array.isArray(data?.data)
        ) {

          setAssets(data.data);

        } else {

          setAssets([]);

        }

      } catch (err) {

        console.error(
          "Health Monitor asset fetch error:",
          err
        );

        setError(
          err?.response?.data?.message ||
          err?.message ||
          "Unable to load industrial assets."
        );

        setAssets([]);

      } finally {

        setLoading(false);

      }

    },
    []
  );


  // ==========================================================
  // INITIAL LOAD + AUTO REFRESH
  // ==========================================================

  useEffect(() => {

    fetchAssets();

    const timer =
      setInterval(
        fetchAssets,
        10000
      );

    return () => {
      clearInterval(timer);
    };

  }, [fetchAssets]);


  // ==========================================================
  // FILTER
  // ==========================================================

  const filteredAssets =
    useMemo(() => {

      const query =
        search
          .trim()
          .toLowerCase();

      return assets.filter(
        (asset) => {

          const tag =
            getAssetTag(asset)
              .toLowerCase();

          const name =
            getAssetName(asset)
              .toLowerCase();

          const category =
            getCategory(asset)
              .toLowerCase();

          const status =
            getStatus(asset);

          const health =
            normalizeHealth(asset);

          const matchesSearch =
            !query ||
            tag.includes(query) ||
            name.includes(query) ||
            category.includes(query);

          let matchesFilter = true;

          if (filter === "HEALTHY") {
            matchesFilter =
              health !== null &&
              health >= 80;
          }

          if (filter === "WARNING") {
            matchesFilter =
              health !== null &&
              health >= 50 &&
              health < 80;
          }

          if (filter === "CRITICAL") {
            matchesFilter =
              health !== null &&
              health < 50;
          }

          if (filter === "NO_DATA") {
            matchesFilter =
              health === null;
          }

          if (filter === "ACTIVE") {
            matchesFilter =
              status === "ACTIVE";
          }

          if (filter === "DECOMMISSIONED") {
            matchesFilter =
              status === "DECOMMISSIONED";
          }

          return (
            matchesSearch &&
            matchesFilter
          );

        }
      );

    }, [
      assets,
      search,
      filter,
    ]);


  // ==========================================================
  // STATISTICS
  // ==========================================================

  const statistics =
    useMemo(() => {

      const total =
        assets.length;

      const monitored =
        assets.filter(
          (asset) =>
            normalizeHealth(asset) !== null
        ).length;

      const healthValues =
        assets
          .map(normalizeHealth)
          .filter(
            (value) =>
              value !== null
          );

      const average =
        healthValues.length > 0
          ? Math.round(
              healthValues.reduce(
                (sum, value) =>
                  sum + value,
                0
              ) /
              healthValues.length
            )
          : 0;

      const healthy =
        healthValues.filter(
          (value) =>
            value >= 80
        ).length;

      const warning =
        healthValues.filter(
          (value) =>
            value >= 50 &&
            value < 80
        ).length;

      const critical =
        healthValues.filter(
          (value) =>
            value < 50
        ).length;

      return {
        total,
        monitored,
        average,
        healthy,
        warning,
        critical,
      };

    }, [assets]);


  // ==========================================================
  // OPEN EDIT
  // ==========================================================

  const openEdit =
    (asset) => {

      if (!canEditHealth) {
        return;
      }

      const health =
        normalizeHealth(asset);

      setEditingAsset(asset);

      setForm({
        healthScore:
          health === null
            ? ""
            : String(health),

        condition:
          getCondition(health),

        healthLevel:
          getHealthLevel(health),
      });

    };


  // ==========================================================
  // OPEN VIEW
  // ==========================================================

  const openView =
    (asset) => {

      setViewingAsset(asset);

    };


  // ==========================================================
  // FORM CHANGE
  // ==========================================================

  const handleFormChange =
    (event) => {

      const {
        name,
        value,
      } = event.target;

      setForm(
        (previous) => ({
          ...previous,
          [name]: value,
        })
      );

    };


  // ==========================================================
  // AUTOMATIC CONDITION
  // ==========================================================

  const updateScore =
    (value) => {

      let health =
        Number(value);

      if (
        value === "" ||
        Number.isNaN(health)
      ) {

        setForm(
          (previous) => ({
            ...previous,
            healthScore: value,
          })
        );

        return;
      }

      health =
        Math.max(
          0,
          Math.min(
            100,
            health
          )
        );

      let condition =
        "Critical";

      let healthLevel =
        "CRITICAL";

      if (health >= 90) {

        condition = "Healthy";
        healthLevel = "EXCELLENT";

      } else if (health >= 75) {

        condition = "Healthy";
        healthLevel = "GOOD";

      } else if (health >= 50) {

        condition = "Needs Attention";
        healthLevel = "ATTENTION";

      }

      setForm({
        healthScore:
          String(health),

        condition,

        healthLevel,
      });

    };


  // ==========================================================
  // SAVE HEALTH
  // ==========================================================

  const saveHealth =
    async (event) => {

      event.preventDefault();

      if (!editingAsset) {
        return;
      }

      const health =
        Number(form.healthScore);

      if (
        Number.isNaN(health) ||
        health < 0 ||
        health > 100
      ) {

        alert(
          "Health Score must be between 0 and 100."
        );

        return;
      }

      setSaving(true);

      try {

        const id =
          editingAsset.id ||
          editingAsset.assetId;

        const payload = {
          ...editingAsset,

          currentHealth:
            health,

          healthScore:
            health,

          condition:
            form.condition,

          healthLevel:
            form.healthLevel,
        };


        const response =
          await axios.put(
            `${API_BASE_URL}/assets/${id}`,
            payload,
            getAuthConfig()
          );


        const updated =
          response?.data;

        setAssets(
          (previous) =>
            previous.map(
              (asset) => {

                const assetId =
                  asset.id ||
                  asset.assetId;

                if (
                  String(assetId) ===
                  String(id)
                ) {

                  return (
                    updated ||
                    payload
                  );

                }

                return asset;

              }
            )
        );


        setEditingAsset(null);

        alert(
          "Asset health updated successfully."
        );


        await fetchAssets();

      } catch (err) {

        console.error(
          "Health update error:",
          err
        );

        alert(
          err?.response?.data?.message ||
          "Unable to update asset health."
        );

      } finally {

        setSaving(false);

      }

    };


  // ==========================================================
  // DELETE ASSET
  // ADMIN + MANAGER ONLY
  // ==========================================================

  const deleteAsset =
    async (asset) => {

      if (!canDelete) {
        return;
      }

      const id =
        asset.id ||
        asset.assetId;

      if (!id) {
        return;
      }

      const confirmed =
        window.confirm(
          `Delete ${getAssetTag(asset)}?`
        );

      if (!confirmed) {
        return;
      }

      try {

        await axios.delete(
          `${API_BASE_URL}/assets/${id}`,
          getAuthConfig()
        );

        setAssets(
          (previous) =>
            previous.filter(
              (item) => {

                const itemId =
                  item.id ||
                  item.assetId;

                return (
                  String(itemId) !==
                  String(id)
                );

              }
            )
        );

        alert(
          "Asset deleted successfully."
        );

      } catch (err) {

        console.error(
          "Delete asset error:",
          err
        );

        alert(
          err?.response?.data?.message ||
          "Unable to delete asset."
        );

      }

    };


  // ==========================================================
  // CONDITION CLASS
  // ==========================================================

  const getConditionStyle =
    (health) => {

      if (health === null) {
        return {
          ...styles.condition,
          ...styles.conditionUnavailable,
        };
      }

      if (health >= 80) {
        return {
          ...styles.condition,
          ...styles.conditionHealthy,
        };
      }

      if (health >= 50) {
        return {
          ...styles.condition,
          ...styles.conditionWarning,
        };
      }

      return {
        ...styles.condition,
        ...styles.conditionCritical,
      };

    };


  // ==========================================================
  // HEALTH LEVEL STYLE
  // ==========================================================

  const getLevelStyle =
    (health) => {

      if (health === null) {
        return {
          ...styles.healthLevel,
          color: "#7694a4",
        };
      }

      if (health >= 90) {
        return {
          ...styles.healthLevel,
          color: "#45dfb5",
        };
      }

      if (health >= 75) {
        return {
          ...styles.healthLevel,
          color: "#8cdb62",
        };
      }

      if (health >= 50) {
        return {
          ...styles.healthLevel,
          color: "#ffd05a",
        };
      }

      return {
        ...styles.healthLevel,
        color: "#ff6677",
      };

    };


  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <div style={styles.page}>

      <div style={styles.container}>

        {/* ==================================================
            HEADER
        ================================================== */}

        <header style={styles.header}>

          <div>

            <div style={styles.kicker}>
              CONDITION MONITORING
            </div>

            <h1 style={styles.title}>
              Industrial Asset Health
            </h1>

            <p style={styles.subtitle}>
              Real-time equipment condition
              and health intelligence.
            </p>

          </div>


          <div style={styles.headerRight}>

            <div style={styles.live}>

              <span style={styles.liveDot} />

              LIVE MONITORING

            </div>

            <button
              type="button"
              style={styles.refreshButton}
              onClick={fetchAssets}
            >
              ↻ Refresh
            </button>

          </div>

        </header>


        {/* ==================================================
            MONITORING BANNER
        ================================================== */}

        <div style={styles.banner}>

          <div style={styles.bannerLeft}>

            <div style={styles.bannerIcon}>
              ◉
            </div>

            <div>

              <div style={styles.bannerTitle}>
                LIVE MONITORING
              </div>

              <div style={styles.bannerText}>
                Industrial equipment health
                monitoring is active.
              </div>

            </div>

          </div>


          <div style={styles.bannerRight}>

            <div style={styles.autoTitle}>
              Auto refresh: 10s
            </div>

            <div style={styles.autoText}>
              Last data refresh is automatic
            </div>

          </div>

        </div>


        {/* ==================================================
            STATISTICS
        ================================================== */}

        <div style={styles.stats}>


          <div style={styles.statCard}>

            <div style={styles.statLabel}>
              Fleet Average
            </div>

            <div style={styles.statValue}>
              {statistics.average}%
            </div>

            <div style={styles.statSmall}>
              Average monitored health
            </div>

          </div>


          <div style={styles.statCard}>

            <div style={styles.statLabel}>
              Monitored Assets
            </div>

            <div style={styles.statValue}>
              {statistics.monitored}
            </div>

            <div style={styles.statSmall}>
              Assets with health metrics
            </div>

          </div>


          <div style={styles.statCard}>

            <div style={styles.statLabel}>
              Total Assets
            </div>

            <div style={styles.statValue}>
              {statistics.total}
            </div>

            <div style={styles.statSmall}>
              Registered industrial assets
            </div>

          </div>


          <div style={styles.statCard}>

            <div style={styles.statLabel}>
              Healthy Assets
            </div>

            <div style={{
              ...styles.statValue,
              color: "#45dfb5",
            }}>
              {statistics.healthy}
            </div>

            <div style={styles.statSmall}>
              80% or higher
            </div>

          </div>

        </div>


        {/* ==================================================
            ERROR
        ================================================== */}

        {error && (

          <div style={styles.error}>
            {error}
          </div>

        )}


        {/* ==================================================
            TOOLBAR
        ================================================== */}

        <div style={styles.toolbar}>

          <input
            type="text"
            placeholder="Search by tag or name..."
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            style={styles.search}
          />


          <div style={styles.filters}>

            {[
              ["ALL", "All"],
              ["HEALTHY", "Healthy"],
              ["WARNING", "Warning"],
              ["CRITICAL", "Critical"],
              ["NO_DATA", "No Data"],
              ["ACTIVE", "Active"],
              [
                "DECOMMISSIONED",
                "Decommissioned",
              ],
            ].map(
              ([value, label]) => (

                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    setFilter(value)
                  }
                  style={{
                    ...styles.filterButton,
                    ...(filter === value
                      ? {
                          color: "#fff",
                          borderColor:
                            "#00c7ff",
                          background:
                            "linear-gradient(135deg,rgba(0,146,220,.7),rgba(0,202,238,.5))",
                        }
                      : {}),
                  }}
                >
                  {label}
                </button>

              )
            )}

          </div>

        </div>


        {/* ==================================================
            SECTION
        ================================================== */}

        <div>

          <div style={styles.sectionKicker}>
            ASSET HEALTH DETAILS
          </div>

          <h2 style={styles.sectionTitle}>
            Current Equipment Condition
          </h2>

        </div>


        {/* ==================================================
            LOADING
        ================================================== */}

        {loading ? (

          <div style={styles.tableContainer}>

            <div style={styles.loading}>
              Loading industrial asset health data...
            </div>

          </div>

        ) : filteredAssets.length === 0 ? (

          <div style={styles.tableContainer}>

            <div style={styles.empty}>

              <div style={styles.emptyIcon}>
                ◌
              </div>

              <strong
                style={{
                  color: "#fff",
                  fontSize: "15px",
                }}
              >
                No Asset Data
              </strong>

              <span
                style={{
                  marginTop: "7px",
                  fontSize: "10px",
                }}
              >
                No industrial assets match
                the selected filter.
              </span>

            </div>

          </div>

        ) : (

          /* ==================================================
             TABLE
          ================================================== */

          <div style={styles.tableContainer}>

            <table style={styles.table}>

              <thead>

                <tr>

                  <th style={styles.th}>
                    Asset Tag
                  </th>

                  <th style={styles.th}>
                    Asset Name
                  </th>

                  <th style={styles.th}>
                    Category
                  </th>

                  <th style={styles.th}>
                    Status
                  </th>

                  <th style={styles.th}>
                    Health Score
                  </th>

                  <th style={styles.th}>
                    Condition
                  </th>

                  <th style={styles.th}>
                    Health Level
                  </th>

                  <th style={styles.th}>
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                {filteredAssets.map(
                  (asset, index) => {

                    const health =
                      normalizeHealth(
                        asset
                      );

                    const status =
                      getStatus(
                        asset
                      );

                    const condition =
                      getCondition(
                        health
                      );

                    const level =
                      getHealthLevel(
                        health
                      );

                    return (

                      <tr
                        key={
                          asset.id ||
                          asset.assetId ||
                          `${getAssetTag(asset)}-${index}`
                        }
                      >

                        {/* TAG */}

                        <td style={styles.td}>

                          <span style={styles.tag}>
                            {getAssetTag(asset)}
                          </span>

                        </td>


                        {/* NAME */}

                        <td style={styles.td}>

                          {getAssetName(asset)}

                        </td>


                        {/* CATEGORY */}

                        <td style={styles.td}>

                          {getCategory(asset)}

                        </td>


                        {/* STATUS */}

                        <td style={styles.td}>

                          {status ===
                          "DECOMMISSIONED" ? (

                            <span
                              style={
                                styles.statusDecommissioned
                              }
                            >

                              <span
                                style={{
                                  ...styles.statusDot,
                                  background:
                                    "#ff5b6b",
                                  boxShadow:
                                    "0 0 7px #ff5b6b",
                                }}
                              />

                              DECOMMISSIONED

                            </span>

                          ) : (

                            <span
                              style={
                                styles.statusActive
                              }
                            >

                              <span
                                style={
                                  styles.statusDot
                                }
                              />

                              {status}

                            </span>

                          )}

                        </td>


                        {/* HEALTH */}

                        <td style={styles.td}>

                          {health === null ? (

                            <span
                              style={
                                styles.scoreUnavailable
                              }
                            >
                              Metric unavailable
                            </span>

                          ) : (

                            <div
                              style={
                                styles.scoreBox
                              }
                            >

                              <div
                                style={
                                  styles.scoreTop
                                }
                              >

                                <span
                                  style={
                                    styles.score
                                  }
                                >
                                  {health}%
                                </span>

                              </div>

                              <div
                                style={
                                  styles.bar
                                }
                              >

                                <div
                                  style={{
                                    ...styles.barFill,
                                    width:
                                      `${health}%`,
                                  }}
                                />

                              </div>

                            </div>

                          )}

                        </td>


                        {/* CONDITION */}

                        <td style={styles.td}>

                          <span
                            style={
                              getConditionStyle(
                                health
                              )
                            }
                          >

                            {condition}

                          </span>

                        </td>


                        {/* LEVEL */}

                        <td style={styles.td}>

                          <span
                            style={
                              getLevelStyle(
                                health
                              )
                            }
                          >

                            {level}

                          </span>

                        </td>


                        {/* ACTIONS */}

                        <td style={styles.td}>

                          <div
                            style={
                              styles.actions
                            }
                          >

                            {/* VIEW */}

                            <button
                              type="button"
                              style={
                                styles.action
                              }
                              onClick={() =>
                                openView(
                                  asset
                                )
                              }
                            >
                              View
                            </button>


                            {/* EDIT */}

                            {canEditHealth && (

                              <button
                                type="button"
                                style={{
                                  ...styles.action,
                                  ...styles.editAction,
                                }}
                                onClick={() =>
                                  openEdit(
                                    asset
                                  )
                                }
                              >
                                Edit
                              </button>

                            )}


                            {/* DELETE */}

                            {canDelete && (

                              <button
                                type="button"
                                style={{
                                  ...styles.action,
                                  ...styles.deleteAction,
                                }}
                                onClick={() =>
                                  deleteAsset(
                                    asset
                                  )
                                }
                              >
                                Delete
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


        {/* ==================================================
            INFO
        ================================================== */}

        <div style={styles.info}>

          <strong>
            Health access:
          </strong>{" "}

          {canEditHealth
            ? "You can edit health score, condition and health level."
            : "Health editing is restricted to authorized maintenance roles."}

          {canDelete &&
            " Asset deletion is available to administrators and asset managers."}

        </div>

      </div>


      {/* ====================================================
          VIEW MODAL
      ==================================================== */}

      {viewingAsset && (

        <div
          style={styles.overlay}
          onClick={() =>
            setViewingAsset(null)
          }
        >

          <div
            style={styles.modal}
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div
              style={
                styles.modalHeader
              }
            >

              <div>

                <div
                  style={
                    styles.modalKicker
                  }
                >
                  ASSET HEALTH DETAILS
                </div>

                <h2
                  style={
                    styles.modalTitle
                  }
                >
                  {getAssetTag(
                    viewingAsset
                  )}
                </h2>

              </div>


              <button
                type="button"
                style={styles.close}
                onClick={() =>
                  setViewingAsset(null)
                }
              >
                ×
              </button>

            </div>


            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr",
                gap: "12px",
              }}
            >

              <div>

                <div
                  style={styles.label}
                >
                  ASSET NAME
                </div>

                <div
                  style={{
                    marginTop: "7px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                >
                  {getAssetName(
                    viewingAsset
                  )}
                </div>

              </div>


              <div>

                <div
                  style={styles.label}
                >
                  CATEGORY
                </div>

                <div
                  style={{
                    marginTop: "7px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                >
                  {getCategory(
                    viewingAsset
                  )}
                </div>

              </div>


              <div>

                <div
                  style={styles.label}
                >
                  STATUS
                </div>

                <div
                  style={{
                    marginTop: "7px",
                    color: "#45dfb5",
                    fontSize: "12px",
                    fontWeight: 800,
                  }}
                >
                  {getStatus(
                    viewingAsset
                  )}
                </div>

              </div>


              <div>

                <div
                  style={styles.label}
                >
                  HEALTH SCORE
                </div>

                <div
                  style={{
                    marginTop: "7px",
                    color: "#fff",
                    fontSize: "12px",
                    fontWeight: 800,
                  }}
                >
                  {normalizeHealth(
                    viewingAsset
                  ) !== null
                    ? `${normalizeHealth(
                        viewingAsset
                      )}%`
                    : "Metric unavailable"}
                </div>

              </div>


              <div>

                <div
                  style={styles.label}
                >
                  CONDITION
                </div>

                <div
                  style={{
                    marginTop: "7px",
                    color: "#45dfb5",
                    fontSize: "12px",
                    fontWeight: 800,
                  }}
                >
                  {getCondition(
                    normalizeHealth(
                      viewingAsset
                    )
                  )}
                </div>

              </div>


              <div>

                <div
                  style={styles.label}
                >
                  HEALTH LEVEL
                </div>

                <div
                  style={{
                    marginTop: "7px",
                    color: "#45dfb5",
                    fontSize: "12px",
                    fontWeight: 800,
                  }}
                >
                  {getHealthLevel(
                    normalizeHealth(
                      viewingAsset
                    )
                  )}
                </div>

              </div>

            </div>


            <div
              style={{
                ...styles.modalActions,
                marginTop: "25px",
              }}
            >

              {canEditHealth && (

                <button
                  type="button"
                  style={{
                    ...styles.save,
                    background:
                      "linear-gradient(90deg,#008dff,#00c3e9)",
                  }}
                  onClick={() => {

                    const asset =
                      viewingAsset;

                    setViewingAsset(
                      null
                    );

                    openEdit(
                      asset
                    );

                  }}
                >
                  Edit Health
                </button>

              )}

              <button
                type="button"
                style={styles.cancel}
                onClick={() =>
                  setViewingAsset(null)
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}


      {/* ====================================================
          EDIT MODAL
      ==================================================== */}

      {editingAsset && (

        <div
          style={styles.overlay}
          onClick={() =>
            !saving &&
            setEditingAsset(null)
          }
        >

          <div
            style={styles.modal}
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div
              style={
                styles.modalHeader
              }
            >

              <div>

                <div
                  style={
                    styles.modalKicker
                  }
                >
                  HEALTH MANAGEMENT
                </div>

                <h2
                  style={
                    styles.modalTitle
                  }
                >
                  Edit Asset Health
                </h2>

              </div>


              <button
                type="button"
                style={styles.close}
                disabled={saving}
                onClick={() =>
                  setEditingAsset(null)
                }
              >
                ×
              </button>

            </div>


            <form
              style={styles.form}
              onSubmit={saveHealth}
            >

              {/* ASSET */}

              <div
                style={styles.formGroup}
              >

                <label
                  style={styles.label}
                >
                  ASSET
                </label>

                <input
                  type="text"
                  value={
                    `${getAssetTag(
                      editingAsset
                    )} - ${getAssetName(
                      editingAsset
                    )}`
                  }
                  readOnly
                  style={{
                    ...styles.input,
                    opacity: 0.7,
                  }}
                />

              </div>


              {/* HEALTH SCORE */}

              <div
                style={styles.formGroup}
              >

                <label
                  style={styles.label}
                >
                  HEALTH SCORE (%)
                </label>

                <input
                  type="number"
                  min="0"
                  max="100"
                  name="healthScore"
                  value={
                    form.healthScore
                  }
                  onChange={(event) =>
                    updateScore(
                      event.target.value
                    )
                  }
                  placeholder="Enter health score"
                  style={styles.input}
                  required
                />

              </div>


              {/* CONDITION */}

              <div
                style={styles.formGroup}
              >

                <label
                  style={styles.label}
                >
                  CONDITION
                </label>

                <select
                  name="condition"
                  value={
                    form.condition
                  }
                  onChange={
                    handleFormChange
                  }
                  style={styles.select}
                >

                  <option value="Healthy">
                    Healthy
                  </option>

                  <option value="Needs Attention">
                    Needs Attention
                  </option>

                  <option value="Critical">
                    Critical
                  </option>

                  <option value="Metric unavailable">
                    Metric unavailable
                  </option>

                </select>

              </div>


              {/* HEALTH LEVEL */}

              <div
                style={styles.formGroup}
              >

                <label
                  style={styles.label}
                >
                  HEALTH LEVEL
                </label>

                <select
                  name="healthLevel"
                  value={
                    form.healthLevel
                  }
                  onChange={
                    handleFormChange
                  }
                  style={styles.select}
                >

                  <option value="EXCELLENT">
                    EXCELLENT
                  </option>

                  <option value="GOOD">
                    GOOD
                  </option>

                  <option value="ATTENTION">
                    ATTENTION
                  </option>

                  <option value="CRITICAL">
                    CRITICAL
                  </option>

                </select>

              </div>


              {/* BUTTONS */}

              <div
                style={
                  styles.modalActions
                }
              >

                <button
                  type="button"
                  style={styles.cancel}
                  disabled={saving}
                  onClick={() =>
                    setEditingAsset(null)
                  }
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  style={styles.save}
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : "Save Health"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};


export default HealthMonitor;