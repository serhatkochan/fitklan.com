document.documentElement.classList.add('js');

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-navigation');
function closeMenu() {
  navigation.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Menüyü aç');
}
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('is-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuToggle.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
window.matchMedia('(min-width: 760px)').addEventListener('change', closeMenu);

document.querySelectorAll('[role="tablist"]').forEach(tablist => {
  const tabs = [...tablist.querySelectorAll('[role="tab"]')];
  function selectTab(selected) {
    tabs.forEach(tab => {
      const active = tab === selected;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      document.getElementById(tab.getAttribute('aria-controls')).hidden = !active;
    });
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) {
        event.preventDefault();
        selectTab(tabs[next]);
        tabs[next].focus();
      }
    });
  });
});

document.querySelectorAll('[data-duration]').forEach(button => {
  button.addEventListener('click', () => {
    const short = button.dataset.duration === '25';
    document.querySelectorAll('[data-duration]').forEach(option => {
      option.setAttribute('aria-pressed', String(option === button));
    });
    document.querySelector('[data-session-duration]').textContent = short ? '25' : '45';
    document.querySelector('[data-exercise-count]').textContent = short ? '2' : '3';
    document.getElementById('third-exercise').hidden = short;
    document.getElementById('plan-reason').textContent = short
      ? 'Bu senaryoda hocanın tanımladığı kısa alternatif seçildi.'
      : 'Örnek programın tamamı. Kendi zamanına göre seç.';
  });
});

const completeButton = document.getElementById('complete-workout');
function updateWeek(complete) {
  document.querySelector('[data-week-complete]').textContent = complete ? '3' : '2';
  document.querySelector('[data-week-percent]').textContent = complete ? '%100' : '%67';
  const ring = document.querySelector('.progress-ring');
  ring.style.setProperty('--progress', complete ? '100%' : '67%');
  ring.setAttribute('aria-label', complete
    ? 'Örnek haftada üç antrenmandan üçü tamamlandı'
    : 'Örnek haftada üç antrenmandan ikisi tamamlandı');
  const friday = document.getElementById('friday-day');
  friday.classList.toggle('done', complete);
  friday.setAttribute('aria-label', complete ? 'Cuma: antrenman tamamlandı' : 'Cuma: antrenman planlandı');
  friday.querySelector('i').textContent = complete ? '✓' : '○';
  document.getElementById('weekly-summary').textContent = complete
    ? 'Bu örnek haftadaki üç antrenman da tamamlandı. Kayıtların haftalık özete yansıdı. Dinlenme günlerin de bu yolculuğun parçası.'
    : 'Bu örnek haftada iki antrenman kayıtlı. Üçüncüsü bugün planında. Dinlenme günlerin de bu yolculuğun parçası.';
  completeButton.disabled = complete;
  completeButton.textContent = complete ? 'Örnek antrenman tamamlandı ✓' : 'Örnek antrenmanı tamamla →';
  document.getElementById('workout-feedback').textContent = complete
    ? 'Örnek haftan 3/3 oldu. Gelişim sekmesinden görebilirsin.'
    : '';
}
completeButton.addEventListener('click', () => updateWeek(true));
document.getElementById('reset-workout').addEventListener('click', () => updateWeek(false));

document.getElementById('meal-form').addEventListener('submit', event => {
  event.preventDefault();
  const rice = document.getElementById('rice-portion').valueAsNumber;
  const chicken = document.getElementById('chicken-portion').valueAsNumber;
  document.getElementById('meal-feedback').textContent = `Örnek öğün onaylandı: ${rice} g pişmiş pilav, ${chicken} g pişmiş tavuk. Gerçek hesaba kaydedilmez.`;
});

