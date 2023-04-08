import { useState } from 'react';

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  const toggleVissible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 200) {
      setVisible(true);
    } else if (scrolled <= 200) {
      setVisible(false);
    }
  }
  const scrollToTop = () => {
    window.scrollTo({
      top: 0
    })
  }
  window.addEventListener('scroll', toggleVissible);
  return (
    <>
      {visible && <div
        className='scroll-top'
        onClick={scrollToTop}
      >
        <i className="bi bi-arrow-up-circle-fill"></i>
      </div>}
    </>
  )
}

export default ScrollToTop