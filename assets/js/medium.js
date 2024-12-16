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
        // Display only the latest 5 blogs
        const title =
          item.querySelector("title")?.textContent || "Untitled Blog";
        const link = item.querySelector("link")?.textContent || "#";
        const description =
          item.querySelector("description")?.textContent || "";

        // Extract the first <img> tag from <description>
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = description;
        const imgTag = tempDiv.querySelector("img");
        const imageUrl = imgTag
          ? imgTag.src
          : "https://via.placeholder.com/800x400?text=No+Image"; // Fallback image if no image is found
        const descriptionText = tempDiv.textContent
          .trim()
          .replace(/\s+/g, " ")
          .replace(/Continue reading on Medium »/g, "")
          .trim();
        const blogElement = `
          <div class="blog col-md-4 col-sm-6">
            <img src="${imageUrl}" class="blog-image" alt="Blog Image">
            <div class="blog-title">${title}</div>
             <div class="blog-description">${descriptionText}</div>
            <a class="blog-link" href="${link}" target="_blank">Read more</a>
          </div>
        `;
        blogContainer.innerHTML += blogElement;
      }
    });
  })
  .catch((error) => console.error("Error fetching Medium RSS feed:", error));
