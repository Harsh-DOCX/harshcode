export default function ConfirmModal({ title, body, confirmLabel, onCancel, onConfirm }) {
  return (
    <div className="modal-root" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal glass">
        <h2 id="modal-title">{title}</h2>
        <p>{body}</p>
        <div className="btn-row">
          <button type="button" className="btn" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="btn btn-primary" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
