// ---------------- Custom Alerts ----------------
(function () {
  const alerts = Array.from(document.querySelectorAll(".custom-alert"));
  if (!alerts.length) return;

  alerts.forEach((alert) => {
    // trigger CSS transition
    void alert.offsetWidth;
    alert.classList.add("show");

    const AUTO_HIDE_MS = 3000;
    const TRANSITION_MS = 360; // match CSS

    setTimeout(() => {
      alert.classList.remove("show");
      alert.classList.add("hide");

      setTimeout(() => {
        if (alert && alert.parentNode) alert.parentNode.removeChild(alert);
      }, TRANSITION_MS + 20);
    }, AUTO_HIDE_MS);
  });
})();

// ---------------- Logo Loader ----------------
window.addEventListener("load", () => {
  const loader = document.getElementById("logo-loader");
  if (!loader) return;

  const animationPlayed = sessionStorage.getItem("logoAnimationPlayed");

  if (!animationPlayed) {
    loader.style.display = "flex";
    setTimeout(() => {
      loader.style.display = "none";
      sessionStorage.setItem("logoAnimationPlayed", "true");
    }, 2800);
  } else {
    loader.style.display = "none";
  }
});

// ---------------- Pie Chart ----------------
(function () {
  const canvas = document.getElementById('expensePieChart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Bills', 'Food', 'Transport', 'Others'],
      datasets: [{
        data: [2500, 800, 400, 300],
        backgroundColor: ['#DA6220', '#145DA0', '#F2A65A', '#7FB3D5'],
        borderColor: '#fff',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        datalabels: {
          color: '#fff',
          font: { weight: 'bold', size: 12 },
          formatter: (value, ctx) => {
            let sum = ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
            let percentage = ((value / sum) * 100).toFixed(0) + '%';
            return ctx.chart.data.labels[ctx.dataIndex] + '\n' + percentage;
          }
        }
      }
    },
    plugins: [ChartDataLabels]
  });
})();

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

// ------------------Edit Work----------------
document.addEventListener("DOMContentLoaded", () => {
  const editBox = document.getElementById("editCategoryBox");
  const editForm = document.getElementById("editCategoryForm");
  const editName = document.getElementById("editCategoryName");
  const editType = document.getElementById("editTransactionType");
  const label = document.getElementById("editDropdownLabel");

  // Open edit screen
  document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const name = btn.dataset.name;
      const type = btn.dataset.type;

      // Fill form values
      editForm.action = `/editCategory/${id}`;
      editName.value = name;
      editType.value = type;
      label.textContent = type;

      // Show modal
      editBox.style.display = "flex";
    });
  });

  // Cancel button
  document.getElementById("editCancel").addEventListener("click", () => {
    editBox.style.display = "none";
  });

  // Click outside to close
  editBox.addEventListener("click", e => {
    if (e.target === editBox) {
      editBox.style.display = "none";
    }
  });
});

// dropdown selection
function selectEditType(value) {
  const input = document.getElementById("editTransactionType");
  const label = document.getElementById("editDropdownLabel");
  input.value = value;
  label.textContent = value;
}

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