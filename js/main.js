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
// get the category click event 
let CategoryEvent;
const handleCategoryClick = (e, isClicked) => {
  CategoryEvent = e;
  if(isClicked){
    handleShowVideo(e.target.id, isClicked)
  }
  // for(let allClassOfA of e.target.classList){
  //   if(allClassOfA === 'font-medium'){
  //     e.target.classList.add('')
  //   }
  // }
  if(!isClicked){
    handleShowVideo(e.target.id);
  }
};
const handleShowVideo = async (categoryId, isClicked) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await res.json();
  const categoryData = data?.data;
   console.log(categoryData);
   const noDataFoundContainer = document.getElementById('no-data-found-container');
    if(categoryData.length === 0){
      noDataFoundContainer.classList.remove('hidden');
      noDataFoundContainer.classList.add('flex')
    }else{
      noDataFoundContainer.classList.remove('flex');
      noDataFoundContainer.classList.add('hidden')
    }
  //  sort by views function 
   const sortVideosByViews = (x,y) =>{
     if(parseFloat(x?.others?.views) < parseFloat(y?.others?.views)){
        return 1;
     }
     else if(parseFloat(x?.others?.views) > parseFloat(y?.others?.views)){
      return -1;
     }
     else{
      return 0;
     }
   }
   if(isClicked){
    categoryData.sort(sortVideosByViews)
   }


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

    // console.log(singleCategory);
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
        <p class="text-sm text-[#171717B2]">${singleCategory?.others?.views + ' views'}</p>
      </div>


    </div>
    `;

    videosContainer.appendChild(videoContainer);
  });
};
// handle sort by view 
const handleSortByView = () => {

  handleCategoryClick(CategoryEvent, true)
}

// handle blog button click 
const goToBlogPage = () => {
  window.location.href = 'blog.html'
}
// handle home button click in blog page 
const goToHomePage = () => {
  window.location.href = 'index.html'
}

handleLoadCategory();
