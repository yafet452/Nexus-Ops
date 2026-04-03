// Basic Mock App Logic to Make Dashboard Interactive
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  // Login Logic
  const loginScreen = document.getElementById('login-screen');
  const dashboardScreen = document.getElementById('dashboard-screen');
  const loginForm = document.getElementById('login-form');
  
  // Dashboard Elements
  const navItems = document.querySelectorAll('.nav-item');
  const viewPanels = document.querySelectorAll('.view-panel');
  const pageTitle = document.getElementById('page-title');
  const userRole = document.getElementById('user-role');
  const userName = document.getElementById('user-name');
  const adminOnlyNav = document.querySelectorAll('.admin-only');

  const logoutBtn = document.getElementById('logout-btn');

  // Handle Login
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    
    // Simple role determination (mocked)
    const isAdmin = email.includes('admin');
    
    // Set UI values based on role
    if(isAdmin) {
      userName.textContent = 'Admin User';
      userRole.textContent = 'Operations Admin';
      userRole.style.color = '#f59e0b';
      userRole.style.background = 'rgba(245,158,11,0.2)';
      adminOnlyNav.forEach(el => el.style.display = 'flex');
    } else {
      userName.textContent = 'Jane Doe';
      userRole.textContent = 'Tour Leader';
      adminOnlyNav.forEach(el => el.style.display = 'none');
    }

    // Transition Screens
    loginScreen.classList.add('hidden');
    setTimeout(() => {
      loginScreen.style.display = 'none';
      dashboardScreen.classList.remove('hidden');
    }, 400);
  });

  // Handle Logout
  logoutBtn.addEventListener('click', () => {
    dashboardScreen.classList.add('hidden');
    setTimeout(() => {
      loginScreen.style.display = 'flex';
      setTimeout(() => loginScreen.classList.remove('hidden'), 50);
    }, 400);
  });

  // Handle Navigation
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Update Active Nav Style
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      // Update Header Title
      pageTitle.textContent = item.textContent.trim();

      // Switch View Panel
      const targetId = 'view-' + item.dataset.target;
      viewPanels.forEach(vp => vp.classList.remove('active'));
      document.getElementById(targetId).classList.add('active');
    });
  });

  // Automation Button Logic
  const triggerBtn = document.getElementById('trigger-auto-btn');
  const logBox = document.getElementById('assign-logs');
  
  if(triggerBtn) {
    triggerBtn.addEventListener('click', () => {
      triggerBtn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Running...';
      triggerBtn.disabled = true;
      logBox.innerHTML += '<br>> Triggering assignment algorithm...';
      logBox.scrollTop = logBox.scrollHeight;

      setTimeout(() => {
        logBox.innerHTML += '<br>> <span style="color:#f59e0b">Analyzing staff availability & workload...</span>';
        logBox.scrollTop = logBox.scrollHeight;
      }, 800);

      setTimeout(() => {
        logBox.innerHTML += '<br>> <span style="color:#10b981">Assigned: "Yosemite Trek" -> Jane Doe</span>';
        logBox.innerHTML += '<br>> <span style="color:#10b981">Assigned: "Zion Day Trip" -> John Smith</span>';
        logBox.scrollTop = logBox.scrollHeight;
      }, 1600);

      setTimeout(() => {
        logBox.innerHTML += '<br>> Automation complete.';
        logBox.scrollTop = logBox.scrollHeight;
        triggerBtn.innerHTML = '<i class="ph ph-magic-wand"></i> Run Automation';
        triggerBtn.disabled = false;
        
        // Add fake activity feed item if Overview exists
        const feed = document.getElementById('activity-list');
        if(feed) {
          const li = document.createElement('li');
          li.innerHTML = '<span class="dot green"></span> Auto-Assigner mapped 2 new tours. <small>Just now</small>';
          feed.prepend(li);
        }

      }, 2500);
    });
  }

  // Chat/Messaging Logic
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');
  const chatBox = document.getElementById('chat-messages');

  const sendMessage = () => {
    const text = chatInput.value.trim();
    if(text) {
      const msgDiv = document.createElement('div');
      msgDiv.className = 'msg self';
      msgDiv.innerHTML = `<b>You:</b> ${text}`;
      chatBox.appendChild(msgDiv);
      chatInput.value = '';
      chatBox.scrollTop = chatBox.scrollHeight;

      // Mock reply
      setTimeout(() => {
        const replyDiv = document.createElement('div');
        replyDiv.className = 'msg';
        replyDiv.innerHTML = `<b>System:</b> Message received. Real-time integration pending.`;
        chatBox.appendChild(replyDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
      }, 1000);
    }
  };

  if(chatSend) {
    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
      if(e.key === 'Enter') sendMessage();
    });
  }

  // Availability Form Logic
  const availForm = document.getElementById('avail-form');
  if(availForm) {
    availForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = availForm.querySelector('button');
      const originalText = btn.textContent;
      btn.innerHTML = '<i class="ph ph-check"></i> Submitted';
      btn.style.background = 'var(--accent-green)';
      
      setTimeout(() => {
         btn.innerHTML = originalText;
         btn.style.background = 'var(--primary)';
         availForm.reset();
      }, 2000);
    });
  }

});
