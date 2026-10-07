document.documentElement.classList.add('js');

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Menüyü aç');
  navigation.classList.remove('is-open');
}

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Menüyü aç' : 'Menüyü kapat');
  navigation.classList.toggle('is-open', !isOpen);
});

navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
    closeMenu();
    menuToggle.focus();
  }
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.header-inner')) closeMenu();
});

const roleTabs = [...document.querySelectorAll('.role-tab')];

function setRole(selectedTab) {
  const role = selectedTab.dataset.role;
  for (const tab of roleTabs) {
    const isSelected = tab === selectedTab;
    tab.setAttribute('aria-selected', String(isSelected));
    tab.tabIndex = isSelected ? 0 : -1;
    tab.classList.toggle('active', isSelected);
    document.getElementById(tab.getAttribute('aria-controls')).hidden = !isSelected;
  }
  for (const preview of document.querySelectorAll('[data-preview]')) {
    preview.hidden = preview.dataset.preview !== role;
  }
  document.querySelector('.preview-domain').textContent = role === 'coach' ? 'fitklan / hoca paneli' : 'fitklan / gelişim';
}

for (const tab of roleTabs) {
  tab.addEventListener('click', () => setRole(tab));
  tab.addEventListener('keydown', (event) => {
    let nextIndex;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      nextIndex = (roleTabs.indexOf(tab) + (event.key === 'ArrowRight' ? 1 : -1) + roleTabs.length) % roleTabs.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = roleTabs.length - 1;
    } else {
      return;
    }
    event.preventDefault();
    setRole(roleTabs[nextIndex]);
    roleTabs[nextIndex].focus();
  });
}

document.getElementById('year').textContent = new Date().getFullYear();
