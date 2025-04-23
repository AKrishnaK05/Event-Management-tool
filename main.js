document.addEventListener("DOMContentLoaded", () => {
    let events = [];
    let isLoggedIn = false;
    let organizerLoggedIn = false;
    let loggedInUserName = "";
  
    // DOM Elements
    const loginBtn = document.getElementById("loginBtn");
    const loginModal = document.getElementById("loginModal");
    const closeBtn = document.querySelector(".close");
    const loginForm = document.getElementById("loginForm");
    const eventsGrid = document.getElementById("eventsGrid");
    const filterBtns = document.querySelectorAll(".filter-btn");
    const createEventBtn = document.getElementById("createEventBtn");
    const organizerModal = document.getElementById("organizerModal");
    const organizerCloseBtn = document.querySelector(".organizer-close");
    const organizerForm = document.getElementById("organizerForm");
    const myEventsBtn = document.getElementById("myEventsBtn");
    const paymentModal = document.getElementById("paymentModal");
    const paymentCloseBtn = document.querySelector(".payment-close");
    const paymentForm = document.getElementById("paymentForm");
  
    let eventToEnroll = null;
  
    // Fetch Events from Backend
    async function fetchEventsFromBackend() {
      try {
        const res = await fetch("http://localhost:3000/api/events"); // adjust route if needed
        events = await res.json();
        displayEvents();
      } catch (err) {
        console.error("Error fetching events:", err);
        eventsGrid.innerHTML = "<p class='error'>Failed to load events.</p>";
      }
    }
  
    // Display Events
    function displayEvents(category = "all") {
      const filtered = category === "all"
        ? events
        : events.filter(event => event.category === category);
  
      eventsGrid.innerHTML = filtered.map(event => `
        <div class="event-card">
          <img src="${event.image || 'https://via.placeholder.com/300x200'}" alt="${event.title}" class="event-image">
          <div class="event-details">
            <span class="event-category ${event.category}">${event.category}</span>
            <h3 class="event-title">${event.title}</h3>
            <p class="event-date">${new Date(event.date).toDateString()}</p>
            <p>${event.description}</p>
            <button class="enroll-btn" onclick="openPaymentModal('${event._id || event.id}')">Enroll Now</button>
          </div>
        </div>
      `).join("");
    }
  
    // Open Payment Modal
    window.openPaymentModal = function (eventId) {
      if (!isLoggedIn) {
        loginModal.style.display = "block";
        return;
      }
      eventToEnroll = eventId;
      paymentModal.style.display = "block";
    };
  
    // Close Modals
    closeBtn?.addEventListener("click", () => {
      loginModal.style.display = "none";
    });
  
    paymentCloseBtn?.addEventListener("click", () => {
      paymentModal.style.display = "none";
    });
  
    organizerCloseBtn?.addEventListener("click", () => {
      organizerModal.style.display = "none";
    });
  
    window.addEventListener("click", (e) => {
      if (e.target === loginModal) loginModal.style.display = "none";
      if (e.target === paymentModal) paymentModal.style.display = "none";
      if (e.target === organizerModal) organizerModal.style.display = "none";
    });
  
    // Login
    loginBtn?.addEventListener("click", () => {
      loginModal.style.display = "block";
    });
  
    loginForm?.addEventListener("submit", async (e) => {
        e.preventDefault();
      
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
      
        try {
          const res = await fetch("http://localhost:3000/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, phone })
          });
      
          const data = await res.json();
      
          if (res.ok) {
            isLoggedIn = true;
            loggedInUserName = data.user.email;
      
            if (data.user.role === "organizer") {
              organizerLoggedIn = true;
              createEventBtn.style.display = "inline-block";
              myEventsBtn.style.display = "inline-block";
            }
      
            alert("Login successful!");
            loginModal.style.display = "none";
            loginForm.reset();
          } else {
            alert(`${data.error}`);
          }
        } catch (err) {
          console.error("Login error:", err);
          alert("Login failed. Try again.");
        }
      });
      
  
    // Payment Submit (Mock)
    paymentForm?.addEventListener("submit", async (e) => {
        e.preventDefault();
      
        paymentModal.style.display = "none";
        if (!eventToEnroll) return;
      
        try {
          const method = document.querySelector('input[name="paymentMethod"]:checked')?.value || "card";
      
          const res = await fetch("http://localhost:3000/api/registrations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userEmail: loggedInUserName,
              eventId: eventToEnroll,
              paymentMethod: method
            })
          });
      
          const result = await res.json();
          if (res.ok) {
            alert("Registration successful!");
          } else {
            throw new Error(result.error || "Registration failed.");
          }
      
        } catch (err) {
          console.error("Error:", err);
          alert("Failed to register for event.");
        }
      });
      
  
    // Filter Buttons
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const category = btn.dataset.category;
        displayEvents(category);
      });
    });
  
    // Open Create Event Modal
    createEventBtn?.addEventListener("click", () => {
      organizerModal.style.display = "block";
    });
  
    // Create Event (Mock)
    organizerForm?.addEventListener("submit",async (e) => {
      e.preventDefault();
      const newEvent = {
        title: document.getElementById("eventTitle").value,
        category: document.getElementById("eventCategory").value,
        date: document.getElementById("eventDate").value,
        image: document.getElementById("eventImage").value,
        description: document.getElementById("eventDescription").value,
        price: document.getElementById("eventPrice").value,
        organizer: loggedInUserName
      };
  
      try {
        const res = await fetch("http://localhost:3000/api/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newEvent)
        });
    
        const savedEvent = await res.json();
        events.push(savedEvent); // add to local UI
        organizerForm.reset();
        organizerModal.style.display = "none";
        displayEvents();
      } catch (err) {
        alert("Failed to save event.");
        console.error(err);
      }
    });
  
    // View My Events
    myEventsBtn?.addEventListener("click", () => {
        if (!organizerLoggedIn) {
          alert("You must be logged in as an organizer.");
          return;
        }
      
        const myEvents = events.filter(e => e.organizer === loggedInUserName);
      
        if (myEvents.length === 0) {
          eventsGrid.innerHTML = `<h3>You haven't created any events yet.</h3>`;
          return;
        }
      
        eventsGrid.innerHTML = `<h3>Your Events</h3>` + myEvents.map(event => `
          <div class="event-card">
            <img src="${event.image || 'https://via.placeholder.com/300x200'}" alt="${event.title}" class="event-image">
            <div class="event-details">
              <span class="event-category ${event.category}">${event.category}</span>
              <h3 class="event-title">${event.title}</h3>
              <p class="event-date"><strong>Date:</strong> ${new Date(event.date).toDateString()}</p>
              <p class="event-price"><strong>Price:</strong> ₹${event.price || 0}</p>
              <p class="event-organizer"><strong>Organizer:</strong> ${event.organizer}</p>
              <p class="event-description">${event.description}</p>
            </div>
          </div>
        `).join("");
      });
      
  
    // Initialize
    fetchEventsFromBackend();
  });
  