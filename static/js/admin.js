// Admin Dashboard JavaScript

// Sidebar toggle
function toggleSidebar() {
  const sidebar = document.getElementById('admin-sidebar');
  const overlay = document.getElementById('sidebar-overlay');

  if (sidebar && overlay) {
    sidebar.classList.toggle('-translate-x-full');
    overlay.classList.toggle('hidden');
  }
}

// Close sidebar when clicking outside on mobile
document.addEventListener('DOMContentLoaded', function() {
  const overlay = document.getElementById('sidebar-overlay');
  if (overlay) {
    overlay.addEventListener('click', toggleSidebar);
  }

  // Close sidebar on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const sidebar = document.getElementById('admin-sidebar');
      if (sidebar && !sidebar.classList.contains('-translate-x-full')) {
        toggleSidebar();
      }
    }
  });

  // Initialize Sortable for drag-and-drop where applicable
  initializeSortable();

  // Initialize inline editing
  initializeInlineEdit();

  // HTMX event listeners for toast notifications
  document.body.addEventListener('htmx:afterRequest', function(evt) {
    const target = evt.detail.target;
    const verb = evt.detail.verb;
    const status = evt.detail.xhr?.status;

    if (status >= 200 && status < 300) {
      if (verb === 'delete') {
        showToast('Item deleted successfully', 'success');
      } else if (evt.detail.pathInfo?.requestPath?.includes('/read')) {
        showToast('Marked as read', 'success');
      } else if (evt.detail.pathInfo?.requestPath?.includes('/unread')) {
        showToast('Marked as unread', 'success');
      } else if (evt.detail.pathInfo?.requestPath?.includes('/settings')) {
        showToast('Setting saved', 'success');
      }
    } else if (status >= 400) {
      showToast('Operation failed. Please try again.', 'error');
    }
  });

  // Re-init sortable and inline edit after HTMX swaps
  document.body.addEventListener('htmx:afterSwap', function() {
    initializeSortable();
    initializeInlineEdit();
  });

  // Update sidebar user info when Clerk is ready
  if (window.Clerk) {
    window.Clerk.load().then(() => {
      updateAdminUserInfo();
    });
  }
});

// Update user info in admin sidebar
function updateAdminUserInfo() {
  if (!window.Clerk || !window.Clerk.user) return;

  const user = window.Clerk.user;
  const firstName = user.firstName || '';
  const lastName = user.lastName || '';
  const fullName = `${firstName} ${lastName}`.trim() || 'Admin';
  const email = user.primaryEmailAddress?.emailAddress || '';
  const imageUrl = user.imageUrl;

  // Update sidebar user info
  const sidebarName = document.getElementById('sidebar-user-name');
  const sidebarEmail = document.getElementById('sidebar-user-email');
  const sidebarAvatar = document.getElementById('sidebar-user-avatar');

  if (sidebarName) sidebarName.textContent = fullName;
  if (sidebarEmail) sidebarEmail.textContent = email;
  if (sidebarAvatar && imageUrl) {
    sidebarAvatar.innerHTML = `<img src="${imageUrl}" alt="${fullName}" class="w-10 h-10 rounded-full object-cover"/>`;
  }
}

// Initialize Sortable.js for drag-and-drop reordering
function initializeSortable() {
  if (typeof Sortable === 'undefined') return;

  // Gallery items sortable
  const galleryGrid = document.getElementById('gallery-grid');
  if (galleryGrid && !galleryGrid._sortableInstance) {
    galleryGrid._sortableInstance = new Sortable(galleryGrid, {
      animation: 150,
      ghostClass: 'sortable-ghost',
      dragClass: 'sortable-drag',
      handle: '.drag-handle',
      onEnd: function(evt) {
        const itemId = evt.item.dataset.id;
        const newIndex = evt.newIndex;
        updateSortOrder('gallery', itemId, newIndex);
      }
    });
  }

  // Page images sortable (per page group)
  document.querySelectorAll('.images-sortable').forEach(function(container) {
    if (!container._sortableInstance) {
      container._sortableInstance = new Sortable(container, {
        animation: 150,
        ghostClass: 'sortable-ghost',
        dragClass: 'sortable-drag',
        handle: '.drag-handle',
        onEnd: function(evt) {
          const itemId = evt.item.dataset.id;
          const newIndex = evt.newIndex;
          updateSortOrder('images', itemId, newIndex);
        }
      });
    }
  });
}

