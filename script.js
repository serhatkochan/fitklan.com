const language = document.documentElement.lang === 'en' ? 'en' : 'tr';
const numberFormat = new Intl.NumberFormat(language === 'en' ? 'en-US' : 'tr-TR');
const percentFormat = new Intl.NumberFormat(language === 'en' ? 'en-US' : 'tr-TR', { style: 'percent' });
const copy = {
  tr: {
    menuOpen: 'Menüyü aç', menuClose: 'Menüyü kapat',
    shortPlan: 'Bu senaryoda hocanın tanımladığı kısa alternatif seçildi.',
    fullPlan: 'Örnek programın tamamı. Kendi zamanına göre seç.',
    weekComplete: 'Bu örnek haftadaki üç antrenman da tamamlandı. Kayıtların haftalık özete yansıdı. Dinlenme günlerin de bu yolculuğun parçası.',
    weekPending: 'Bu örnek haftada iki antrenman kayıtlı. Üçüncüsü bugün planında. Dinlenme günlerin de bu yolculuğun parçası.',
    ringComplete: 'Örnek haftada üç antrenmandan üçü tamamlandı', ringPending: 'Örnek haftada üç antrenmandan ikisi tamamlandı',
    fridayComplete: 'Cuma: antrenman tamamlandı', fridayPending: 'Cuma: antrenman planlandı',
    workoutDone: 'Örnek antrenman tamamlandı ✓', workoutAction: 'Örnek antrenmanı tamamla →',
    workoutFeedback: 'Örnek haftan 3/3 oldu. Gelişim sekmesinden görebilirsin.',
    mealFeedback: 'Örnek öğün onaylandı: {rice} g pişmiş pilav, {chicken} g pişmiş tavuk. Gerçek hesaba kaydedilmez.',
    voiceConfirm: 'Kaydı onayla ✓', voiceEdit: 'Düzenle',
    voicePrompt: 'İkinci seti 20 kg ve 10 tekrar olarak anladım. Kaydedeyim mi?',
    voiceStarted: 'Örnek cümle taslağa dönüştü. Bilgileri kontrol edip onayla.',
    voiceEditPrompt: 'Set, ağırlık veya tekrarı değiştirebilirsin. Onaylamadan kayıt tamamlanmaz.', voiceEditing: 'Örnek kayıt düzenleniyor.',
    voiceDone: 'Örnek kayıt tamamlandı ✓', voiceSavedPrompt: 'Onayladığın bilgiler örnek set kaydına eklendi.',
    voiceSaved: '{set}. set · {weight} kg · {reps} tekrar. Yalnızca bu sayfadaki demo güncellendi.',
    coachAction: 'Taslağı incelemeyi tamamla ✓', coachPending: 'Demo: bu işlem bir öğrenciye mesaj göndermez.',
    coachDone: 'Örnek inceleme tamamlandı ✓', coachSaved: 'Demo inceleme tamamlandı. Gerçek program veya mesaj yayınlanmadı.',
    eventUndo: 'Örnek katılımı geri al −', eventJoin: 'Örnek etkinliğe katıl +',
    eventJoined: 'Örnek etkinlik seçildi. Gerçek bir katılım kaydı oluşturulmadı.', eventPending: 'Demo etkinlik; gerçek katılım kaydı oluşturulmaz.'
  },
  en: {
    menuOpen: 'Open menu', menuClose: 'Close menu',
    shortPlan: 'The shorter alternative prepared by the coach in this scenario is selected.',
    fullPlan: 'The full sample program. Choose what fits your day.',
    weekComplete: 'All three workouts in this sample week are complete. Your records are now in the weekly summary. Rest days are part of the journey, too.',
    weekPending: 'Two workouts are logged in this sample week. The third is on today’s plan. Rest days are part of the journey, too.',
    ringComplete: 'All three workouts in the sample week are complete', ringPending: 'Two of three workouts in the sample week are complete',
    fridayComplete: 'Friday: workout complete', fridayPending: 'Friday: workout planned',
    workoutDone: 'Sample workout complete ✓', workoutAction: 'Complete the sample workout →',
    workoutFeedback: 'Your sample week is now 3/3. See it in the Progress tab.',
    mealFeedback: 'Sample meal confirmed: {rice} g cooked rice, {chicken} g cooked chicken. Nothing is saved to a real account.',
    voiceConfirm: 'Confirm the log ✓', voiceEdit: 'Edit',
    voicePrompt: 'I understood set two as 20 kg for 10 reps. Shall I log it?',
    voiceStarted: 'The sample phrase is now a draft. Check the details before confirming.',
    voiceEditPrompt: 'You can change the set, weight or reps. The log is only completed when you confirm.', voiceEditing: 'Editing the sample log.',
    voiceDone: 'Sample log complete ✓', voiceSavedPrompt: 'Your confirmed details have been added to the sample set log.',
    voiceSaved: 'Set {set} · {weight} kg · {reps} reps. Only the demo on this page was updated.',
    coachAction: 'Finish reviewing the draft ✓', coachPending: 'Demo: this does not send a message to a student.',
    coachDone: 'Sample review complete ✓', coachSaved: 'Demo review complete. No real program or message was published.',
    eventUndo: 'Undo sample participation −', eventJoin: 'Join the sample event +',
    eventJoined: 'Sample event selected. No real participation was registered.', eventPending: 'Demo event; no real participation is registered.'
  }
};
function t(key, values = {}) {
  return copy[language][key].replace(/\{(\w+)\}/g, (_, name) => values[name]);
}

