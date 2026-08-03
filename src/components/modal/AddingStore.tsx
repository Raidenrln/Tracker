import { useState } from "react";
import "/src/styles/addingStore.css";
import type { StoreModel } from "../../model/StoreModel";
import { useStore } from "../../context/StoreContext";
import { v4 as uuidv4 } from 'uuid';
interface AddingStoreProps {
  onClose: () => void;
}

const AddingStore = ({ onClose }: AddingStoreProps) => {
  const today = new Date();
  const dateNow = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const { addStore } = useStore();
  const storeID = uuidv4()

  const [storeName, setStoreName] = useState("");
  const [storeType, setStoreType] = useState("");
  const [storeDesc, setStoreDesc] = useState("");
  const [storeFb, setStoreFb] = useState("");
  const [storeOpenTime, setStoreOpenTime] = useState("");
  const [storeCloseTime, setStoreCloseTime] = useState("");
  const [storeLocation, setStoreLocation] = useState("");
  const [storeColor, setStoreColor] = useState("#000000")
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const storeObject: StoreModel = {
      id: storeID,
      name: storeName,
      type: storeType,
      description: storeDesc,
      dateCreated: dateNow,
      facebook: storeFb,
      openTime: storeOpenTime,
      closeTime: storeCloseTime,
      location: storeLocation,
      color: storeColor,
      products: []
    };

    addStore(storeObject);
    console.log(storeObject);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="form-wrapper">
      <div className="form-header">
        <h1>Create a Store</h1>
        <p>Fill in the details below to register a new store listing.</p>
      </div>

      {/* basic unfo */}
      <div className="card card--accent">
        <div className="card-section-label">Basic Info</div>

        <div className="field-group">
          <div className="field-row">
            <div className="field">
              <label htmlFor="name">Store Name</label>
              <input 
                type="text" 
                id="name" 
                placeholder="e.g. Green Basket Market" 
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="type">Store Type</label>
              <select id="type" value={storeType} onChange={(e) => setStoreType(e.target.value)} required>
                <option value="" disabled>Select a type</option>
                <option value="Grocery">Grocery</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Bakery">Bakery</option>
                <option value="Café">Café</option>
                <option value="Pharmacy">Pharmacy</option>
                <option value="Retail">Retail</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label htmlFor="desc">
              Description <span className="optional">optional</span>
            </label>
            <textarea
              id="desc"
              placeholder="A short description of what this store sells or offers…"
              value={storeDesc}
              onChange={(e) => setStoreDesc(e.target.value)}
            />
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="dateCreated">Date Created</label>
              <input type="date" id="dateCreated" value={dateNow} readOnly/>
            </div>

            <div className="field">
              <label htmlFor="fb">
                Facebook<span className="optional">optional</span>
              </label>
              <input 
                type="url" 
                id="fb" 
                placeholder="https://facebook.com/..." 
                value={storeFb} 
                onChange={(e) => setStoreFb(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* hours & location */}
      <div className="card">
        <div className="card-section-label">Hours & Location</div>

        <div className="field-group">
          <div className="field">
            <label>Operating Hours</label>
            <div className="hours-row">
              <input 
                type="time" 
                id="openTime" 
                value={storeOpenTime} 
                onChange={(e) => setStoreOpenTime(e.target.value)} 
              />
              <div className="hours-sep">|</div>
              <input 
                type="time" 
                id="closeTime" 
                value={storeCloseTime} 
                onChange={(e) => setStoreCloseTime(e.target.value)} 
              />
            </div>
            <span className="hint">Open time · Close time</span>
          </div>

          <div className="field">
            <label htmlFor="location">
              Location <span className="optional">optional</span>
            </label>
            <input
              type="text"
              id="location"
              placeholder="e.g. 123 Manila"
              value={storeLocation}
              onChange={(e) => setStoreLocation(e.target.value)}
            />
            <span className="hint">Street address or landmark</span>
          </div>
        </div>
      </div>
          <div className="field">
      <label htmlFor="storeColor">
        Theme Color <span className="optional">optional</span>
      </label>

      <div className="color-picker">
        <input
          id="storeColor"
          type="color"
          value={storeColor}
          onChange={(e) => setStoreColor(e.target.value)}
        />

        <input
          type="text"
          value={storeColor}
          onChange={(e) => setStoreColor(e.target.value)}
          placeholder="#2D6A4F"
        />
      </div>

      <span className="hint">
        Used as the store's color.
      </span>
    </div>
      <div className="form-actions">
        <button onClick={onClose} className="btn btn-ghost" type="button">
          Cancel
        </button>
        <button className="btn btn-primary" type="submit">
          Save Store
        </button>
      </div>
    </form>
  );
};

export default AddingStore;