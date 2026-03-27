export default function SecondaryMenu({ id, title, items, visible, onClose }) {
  if (!visible) return null;

  return (
    <div id={id} className="secondary-menu-container">
      <button className="close-secondary-menu" title={`Fechar ${title}`} aria-label={`Fechar ${title}`} onClick={onClose}>
        ×
      </button>
      <h4>{title}</h4>
      <div className="secondary-menu-grid">
        {items.map((item, i) => (
          <a
            key={i}
            href={item.link}
            className="menu-box secondary"
            {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
