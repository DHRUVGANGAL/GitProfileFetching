const url = "https://api.github.com/users";
const searchInputEl = document.getElementById("searchInput");
const searchButtonEl = document.getElementById("searchBtn");
const profileContainerEl = document.getElementById("profileContainer");
const loadingEl = document.getElementById("loading");

const generateProfile = (profile) => {
    // Add null checks and default values
    const name = profile.name || profile.login || 'No name available';
    const bio = profile.bio || 'No bio available';
    const followers = profile.followers || 0;
    const following = profile.following || 0;
    const repos = profile.public_repos || 0;
    
    return `
        <div class="profile-box">
            <div class="top-section">
                <div class="left">
                    <div class="avatar">
                        <img alt="avatar" src="${profile.avatar_url || ''}" />
                    </div>
                    <div class="self">
                        <h1>${name}</h1>
                        <h1>@${profile.login}</h1>
                    </div>
                </div>
                <a href="${profile.html_url}" target="_blank">
                    <button class="primary-btn">Check Profile</button>
                </a>
            </div>
            <div class="about">
                <h2>About</h2>
                <p>${bio}</p>
            </div>
            <div class="status">
                <div class="status-item">
                    <h3>Followers</h3>
                    <p>${followers}</p>
                </div>
                <div class="status-item">
                    <h3>Following</h3>
                    <p>${following}</p>
                </div>
                <div class="status-item">
                    <h3>Repos</h3>
                    <p>${repos}</p>
                </div>
            </div>
        </div>
    `;
};

const fetchProfile = async () => {
    const username = searchInputEl.value;

    // Check if username is empty
    if (!username.trim()) {
        loadingEl.innerText = "Please enter a username";
        loadingEl.style.color = "red";
        return;
    }

    loadingEl.innerText = "loading.....";
    loadingEl.style.color = "black";
    profileContainerEl.innerText = ""; // Clear previous results

    try {
        const res = await fetch(`${url}/${username}`);
        const data = await res.json();

        if (res.ok) {
            loadingEl.innerText = "";
            profileContainerEl.innerHTML = generateProfile(data);
        } else {
            loadingEl.innerHTML = data.message || "Error fetching profile";
            loadingEl.style.color = "red";
            profileContainerEl.innerText = "";
        }
    } catch (error) {
        console.log({ error });
        loadingEl.innerText = "Error fetching profile. Please try again.";
        loadingEl.style.color = "red";
        profileContainerEl.innerText = "";
    }
};

// Add event listeners
searchButtonEl.addEventListener("click", fetchProfile);

// Add enter key support
searchInputEl.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        fetchProfile();
    }
});