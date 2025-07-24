const year = new Date().getFullYear();
const footer = document.querySelector("footer p"); // or select the exact element
footer.innerHTML = `© ${year} Aiska Basnet`;

const mediumRSS =
  "https://api.allorigins.win/get?url=https://medium.com/feed/@aiska.basnet";

fetch(mediumRSS)
  .then((response) => response.json()) // Use the CORS proxy's JSON response
  .then((data) => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data.contents, "text/xml");

    const items = xml.querySelectorAll("item");
    const blogContainer = document.getElementById("blogs-container");

    items.forEach((item, index) => {
      if (index < 6) {
        // Display only the latest 6 blogs
        const title =
          item.querySelector("title")?.textContent || "Untitled Blog";
        const link = item.querySelector("link")?.textContent || "#";
        const description =
          item.querySelector("description")?.textContent || "";
        const pubDateRaw = item.querySelector("pubDate")?.textContent || "";
        const pubDate = new Date(pubDateRaw);
        const formattedDate = pubDate.toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        });

        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = description;

        const descriptionText = tempDiv.textContent
          .trim()
          .replace(/\s+/g, " ")
          .replace(/Continue reading on Medium »/g, "")
          .trim();

        const blogElement = `
          <div class="card">
            <div class="article-meta">
              <span class="icon-book"></span>
              <span>${formattedDate}</span>
            </div>
             <h3 class="article-title">${title}</h3>
            <p class="card-description">
              ${descriptionText}
            </p>
            <a
              href="${link}"
              class="btn btn-outline btn-sm"
              target="_blank"
            >
              <span class="icon-book"></span>
              Read Article
            </a>
          
          </div>
        `;
        blogContainer.innerHTML += blogElement;
      }
    });
  })
  .catch((error) => console.error("Error fetching Medium RSS feed:", error));
