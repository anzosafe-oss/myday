(function () {
  'use strict';
  const panel = document.createElement('div');
  let client, session, busy = false, message = '';
  panel.innerHTML = '<section class="panel"><h2>Backup MyDay</h2>'
    + '<p class="muted">Salvează sau restaurează manual datele folosind contul tău Supabase.</p>'
    + '<form id="myday-cloud-login"><label>Email<input type="email" name="email" autocomplete="username" required></label>'
    + '<label>Parolă<input type="password" name="password" autocomplete="current-password" required></label>'
    + '<button class="accent">Conectează-te</button></form>'
    + '<div id="myday-cloud-actions" hidden><button type="button" data-sync="upload">Salvează backup</button> '
    + '<button type="button" data-sync="restore">Restaurează backup</button> '
    + '<button type="button" data-sync="logout">Deconectează-te</button></div>'
    + '<p role="status" class="muted"></p></section>';
  const form = panel.querySelector('form');
  const actions = panel.querySelector('#myday-cloud-actions');
  const status = panel.querySelector('[role=status]');
  const update = () => {
    form.hidden = Boolean(session);
    actions.hidden = !session;
    status.textContent = message;
    panel.querySelectorAll('button').forEach(button => { button.disabled = busy || !client; });
  };
  const perform = async (operation) => {
    if (busy || !client) return;
    busy = true;
    update();
    try { await operation(); }
    catch { message = 'Operațiunea a eșuat. Verifică datele de conectare sau conexiunea și încearcă din nou.'; }
    finally { busy = false; update(); }
  };
  form.addEventListener('submit', event => {
    event.preventDefault();
    event.stopPropagation();
    const values = new FormData(form);
    form.elements.password.value = '';
    void perform(async () => {
      const result = await client.auth.signInWithPassword({email: values.get('email'), password: values.get('password')});
      if (result.error) throw result.error;
      session = result.data.session;
      message = 'Conectat ca ' + session.user.email;
    });
  });
  actions.addEventListener('click', event => {
    const action = event.target.dataset.sync;
    if (!action || !session) return;
    void perform(async () => {
      if (action === 'logout') {
        const result = await client.auth.signOut({scope: 'local'});
        if (result.error) throw result.error;
        session = null;
        message = 'Deconectat.';
        return;
      }
      const table = () => client.from('myday_backups');
      const owner = session.user.id;
      const current = await table().select('snapshot,revision').eq('owner_id', owner).maybeSingle();
      if (current.error) throw current.error;
      const backup = current.data;
      if (action === 'restore') {
        if (!backup) { message = 'Contul nu are încă un backup.'; return; }
        if (!window.confirm('Înlocuiești datele MyDay din acest browser cu backupul din cont?')) return;
        localStorage.setItem('myday.v1', JSON.stringify(backup.snapshot));
        window.location.reload();
        return;
      }
      if (backup && !window.confirm('Înlocuiești backupul existent cu datele MyDay din acest browser?')) return;
      const snapshot = JSON.parse(localStorage.getItem('myday.v1') || 'null');
      if (!snapshot) { message = 'Adaugă sau modifică o înregistrare înainte de primul backup.'; return; }
      const result = backup
        ? await table().update({snapshot, revision: backup.revision + 1}).eq('owner_id', owner)
          .eq('revision', backup.revision).select('revision').maybeSingle()
        : await table().insert({snapshot}).select('revision').single();
      if (result.error && result.error.code !== '23505') throw result.error;
      message = result.data ? 'Backup salvat.' : 'Backupul s-a schimbat între timp. Reia operațiunea.';
    });
  });
  window.mountMyDayBackup = () => {
    const slot = document.getElementById('myday-cloud');
    if (slot) slot.append(panel);
  };
  update();
  import('https://esm.sh/@supabase/supabase-js@2.89.0').then(async ({createClient}) => {
    client = createClient('https://radskybbymadavveatzn.supabase.co', 'sb_publishable_VJh0qSiBA0OIcG7YqnLyjA_-YwiTlMT',
      {auth: {storageKey: 'myday.supabase.session', detectSessionInUrl: false}});
    const result = await client.auth.getSession();
    if (result.error) throw result.error;
    session = result.data.session;
    message = session ? 'Conectat ca ' + session.user.email : '';
    update();
  }).catch(() => {
    client = null;
    message = 'Conexiunea Supabase nu este disponibilă momentan.';
    update();
  });
})();
