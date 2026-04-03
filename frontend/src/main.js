// Real Supabase Dashboard Integration
import './style.css';
import { supabase } from './lib/supabaseClient';

document.addEventListener('DOMContentLoaded', async () => {
  // UI screens
  const loginScreen = document.getElementById('login-screen');
  const dashboardScreen = document.getElementById('dashboard-screen');
  const loginForm = document.getElementById('login-form');
  
  // Dashboard elements
  const navItems = document.querySelectorAll('.nav-item');
  const viewPanels = document.querySelectorAll('.view-panel');
  const pageTitle = document.getElementById('page-title');
  const userRole = document.getElementById('user-role');
  const userName = document.getElementById('user-name');
  const adminOnlyNav = document.querySelectorAll('.admin-only');
  const logoutBtn = document.getElementById('logout-btn');

  // Check session on load
  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) loadDashboard(session.user);
  };

  async function loadDashboard(user) {
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    const isAdmin = profile?.role === 'admin';
    
    userName.textContent = profile?.full_name || user.email;
    userRole.textContent = isAdmin ? 'Operations Admin' : 'Tour Leader';
    
    if(isAdmin) {
      adminOnlyNav.forEach(el => el.style.display = 'flex');
      userRole.style.color = '#f59e0b';
      userRole.style.background = 'rgba(245,158,11,0.2)';
    } else {
      adminOnlyNav.forEach(el => el.style.display = 'none');
    }

    loginScreen.classList.add('hidden');
    setTimeout(() => {
      loginScreen.style.display = 'none';
      dashboardScreen.classList.remove('hidden');
    }, 400);

    fetchTours(user.id, isAdmin);
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const btn = loginForm.querySelector('.primary-btn');
      
      btn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Loading...';
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        alert(error.message);
        btn.innerHTML = 'Sign In <i class="ph ph-arrow-right"></i>';
      } else {
        loadDashboard(data.user);
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await supabase.auth.signOut();
      location.reload();
    });
  }

  async function fetchTours(userId, isAdmin) {
    let query = supabase.from('tours').select('*');
    if (!isAdmin) query = query.eq('assigned_to', userId);
    
    const { data: tours } = await query;
    if (tours) {
      const tbody = document.querySelector('.premium-table tbody');
      if (tbody) {
        tbody.innerHTML = tours.map(t => `
          <tr>
            <td>${t.title}</td>
            <td>${new Date(t.departure_date).toLocaleDateString()}</td>
            <td><span class="status ${t.status}">${t.status}</span></td>
            <td><button class="icon-btn"><i class="ph ph-eye"></i></button></td>
          </tr>
        `).join('');
      }
    }
  }

  // Nav handling
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');
      pageTitle.textContent = item.textContent.trim();
      viewPanels.forEach(vp => vp.classList.remove('active'));
      const target = document.getElementById('view-' + item.dataset.target);
      if (target) target.classList.add('active');
    });
  });

  // Real-time Chat Broadcast
  const channel = supabase.channel('room-1')
    .on('broadcast', { event: 'msg' }, (payload) => {
      const box = document.getElementById('chat-messages');
      if (box) {
        const div = document.createElement('div');
        div.className = 'msg';
        div.innerHTML = `<b>${payload.payload.user}:</b> ${payload.payload.text}`;
        box.appendChild(div);
        box.scrollTop = box.scrollHeight;
      }
    })
    .subscribe();

  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');
  if (chatSend && chatInput) {
    chatSend.onclick = () => {
      const text = chatInput.value;
      if (text) {
        channel.send({ type: 'broadcast', event: 'msg', payload: { user: 'Me', text } });
        const box = document.getElementById('chat-messages');
        if (box) {
          const div = document.createElement('div');
          div.className = 'msg self';
          div.innerHTML = `<b>You:</b> ${text}`;
          box.appendChild(div);
          chatInput.value = '';
          box.scrollTop = box.scrollHeight;
        }
      }
    };
  }

  checkSession();
});