const voiceDemo = document.querySelector('.voice-demo');
const voiceDraft = document.getElementById('voice-draft');
const voiceForm = document.getElementById('voice-form');
const voiceInputs = [...voiceForm.querySelectorAll('input')];
const voiceConfirm = document.getElementById('voice-confirm');
const voiceEdit = document.getElementById('voice-edit');
document.getElementById('voice-start').addEventListener('click', () => {
  voiceDraft.hidden = false;
  voiceInputs.forEach((input, index) => {
    input.value = [2, 20, 10][index];
    input.readOnly = true;
  });
  voiceConfirm.disabled = false;
  voiceConfirm.textContent = 'Kaydı onayla ✓';
  voiceEdit.disabled = false;
  voiceEdit.textContent = 'Düzenle';
  voiceDemo.classList.remove('is-saved', 'is-active');
  void voiceDemo.offsetWidth;
  voiceDemo.classList.add('is-active');
  document.getElementById('voice-prompt').textContent = 'İkinci seti 20 kg ve 10 tekrar olarak anladım. Kaydedeyim mi?';
  document.getElementById('voice-feedback').textContent = 'Örnek cümle taslağa dönüştü. Bilgileri kontrol edip onayla.';
  voiceConfirm.focus({ preventScroll: true });
});
voiceEdit.addEventListener('click', () => {
  voiceInputs.forEach(input => { input.readOnly = false; });
  voiceDemo.classList.remove('is-saved');
  voiceConfirm.disabled = false;
  voiceConfirm.textContent = 'Kaydı onayla ✓';
  document.getElementById('voice-prompt').textContent = 'Set, ağırlık veya tekrarı değiştirebilirsin. Onaylamadan kayıt tamamlanmaz.';
  document.getElementById('voice-feedback').textContent = 'Örnek kayıt düzenleniyor.';
  document.getElementById('voice-weight').focus();
});
voiceForm.addEventListener('submit', event => {
  event.preventDefault();
  const [set, weight, reps] = voiceInputs.map(input => input.valueAsNumber);
  voiceInputs.forEach(input => { input.readOnly = true; });
  voiceConfirm.disabled = true;
  voiceConfirm.textContent = 'Örnek kayıt tamamlandı ✓';
  voiceDemo.classList.add('is-saved');
  document.getElementById('voice-prompt').textContent = 'Onayladığın bilgiler örnek set kaydına eklendi.';
  document.getElementById('voice-feedback').textContent = `${set}. set · ${weight.toLocaleString('tr-TR')} kg · ${reps} tekrar. Yalnızca bu sayfadaki demo güncellendi.`;
});

const students = {
  deniz: {
    title: 'Deniz’in haftasına birlikte bakalım.',
    text: 'Planlanan 3 antrenmanın 2’si kayıtlı. Deniz, üçüncü günü iş yoğunluğu nedeniyle ertelediğini yazmış. Gelecek hafta için kısa program seçeneğini birlikte değerlendirebilirsiniz.',
    source: 'Kaynak: 2 antrenman + öğrenci notu'
  },
  mert: {
    title: 'Mert’in video notunu sonraki antrenmana taşı.',
    text: 'Mert, seated cable row hareketi için bir örnek video göndermiş. 00:12 anına kendi yorumunu ekleyebilirsin. Bu demo videoyu analiz etmez; kişisel değerlendirme hocanın kontrolündedir.',
    source: 'Kaynak: örnek video kaydı · 00:12'
  },
  selin: {
    title: 'Selin’in zamanına uygun bir taslak hazırla.',
    text: 'Selin gelecek hafta salona iki gün gidebileceğini ve her gün 25 dakikası olduğunu not etmiş. Mevcut programdan kısa bir alternatif hazırlayıp birlikte değerlendirebilirsiniz.',
    source: 'Kaynak: öğrenci notu + mevcut program'
  }
};
const approveButton = document.getElementById('coach-approve');
document.querySelectorAll('[data-student]').forEach(button => {
  button.addEventListener('click', () => {
    const student = students[button.dataset.student];
    document.querySelectorAll('[data-student]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    document.getElementById('coach-detail-title').textContent = student.title;
    document.getElementById('coach-detail-text').textContent = student.text;
    document.getElementById('coach-source').textContent = student.source;
    approveButton.disabled = false;
    approveButton.textContent = 'Taslağı incelemeyi tamamla ✓';
    document.getElementById('coach-feedback').textContent = 'Demo: bu işlem bir öğrenciye mesaj göndermez.';
  });
});
approveButton.addEventListener('click', () => {
  approveButton.disabled = true;
  approveButton.textContent = 'Örnek inceleme tamamlandı ✓';
  document.getElementById('coach-feedback').textContent = 'Demo inceleme tamamlandı. Gerçek program veya mesaj yayınlanmadı.';
});

const eventButton = document.getElementById('join-event');
eventButton.addEventListener('click', () => {
  const joined = eventButton.getAttribute('aria-pressed') !== 'true';
  eventButton.setAttribute('aria-pressed', String(joined));
  eventButton.textContent = joined ? 'Örnek katılımı geri al −' : 'Örnek etkinliğe katıl +';
  document.getElementById('event-feedback').textContent = joined
    ? 'Örnek etkinlik seçildi. Gerçek bir katılım kaydı oluşturulmadı.'
    : 'Demo etkinlik; gerçek katılım kaydı oluşturulmaz.';
});

document.getElementById('year').textContent = String(new Date().getFullYear());
