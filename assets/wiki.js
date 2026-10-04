
(() => {
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  if (!tabs.length) return;
  const select = (id, focus = false) => {
    if (!tabs.some(tab => tab.getAttribute('aria-controls') === id)) id = 'kaiju';
    for (const tab of tabs) {
      const active = tab.getAttribute('aria-controls') === id;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      document.getElementById(tab.getAttribute('aria-controls')).hidden = !active;
      if (active && focus) tab.focus();
    }
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      const id = tab.getAttribute('aria-controls');
      history.replaceState(null, '', '#' + id);
      select(id);
    });
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      const id = tabs[next].getAttribute('aria-controls');
      history.replaceState(null, '', '#' + id);
      select(id, true);
    });
  });
  window.addEventListener('hashchange', () => select(location.hash.slice(1)));
  select(location.hash.slice(1));
})();