function rememberLanguage(selected) {
  try { localStorage.setItem('fitklan-language', selected); } catch { /* Storage may be unavailable in private browsing. */ }
}
const languageQuery = new URLSearchParams(location.search).get('lang');
let savedLanguage;
try { savedLanguage = localStorage.getItem('fitklan-language'); } catch { /* The language links also work without storage. */ }
const explicitLanguage = ['tr', 'en'].includes(languageQuery) ? languageQuery : null;
const requestedLanguage = explicitLanguage || (language === 'tr' ? savedLanguage : language);
if (requestedLanguage === 'en' && language === 'tr') {
  location.replace(`/en/${location.hash}`);
} else if (requestedLanguage === 'tr' && language === 'en') {
  location.replace(`/?lang=tr${location.hash}`);
} else {
  rememberLanguage(language);
  if (explicitLanguage) {
    const url = new URL(location.href);
    url.searchParams.delete('lang');
    history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
  }
}
document.querySelectorAll('[data-language]').forEach(link => {
  link.addEventListener('click', () => {
    rememberLanguage(link.dataset.language);
    const target = new URL(link.href);
    target.hash = location.hash;
    link.href = target.href;
  });
});

document.documentElement.classList.add('js');

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-navigation');
function closeMenu() {
  navigation.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', t('menuOpen'));
}
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('is-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', t(open ? 'menuClose' : 'menuOpen'));
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
window.matchMedia('(min-width: 960px)').addEventListener('change', closeMenu);

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
    document.getElementById('plan-reason').textContent = t(short ? 'shortPlan' : 'fullPlan');
  });
});

const completeButton = document.getElementById('complete-workout');
function updateWeek(complete) {
  document.querySelector('[data-week-complete]').textContent = complete ? '3' : '2';
  document.querySelector('[data-week-percent]').textContent = percentFormat.format(complete ? 1 : .67);
  const ring = document.querySelector('.progress-ring');
  ring.style.setProperty('--progress', complete ? '100%' : '67%');
  ring.setAttribute('aria-label', t(complete ? 'ringComplete' : 'ringPending'));
  const friday = document.getElementById('friday-day');
  friday.classList.toggle('done', complete);
  friday.setAttribute('aria-label', t(complete ? 'fridayComplete' : 'fridayPending'));
  friday.querySelector('i').textContent = complete ? '✓' : '○';
  document.getElementById('weekly-summary').textContent = t(complete ? 'weekComplete' : 'weekPending');
  completeButton.disabled = complete;
  completeButton.textContent = t(complete ? 'workoutDone' : 'workoutAction');
  document.getElementById('workout-feedback').textContent = complete ? t('workoutFeedback') : '';
}
completeButton.addEventListener('click', () => updateWeek(true));
document.getElementById('reset-workout').addEventListener('click', () => updateWeek(false));

