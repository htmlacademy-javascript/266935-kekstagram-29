const imgFilterFormElement = document.querySelector('.img-filters__form');

const setFilterClick = (cb) => {
  imgFilterFormElement.addEventListener('click',(evt) =>{
    evt.preventDefault();
    imgFilterFormElement.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    cb();
  });
};

export { setFilterClick };