// Update sort order via API
function updateSortOrder(type, itemId, newIndex) {
  const endpoint = type === 'gallery'
    ? `/admin/api/gallery/${itemId}/sort`
    : `/admin/api/images/${itemId}/sort`;

  fetch(endpoint, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sort_order: newIndex })
  }).then(response => {
    if (!response.ok) {
      showToast('Failed to update order', 'error');
    }
  }).catch(err => {
    showToast('Error updating order', 'error');
  });
}

// Initialize inline editing for image URLs and alt text
function initializeInlineEdit() {
  // Image URL editing
  document.querySelectorAll('.editable-url').forEach(function(el) {
    if (el._inlineEditBound) return;
    el._inlineEditBound = true;
    el.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (this.querySelector('input')) return; // Already editing

      const currentUrl = this.dataset.value || this.textContent.trim();
      const itemId = this.dataset.id;

      const input = document.createElement('input');
      input.type = 'text';
      input.value = currentUrl;
      input.className = 'w-full px-2 py-1 bg-secondary-900 border border-primary-500 text-white text-xs rounded focus:outline-none';

      const originalEl = this;
      const originalText = originalEl.textContent;
      originalEl.textContent = '';
      originalEl.appendChild(input);
      input.focus();
      input.select();

      let saved = false;
      function saveUrl() {
        if (saved) return;
        saved = true;
        const newUrl = input.value.trim();
        input.remove();
        const displayUrl = newUrl.length > 40 ? newUrl.substring(0, 37) + '...' : newUrl;
        originalEl.textContent = displayUrl;
        originalEl.dataset.value = newUrl;
        if (newUrl !== currentUrl) {
          updateImageUrl(itemId, newUrl);
          // Also update the preview image
          const card = originalEl.closest('div[data-id]');
          if (card) {
            const img = card.querySelector('img');
            if (img) img.src = newUrl;
          }
        }
      }

      input.addEventListener('blur', saveUrl);
      input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          saveUrl();
        } else if (e.key === 'Escape') {
          saved = true;
          input.remove();
          originalEl.textContent = originalText;
        }
      });
    });
  });

  // Alt text editing
  document.querySelectorAll('.editable-alt').forEach(function(el) {
    if (el._inlineEditBound) return;
    el._inlineEditBound = true;
    el.addEventListener('click', function(e) {
      if (this.querySelector('input')) return; // Already editing

      const currentAlt = this.textContent.trim();
      const itemId = this.dataset.id;

      const input = document.createElement('input');
      input.type = 'text';
      input.value = currentAlt;
      input.className = 'w-full px-2 py-1 bg-secondary-900 border border-primary-500 text-white text-xs rounded focus:outline-none';

      const originalEl = this;
      originalEl.textContent = '';
      originalEl.appendChild(input);
      input.focus();
      input.select();

      let saved = false;
      function saveAlt() {
        if (saved) return;
        saved = true;
        const newAlt = input.value.trim();
        input.remove();
        originalEl.textContent = newAlt;
        if (newAlt !== currentAlt) {
          updateImageAlt(itemId, newAlt);
        }
      }

      input.addEventListener('blur', saveAlt);
      input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          saveAlt();
        } else if (e.key === 'Escape') {
          saved = true;
          input.remove();
          originalEl.textContent = currentAlt;
        }
      });
    });
  });
}

// Update image URL via API
function updateImageUrl(itemId, newUrl) {
  fetch(`/admin/api/images/${itemId}/url`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url: newUrl })
  }).then(response => {
    if (response.ok) {
      showToast('Image URL updated', 'success');
    } else {
      showToast('Failed to update image URL', 'error');
    }
  }).catch(err => {
    showToast('Error updating image URL', 'error');
  });
}

// Update image alt text via API
function updateImageAlt(itemId, newAlt) {
  fetch(`/admin/api/images/${itemId}/alt`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ alt_text: newAlt })
  }).then(response => {
    if (response.ok) {
      showToast('Alt text updated', 'success');
    } else {
      showToast('Failed to update alt text', 'error');
    }
  }).catch(err => {
    showToast('Error updating alt text', 'error');
  });
}

// Modal handling
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }
}

// Confirmation dialog
function confirmDelete(message, onConfirm) {
  if (confirm(message)) {
    onConfirm();
  }
}

