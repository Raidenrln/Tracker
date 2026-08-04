import { Calendar, Clock, MapPin, Package, ShoppingCart, Store } from "lucide-react";
import { CiFacebook } from "react-icons/ci";
import { useStore } from "../../context/StoreContext";
import "../../styles/storeView.css";
import { RiCloseFill } from "react-icons/ri";

interface StoreDetails {
  storeId: string | null;
  onClose: () => void;
}

const StoreViewDetails = ({ onClose, storeId }: StoreDetails) => {
  const { stores } = useStore();
  const s = stores.find((store) => store.id === storeId);

  return (
    <div className="svd-page">
      <div className="svd-container">
          <div key={s?.id} className="svd-card">

            {/* ── Header ── */}
            <div className="svd-header">
              <div>
                <div className="svd-header-name">{s?.name}</div>
                <div className="svd-header-type">{s?.type}</div>
              </div>
              <div className="svd-header-meta gap-2">
                <div>
                  <div className="svd-header-meta-label">Store Created</div>
                  <div className="svd-header-meta-value">{s?.dateCreated}</div>
                </div>
                <button className="relative flex items-center justify-center h-10 w-10 rounded-4xl borde bg-[#346953] text-neutral-600 hover:bg-[#56a081] transition-colors">
                  <RiCloseFill color="white" size={24} onClick={() => onClose()}/>
                </button>
              </div>
            </div>

            {/* ── Body ── */}
            <div className="svd-body">

              {/* Left column */}
              <div className="svd-left">

                {/* Description */}
                <div className="svd-section">
                  <div className="svd-section-title">Description</div>
                  <p className="svd-description">
                    {s?.description || "No description available."}
                  </p>
                </div>

                {/* Store Information */}
                <div className="svd-section">
                  <div className="svd-section-title">Store Information</div>
                  <div className="svd-info-grid">

                    <div className="svd-info-item">
                      <div className="svd-info-icon"><Store size={16} /></div>
                      <div>
                        <div className="svd-info-label">Type</div>
                        <div className="svd-info-value">{s?.type}</div>
                      </div>
                    </div>

                    <div className="svd-info-item">
                      <div className="svd-info-icon"><Calendar size={16} /></div>
                      <div>
                        <div className="svd-info-label">Created</div>
                        <div className="svd-info-value">{s?.dateCreated}</div>
                      </div>
                    </div>

                    <div className="svd-info-item">
                      <div className="svd-info-icon"><Clock size={16} /></div>
                      <div>
                        <div className="svd-info-label">Business Hours</div>
                        <div className="svd-info-value">{s?.openTime} – {s?.closeTime}</div>
                      </div>
                    </div>

                    <div className="svd-info-item">
                      <div className="svd-info-icon"><MapPin size={16} /></div>
                      <div>
                        <div className="svd-info-label">Location</div>
                        <div className="svd-info-value">{s?.location || "Not specified"}</div>
                      </div>
                    </div>

                    <div className="svd-info-item">
                      <div className="svd-info-icon"><CiFacebook size={18} style={{ color: "#2563EB" }} /></div>
                      <div>
                        <div className="svd-info-label">Facebook</div>
                        <div className="svd-info-value">
                          {s?.facebook ? (
                            <a href={s?.facebook} target="_blank" rel="noreferrer">
                              {s?.facebook}
                            </a>
                          ) : (
                            "No Facebook page"
                          )}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Right column */}
              <div className="svd-right">

                {/* Statistics */}
                <div className="svd-section">
                  <div className="svd-section-title">Statistics</div>
                  <div className="svd-stat-list">

                    <div className="svd-stat-row">
                      <div className="svd-stat-label">
                        <Package size={16} style={{ color: "#16a34a" }} />
                        Products
                      </div>
                      <div className="svd-stat-value"><span>{s?.products.length ?? 0}</span></div>
                    </div>

                    <div className="svd-stat-row">
                      <div className="svd-stat-label">
                        <ShoppingCart size={16} style={{ color: "#ea580c" }} />
                        Total Bought
                      </div>
                      <div className="svd-stat-value"><span>{s?.totalBought ?? 0}</span></div>
                    </div>

                  </div>
                </div>

                {/* Status */}
                <div className="svd-section">
                  <div className="svd-section-title">Status</div>
                  <div className="svd-status-badge">
                    <div className="svd-status-dot" />
                    Open
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};
export default StoreViewDetails;