document.getElementById('meal-form').addEventListener('submit', event => {
  event.preventDefault();
  const rice = document.getElementById('rice-portion').valueAsNumber;
  const chicken = document.getElementById('chicken-portion').valueAsNumber;
  document.getElementById('meal-feedback').textContent = t('mealFeedback', { rice: numberFormat.format(rice), chicken: numberFormat.format(chicken) });
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
  voiceConfirm.textContent = t('voiceConfirm');
  voiceEdit.disabled = false;
  voiceEdit.textContent = t('voiceEdit');
  voiceDemo.classList.remove('is-saved', 'is-active');
  void voiceDemo.offsetWidth;
  voiceDemo.classList.add('is-active');
  document.getElementById('voice-prompt').textContent = t('voicePrompt');
  document.getElementById('voice-feedback').textContent = t('voiceStarted');
  voiceConfirm.focus({ preventScroll: true });
});
voiceEdit.addEventListener('click', () => {
  voiceInputs.forEach(input => { input.readOnly = false; });
  voiceDemo.classList.remove('is-saved');
  voiceConfirm.disabled = false;
  voiceConfirm.textContent = t('voiceConfirm');
  document.getElementById('voice-prompt').textContent = t('voiceEditPrompt');
  document.getElementById('voice-feedback').textContent = t('voiceEditing');
  document.getElementById('voice-weight').focus();
});
voiceForm.addEventListener('submit', event => {
  event.preventDefault();
  const [set, weight, reps] = voiceInputs.map(input => input.valueAsNumber);
  voiceInputs.forEach(input => { input.readOnly = true; });
  voiceConfirm.disabled = true;
  voiceConfirm.textContent = t('voiceDone');
  voiceDemo.classList.add('is-saved');
  document.getElementById('voice-prompt').textContent = t('voiceSavedPrompt');
  document.getElementById('voice-feedback').textContent = t('voiceSaved', { set: numberFormat.format(set), weight: numberFormat.format(weight), reps: numberFormat.format(reps) });
});

const students = language === 'en' ? {
  deniz: {
    title: 'Let’s look at Deniz’s week.',
    text: 'Two of the three planned workouts are logged. Deniz noted that a busy workday meant postponing the third. You can discuss a shorter program option for next week.',
    source: 'Source: 2 workouts + student note'
  },
  mert: {
    title: 'Carry Mert’s video feedback into the next workout.',
    text: 'Mert has sent a sample video of the seated cable row. You can add your own note at 00:12. This demo does not analyze the video; the coach remains responsible for the personal assessment.',
    source: 'Source: sample video · 00:12'
  },
  selin: {
    title: 'Prepare a draft that fits Selin’s schedule.',
    text: 'Selin noted that she can go to the gym twice next week, with 25 minutes each day. You can prepare a shorter alternative from her current program and review it together.',
    source: 'Source: student note + current program'
  }
} : {
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
    approveButton.textContent = t('coachAction');
    document.getElementById('coach-feedback').textContent = t('coachPending');
  });
});
approveButton.addEventListener('click', () => {
  approveButton.disabled = true;
  approveButton.textContent = t('coachDone');
  document.getElementById('coach-feedback').textContent = t('coachSaved');
});

const eventButton = document.getElementById('join-event');
eventButton.addEventListener('click', () => {
  const joined = eventButton.getAttribute('aria-pressed') !== 'true';
  eventButton.setAttribute('aria-pressed', String(joined));
  eventButton.textContent = t(joined ? 'eventUndo' : 'eventJoin');
  document.getElementById('event-feedback').textContent = t(joined ? 'eventJoined' : 'eventPending');
});

document.getElementById('year').textContent = String(new Date().getFullYear());