// Toast notifications
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 transform translate-y-full opacity-0 transition-all duration-300 ${
    type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-secondary-700'
  } text-white`;
  toast.textContent = message;
  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-full', 'opacity-0');
  });

  // Remove after 3 seconds
  setTimeout(() => {
    toast.classList.add('translate-y-full', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Handle gallery image file upload
function handleGalleryImageUpload(input, formType) {
  const file = input.files[0];
  if (!file) return;

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    showToast('Invalid file type. Please use JPG, PNG, GIF, or WebP.', 'error');
    input.value = '';
    return;
  }

  // Validate file size (10MB max)
  if (file.size > 10 * 1024 * 1024) {
    showToast('File too large. Maximum size is 10MB.', 'error');
    input.value = '';
    return;
  }

  // Show preview immediately
  const previewId = formType === 'add' ? 'add-image-preview' : 'edit-image-preview';
  const urlInputId = formType === 'add' ? 'add-image-url' : 'edit-image-url';
  const preview = document.getElementById(previewId);
  const urlInput = document.getElementById(urlInputId);

  if (preview) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = preview.querySelector('img');
      if (img) {
        img.src = e.target.result;
      }
      preview.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
  }

  // Upload file to server
  const formData = new FormData();
  formData.append('image', file);

  // Show loading state
  const uploadLabel = input.closest('label');
  const originalText = uploadLabel ? uploadLabel.querySelector('span').textContent : '';
  if (uploadLabel) {
    uploadLabel.querySelector('span').textContent = 'Uploading...';
    uploadLabel.style.pointerEvents = 'none';
  }

  fetch('/admin/api/upload/image', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(data => {
        throw new Error(data.error || 'Upload failed');
      });
    }
    return response.json();
  })
  .then(data => {
    if (data.url) {
      // Set the URL in the input field
      if (urlInput) {
        urlInput.value = data.url;
      }
      showToast('Image uploaded successfully!', 'success');
    }
  })
  .catch(err => {
    console.error('Upload error:', err);
    showToast(err.message || 'Failed to upload image', 'error');
    // Reset preview on error
    if (preview && formType === 'add') {
      preview.classList.add('hidden');
    }
  })
  .finally(() => {
    // Reset upload button state
    if (uploadLabel) {
      uploadLabel.querySelector('span').textContent = originalText;
      uploadLabel.style.pointerEvents = '';
    }
    input.value = ''; // Allow re-uploading same file
  });
}

// Handle page image file upload
function handlePageImageUpload(input) {
  const file = input.files[0];
  if (!file) return;

  const imageId = input.dataset.imageId;
  if (!imageId) {
    showToast('Missing image ID', 'error');
    return;
  }

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    showToast('Invalid file type. Please use JPG, PNG, GIF, or WebP.', 'error');
    input.value = '';
    return;
  }

  if (file.size > 10 * 1024 * 1024) {
    showToast('File too large. Maximum size is 10MB.', 'error');
    input.value = '';
    return;
  }

  const formData = new FormData();
  formData.append('image', file);

  // Show loading
  const label = input.closest('label');
  const origText = label ? label.querySelector('span').textContent : '';
  if (label) {
    label.querySelector('span').textContent = 'Uploading...';
    label.style.pointerEvents = 'none';
  }

  fetch(`/admin/api/upload/page-image/${imageId}`, {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (!response.ok) return response.json().then(data => { throw new Error(data.error || 'Upload failed'); });
    return response.json();
  })
  .then(data => {
    if (data.url) {
      // Update the preview image
      const card = input.closest('div[data-id]');
      if (card) {
        const img = card.querySelector('img');
        if (img) img.src = data.url;
        const urlEl = card.querySelector('.editable-url');
        if (urlEl) {
          urlEl.href = data.url;
          urlEl.textContent = data.url.length > 40 ? data.url.substring(0, 37) + '...' : data.url;
        }
      }
      showToast('Image uploaded successfully!', 'success');
    }
  })
  .catch(err => {
    showToast(err.message || 'Failed to upload image', 'error');
  })
  .finally(() => {
    if (label) {
      label.querySelector('span').textContent = origText;
      label.style.pointerEvents = '';
    }
    input.value = '';
  });
}

// Export functions for global use
window.toggleSidebar = toggleSidebar;
window.openModal = openModal;
window.closeModal = closeModal;
window.confirmDelete = confirmDelete;
window.showToast = showToast;
window.handleGalleryImageUpload = handleGalleryImageUpload;
window.handlePageImageUpload = handlePageImageUpload;
