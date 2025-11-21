// ----------------add transaction-------------
// Category selection
const categoryItems = document.querySelectorAll(".category-item");
const categoryInput = document.getElementById("categoryId");

if (categoryItems.length > 0) {
  categoryItems[0].classList.add("active");
  categoryInput.value = categoryItems[0].dataset.id;
}

categoryItems.forEach(item => {
  item.addEventListener("click", () => {
    categoryItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");
    categoryInput.value = item.dataset.id;
  });
});

// Transaction type selection
const typeCards = document.querySelectorAll(".type-card");
const typeInput = document.getElementById("transactionType");

typeCards.forEach(card => {
  card.addEventListener("click", () => {
    typeCards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");
    typeInput.value = card.dataset.type;
  });
});

// ---------------- Transaction Type Dropdown ----------------
function selectType(value, el) {
  const input = document.getElementById('transactionType');
  const label = document.getElementById('dropdownLabel');
  if (!input || !label) return;

  input.value = value;
  label.textContent = value;
}

// ---------------- Delete Confirm Box ----------------
(function () {
  function initDeleteConfirm() {
    const confirmBox = document.getElementById("confirmBox");
    const confirmMessage = document.getElementById("confirmMessage");
    const confirmCancel = document.getElementById("confirmCancel");
    const confirmDelete = document.getElementById("confirmDelete");
    let targetForm = null;

    if (!confirmBox || !confirmCancel || !confirmDelete) return;

    // Attach listener to every delete button
    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", function (e) {
        e.preventDefault(); // stop form auto submit
        targetForm = this.closest("form");
        document.querySelector("#confirmBox h4").textContent =
          this.dataset.type === "category" ? "Delete Category" : "Delete Transaction";
        confirmMessage.textContent = `Are you sure you want to delete "${this.dataset.name}"?`;
        confirmBox.style.display = "flex"; // show popup
        confirmDelete.focus();
      });
    });

    // Cancel hides popup
    confirmCancel.addEventListener("click", () => {
      confirmBox.style.display = "none";
      targetForm = null;
    });

    // Confirm deletes
    confirmDelete.addEventListener("click", () => {
      if (targetForm) {
        targetForm.submit();
        confirmBox.style.display = "none";
      }
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        confirmBox.style.display = "none";
        targetForm = null;
      }
    });

    // Click outside to close
    confirmBox.addEventListener("click", (e) => {
      if (e.target === confirmBox) {
        confirmBox.style.display = "none";
        targetForm = null;
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDeleteConfirm);
  } else {
    initDeleteConfirm();
  }
})();

// ------------------ Edit Work ------------------
document.addEventListener("DOMContentLoaded", () => {
  const editBox = document.getElementById("editCategoryBox");
  const editForm = document.getElementById("editCategoryForm");
  const editName = document.getElementById("editCategoryName");
  const editType = document.getElementById("editTransactionType");
  const label = document.getElementById("editDropdownLabel");

  document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const name = btn.dataset.name;
      const type = btn.dataset.type;       
      const typeId = btn.dataset.typeId;  

      // Fill form
      editForm.action = `/editCategory/${id}`;
      editName.value = name;
      editType.value = typeId; 
      label.textContent = type;

      // Show modal
      editBox.style.display = "flex";
    });
  });

  document.getElementById("editTypeMenu").addEventListener("click", e => {
    if (e.target.classList.contains("dropdown-item")) {
      const value = e.target.dataset.value; 
      label.textContent = value;
      editType.value = value;
    }
  });

  document.getElementById("editCancel").addEventListener("click", () => {
    editBox.style.display = "none";
  });

  editBox.addEventListener("click", e => {
    if (e.target === editBox) {
      editBox.style.display = "none";
    }
  });
});

// ------------------ Add Work ----------------
document.addEventListener("DOMContentLoaded", () => {
  const addBox = document.getElementById("addCategoryBox");
  const addForm = document.getElementById("addCategoryForm");
  const addName = document.getElementById("addCategoryName");
  const addType = document.getElementById("addTransactionType");
  const addLabel = document.getElementById("addDropdownLabel");

  // Open Add Category modal
  document.getElementById("openAddCategoryBtn")?.addEventListener("click", () => {
    // Clear previous input values
    addForm.reset();
    addLabel.textContent = "Select Transaction Type";
    addBox.style.display = "flex";
  });

  // Cancel button
  document.getElementById("addCancel").addEventListener("click", () => {
    addBox.style.display = "none";
  });

  // Click outside to close
  addBox.addEventListener("click", e => {
    if (e.target === addBox) {
      addBox.style.display = "none";
    }
  });
});

