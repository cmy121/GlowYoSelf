

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); 
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function checkAndDisplayGmail() {
  const storedGmail = getCookie("userGmail");
  if (storedGmail) {
    document.getElementById("welcomeMessage").innerText = "Welcome back, " + storedGmail;
  }
}

function calculateBMI() {
  const weight = parseFloat(document.getElementById('weight').value);
  const height = parseFloat(document.getElementById('height').value);

  if (!weight || !height || weight <= 0 || height <= 0) {
    document.getElementById('bmi-result').textContent = "Please enter valid numbers for weight and height.";
    return;
  }

  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  let category = "";
  let description = "";

  // Remove previous images if any
  const existingImages = document.querySelectorAll("img.bmi-image");
  existingImages.forEach(img => img.remove());

  if (bmi < 18.5) {
    category = "Underweight";
    description = "You are under the healthy weight range. Consider consulting with a healthcare provider.";
    show_image("images/underweight.png", 150, 100, "Underweight Image");
  
  } else if (bmi < 24.9) {
    category = "Normal weight";
    description = "You are within a healthy weight range. Would you want a stronger body?";
    show_image("images/healthyWeight.png", 150, 100, "Healthy Weight Image");
  
  } else if (bmi < 29.9) {
    category = "Overweight";
    description = "You are above the healthy weight range. Would you want us to build a suitable exercise program for you?";
    show_image("images/overweight.webp", 150, 100, "Overweight Image");
  
  } else {
    category = "Obese";
    description = "You are in the obese range. It's recommended to consult with a healthcare provider.";
    show_image("images/obese.png", 150, 100, "Obese Image");
  }

  document.getElementById('bmi-result').innerHTML = `Your BMI is ${bmi.toFixed(1)} (<span id="bmi-category">${category}</span>).`;
  document.getElementById('bmi-description').textContent = description;

  const categorySpan = document.getElementById('bmi-category');

if (categorySpan) {
  switch (category) {
    case "Underweight":
      categorySpan.style.color = "#1E90FF";
      break;
    case "Normal weight":
      categorySpan.style.color = "#2E8B57";
      break;
    case "Overweight":
      categorySpan.style.color = "#FFA500";
      break;
    case "Obese":
      categorySpan.style.color = "#DC143C";
      break;
  }
}

const routineElement = document.getElementById('exercise-routine');

// Clear previous routine
routineElement.innerHTML = "";

if (category === "Underweight") {
  routineElement.innerHTML = `
    <p>We’re sorry, but exercise alone may not be suitable for addressing underweight conditions.</p>
    <p><strong>Please consult with a healthcare provider or a nutritionist for proper care and support.</strong></p>
    <p>Thank You.</p>
  `;
} else {
  let routine = "";

  if (category === "Normal weight") {
    routine = `
      <h3><b>Suggested Exercise Routine (Normal Weight)</b></h3>
      <ul>
        <li><img src="images/cardio.jpg" width="150" height="100" alt="Cardio"> 30 min of Cardio (3–5 times/week)</li>
        <li><img src="images/strength.png" width="150" height="100" alt="Strength Training"> 1 hour of Strength Training (2–3 times/week)</li>
        <li><img src="images/yoga.jpg" width="150" height="100" alt="Yoga"> 30 minutes of Yoga (2–3 times/week)</li>
      </ul>
    `;
  } else if (category === "Overweight") {
    routine = `
      <h3><b>Suggested Exercise Routine (Overweight)</b></h3>
      <ul>
        <li><img src="images/jogging.jpg" width="150" height="100" alt="Jogging"> 15 minutes of Light Jogging (5 times/week)</li>
        <li><img src="images/lowImpact.jpg" width="150" height="100" alt="Low-Impact Training"> 1 hour of Low-Impact Strength Training (2 times/week)</li>
        <li><img src="images/yoga.jpg" width="150" height="100" alt="Yoga"> 30 minutes of Yoga (2-3 times/week)</li>
      </ul>
    `;
  } else if (category === "Obese") {
    routine = `
      <h3><b>Suggested Exercise Routine (Obese)</b></h3>
      <ul>
        <li><img src="images/walking.png" width="150" height="100" alt="walking"> 15 minutes of Light Walking (everyday)</li>
        <li><img src="images/swimming.png" width="150" height="100" alt="Swimming"> 1 hour of Aqua Aerobics (3 times/week)</li>
        <li><img src="images/yoga.jpg" width="150" height="100" alt="Yoga"> 30 minutes of Yoga (2-3 times/week)</li>
      </ul>
      <p><strong>Note:</strong> Please consult your doctor before starting any new fitness program.</p>
    `;
  }

  routineElement.innerHTML = routine;
}

}

function toggleMenu() {
  const nav = document.getElementById('navLinks');
  nav.classList.toggle('active');
}

function show_image(src, width, height, alt) {
  const container = document.getElementById("bmi-image-container");

  container.innerHTML = "";

  let img = document.createElement("img");
  img.src = src;
  img.alt = alt;
  img.width = width;
  img.height = height;
  img.classList.add("bmi-image");

  container.appendChild(img);
}

// ========== SOCIAL MEDIA INTEGRATION ==========
function loadSocialMediaPlugins() {
  const pageUrl = encodeURIComponent(window.location.href);
  const pageTitle = encodeURIComponent('Mental Wellness Tips | Healthy Living');
  
  // Attach click handlers to social buttons
  $('.social-share').click(function(e) {
      e.preventDefault();
      const platform = $(this).data('platform');
      handleSocialShare(platform, pageTitle, pageUrl);
  });
}

function handleSocialShare(platform, title, url) {
  switch(platform) {
      case 'instagram':
          handleInstagramShare(title, url);
          break;
      case 'x':
          window.open(`https://x.com/intent/tweet?url=${url}&text=${title}`, '_blank');
          break;
      case 'tiktok':
          // TikTok doesn't have a direct sharing URL like other platforms
          // Usually shared through their app, but we can open TikTok website
          alert('To share on TikTok, please copy this link and paste it in the TikTok app.');
          navigator.clipboard.writeText(decodeURIComponent(url));
          window.open('https://www.tiktok.com/', '_blank');
          break;
      case 'youtube':
          // YouTube doesn't have direct content sharing like this
          // But we can direct users to YouTube
          window.open('https://www.youtube.com/', '_blank');
          break;
  }
}


function handleInstagramShare(title, url) {
  // Mobile devices
  if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      try {
          // Try app-first approach
          window.location.href = `instagram://library?AssetPath=${url}&Caption=${title}`;
          
          // Fallback if app fails
          setTimeout(() => {
              window.open(`https://www.instagram.com/`, '_blank');
          }, 500);
      } catch (e) {
          window.open(`https://www.instagram.com/`, '_blank');
      }
  } 
  // Desktop
  else {
      window.open(`https://www.instagram.com/`, '_blank');
  }
}
