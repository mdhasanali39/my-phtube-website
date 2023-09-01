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
        "font-medium",
        "px-4",
        "py-1",
        "rounded-md",
        "bg-[#25252533]",
        "cursor-pointer"
      );
      a.innerHTML = `${category?.category}`;
      categoriesContainer.appendChild(a);
      a.onclick = handleCategoryClick;
    });
  } catch (error) {
    console.log(error);
  }
};
const handleCategoryClick = (e) => {
  // console.log(e.target.id);

  handleShowVideo(e.target.id);
};
const handleShowVideo = async (categoryId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await res.json();
  const categoryData = data?.data;

  //   get videos container element
  const videosContainer = document.getElementById("videos-container");
  videosContainer.innerHTML = '';

  categoryData.forEach((singleCategory) => {

    // get hours and minutes
    // console.log(singleCategory?.others?.posted_date ? parseFloat(singleCategory?.others?.posted_date) / 3600 : '');
    const getHours = `${ parseFloat(singleCategory?.others?.posted_date) / 3600}`;
    // console.log(getHours);
    const hour = +(getHours.split('.')[0]);
    let minute = getHours.split('.')[1]+'';
    minute = Math.round(('.'+minute) * 60)
    // console.log(hour,minute);

    console.log(singleCategory);
    const videoContainer = document.createElement("div");
    videoContainer.classList.add("card", "bg-base-100");

    videoContainer.innerHTML = `
    <figure class="rounded-none -mb-3 relative">
        <img src="${singleCategory?.thumbnail}" 
        class="h-[200px] w-full  rounded-lg"
        alt="${singleCategory?.title}" />
        ${singleCategory?.others?.posted_date ? `
            <figcaption class="absolute bottom-3 right-3 text-white bg-black px-1 py-1 rounded">${hour + 'hrs ' + minute + ' min ago'}</figcaption>
        ` : ''}
        
    </figure>
    <div class="card-body pl-0">
      <div class="flex gap-3">
        <img src="${singleCategory?.authors[0]?.profile_picture}"
        class="w-[40px] h-[40px] object-cover object-center rounded-full"
        alt=""/>
        <h2 class="card-title">${singleCategory?.title}</h2>
      </div>
      <!-- profile name and verified badge -->
      <div>
        <p class="flex gap-2 text-sm text-[#171717B2]">${
          singleCategory?.authors[0]?.profile_name
        } 
        <img src="${
          singleCategory?.authors[0]?.verified
            ? ".././images/verified-badge.svg"
            : ""
        }"/>
        </p>
      </div>

      <p class="text-sm text-[#171717B2]">${singleCategory?.others?.views}</p>

    </div>
    `;
    videosContainer.appendChild(videoContainer);
  });
};

handleLoadCategory();
