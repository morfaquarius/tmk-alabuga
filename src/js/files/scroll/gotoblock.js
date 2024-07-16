// Подключение функционала "Чертоги Фрилансера"
import { isMobile, menuClose, getHash, FLS } from "../functions.js";
// Подключение дополнения для увеличения возможностей
// Документация: https://github.com/cferdinandi/smooth-scroll
//import SmoothScroll from 'smooth-scroll';
//==============================================================================================================================================================================================================================================================================================================================

// Модуль плавной проктутки к блоку
export let gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
  const targetBlockElement = document.querySelector(targetBlock);
  if (targetBlockElement) {
    let headerItem = '';
    let headerItemHeight = 0;
    if (noHeader) {
      headerItem = 'header.header';
      const headerElement = document.querySelector(headerItem);
      if (!headerElement.classList.contains('_header-scroll')) {
        headerElement.style.cssText = `transition-duration: 0s;`;
        headerElement.classList.add('_header-scroll');
        headerItemHeight = headerElement.offsetHeight;
        headerElement.classList.remove('_header-scroll');
        setTimeout(() => {
          headerElement.style.cssText = ``;
        }, 0);
      } else {
        headerItemHeight = headerElement.offsetHeight;
      }
    }

    const targetBlockPosition = targetBlockElement.getBoundingClientRect().top + window.scrollY;
    const startScroll = window.scrollY;
    const startTime = performance.now();
    const duration = speed;

    function scrollToPosition(currentTime) {
      const elapsedTime = currentTime - startTime;
      const ease = easeOutQuad(Math.min(elapsedTime / duration, 1));
      const distance = targetBlockPosition - startScroll;
      window.scrollTo(0, startScroll + distance * ease);
      if (elapsedTime < duration) {
        requestAnimationFrame(scrollToPosition);
      } else {
        window.scrollTo(0, targetBlockPosition);
        document.addEventListener('scroll', stopScrolling);
      }
    }

    function stopScrolling() {
      document.removeEventListener('scroll', stopScrolling);
    }

    function easeOutQuad(t) {
      return t * (2 - t);
    }

    requestAnimationFrame(scrollToPosition);

    FLS(`[gotoBlock]: Юхуу...едем к ${targetBlock}`);
  } else {
    FLS(`[gotoBlock]: Ой... Такого блока нет на странице: ${targetBlock}`);
  }
};