// Dropdown selection for Add Category
function selectAddType(value) {
  const input = document.getElementById("addTransactionType");
  const label = document.getElementById("addDropdownLabel");
  input.value = value;
  label.textContent = value;
}
document.addEventListener("DOMContentLoaded", () => {
  const addBox = document.getElementById("addCategoryBox");
  if (addBox) addBox.style.display = "none";
});

// --------------------search---------------------
const filterBtn = document.getElementById('filterMenuButton');
const filterMenu = document.getElementById('filterMenu');
const searchInput = document.getElementById("searchInput");
const filterInput = document.getElementById("filterInput");

// Toggle menu on button click
filterBtn.addEventListener('click', (e) => {
  e.preventDefault();
  filterMenu.style.display =
    filterMenu.style.display === 'block' ? 'none' : 'block';
});

// Hide menu when clicking outside
document.addEventListener('click', (e) => {
  if (!filterBtn.contains(e.target) && !filterMenu.contains(e.target)) {
    filterMenu.style.display = 'none';
  }
});

// Handle filter selection
filterMenu.querySelectorAll('li').forEach(item => {
  item.addEventListener("click", () => {
    const value = item.dataset.value;
    filterInput.value = value;
    filterBtn.textContent = item.textContent; // Only text, no icon

    if (value === "date") {
      searchInput.type = "date";
      searchInput.placeholder = "Select date";
    } else {
      searchInput.type = "text";
      searchInput.placeholder = "Search here...";
    }

    searchInput.value = ""; // Clear input when filter changes
    filterMenu.style.display = "none"; // Close dropdown
  });
});

// ------------------------ Edit Transaction -----------------------------

// Select Category from Dropdown
function selectEditCategory(id, name) {
  document.getElementById("editCategoryLabel").innerText = name;
  document.getElementById("editCategoryId").value = id;
}

// Select Transaction Type from Dropdown
function selectEditType(type) {
  document.getElementById("editTypeLabel").innerText = type;
  document.getElementById("editTypeValue").value = type;
}

// Open Edit Popup & Fill Values
function initEditTransaction() {
  const editButtons = document.querySelectorAll(".edit-btn");
  const box = document.getElementById("editTransactionBox");
  const cancelBtn = document.getElementById("editCancel");

  if (!editButtons.length || !box || !cancelBtn) return;

  editButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Show popup
      box.style.display = "flex";

      // Fill form fields
      document.getElementById("editAmount").value = btn.dataset.amount;
      document.getElementById("editDescription").value = btn.dataset.description;

      // Category
      document.getElementById("editCategoryLabel").innerText = btn.dataset.categoryname;
      document.getElementById("editCategoryId").value = btn.dataset.categoryid;

      // Type
      document.getElementById("editTypeLabel").innerText = btn.dataset.type;
      document.getElementById("editTypeValue").value = btn.dataset.type;

      // Update form action
      document.getElementById("editTransactionForm").action = "/editTransaction/" + btn.dataset.id;
    });
  });

  // Close popup when clicking Cancel
  cancelBtn.addEventListener("click", () => {
    box.style.display = "none";
  });

  // Close popup when clicking outside
  box.addEventListener("click", (e) => {
    if (e.target === box) {
      box.style.display = "none";
    }
  });
}

// Initialize on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initEditTransaction);
} else {
  initEditTransaction();
}
// ------------------------ View Transaction -----------------------------
function initViewTransaction() {
  const viewButtons = document.querySelectorAll(".view-btn");
  const box = document.getElementById("viewTransactionBox");
  const closeBtn = document.getElementById("viewClose");

  if (!viewButtons.length || !box || !closeBtn) return;

  viewButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Fill details
      document.getElementById("viewAmount").innerText = btn.dataset.amount;
      document.getElementById("viewCategory").innerText = btn.dataset.categoryname;
      document.getElementById("viewType").innerText = btn.dataset.type;
      document.getElementById("viewDescription").innerText = btn.dataset.description;
      document.getElementById("viewCreated").innerText = btn.dataset.created || btn.dataset.time;;
      document.getElementById("viewUpdated").innerText = btn.dataset.updated || btn.dataset.time;

      // Show popup
      box.style.display = "flex";
    });
  });

  // Close popup
  closeBtn.addEventListener("click", () => {
    box.style.display = "none";
  });

  // Close when clicking outside
  box.addEventListener("click", (e) => {
    if (e.target === box) box.style.display = "none";
  });
}

// Initialize
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initViewTransaction);
} else {
  initViewTransaction();
}

