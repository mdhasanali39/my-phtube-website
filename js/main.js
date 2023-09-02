const handleLoadCategory = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/videos/categories"
    );
    const data = await res.json();
    const categoriesData = data?.data;

    // get the categories container element
    const categoriesContainer = document.getElementById("categories-container");

    categoriesData?.forEach((category) => {
      const a = document.createElement("a");
      a.setAttribute("id", category?.category_id);
      a.classList.add(
        "text-lg",
        "text-center",
        "w-[120px]",
        "font-semibold",
        "px-4",
        "py-1",
        "rounded-md",
        "bg-[#25252533]",
        "cursor-pointer",
        "category"
      );
      a.innerHTML = `${category?.category}`;
      categoriesContainer.appendChild(a);
      // added onclick to a
      a.onclick = handleCategoryClick;
    });
  } catch (error) {
    console.log(error);
  }
};
// get the category click event
let CategoryEvent;
const handleCategoryClick = (e, isClicked) => {
  CategoryEvent = e;

  if (isClicked) {
    handleShowVideo(e.target.id, isClicked);
  }

  if (!isClicked) {
    handleShowVideo(e.target.id);
  }
};

const handleShowVideo = async (categoryId, isClicked) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
    );
    const data = await res.json();
    const categoryData = data?.data;
    const noDataFoundContainer = document.getElementById(
      "no-data-found-container"
    );
    if (categoryData.length === 0) {
      noDataFoundContainer.classList.remove("hidden");
      noDataFoundContainer.classList.add("flex");
    } else {
      noDataFoundContainer.classList.remove("flex");
      noDataFoundContainer.classList.add("hidden");
    }
    //  sort by views function
    const sortVideosByViews = (x, y) => {
      if (parseFloat(x?.others?.views) < parseFloat(y?.others?.views)) {
        return 1;
      } else if (parseFloat(x?.others?.views) > parseFloat(y?.others?.views)) {
        return -1;
      } else {
        return 0;
      }
    };
    if (isClicked) {
      categoryData.sort(sortVideosByViews);
    }

    //   get videos container element
    const videosContainer = document.getElementById("videos-container");
    videosContainer.innerHTML = "";

    categoryData.forEach((singleCategory) => {
      // get hours and minutes
      const getHours = `${
        parseFloat(singleCategory?.others?.posted_date) / 3600
      }`;
      const hour = +getHours.split(".")[0];
      let minute = getHours.split(".")[1] + "";
      minute = Math.round(("." + minute) * 60);
      const videoContainer = document.createElement("div");
      videoContainer.classList.add("card", "bg-base-100");

      videoContainer.innerHTML = `
      <figure class="rounded-none -mb-3 relative">
          <img src="${singleCategory?.thumbnail}" 
          class="h-[200px] w-full  rounded-lg"
          alt="${singleCategory?.title}" />
          ${
            singleCategory?.others?.posted_date
              ? `
              <figcaption class="absolute bottom-3 right-3 text-white bg-black px-1 py-1 rounded">${
                hour + "hrs " + minute + " min ago"
              }</figcaption>
          `
              : ""
          }
          
      </figure>
      <div class="card-body pl-0">
        <div class="flex gap-3">
          <img src="${singleCategory?.authors[0]?.profile_picture}"
          class="w-[40px] h-[40px] object-cover object-center rounded-full"
          alt=""/>
          <h2 class="card-title">${singleCategory?.title}</h2>
        </div>
        <!-- profile name,verified badge and views -->
        <div class="margin-left-custom space-y-3">
          <p class="flex gap-2 text-sm text-[#171717B2]">${
            singleCategory?.authors[0]?.profile_name
          } 
          <img src="${
            singleCategory?.authors[0]?.verified
              ? ".././images/verified-badge.svg"
              : ""
          }"/>
          </p>
          <p class="text-sm text-[#171717B2]">${
            singleCategory?.others?.views + " views"
          }</p>
        </div>
  
  
      </div>
      `;

      videosContainer.appendChild(videoContainer);
    });
  } catch (error) {
    console.log(error);
  }
};

// handle sort by view
const handleSortByView = () => {
  handleCategoryClick(CategoryEvent, true);
};

// default call for handleShowVideo
// and sort by view
const defaultVideosWithSort = () => {
  handleShowVideo("1000");
};
defaultVideosWithSort();

// handle blog button click
const goToBlogPage = () => {
  window.location.href = "blog.html";
};
// handle home button click in blog page
const goToHomePage = () => {
  window.location.href = "index.html";
};

handleLoadCategory();
